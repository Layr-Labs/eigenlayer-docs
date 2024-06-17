---
sidebar_position: 1
---
# Overview

## OP Stack and EigenDA

[OP Stack](https://stack.optimism.io/) is the set of [software
components](https://github.com/ethereum-optimism/optimism) that run sequencers,
nodes, and contracts for [Optimism](https://www.optimism.io/) and which can be
independently deployed to power third-party rollups.

In its native mode, OP Stack uses Ethereum for Data Availability, meaning it
persists L2 transaction batches to Ethereum in the form of calldata to form the
canonical L2 chain. This comes with advantages and disadvantages.

In Alt-DA mode, OP Stack uses a third-party server for communicating with the DA network for reading and writing tx batches. 

## How it works
Please advise the alt-da [spec](https://specs.optimism.io/experimental/alt-da.html) for a more in-depth breakdown on the intricacies of how Optimism supports alt-da modules like EigenDA. 

## Resources

- Eigen Labs OP Stack Fork:
[https://github.com/Layr-Labs/optimism](https://github.com/Layr-Labs/optimism) -
Announcing EigenDA x OP Stack Support:
[https://www.blog.eigenlayer.xyz/announcing-eigenda-x-op-stack-support/](https://www.blog.eigenlayer.xyz/announcing-eigenda-x-op-stack-support/)

## Next Steps

If you are a Rollup considering integrating with EigenDA and OP Stack - reach
out to our team to discuss how we can support and accelerate your onboarding:
[https://contact.eigenda.xyz/](https://contact.eigenda.xyz/)

If you are a Rollup developer and have questions on the integration - reach out
to our Support team via:
[https://support.eigenlayer.xyz/](https://support.eigenlayer.xyz/)
