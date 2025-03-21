---
sidebar_position: 2
title: Set Programmatic Incentives Split
---

The default [Operator split for Programmatic Incentives (PI) is 10%](../../../eigenlayer/concepts/rewards/pi-split.md).

## Get Current PI Split

To obtain the current PI split, use:

`eigenlayer operator get-pi-split [options]` with

* `operator-address` - Operator address for which to get the operator split

To get the default split at the protocol level, use `eigenlayer operator get-pi-split` without specifying
`operator-address`.

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update PI Split

To update the PI split by Operator, use:

`eigenlayer operator set-pi-split [options]` with

* `operator-address` - Operator address for which to update the PI split
* `operator-split` - Split to set for the Operator in bips