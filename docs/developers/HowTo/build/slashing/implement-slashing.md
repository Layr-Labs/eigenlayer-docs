---
sidebar_position: 1
title: Implement Slashing
---

:::important
If you're new to slashing in EigenLayer, make sure you're familiar with [Operator Sets](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md)
and [Slashing](../../../../eigenlayer/concepts/slashing/slashing-concept.md) before implementing slashing.
:::

The `AllocationManager` provides the interface for the slashing function.

```solidity
    /**
     * @notice Called by an AVS to slash an operator in a given operator set
     */

    function slashOperator(
        address avs,
        SlashingParams calldata params
    ) external;

    /**
     * @notice Struct containing parameters to slashing
     * @param operator the address to slash
     * @param operatorSetId the ID of the operatorSet the operator is being slashed on behalf of
     * @param strategies the set of strategies to slash
     * @param wadsToSlash the parts in 1e18 to slash, this will be proportional to the operator's
     * slashable stake allocation for the operatorSet
     * @param description the description of the slashing provided by the AVS for legibility
     */
    struct SlashingParams {
        address operator;
        uint32 operatorSetId;
        IStrategy[] strategies;
        uint256[] wadsToSlash;
        string description;
    }
```

To implement slashing, AVSs specify:
* Individual Operator
* [Operator Set](../../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md)
* [List of Strategies](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* [List of proportions (as `wads` or “parts per `1e18`”)](../../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* Description. 

For example, in the `wadsToSlash` parameter: 
* 8% slash is represented as `8e16`, or `80000000000000000`. 
* 25% slash is represented as `2.5e17` or `250000000000000000`. 

The indexes in the two arrays must match across `strategies` and `wadsToSlash`. All Strategies supplied must be configured 
as part of the Operator Set.

When a slashing occurs, one event is emitted onchain for each slashing. Emitted details identify the Operator
slashed, in what Operator Set, and across which Strategies, with fields for the proportion slashed and meta-data.
```
/// @notice Emitted when an operator is slashed by an operator set for a strategy
/// `wadSlashed` is the proportion of the operator's total delegated stake that was slashed
event OperatorSlashed(
    address operator, OperatorSet operatorSet, IStrategy[] strategies, uint256[] wadSlashed, string description
);
```