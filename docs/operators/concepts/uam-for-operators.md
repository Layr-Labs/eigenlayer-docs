---
sidebar_position: 2
title: User Access Management
---

For concept material on User Access Management (UAM) and roles, refer to:
* [User Access Management](../../eigenlayer/concepts/uam/user-access-management.md)
* [Accounts](../../eigenlayer/concepts/uam/uam-accounts.md)
* [Admins](../../eigenlayer/concepts/uam/uam-admins.md)
* [Appointees](../../eigenlayer/concepts/uam/uam-appointees.md)

User Access Management (UAM) enables Operators to set appointees for actions enabling a range of key management solutions to be 
implemented.  For example, from simple (ECDSA key rotation) to complex (upstream smart contract permissioning schemes).

The protocol functions that an Operator can set appointees for are:
* [`AllocationManager.modifyAllocations`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md#modifyallocations)
* [`AllocationManager.registerForOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md#registerforoperatorsets)
* [`AllocationManager.deregisterFromOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md#deregisterfromoperatorsets)
* [`AllocationManager.setAllocationDelay`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md#setallocationdelay)
* [`DelegationManager.modifyOperatorDetails`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md#modifyoperatordetails)
* [`DelegationManager.updateOperatorMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md#updateoperatormetadatauri)
* [`DelegationManager.undelegate`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md#undelegate)
* [`RewardsCoordinator.setClaimerFor`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#setclaimerfor)
* [`RewardsCoordinator.setOperatorAVSSplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#setoperatoravssplit)
* [`RewardsCoordinator.setOperatorPISplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#setoperatorpisplit)
* [`RewardsCoordinator.setOperatorSetSplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#setoperatorsetsplit)

For information on how to set admins and appointees for an AVS, refer to:
* [Add and Remove Admins](../howto/uam/op-add-remove-admins.md)
* [Add and Remove Appointees](../howto/uam/op-add-remove-appointees.md)
