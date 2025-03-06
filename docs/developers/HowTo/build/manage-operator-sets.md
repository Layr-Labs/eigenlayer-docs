---
sidebar_position: 5
title: Manage Operator Sets
---

To manage [Operator Sets](../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) for an AVS:
1. [Create Operator Sets](#create-operator-sets)
2. [Modify Strategy composition](#modify-strategy-composition) 

## Create Operator Sets

Creating Operator Sets for an AVS is managed by the [AllocationManager core contract](../../Concepts/eigenlayer-contracts/core-contracts.md). 
[Strategies](../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes) can be added to Operator Sets when the Operator is created, or Strategies can be added to an existing Operator Set.

To create an Operator Set, call the [`createOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#createoperatorsets) function. 
To add strategies when creating an Operator Set, specify a `params` array containing the strategies.

On creation, an `id` is assigned to the Operator Set. Together the AVS `address` and `id` are a unique identifier for the Operator Set. 

## Modify Strategy Composition

An Operator Set requires at least one [Strategy](../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes).

To add Strategies to an existing Operator Set, call the [`addStrategiesToOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#addstrategiestooperatorset) function.

To remove Strategies from an Operator Set, call the [`removeStrategiesFromOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#removestrategiesfromoperatorset) function.
