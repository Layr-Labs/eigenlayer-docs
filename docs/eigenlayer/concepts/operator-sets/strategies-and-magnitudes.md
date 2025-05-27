---
sidebar_position: 4
title: Strategies and Magnitudes
---

:::note

[ELIP-002 Slashing via Unique Stake & Operator Sets](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md) introduced Operator Sets.

:::

Magnitudes are the accounting tool used to track Operator allocations to [Operator Sets](operator-sets-concept). Magnitudes represent proportions 
of an Operator’s delegations for a specific Strategy.

Strategies are the accounting tool used to track Stakers deposited assets. Strategies are expressions of security on EigenLayer. 
For example, a strategy may represent a specific token.

For each Strategy:
* An Operator starts with a protocol-defined Total Magnitude of 1x10^18 (`INITIAL_TOTAL_MAGNITUDE`).
* The sum of all of an Operator’s Magnitudes cannot exceed the `INITIAL_TOTAL_MAGNITUDE`.
* The protocol consistently decreases the Strategy’s total magnitude for the slashed Operator to account for slashing events originated by an AVS.

The proportion of an Operator’s delegation assigned as Unique Stake to an Operator Set is equal to the magnitude allocated 
to that Operator Set divided by the Operator’s Total Magnitude. The sum of all magnitude allocations never being greater 
than the Total Magnitude ensures the property of Unique Stake. That is, ensures that no two Operator Sets can slash the same stake.

## Example

The table displays an example of an Operator Magnitude allocation for the EIGEN Strategy. The table represents slashable 
and non-slashable stake by Operator Set.

For legibility, the example uses a total magnitude of 10,000 instead of 1x1018.

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 3,000 | 30% | 30 |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 2,500 | 25% | 25 |
| `Total` | 10,000 | 100% | 100 |

The Operator deallocates 10 EIGEN to AVS_1_EIGEN. The following is the result and the non-slashable stake increases. 

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 20 |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 3,500 | 35% | 35 |
| `Total`  | 10,000 | 100% | 100 |

A Staker who has delegated to the Operator deposits 100 EIGEN. The following is the results and Magnitudes and proportions 
stay the same and the EIGEN for each Operator Set increases. 

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 40 |
| `AVS_2_EIGEN` | 2,500 | 25% | 50 |
| `EigenDA_EIGEN` | 2,000 | 20% | 40 |
| `Non-slashable` | 3,500 | 35% | 70 |
| `Total`  | 10,000 | 100% | 200 |

For information on how magnitudes are reduced when slashed, refer to [Magnitudes when Slashed](../slashing/magnitudes-when-slashed.md).