---
sidebar_position: 1
title: Set Rewards Split
---

The default Operator split for rewards is 10%. [The Operator split can be varied by AVS or by Operator Set](../../../eigenlayer/concepts/rewards/rewards-split.md).

## Get Current AVS Rewards Split

To obtain the current AVS rewards split, use:

`eigenlayer operator get-rewards-split [options]` with:

* `avs-address` - AVS address for which to get the operator split
* `operator-address` - Operator address for which to get the operator split

To get the default split at the protocol level, use `eigenlayer operator get-rewards-split` without specifying `avs-address`
or `operator-address`.

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update AVS Rewards Split

To update the AVS rewards split, use:

`eigenlayer operator set-rewards-split [options]` with:
* `avs-address` - AVS address for which to update the Operator split
* `operator-address` - Operator address for which to update the Operator Set split
* `operator-split` - Split to set for the Operator in bips for the specified AVS

Changes to the Rewards split take effect after a 7-day activation delay. Only one split can be pending.  That is, any pending
Rewards split must be completed before setting a new Rewards split.

## Get Current Operator Set Rewards Split

To obtain the current Operator Set rewards split, use:

`eigenlayer operator get-operatorset-split [options]` with:

* `avs-address` - AVS address for which to get the operator split
* `operator-address` - Operator address for which to get the operator split
* `operatorset-id` - Operator Set ID for which to get the split

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update Operator Set Rewards Split

To update the Operator Set rewards split, use:

`eigenlayer operator set-operatorset-split [options]` with
* `avs-address` - AVS address for which to update the Operator Set split
* `operator-address` - Operator address for which to update the Operator Set split
* `operatorset-id` - Operator Set ID for which to update the split
* `operator-split` - Split to set for the Operator in bips for the specified Operator Set

Changes to the Rewards split take effect after a 7-day activation delay. Only one split can be pending.  That is, any pending
Rewards split must be completed before setting a new Rewards split. 
