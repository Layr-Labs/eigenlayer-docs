---
sidebar_position: 1
title: Rewards Claiming Overview
---

# Rewards Overview

## Overview

The EigenLayer Rewards protocol enables AVSs to make rewards to stakers and operators. Operators earn rewards by opting in to AVSs that make `RewardsSubmissions` to the `RewardsCoordinator`, a core protocol contract. Within a single `RewardsSubmission`,  an AVS can specify a time range for which the reward will be distributed, a list of weights for each `Strategy` for the reward, and an ERC20 token to make rewards in.

By default, Operators will earn a flat 10% split on rewards. The rest of the reward is claimable bythe operator's delegated Stakers. Rewards are proportional to:
- The amount of stake.
- The AVS's relative weighting of strategies in a rewards submission.


## Rewards v2 (currently in Tesnet)

The EigenLayer Improvement Proposal (ELIP-001) outlines enhancements to the rewards system under the Rewards v2 framework. These enhancements focus on these key areas:
1. Operator Directed Rewards: AVSs can now direct performance-based rewards to specific Operators using custom logic. This allows rewards to be distributed based on work completion, quality or other parameters determined by the AVS, allowing flexible and tailored incentives. Operators registered to AVSs for the specified duration are eligible. This approach enables customization and diverse reward mechanisms that can be attributed on chain, aligning incentives with Operator contributions.
2. Variable Operator Fees for AVS Rewards: Operators can now set their per-AVS fee rate on AVS rewards to any amount from 0% to 100%, deviating from the 10% default split. Changes to this split take effect after a 7-day activation delay. The ability to set a variable split per-AVS allows Operators to align their fee structures with their economic needs and the complexity and diversity of AVS demands.
3. Variable Operator Splits for Programmatic Incentives: Operators can set their split of Programmatic Incentives to any amount from 0% to 100%, so that Operatorators have flexibility in determining the appropriate take rate. Changes to this split take effect after a 7-day activation delay. These splits integrate seamlessly with the existing reward distribution model, ensuring that stakers delegating to Operators benefit proportionately.
4. Batch rewards claiming for stakers and Operators, allowing a gas efficient way to claim on behalf of multiple earners in a single transaction.  

Please see the [EigenLayer Improvement Proposal-001: Rewards v2](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#executive-summary) for more detail.


## Rewards Contract Configurations

### Earners 
Operators and Stakers are both categorized as "Earners" when it comes to claiming and are distinct by their addresses. Actual reward calculations are explained further in the [technical docs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md). To summarize, reward calculations are performed daily by snapshotting the on chain state. Once a week on mainnet and daily on testnet, a Merkle root is posted to the contract that allows earners to claim their updated earnings.



### Setting Designated Claimers
Earners (Stakers and Operators) can set a claimer address that can claim rewards for the tokens they've earned. An Earner is its own claimer by default and only the claimer address can claim rewards. If a new claimer is set, the new address can claim all of the previously unclaimed rewards. The Earner can always change their designated claimer address.  

Note: Earners or their designated claimers do not have to claim weekly against every single Merkle root to receive all their earnings up to that point. Earnings are calculated cumulatively so simply claiming one time against the latest Merkle root posted on the `RewardsCoordinator` contract will reward them with all their cumulative earnings even if there were several roots posted to the contract that were not claimed against.

### Rewards Recipient Address
Not to be confused with the designated claimer address specified above, the recipient address is the address that will receive the ERC20 token rewards. The designated claimer (or the Earner themselves) has the ability to call `RewardsCoordinator.processClaim` for the Earner while also specifying a recipient address to receive all the rewards.

## Reward Calculations

Rewards are calculated via an offchain process. A Merkle root is posted which represents the cumulative rewards across all earners weekly on Mainnet and daily on Testnet. There is an additional 2 hour delay on testnet and 1 week delay on mainnet after posting in order for the root to be claimable against with a valid Merkle proof. The deterministic calculation of the distribution of rewards is specified in our [technical docs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md). 



## AVS Integrations
Please refer to [AVS Guide: AVS Rewards](/docs/developers/rewards.md) for complete instructions.
