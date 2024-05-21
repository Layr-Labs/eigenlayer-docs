---
sidebar_position: 4
---
# General Optimistic Rollup Strategies

There are a few viable design strategies for securely deploying an optimistic rollup with
EigenDA. This document aims to describe them in detail to provide rollup
engineers with a strong understanding of how an EigenDA integration would impact
their tech stack and security model.

For any given rollup there are four main concerns inherent to an integration
with external DA:

1. **Dispersal.** The rollup batcher must write transaction batches to the DA
layer, wait for confirmation, and write the resulting DA certificate to the
rollup inbox.
2. **Certificate Verification.** Either the rollup inbox contract
or the rollup OS must verify that DA certificate is valid, i.e. that enough
operators have certified the blob available, before reading the DA cert's data
from the DA layer. This ensures that a transaction batch referenced by an
invalid certificate is not executed.
3. **Retrieval.** Rollup full nodes must retrieve EigenDA blobs as part of the
L2 derivation/challenge process. Otherwise they cannot keep up with the state of
the L2.
4. **Data Verification.** The rollup's fraud arbitration protocol must be
capable of verifying that the EigenDA blob data used to generate a state root
matches the KZG commitment provided in the EigenDA cert posted to the rollup
inbox. In doing this verification, the chain ensures that the transaction data
used to generate the rollup's state root was not manipulated by the
sequencer/proposer.

Each strategy used to integrate EigenDA can be defined by how these four concerns
are handled.

## Trusted Verification Strategy (M0) {#M0}

![M0 chain finalization](/img/eigenda/optimistic-M0-dispersal.png)

The trusted verification strategy does not do certificate or data verification.
Instead it focuses on dispersal and retrieval for the sake of simplicity, but at
the cost of security. This is an integration model fit for testnet. Let's walk
through the lifecycle of an L2 batch:

1. The batcher component of the rollup sequencer prepares an L2 batch, and calls
the **DisperseBlob()** method on the EigenDA disperser, sending the batch data.
2. The disperser erasure-encodes the blob into chunks, calculates the KZG
commitment, and calculates the KZG proof for each chunk. It then distributes the
chunks to the EigenDA operator set, where each operator receives a subset of
the chunks in proportion to its stake. Each operator then stores the chunks its
received, verifying that each chunk matches its KZG proof and KZG commitment.
If so, it signs a message certifying that the chunk has been stored and returns
it to the disperser.
3. The disperser aggregates the signatures from step 3 into a single BLS
signature and sends it and some blob metadata to to the EigenDA Manager contract on
Ethereum. The EigenDA Manager contract on Ethereum is responsible for verifying EigenDA
certificates, and if they verify, recording that verification in storage.
Verification consists of ensuring the aggregated signature is valid and is
based on the current EigenDA operator set. This blob verification status is
not used in this implementation strategy.
4. If the sequencer is using the EigenDA disperser, then it shouldn't just trust
the disperser when it says that the blob has successfully been dispersed, it
should verify by checking onchain. This is important in this integration
strategy because the rollup inbox does not perform this check. Without this
check the EigenDA disperser is trusted (in addition to the sequencer).
5. The batcher then sends a transaction to the rollup inbox contract on
Ethereum with the EigenDA blob id as calldata, which accepts the
EigenDA blob id.

On the derivation side, there is a similar flow in reverse. When an L2 full node
encounters an EigenDA certificate in the rollup inbox, it knows to retrieve the
underlying blob from the EigenDA operator set using the EigenDA client, and then
interpret the transactions inside.

Please keep in mind that this integration model is *insecure*. The rollup
sequencer is completely trusted in this scenario, because the fraud proof system
is disabled, and state roots cannot be challenged. This means the sequencer can
post whatever state roots they want to the bridge contract and potentially steal
funds.

## L2 Inbox Certificate Verification Strategy (M1) {#M1}

The natural locations for dispersal, retrieval, and data verification logic are
unambiguous – dispersal logic can only live inside the rollup batcher, retrieval
logic can only live inside the derivation pipeline, and data verification logic
can only live inside the fraud proof system. That leaves certificate
verification logic, which could be placed either in the rollup's inbox contract
or inside the rollup virtual machine executing off-chain. The question of where
to place this logic is the key distinguishing factor between the "M1" and
"M2" integration paths.

An instructive way to dive into the L2 inbox certificate verification strategy
is to follow an L2 transaction from origination to finalization on Ethereum. We
can further break this down into two stages, L2 chain finalization and L2 bridge
finalization.

### L2 Chain Finalization

![M1 chain finalization](/img/eigenda/optimistic-M1-dispersal.png)

First, L2 chain finalization. An L2 transaction is finalized with respect to the
L2 chain when the transaction has been sequenced in the L2 inbox contract. When
this process is complete, any L2 node can say with confidence that the
transaction is part of the canonical L2 chain and is not subject to a reorg.

For example, if you were selling your car and a buyer paid you by sending you
USDC on a secure rollup, it would be important to wait until the transaction had
reached L2 chain finalization before letting them drive away with your vehicle.

Let's walk through how EigenDA affects this process:

