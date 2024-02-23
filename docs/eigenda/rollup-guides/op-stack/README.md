---
title: OP Stack
---
# EigenDA OP Stack Integration

## OP Stack and EigenDA

[OP Stack](https://stack.optimism.io/) is the set of [software
components](https://github.com/ethereum-optimism/optimism) that run sequencers,
nodes and contracts for [Optimism](https://www.optimism.io/) and which can be
independently deployed to power third-party rollups.

In its native mode, OP Stack uses Ethereum for Data Availability, meaning it
persists L2 transaction batches to Ethereum in the form of calldata to form the
canonical L2 chain. This comes with advantages and disadvantages. The advantage
of using Ethereum for DA is that the data is fully secured by Ethereum's
security budget, and the system is relatively simple. The drawback is that
Ethereum calldata is expensive, and relatively scarce. Ethereum's consensus
throughput (pre-EIP-4844) is 200Kb per block, every 12 seconds. That is not
enough to scale the decentralized web. **When execution throughput was the main
bottleneck to scaling Ethereum, rollups were the answer. Now DA throughput has
become the bottleneck to scaling rollups, and the answer is EigenDA.** Write L2
transaction data to a permissionless, trustless, secure, and scalable DA
Operator set, and the last bottleneck on the performance of your rollup will be
removed.

[**EigenLabs has forked OP Stack**](https://github.com/Layr-labs/optimism) **to
add optional support for EigenDA. The modifications were relatively simple and
are detailed in the next section.**

## How it works

![OP stack diagram](/img/op-stack-blob-disersal-seq.png)

In the absence of fraud proofs, the integration is relatively simple. On the
sequencing side instead of writing L2 transaction data to Ethereum calldata, we
write L2 transaction data to EigenDA. Then we take the resulting EigenDA blob
key and write that to Ethereum calldata. Where the blob data could be many
megabytes in size, the blob key is only a few bytes long and so the cost of the
calldata becomes relatively negligible.

The other side of the integration is the L2 derivation pipeline, which both
sequencers and nodes run continuously to keep track of the canonical L2 chain
state. We updated this process to recognize EigenDA blob keys posted to the L2
inbox, so that we know to download that data from EigenDA before continuing
derivation.

One salient feature of this integration is a safety mechanism for falling back
to Ethereum DA in the event that EigenDA is not functioning correctly.

## L1 Contracts

No contract changes are required for this integration. The latest OP Stack
release [Bedrock](https://stack.optimism.io/docs/releases/bedrock/) includes
contracts that implement the integration between the L1 and L2, and integration
points between the Sequencer and the L1. Although EigenDA supports on-chain data
availability verification, the current version of OP Stack has not yet fully
integrated support for fault proofs (more detail [here on their Alpha
release](https://blog.oplabs.co/op-stack-fault-proof-alpha/)). We plan to enable
this verification with EigenLayer once OP Stack has fully integrated their
fault-proof architecture.

## Sequencer

The OP Stack Sequencer consists of 4 independent processes (long running
services):

- **Op-node**: Primarily responsible for producing new L2 blocks with the help
of Op-geth, a necessary part of this is tracking L2 consensus on the L1.
- **Op-geth**: Responsible for the L2 state and its state machine API.
- **Op-batcher**: Responsible for posting new L2 blocks to DA.
- **Op-proposer**:
Responsible for posting state roots associated with L2 blocks to settlement.

To add EigenDA support to the OP Stack Sequencer, we need to:

1. **Update DA writes**: modify how L2 transaction data is posted for DA
(Op-batcher).
2. **Update DA reads**: modify how L2 transaction data is
[derived](https://github.com/ethereum-optimism/optimism/blob/develop/specs/derivation.md#l2-chain-derivation-pipeline)
from DA (op-node).

The Op-batcher service is modified to write (disperse) its Optimism [data
frame](https://github.com/ethereum-optimism/optimism/blob/develop/specs/glossary.md#channel-frame)
(a grouping of L2 transactions) to EigenDA, wait for confirmation and the
resulting BlobInfo object. If the EigenDA dispersal is successful, the
Op-batcher writes the BlobInfo object to Ethereum calldata instead of its
original data frame. If the EigenDA dispersal fails, the Op-batcher service
writes the original Optimism data frame to Ethereum calldata.

DA reads occur in the Op-node service, as part of the L2 derivation pipeline,
where L2 transaction batches are “derived” from DA. The logic in this service is
modified to determine whether the calldata contains a BlobInfo object (the
result from the EigenDA dispersal step above) and retrieve its data from
EigenDA, otherwise follow its normal derivation path from the data frame. In the
future we expect to enhance this client to handle more robust EigenDA features,
such as quorum selection for retrieval.

## Resources

- Eigen Labs OP Stack Fork:
[https://github.com/Layr-Labs/optimism](https://github.com/Layr-Labs/optimism) -
Announcing EigenDA x OP Stack Support:
[https://www.blog.eigenlayer.xyz/announcing-eigenda-x-op-stack-support/](https://www.blog.eigenlayer.xyz/announcing-eigenda-x-op-stack-support/)

## Next Steps

If you are a Rollup considering integrating with EigenDA and OP Stack - reach
out to our team to discuss how we can support and accelerate your onboarding:
[https://contact.eigenda.xyz/](https://contact.eigenda.xyz/)

If you are a Rollup developer and have questions on the integration- reach out
to our Support team via:
[https://support.eigenlayer.xyz/](https://support.eigenlayer.xyz/)
