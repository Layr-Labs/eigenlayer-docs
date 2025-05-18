---
sidebar_position: 3
title: Releases and Compatibility Matrix
---

The table displays:
* Version of EigenLayer protocol deployed to Mainnet and testnets. 
* Compatible versions of developer and operator components.

| Environment      | [Core contracts](https://github.com/Layr-Labs/eigenlayer-contracts/releases) | [Middleware](https://github.com/Layr-Labs/eigenlayer-middleware/releases) | [EigenLayer CLI](https://github.com/Layr-Labs/eigenlayer-cli/releases) | [Sidecar](https://github.com/Layr-Labs/sidecar/releases) | [EigenPod Proof Generation](https://github.com/Layr-Labs/eigenpod-proofs-generation/releases) | 
|------------------|----------------|------------|----------------|----------------------------------------------------------|-------------------------------|
| Mainnet Ethereum | 1.4.1          | 1.3.1      | 0.13.0         | 3.5.0                                                    | 1.3.0                         | 
| Testnet Holesky  | 1.4.2          | 1.3.1      | 0.13.0         | 3.5.0                                                    | 1.3.0                         |
| Testnet Sepolia  | 1.3.0          | 1.3.1      | 0.13.0         | 3.5.0                                                    | 1.3.0                         |

For more information on specific releases, refer to Releases in each repository.

## Mainnet

The [Slashing](https://github.com/Layr-Labs/eigenlayer-contracts/releases/tag/v1.3.0) and Rewards v2.1 releases are available on mainnet.

The Slashing release includes [User Access Management (UAM)](concepts/uam/user-access-management.md).

The following components include updated functionality for the Slashing release:
* [Operator CLI](https://github.com/Layr-Labs/eigenlayer-cli)
* [AVS Sync](https://github.com/Layr-Labs/avs-sync)
* [EigenSDK-GO](https://github.com/Layr-Labs/eigensdk-go)
* [EigenSDK-Rust](https://github.com/Layr-Labs/eigensdk-rs)
* [Middleware](https://github.com/Layr-Labs/eigenlayer-middleware)
* [Sidecar](https://github.com/Layr-Labs/sidecar)
* [EigenLayer app](https://app.eigenlayer.xyz/)

:::important 
Unless specified otherwise, this documentation matches the functionality available on mainnet.
:::

### Documentation Updates included in Slashing Release


#### Slashing 

Refer to: 
* [Slashing concept](concepts/slashing/slashing-concept)
* For developers, [Implement Slashing](../developers/HowTo/build/slashing/implement-slashing)
* For Stakers and Operators, [Slashable Stake Risk](concepts/slashing/slashable-stake-risks)

#### Operator Sets

The Slashing release introduced Operator Sets. The AllocationManager core contract manages Operator Sets and replaces
the AVSDirectory for registering Operators to an AVS. [The AVSDirectory will be deprecated in a future upgrade](https://docs.eigenlayer.xyz/developers/HowTo/slashing/migrate-to-operatorsets).

#### Rewards v2.1

Rewards v2.1 introduced Operator directed rewards for Operator sets. For AVSs using Operator Sets, use `createOperatorDirectedOperatorSetRewardsSubmission`. 
`createAVSRewardsSubmission` and `createOperatorDirectedAVSRewardsSubmission` remain available for use by AVSs that have not yet [migrated to Operator Sets](https://docs.eigenlayer.xyz/developers/HowTo/slashing/migrate-to-operatorsets).

#### Rewards 

Refer to:
* [Rewards concept](concepts/rewards/rewards-concept)
* For developers, [Submit Rewards Submissions](../developers/HowTo/build/submit-rewards-submissions)
* For Operators, [Configure Rewards](../operators/howto/confirgurerewards/set-rewards-split) and [Claim Rewards](https://docs.eigenlayer.xyz/operators/howto/confirgurerewards/set-rewards-split)
* For Stakers, [Claim Rewards](../restakers/restaking-guides/claim-rewards-app)

#### Operator Sets

Refer to: 
* [Operator Sets concept](concepts/operator-sets/operator-sets-concept)
* For developers, [Manage Operator Sets](../developers/HowTo/build/manage-operator-sets) and [Migrate to Operator Sets](../developers/HowTo/build/slashing/migrate-to-operatorsets)
* For Operators, [Allocate and Register to Operator Sets](../operators/howto/operator-sets)

#### User Access Management (UAM)

Refer to: 
* [UAM Concept](concepts/uam/user-access-management)
* For developers, [Add and Remove Admins](../developers/HowTo/build/uam/dev-add-remove-admins) and [Add and Remove Appointees](../developers/HowTo/build/uam/dev-add-remove-admins)
* For Operators, [Add and Remove Admins](../operators/howto/uam/op-add-remove-admins) and [Add and Remove Appointees](../operators/howto/uam/op-add-remove-appointees)

## Samples

The [Hello World AVS](https://github.com/Layr-Labs/hello-world-avs) and [Incredible Squaring](https://github.com/Layr-Labs/incredible-squaring-avs)
samples are available to for development and testing to get familiar with EigenLayer. We are currently updating these to 
include rewards and slashing capabilities.