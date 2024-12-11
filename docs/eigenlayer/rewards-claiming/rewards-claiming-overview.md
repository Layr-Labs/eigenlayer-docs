---
sidebar_position: 1
title: Rewards Claiming Overview
---

# Rewards Overview

## Overview

The EigenLayer Rewards protocol enables AVSs to make rewards to stakers and operators. Operators earn rewards by opting in to AVSs that make `RewardsSubmissions` to the `RewardsCoordinator`, a core protocol contract. Within a single `RewardsSubmission`, an AVS can specify a time range for which the reward will be distributed, a list of weights for each `Strategy` for the reward, and an ERC20 token to make rewards in.  

By default, Operators will earn a flat 10% commission on rewards. The rest of the reward is passed on to the operator's delegated Restakers. Rewards are proportional to:
- The amount of stake.
- The AVS's relative weighting of strategies in a rewards submission.


## Rewards v2 (currently in Tesnet)

Rewards v2 addresses key challenges identified in the EigenLayer Rewards MVP (v1), particularly the need for operator-directed rewards via external logic and flexibility for operators in setting different fee rates to better cover operating costs or attract more stake when running different AVS types. Rewards v2 adds the following use cases:
- Operator-directed rewards from AVSs, allowing AVSs to segment and reward specific operators. This gives AVSs the flexibility to set custom logic for rewards to individual operators, based on work completed or anything else they may design or desire (e.g., more equal distribution of operator support for decentralization or security reasons).
  - Variable operator fee per AVS, set by the operators, allowing operators to take less or more than the 10% default fee on rewards. This keeps EigenLayer fee-agnostic as a protocol and unlocks flexibility via a variable take rate for operators in choosing which AVS to run and in attracting new stake.
  - This also better serves integrated staker-operators like LRTs by allowing them to streamline their reward-claiming process, and unlocks more flexibility in programmatically splitting rewards, which may enable new use cases.
- Batch rewards claiming for stakers and operators, allowing a gas efficient way to claim on behalf of multiple earners in a single transaction.

Please see the [EigenLayer Improvement Proposal-001: Rewards v2](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#executive-summary) for more detail.


## Rewards Contract Configurations

### Earners 
Operators and Stakers are both categorized as "Earners" when it comes to claiming and are distinct by their addresses. Actual reward calculations are explained further in the [technical docs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md). To summarize, reward calculations are performed daily by snapshotting the on-chain state. Once a week on mainnet and daily on testnet, a Merkle root is posted to the contract that allows earners to claim their updated earnings.



### Setting Designated Claimers
Reward Earners (Stakers and Operators) can set a claimer address that can claim rewards for the tokens they've earned. An Earner is its own claimer by default and only the claimer address can claim rewards. If a new claimer is set, the new address can claim all of the previously unclaimed rewards. The earner can always configure their designated claimer address.


Note: Earners or their designated claimers do not have to claim weekly against every single Merkle root to receive all their earnings up to that point. Earnings are calculated cumulatively so simply claiming one time against the latest Merkle root posted on the `RewardsCoordinator` contract will reward them with all their cumulative earnings even if there was several roots posted to the contract that were not claimed against.

### Rewards Recipient Address
Not to be confused with the designated claimer address specified above, the recipient address is the address that will receive the ERC20 token rewards. The designated claimer (or the earner themselves) has the ability to call `RewardsCoordinator.processClaim` for the earner while also specifying a recipient address to receive all the rewards.

## Reward Calculations

Rewards are calculated via an offchain process. A merkle root is posted which represents the cumulative rewards across all earners weekly on Mainnet and daily on Testnet. There is an additional 2 hour delay on testnet and 1 week delay on mainnet after posting in order for the root to be claimable against with a valid merkle proof. The deterministic calculation of the distribution of rewards is specified in our [technical docs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md). 



## AVS Integrations
Please refer to [AVS Guide: AVS Rewards](/docs/developers/rewards.md) for complete instructions.
