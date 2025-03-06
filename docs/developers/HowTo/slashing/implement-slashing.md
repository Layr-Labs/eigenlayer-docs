---
sidebar_position: 1
title: Implement Slashing
---

:::important
Before proceeding, review the [Slashing Concept](../../../eigenlayer/concepts/slashing/slashing-concept.md) content and [Unique Stake Allocation & Deallocation ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md)
for detailed information on slashing.
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
* [Operator Set](../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md)
* [List of Strategies](../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* [List of proportions (as `wads` or “parts per `1e18`”)](../../../eigenlayer/concepts/operator-sets/strategies-and-magnitudes)
* Description. 

For example, in the `wadsToSlash` parameter: 
* 8% slash is represented as `8e16`, or `80000000000000000`. 
* 25% slash is represented as `2.5e17` or `250000000000000000`. 

The indexes in the two arrays must match across `strategies` and `wadsToSlash`. 

All Strategies supplied must be configured as part of the Operator Set. For all Strategies specified, the Operator’s allocations
to that Operator Set are slashed by the corresponding proportion while maintaining their nominal allocations to all other Operator Sets.
Maintaining nominal allocations is achieved by subtracting the allocated magnitude from both the specified Operator Set, 
and the Operator’s Total Magnitude.

Slashing proportionally reduces funds of all Stakers of the given Strategies that are delegated to the Operator, including funds
in queued deallocations and withdrawals (that haven’t passed `WITHDRAWAL_DELAY`). Operator delegation is decreased directly 
in the `DelegationManager` in each Strategy. Changes are propagated to Staker withdrawals and view functions by referring to their
delegated Operator’s Total Magnitude.

When a slashing occurs, one event is emitted onchain for each slashing. Emitted details identify the Operator
slashed, in what Operator Set, and across which Strategies, with fields for the proportion slashed and meta-data.
```
/// @notice Emitted when an operator is slashed by an operator set for a strategy
/// `wadSlashed` is the proportion of the operator's total delegated stake that was slashed
event OperatorSlashed(
    address operator, OperatorSet operatorSet, IStrategy[] strategies, uint256[] wadSlashed, string description
);
```

## Example

The allocated magnitudes are: 

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 40 |
| `AVS_2_EIGEN` | 2,500 | 25% | 50 |
| `EigenDA_EIGEN` | 2,000 | 20% | 40 |
| `Non-slashable` | 3,500 | 35% | 70 |
| `Total`  | 10,000 | 100% | 200 |

`AVS_1` slashes the Operator for a 50% reduction (`5e17` in `wads`) in the Operator Set `AVS_1_EIGEN`:

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 1,000 | 11% | 20 |
| `AVS_2_EIGEN` | 2,500 | 28% | 50 |
| `EigenDA_EIGEN` | 2,000 | 22% | 40 |
| `Non-slashable` | 3,500 | 39% | 70 |
| `Total` | 9000 | 100% | 180 |

Slashing by one Operator Set does not affect the magnitudes of EIGEN allocated to other Operator Sets. The interactions between
Staker, Operator, AVS, and core contracts are represented in the sequence diagram.

![Sequence Representation of a Slashing](/img/operator-guides/operator-sets-figure-5.png)  
***Figure: Sequence Representation of a Slashing***