---
sidebar_position: 3
title: Magnitudes when Slashed
---

:::tip
If you're new to slashing in EigenLayer, make sure you're familiar with [Operator Sets](../operator-sets/operator-sets-concept.md)
and [Strategies and Magnitudes](../operator-sets/strategies-and-magnitudes.md) before continuing with this topic.
:::

When implementing slashing, AVSs specify:
* Individual Operator
* [Operator Set](../operator-sets/operator-sets-concept.md)
* [List of Strategies](../operator-sets/strategies-and-magnitudes)
* [List of proportions (as `wads` or “parts per `1e18`”)](../operator-sets/strategies-and-magnitudes)
* Description.

For all Strategies specified, the Operator’s allocations to that Operator Set are slashed by the corresponding proportion 
while maintaining their nominal allocations to all other Operator Sets. Maintaining nominal allocations is achieved by 
subtracting the allocated magnitude from both the specified Operator Set, and the Operator’s Total Magnitude.

Slashing proportionally reduces funds of all Stakers of the given Strategies that are delegated to the Operator, including funds
in queued deallocations and withdrawals (that haven’t passed [`WITHDRAWAL_DELAY`](../../reference/safety-delays-reference.md)). Operator delegation is decreased for each Strategy. 
Changes are propagated to Stakers by referring to their delegated Operator’s Total Magnitude.

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

Slashing by one Operator Set does not affect the magnitudes of EIGEN allocated to other Operator Sets.