1. The batcher component of the rollup sequencer prepares an L2 batch of user
transactions and sends it to the EigenDA disperser.
2. The disperser erasure-encodes the blob into chunks, calculates the KZG
commitment, and calculates the KZG proof for each chunk. It then distributes the
chunks to the EigenDA operator set, where each operator receives a subset of
the chunks in proportion to its stake. Each operator then stores the chunks its
received, verifying that each chunk matches its KZG proof and KZG commitment.
If so, it signs a message certifying that the chunk has been stored and returns
it to the disperser.
3. The disperser aggregates the signatures from step 3 into a single BLS
signature and sends it and some blob metadata to to the EigenDA Manager contract on
Ethereum. The EigenDA Manager contract on Ethereum is responsible for verifying EigenDA
certificates, and if they verify, recording that verification in storage.
Verification consists of ensuring the aggregated signature is valid and is
based on the current EigenDA operator set. This blob verification status is
used in step 5.
4. Once the blob has been confirmed, the batcher sends a transaction to the
rollup inbox contract on Ethereum with the EigenDA blob certificate as calldata.
5. The rollup inbox contract is programmed not to accept the
EigenDA certificate unless it is valid. To avoid repeating work,
the rollup inbox contract can make a `verifyBlob()` call on the EigenDA
contract, passing in the EigenDA certificate. Inside the `verifyBlob()`
implementation, the EigenDA manager contract checks against its storage whether
the blob certificate was verified. If so `verifyBlob()` returns `true` and the
EigenDA certificate is allowed into the inbox.  Otherwise the blob ID is rejected.

At this point the the user's transaction has been confirmed on the rollup. Once
the weak subjectivity window passes (~13 minutes), the user's transaction can be
considered finalized.

### L2 Bridge Finalization

![M1 bridge finalization](/img/eigenda/optimistic-M1-settlement.png)

L2 bridge finalization is necessary for bridging assets or data from the L2 to
the L1. Bridge finalization depends on the rollup bridge contract on the L1
arriving on an accurate L2 state root. This is where fraud or validity proofs
come in.

Every L2 full node is responsible for deriving the L2's state root from the L1.
In the absence of fraud, this is a relatively simple process with EigenDA:

1. If an L2 full node reads an EigenDA cert from the rollup inbox, it knows this
DA cert is valid because otherwise it would have been rejected from the inbox.
So it uses the EigenDA client to retrieve the EigenDA blob using the EigenDA
cert.
2. The full node executes the L2 block as described in the L2 blob against the
current L2 state.
3. If the full node is a proposer/validator, it will post the state root of the
L2 state to the rollup bridge contract on Ethereum every few blocks.
4. If no fraud proof has been submitted within the challenge window (~7 days),
then the state root in the rollup bridge contract is considered valid and any
outbound assets or messages are released by the bridge contract.

In the event of a fraud challenge, the process is more complex. There is a
second, equivalent state transition function for generating state roots which is
much slower but also much a more rigorous fraud prove.

That process models the L2 state as a virtual machine, complete with an operating
system, which continuously reads messages from the rollup inbox contract using a
special `ReadInboxMessage` opcode, and handles them accordingly. If an inbox
message describes a batch of raw L2 transactions, the L2 OS knows it should
execute them. If an inbox message describes an EigenDA cert, the L2 operating
system knows that it should pass the KZG commitment inside the cert to the
special `ReadPreImage` opcode to read the underlying data, and then handle the
messages returned.

This VM state transition function process is useful because it makes it possible
to rigorously prove that the state root was generated based on the exact data
referenced by the EigenDA cert.

Let's walk through a scenario where the proposer is dishonest, in order to
illustrate:

![M1 bridge challenge](/img/eigenda/optimistic-M1-challenge.png)

1. The proposer encounters an EigenDA cert and rather than reading data from
EigenDA honestly, decides to read data from elsewhere, not committed to by the
KZG commitment in the EigenDA cert. The proposer generates a state root on the
basis of executing these messages, and posts this state root to the rollup
bridge contract.
2. A challenger sees that their state root for a given L2 block does not match
the one posted by the proposer in the bridge contract, and makes a contract call
to begin a challenge.
3. The challenger and the defender alternate narrowing the scope of their
disagreement to a specific opcode of the VM state transition function, until
they've narrowed their disagreement to a specific opcode. In this case, the
challenge opts to challenge the `ReadPreImage` opcode, since this is where the
correct EigenDA should have been read.
4. The challenger invokes the arbitration contract with the necessary VM state
to execute the `ReadPreImage` opcode, as well as necessary extra data for
proving that the opcode was executed correctly. This extra data includes the
chunk of data that should have been read (only 32 bytes of data are read at a
time) as well as a KZG proof showing that the data matches the KZG commitment
that the opcode was invoked with. The arbitration contract checks whether the
data matches the KZG commitment and proof.
5. If the winner of the verification is the challenger then the old state root is
replaced with the challenger's new state root.

In order to implement an EigenDA integration with fraud proofs, the underlying
rollup must support passing KZG commitments to `ReadPreImage` opcode. The rest
of the L2 VM design works as-is for arbitrating fraud.

## L2 OS Certificate Verification Strategy (M2) {#M2}

<!-- ![M2 chain finalization](/img/eigenda/optimistic-M2-dispersal.png) -->

The V2 integration strategy is similar to the V1 integration strategy, with the
difference that EigenDA certificates are not verified on Ethereum. Instead, they
are verified within the L2 itself, such that the validity of DA certs is
enforced by the same fraud proof mechanism that is used with all other L2 state.
In this mode, a rollup batcher may submit invalid EigenDA certs to the rollup
inbox, such that L2 nodes interpret these invalid DA certs and discard them. If
a rollup proposer submits a state root based on data referenced by an EigenDA
cert, it is possible to successfully challenge that state root.

This integration strategy depends on the ability of the L2 OS to validate
EigenDA certs, which requires an authenticated view into the current EigenDA
operator set. Specifically, the L2 OS must have access to L1 state roots, so
that Eigenlayer contract storage proofs may be verified.

## Analysis

Although the rollup inbox implementation is simpler, the L2 OS implementation is
more desirable since it avoids adding validity constraints to batch updates,
which would incur significant signature verification gas costs regardless of
whether the sequencer is honest. When placed within the rollup OS, DA
certificate verification only incurs on-chain costs when the sequencer is
dishonest.
