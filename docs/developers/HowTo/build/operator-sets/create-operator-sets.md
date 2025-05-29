---
sidebar_position: 1
title: Create Operator Sets
---

:::tip
If you're new to Operator Sets in EigenLayer, review the [Operator Sets concepts](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) before continuing with this topic.
:::

Creating Operator Sets for an AVS is managed by the [AllocationManager core contract](../../../Concepts/eigenlayer-contracts/core-contracts.md). Before Operator Sets can be created,
[AVS metadata must be registered](../register-avs-metadata.md).

[Strategies](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes) can be added to Operator Sets when the Operator is created, or Strategies can be added to an existing Operator Set.

Operator Sets are either: 
* [Non-redistributing](#create-operator-set). Slashed funds are burnt.
* [Redistributing](#create-redistributing-operator-set). Slashed funds are sent to the `redistributionRecipient`.

The Operator Set type cannot be changed.

## Create Operator Set

To create an Operator Set, call the [`createOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#createoperatorsets) function.
To add strategies when creating an Operator Set, specify a `params` array containing the strategies.

On creation, an `id` is assigned to the Operator Set. Together the AVS `address` and `id` are a unique identifier for the Operator Set.
For non-redistributing Operator Sets, the `redistributionRecipient` is the `DEFAULT_BURN_ADDRESS`.

## Create Redistributing Operator Set

To create a redistributing Operator Set, call the `createRedistributingOperatorSets` function.

To add strategies when creating an Operator Set, specify a `params` array containing the strategies.
Native ETH cannot be added as a strategy for redistributing Operator Sets because redistribution of native ETH is not supported.

Specify the address to receive slashed funds in `redistributionRecipients`.  The `redistributionRecipient` can only be set 
when creating the Operator Set and cannot be changed. 

On creation, an `id` is assigned to the Operator Set. Together the AVS `address` and `id` are a unique identifier for the Operator Set.

## Complete Operator Set Configuration

Once created:
1. [Update the AVS metadata](update-avs-metadata.md) to provide information on the Operator Set to Stakers and Operators.
2. If required, [add additional Strategies](modify-strategy-composition.md) to the Operator Set.