---
sidebar_position: 5
title: User Access Management
---

:::note
There is no support for setting appointees for AVSDirectory functions. The AVSDirectory method will be deprecated in a future upgrade.
[All AVSs will need to migrate to Operator Sets before the upcoming deprecation of AVSDirectory](../HowTo/build/slashing/migrate-to-operatorsets.md).
:::

For concept material on User Access Management (UAM) and roles, refer to:
* [User Access Management](../../eigenlayer/concepts/uam/user-access-management.md)
* [Accounts](../../eigenlayer/concepts/uam/uam-accounts.md)
* [Admins](../../eigenlayer/concepts/uam/uam-admins.md)
* [Appointees](../../eigenlayer/concepts/uam/uam-appointees.md)

UAM enables an AVS to split onchain components across multiple contracts to enable a modular design. 
The protocol functions that an AVS can set appointees for are:
* [`AllocationManager.slashOperator`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#slashoperator)
* [`AllocationManager.deregisterFromOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#deregisterfromoperatorsets)
* [`AllocationManager.setAVSRegistrar`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#setavsregistrar)
* [`AllocationManager.updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#updateavsmetadatauri)
* [`AllocationManager.createOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#createoperatorsets)
* [`AllocationManager.addStrategiesToOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#addstrategiestooperatorset)
* [`AllocationManager.removeStrategiesFromOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#removestrategiesfromoperatorset)
* [`RewardsCoordinator.createOperatorDirectedAVSRewardsSubmission`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createoperatordirectedavsrewardssubmission)
* [`RewardsCoordinator.createOperatorDirectedOperatorSetRewardsSubmission`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createoperatordirectedoperatorsetrewardssubmission)
* [`RewardsCoordinator.setClaimerFor`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#setclaimerfor)

For information on how to set admins and appointees for an AVS, refer to:
* [Add and Remove Admins](../HowTo/build/uam/dev-add-remove-admins.md)
* [Add and Remove Appointees](../HowTo/build/uam/dev-add-remove-appointees.md)
