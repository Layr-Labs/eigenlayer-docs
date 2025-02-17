---
sidebar_position: 3
title: Implement Rewards
---

:::important
Before proceeding, review:
* [Rewards concept content](../../eigenlayer/concepts/rewards.md).
* [How operators configure rewards distribution](../../operators/operator-guides/operator-rewards-config.md).
:::

AVSs make rewards submissions by calling `createAVSRewardsSubmission` or `createOperatorDirectedAVSRewardsSubmission()` on 
the `RewardsCoordinator` contract. Rewards must come from an AVSs ServiceManager contract. Each rewards submission specifies:  

1. A time range for which the rewards submission is valid. Rewards submissions can be retroactive from the M2 upgrade and last up to 30 days in the future.
2. A list of strategies and multipliers, which enables the AVS to weigh the relative payout to each strategy within a single rewards submission.
3. The ERC20 token in which rewards should be denominated.

Integration notes:
- Reward roots are posted weekly on Mainnet and daily on Testnet.
- Reward roots are on a 7-day activation delay (that is, when it is claimable against) on Mainnet and 2-hour activation delay on Testnet.
- Reward amounts are calculated based on activity across a 24 hour window. Each window's amounts are cumulative and include `day + (day - 1)`. 
Reward roots are posted weekly on Mainnet based on that day's snapshot date which correlates to a 24 hour window. Mainnet and Testnet are functionally 
equivalent in their calculations. The reward roots are only posted weekly for Mainnet.
- Once a rewards submission is made by an AVS, the AVS is unable to retract those rewards. If the AVS does not have any Operators opted into 
the AVS on a day of an active reward, those tokens are not distributed pro-rata to future days, and are refunded to the AVS. There are two cases where this occurs:
    1. An operator is not registered for the entire duration of the submission. The entire operator amount is refunded to the AVS.
    2. If an operator is only registered for m days out of n days duration. The operator is only paid amount/m on each of those m days.
- Operators are only distributed rewards on days that they have opted into the AVS for the full day.
- Due to the rounding in the off-chain process, we recommend not making range submission token amounts with more than 15 significant digits of precision. 
If more than 15 significant digits are provided, the extra precision is truncated.
- Rewards can be made in multiple ERC-20 tokens by calling `createAVSRewardsSubmission` for each ERC-20 token to reward in.  
- There are several requirements for successfully calling `createAVSRewardsSubmission`. We recommended reading further details [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createavsrewardssubmission).

## When rewards are included

An AVSs reward submission is included in the calculation 2 days after it is submitted. For example, if the AVS submits a 
rewards submission on August 2nd, it is included in the August 4th rewards calculation.

## When rewards can be claimed

At most, Restakers and Operators of an AVS will have to wait 16 days to claim a reward (2 day calculation delay + 7 day root
submission cadence + 7 day activation delay). 

At minimum, Restakers and Operators will have to wait 9 days to claim a reward.