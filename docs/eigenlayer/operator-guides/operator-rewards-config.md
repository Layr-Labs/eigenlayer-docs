---
sidebar_position: 3
title: Operator Rewards Configuration
---

# Overview

Before proceeding, please review the [Rewards Overview](/docs/eigenlayer/rewards-claiming/rewards-claiming-overview.md) for background information on how Rewards distributions work.

With the release of Rewards v2 (currently in Testnet) Operators have the ability to configure more aspects of the fees they earn. They can set variable Operator fee rate (aka "split") that will determine which portion they retain and which portion goes to their delegated Restakers. They can set unique fee rates per AVS and per Programmatic Incentives from the EigenFoundation.


## Variable Operator Fees

Operators can set their per-AVS reward fee (called a “split”). This is between 0% or 100% of AVS rewards. It’s valid after a 7-day activation delay. If they don’t set it, it will remain at the default of 10%. 

The Operators can set their per-AVS reward fee via the EigenLayer CLI with the following commands:
```
// todo add George's code or instructions here
```

Please see [ELIP-001 Variable Operator Fees](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#variable-operator-fees) for more information.

## Operator Splits for Programmatic Incentives

Eigen Foundation Programmatic Incentives have a default Operator split of 10% with a variable split to ensure operators of all sizes and stakes are rewarded for their participation. It’s valid after a 7-day activation delay. It can be set independently of other AVSs, with the same reward distribution dynamics for operator-delegated stakers as v2 rewards.

Please see [ELIP-001 Operator Splits for Programmatic Incentives](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#operator-splits-for-programmatic-incentives) for more information.

```
// todo add George's code or instructions here
```