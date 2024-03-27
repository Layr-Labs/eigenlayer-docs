---
sidebar_position: 1
title: EigenDA Overview
---

EigenDA is a data availability store made by
[EigenLabs](https://www.eigenlayer.xyz/about) and built on top of
[EigenLayer](../eigenlayer/overview/README.md), currently launching to the
Holesky testnet and launching on mainnet in early Q2 2024.

EigenDA stores rollup transactions until their computed state is
finalized on the rollup bridge, and is...

- **Scalable.** EigenDA write throughput scales linearly with number of
  operators. At launch EigenDA will provide 10 MB/s of write throughput. This is
  5x greater than the nearest competitor.

- **Secure.** EigenDA is decentralized, and made up of hundreds of operators
  registered in EigenLayer whose delegated stake imposes an economic cost to
  misbehavior. EigenDA will have billions of dollars of economic security at
  launch.

- **Decentralized.** EigenDA's design is inspired by Danksharding, which
  promises to scale Ethereum-native DA beyond EIP-4844. EigenDA blob writes are
  registered with contracts on Ethereum, which natively subject operators to
  certain slashing risks. Ethereum L2s using EigenDA avoid any trust assumption on
  another chain's light client, which can be fooled by dishonest validator sets.

## How EigenDA Works

The core insight of EigenDA is that the problem of data availability does not
require independent consensus to solve. In building a decentralized transient
data store for Ethereum rollups, Ethereum can be used for aspects of
coordination required, and data storage can be handled by EigenDA operators
directly.

This approach gives EigenDA the ability to scale linearly. In the context of an
L1 blockchain, increasing throughput means either increasing block size or
decreasing block times. Beyond a certain point, increases in scalability come at
the cost of security or decentralization (see "blockchain trilemma"). One way
around this trilemma is through an emphasis on L2s, where DA can be moved
off-chain such that transaction data need not be replicated to every node.
Instead, only DA metadata and accountability processes are processed on-chain.
This enables DA to scale with respect to the bandwidth of the operator set.

EigenDA works on the basis of three components:

- Operators
- The Disperser (untrusted)
- Retrievers (untrusted)

EigenDA **operators** are third-parties running the EigenDA node software,
registered in EigenLayer with stake delegated to them. EigenDA operators are
responsible for storing blobs associated with valid storage requests. Valid
storage requests are requests where fees are paid and the provided blob chunk
verifies against the provided KZG commitment and proof. In the case of a
successful verification the operator stores the blob and signs a message with
the KZG commitment and the chunk index they hold, and sends it back to the
disperser. EigenDA operators are collectively trusted – when writing a blob to
EigenDA clients must choose the exact threshold of stake with which they would
like their blob to be stored.

The EigenDA **disperser** is an untrusted service hosted by EigenLabs which is
responsible for interfacing between EigenDA clients, operators, and contracts.
EigenDA clients make dispersal requests to the disperser, which Reed-Solomon
encodes the blob, calculates the encoded blob's KZG commitment, and generates a
KZG proof for each chunk. Then the disperser sends chunks, KZG commitment, and
KZG proofs to operators, who return signatures. The disperser then aggregates
these signatures and uploads it to Ethereum in the form of calldata to the
EigenDA contract. This step is a necessary precondition for slashing operators
for misbehavior.

The EigenDA **retriever** is a service that queries EigenDA operators for blob
chunks, verifies that blob chunks are accurate, and reconstructs the original
blob for the user. EigenDA hosts a retriever service but client rollups may also
host their own retriever as a sidecar to their sequencer.

### How Rollups Integrate

![EigenDA Architecture](/img/eigenda/dispersal-flow-diagram.png)

The diagram above shows the basic flow of data through EigenDA:

1. The rollup sequencer sends a batch of transactions as a blob to the EigenDA
   disperser sidecar.
2. The EigenDA disperser sidecar erasure encodes the blob into chunks, generates a KZG
   commitment and multi-reveal proofs for each chunk, and disperses chunks to
   EigenDA Operators, receiving signatures certifying storage in return.
3. After aggregating the received signatures, the disperser registers the blob
   onchain by sending a transaction to the EigenDA Manager contract with the
   aggregated signature and blob metadata.
4. The EigenDA Manager contract verifies the aggregated signature with the help
   of the EigenDA Registry contract, and stores the result onchain.
5. Once the blob has been stored offchain and registered onchain, the
   sequencer posts the EigenDA blob ID to its inbox contract in a transaction. A
   blob ID is no more than 100 bytes long.
6. Before accepting the blob ID into the rollup's inbox, the inbox contract
   consults the EigenDA manager contract on whether blob was certified available.
   If it was, the blob ID is allowed into the inbox contract. If not, the blob ID
   is discarded.

For more on how rollups integrate with EigenDA, check out [Integrations Overview](./rollup-guides/integrations-overview.md).