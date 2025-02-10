---
sidebar_position: 4
title: Operator Rewards Configuration
---

# Overview

Before proceeding, please review the [Rewards Overview](/docs/eigenlayer/rewards-claiming/rewards-claiming-overview.md) for background information on how Rewards distributions work.

With the release of Rewards v2 (currently in Testnet), Operators have the ability to configure more aspects of the fees distributed from AVSs. They can set a variable Operator fee rate on rewards (called a "split") that will determine the percentage of rewards they receive vs what goes to the applicable stakers. They can set unique fee rates per AVS and independently for [Programmatic Incentives](https://docs.eigenfoundation.org/programmatic-incentives/programmatic-incentives-faq).

Variable Operator fees per AVS, set by Operators, allows Operators to take less or more than the 10% default fee on rewards.
This keeps EigenLayer fee-agnostic as a protocol and unlocks flexibility via a variable take rate for operators in choosing
which AVS to run and in attracting new stake.

## Variable Operator Split for AVS Rewards

Operators can set their per-AVS fee rate on AVS rewards (called a “split”). The default Operator split is 10%, but an Operator can change this to any amount from 0% to 100% of AVS rewards. Changes to this split take effect after a 7-day activation delay. 

Operators can set their per-AVS fee rate via the EigenLayer CLI with the following commands:

```
# Get the current per-AVS fee rate
eigenlayer-cli operator get-rewards-split --operator-address [operator_address] --avs-address [avs_address] --eth-rpc-url [rpc_endpoint] --network holesky

# Set the current per-AVS fee rate
eigenlayer-cli operator set-rewards-split --operator-address [operator_address] --avs-address [avs_address] --eth-rpc-url [rpc_endpoint] --network holesky --path-to-key-store [path_to_local_operator_ecdsa_keystore.ecdsa.key.json] --operator-split [split in bips] --broadcast
```
Please note the Operator split is denoted in units of bips (basis points). E.g. 1000 = 10%.

Please see [ELIP-001 Variable Operator Fees](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#variable-operator-fees) for more information.

## Operator Splits for Programmatic Incentives

Operators can set their split of Programmatic Incentives to ensure that Operators of all sizes and stakes are rewarded for their participation. The default Operator split of Programmatic Incentives is 10%, but an Operator can change this to any amount from 0% to 100% of Programmatic Incentives. Changes to this split take effect after a 7-day activation delay. The Operator split of Programmatic Incentives can be set independently of the Operator’s split of AVS rewards.

Please see [ELIP-001 Operator Splits for Programmatic Incentives](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#operator-splits-for-programmatic-incentives) for more information.

