---
sidebar_position: 1
title: Implement Slashing
---

:::important
If you're new to slashing in EigenLayer, make sure you're familiar with [Operator Sets](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md)
and [Slashing](../../../../eigenlayer/concepts/slashing/slashing-concept.md) before implementing slashing.
:::

:::caution
The v1.5.0 Redistribution release introduced the Slash Escrow Delay. All slashed funds are held in the `SlashEscrow` contracts
for the Slash Escrow Delay before being burnt or redistributed.
:::

The [`AllocationManager`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/src/contracts/interfaces/IAllocationManager.sol) provides the interface for the `slashOperator` function.

To implement slashing, AVSs specify:
* Individual Operator
* [Operator Set](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md)
* [List of Strategies](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* [List of proportions (as `wads` or “parts per `1e18`”)](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* Description. 

## Define Slashing Proportions

In the `wadsToSlash` parameter: 
* 8% slash is represented as `8e16`, or `80000000000000000`. 
* 25% slash is represented as `2.5e17` or `250000000000000000`. 

The indexes in the two arrays must match across `strategies` and `wadsToSlash`. All Strategies supplied must be configured 
as part of the Operator Set.

For more information on how magnitudes are reduced when slashed, refer to [Magnitudes when Slashed](../../../../eigenlayer/concepts/slashing/magnitudes-when-slashed.md).

## Returned by `slashOperator`

The `slashOperator` function returns the `slashId` and number of shares slashed for each strategy. The `slashId` is 
incremented for an OperatorSet each time an Operator Set is slashed.

## Slashing Event Emission

When a slashing occurs, one event is emitted onchain for each slashing. Emitted details identify the Operator
slashed, in what Operator Set, and across which Strategies, with fields for the proportion slashed and meta-data.
```
/// @notice Emitted when an operator is slashed by an operator set for a strategy
/// `wadSlashed` is the proportion of the operator's total delegated stake that was slashed
event OperatorSlashed(
    address operator, OperatorSet operatorSet, IStrategy[] strategies, uint256[] wadSlashed, string description
);
```