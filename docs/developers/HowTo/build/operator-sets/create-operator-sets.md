---
sidebar_position: 1
title: Create Operator Sets
---

:::tip
If you're new to Operator Sets in EigenLayer, review the [Operator Sets concepts](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) before continuing with this topic.
:::

Creating Operator Sets for an AVS is managed by the [AllocationManager core contract](../../../Concepts/eigenlayer-contracts/core-contracts.md).
[Strategies](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes) can be added to Operator Sets when the Operator is created, or Strategies can be added to an existing Operator Set.

To create an Operator Set, call the [`createOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#createoperatorsets) function.
To add strategies when creating an Operator Set, specify a `params` array containing the strategies.

On creation, an `id` is assigned to the Operator Set. Together the AVS `address` and `id` are a unique identifier for the Operator Set. 

Once created, [update the AVS metadata](update-avs-metadata.md) to provide information on the Operator Set to Stakers and Operators.

For information on adding Strategies to an Operator Set after creation, refer to [Modify Strategy Composition](modify-strategy-composition.md).