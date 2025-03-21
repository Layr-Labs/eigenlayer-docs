---
sidebar_position: 1
title: Set Rewards Split
---

The default Operator split for rewards is 10%. [The Operator split can be varied by AVS or by Operator Set](../../../eigenlayer/concepts/rewards/rewards-split.md).

## Get Current Rewards Split

To obtain the current rewards split, use:

`eigenlayer operator get-rewards-split [options]` with:

* `avs-address` - AVS address for which to get the operator split
* `operator-address` - Operator address for which to get the operator split

To get the default split at the protocol level, use `eigenlayer operator get-rewards-split` without specifying `avs-address`
or `operator-address`.

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update Rewards Split by AVS

To update the rewards split by AVS, use:

`eigenlayer operator set-rewards-split [options]` with:
* `avs-address` - AVS address for which to update the Operator split
* `operator-split` - Split to set for the Operator in bips for the specified AVS

## Update Rewards Split by Operator Set

To update the rewards split by Operator Set, use:

`eigenlayer operator set-rewards-split [options]` with
* `avs-address` - AVS address for which to update the operator split
*  TODO - add option to specify Operator Set. Question in Slack.
* `operator-split` - Split to set for the Operator in bips for the specified Operator Set

Changes to the Rewards split take effect after a 7-day activation delay. Only one split can be pending.  That is, any pending
Rewards split must be completed before setting a new Rewards split. 
