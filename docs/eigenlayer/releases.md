---
sidebar_position: 3
title: Releases
---
## Mainnet

The [Rewards v2 release](https://www.blog.eigenlayer.xyz/rewards-v2/) is available on mainnet. The [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts)
and [eigenlayer-middleware](https://github.com/Layr-Labs/eigenlayer-middleware) include the Rewards v2 release on the `mainnet` branch
in each repository. 

## Testnet

The [Slashing](https://www.blog.eigenlayer.xyz/introducing-slashing/) and Rewards v2.1 releases are available on the Sepolia testnet. 
The [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts) and [eigenlayer-middleware](https://github.com/Layr-Labs/eigenlayer-middleware)
include the Slashing release on the `testnet-sepolia` branch.

:::important 
Unless specified otherwise, this documentation matches the functionality available on the Sepolia testnet. For mainnet 
specific documentation, refer to the `/docs` repository on the `mainnet` branch in the [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts)
and [eigenlayer-middleware](https://github.com/Layr-Labs/eigenlayer-middleware) repositories.
:::

### What's changed 

#### Sepolia Testnet

Due to recent instability on Holesky testnet, EigenLayer has launched on Sepolia. AVS developers can use Sepolia for development and testing.

Currently, EigenPods and native ETH restaking are not available on Holesky. EigenLayer will continue to support Holesky as
it stabilizes for end to end protocol testing.

For more information, refer to the [EigenLayer blog](https://www.blog.eigenlayer.xyz/).

#### Operator Sets

The Slashing release on testnet introduced Operator Sets. The AllocationManager core contract manages Operator Sets and replaces
the AVSDirectory for registering Operators to an AVS. [The AVSDirectory will be deprecated in a future upgrade](https://docs.eigenlayer.xyz/developers/HowTo/slashing/migrate-to-operatorsets).

#### Rewards v2.1

Rewards v2.1 on testnet introduced Operator directed rewards for Operator sets. For AVSs using Operator Sets, use `createOperatorDirectedOperatorSetRewardsSubmission`. 
`createAVSRewardsSubmission` and `createOperatorDirectedAVSRewardsSubmission` remain available for use by AVSs that have not yet [migrated to Operator Sets](https://docs.eigenlayer.xyz/developers/HowTo/slashing/migrate-to-operatorsets).

#### Release Notes 

For complete release notes, refer to the [`eigenlayer-contracts` repository](https://github.com/Layr-Labs/eigenlayer-contracts/releases).

## SDKs

The [EigenLayer Rust SDK](https://github.com/Layr-Labs/eigensdk-rs) supports two bindngs:
* Rewards v2 - Current mainnet release.
* Slashing - Middleware's dev branch latest commit.

The [EigenLayer Go SDK](https://github.com/Layr-Labs/eigensdk-go) supports the Rewards v2.1 release. 

## Samples

The [Hello World AVS](https://github.com/Layr-Labs/hello-world-avs) and [Incredible Squaring](https://github.com/Layr-Labs/incredible-squaring-avs)
samples are available to for development and testing to get familiar with EigenLayer. We are currently updating these to 
include rewards and slashing capabilities.