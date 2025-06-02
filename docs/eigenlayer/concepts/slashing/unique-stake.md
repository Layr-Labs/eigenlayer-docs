---
sidebar_position: 2
title: Unique Stake
---

Unique Stake ensures AVSs and Operators maintain key safety properties when handling staked security and slashing on EigenLayer. 
Unique Stake is allocated to different [Operator Sets](../operator-sets/operator-sets-concept) on an opt-in basis by Operators. Only Unique Stake is slashable by AVSs, 
and the Unique Stake represents proportions of the Operator’s delegated stake from Stakers. Unique Stake allocations are 
exclusive to one Operator Set and solely slashable by the AVS that created that Operator Set.

Benefits of Unique Stake to Operators and AVSs include:
* Greater control over slashing risk. The risk of slashing is isolated to the individual AVS and Operator Set, and Operators 
control how much of their stake any AVS can slash. AVSs are not exposed to risk from other AVSs or their slashings.
* Guaranteed slashable stake. AVSs can understand the amount of Unique Stake that can be slashed at a given time across their Operator Sets.
* Permissionless onboarding of AVSs. There is no need for a common veto committee because slashing is localized to individual AVSs. 
No need for a common veto committee means launching an AVS on EigenLayer is permissionless.

## Example 1

Operator 1 has a delegation of 100 staked ETH. Operator 1 allocates proportions of that ETH as Unique Stake in Operator Sets 
across several AVSs. The 85 allocated ETH is slashable exclusively by the AVS for each Operator Set. That is, AVS 2, 3, and 4 
can slash their associated Operator Sets 3, 4, 5, and 6 respectively.

<img src="/img/operator-guides/operator-sets-figure-3.png" width="75%" style={{ margin: '50px'}}>
</img>

## Example 2

AVS 1 has two Operator Sets for different tasks. AVS 1 uses Operator Set 1 for assigning generation of ZK proofs to Operators, 
an expensive computation, and Operator Set 2 for verification of those proofs, a cheaper computation.

Operator 1 is registered to Operator Set 1 but has not allocated any Unique Stake. Operator 2 has allocated 10% of its ETH
delegation to Operator Set 1 (10 ETH). The 10% allocation by Operator 2  is exclusively slashable by AVS 1 in Operator Set 1. 
Operator 2 has also allocated 5% (5 ETH) to Operator Set 2, which is exclusively slashable by AVS 1 in Operator Set 2.

Including the 20% allocation from Operate 3 (20 ETH), Operator Set 1 has a total Unique Stake of 30 ETH available to slash. 
The Unique Stake of 30 ETH cannot be slashed elsewhere. Operator Set 2 has allocations totalling 15 ETH of Unique Stake. 
The Unique Stake of 15 ETH cannot be slashed elsewhere. AVS 1 may distribute more valuable tasks against which to reward and 
slash to Operator Set 1 to take advantage of the greater amount of Unique Stake.

<img src="/img/operator-guides/operator-sets-figure-4.png" width="75%" style={{ margin: '50px'}}>
</img>