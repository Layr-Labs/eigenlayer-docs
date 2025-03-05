---
sidebar_position: 6
title: Manage Registered Operators
---

## AVSRegistrar

The [AVSRegistrar](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/src/contracts/interfaces/IAVSRegistrar.sol) is called when operators register for and deregister from [Operator Sets](../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md). By default (if the stored address
is 0), the call is made to the ServiceManager contract for the AVS. If the AVS has set a different contract as the AVSRegistrar, the specified contract is called.

### Setting AVSRegistrar

To set a contract as the AVSRegistrar, call the [`setAVSRegistrar`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#setavsregistrar) function. The target contract must also implement 
[`supportsAVS(AVS)`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/src/contracts/interfaces/IAVSRegistrar.sol) returning TRUE or setting the contract as the AVSRegistrar fails.

## Respond to Operator Registrations to Operator Sets

Operators use the [`registerForOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#registerforoperatorsets) function to register for AVS's operator sets. AVSs can reject ineligible 
Operators based on their own custom logic specified in the [AVSRegistrar](#avsregistrar).

For an AVS to reject an Operator attempting to join an Operator Set, the call from [AllocationManager](../../Concepts/eigenlayer-contracts/core-contracts.md) to the 
[`IAVSRegistrar.registerOperator`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/src/contracts/interfaces/IAVSRegistrar.sol) function must revert. 

## Deregister Operators from, or respond to Operator deregistrations, from Operator Sets

Deregistration from an Operator Set can be triggered by either the Operator, or the AVS for the Operator Set, using the
[`deregisterFromOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#deregisterfromoperatorsets) function.

Similar to when an Operator registers for an Operator Set, if the call to [IAVSRegistrar.deregisterOperator](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/src/contracts/interfaces/IAVSRegistrar.sol) reverts, the
deregistration also reverts and does not occur. 
