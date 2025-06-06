---
sidebar_position: 2
title: Accounts
---

The account is the Ethereum address that interacts with the EigenLayer core contracts if no appointees are set.

For an Operator, the account address is initialized by the [`registerAsOperator`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md#registerasoperator)
function in the [DelegationManager](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md) core contract. For Operators, this is the operator that holds shares in the `operatorShares` mapping in the [DelegationManager](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/DelegationManager.md) core contract.

For an AVS, the account address is initialized by the [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md#updateavsmetadatauri) function in the [AllocationManager](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md) core contract. For AVSs, this 
is the address under which Operator Sets are created in the [AllocationManager](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md) core contact.

As admin keys are added and rotated, the original account address remains the associated Operator ID or AVS ID.

:::caution
Before any admins are added, an account is its own admin. Once an admin is added, the account is no longer an admin by default. 
If an account wants to both add admins and continue acting as its own admin, the account must be added to the admins list before
adding additional admins.
:::
