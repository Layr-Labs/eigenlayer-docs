---
sidebar_position: 8
title: AVS Rewards
---

## Overview

The EigenLayer Rewards protocol enables AVSs to make rewards to stakers and operators. Operators earn rewards by opting in to AVSs that make `RewardsSubmissions` to the `RewardsCoordinator`, a core protocol contract. Within a single `RewardsSubmission`, an AVS can specify a time range for which the reward will be distributed, a list of weights for each `Strategy` for the reward, and an ERC20 token to give rewards in.  

Operators will earn a flat 10% commission on rewards. The rest of the reward is passed on to the operator's delegated stakers. Rewards are proportional to:
- The amount of stake.
- The AVS's relative weighting of strategies in a rewards submission.

Rewards are calculated via an offchain process. Every week a merkle root is posted which represents the cumulative rewards across all earners. There is an additional 2 hour delay on testnet and 1 week delay on mainnet in order for the root to be claimable against. The deterministic calculation of the distribution of rewards is specified in our [technical docs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md). 

## AVS Integration

The rewards protocol is currently live on testnet. AVSs can make rewards submissions via calling `createAVSRewardsSubmission` on the `RewardsCoordinator` contract. Each rewards submission specifies:  

1. A time range for which the rewards submission is valid. Rewards submissions can be retroactive from the M2 upgrade and last up to 30 days in the future.
2. A list of strategies and multipliers, which enables the AVS to weigh the relative payout to each strategy within a single rewards submission.
3. The ERC20 token in which rewards should be denominated.
Rewards MUST come from an AVSs ServiceManager contract. An example integration can be found [here](https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.0-rc2-holesky-preprod-rewards/src/ServiceManagerBase.sol#L76-L104).  

Integration Notes:
- The rewards passed on to earners are calculated daily. Rewards take 2 days to populate in the daily calculation. For example, if a reward submission was made on August 3rd, it would show up in the August 5th calculation
- Reward roots are posted weekly on mainnet and daily on testnet
- Reward roots are on a 7 day activation delay (ie. when it is claimable against) on mainnet and 2 hour activation delay on testnet
- If the AVS does not have any operators opted into the AVS on a day of an active reward, those tokens are not distributed pro-rata to future days.
- Rewards cannot be clawed back by AVSs.
- Operators will only be distributed rewards on **entire** days that they have opted into the AVS.
- Due to the rounding in the off-chain process, we recommend not making range submission token amounts with more than 15 significant digits of precision. If more than 15 significant digits are provided, the extra precision will be truncated.
- Rewards can be made in multiple ERC-20 tokens by calling `createAVSRewardsSubmission` for each ERC-20 token to reward in.  
- There are several requirements for successfully calling `createAVSRewardsSubmission`. It's recommended to read further details [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v0.3.0-rc3-holesky-preprod-rewards/docs/core/RewardsCoordinator.md#createavsrewardssubmission).

## FAQ

### When are rewards submissions including in daily calculation?

An AVS' reward submission is included in the calculation 2 days after it is submitted. For example, if the AVS submits a rewards submission on August 2nd, it will be included in the August 4th rewards calculation.

### How long will do stakers and operators of my AVS have to wait to claim their rewards?

Worst case, stakers and operators of an AVS will have to wait 16 days to claim a reward (2 day calculation delay + 7 day root submission cadence + 7 day activation delay).

### How can I display the symbol and name of my reward token?

An automated process for this is being finalized. 
