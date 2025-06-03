---
sidebar_position: 5
title: Submit Rewards Submissions
---

:::important
`RewardsCoordinator.createAVSRewardsSubmission` and `RewardsCoordinator.createOperatorDirectedAVSRewardsSubmission` use AVSDirectory. 
The AVSDirectory method will be deprecated in a future upgrade. [All AVSs will need to migrate to Operator Sets before the upcoming deprecation of AVSDirectory](operator-sets/migrate-to-operatorsets.md).

If you are currently using AVSDirectory, `RewardsCoordinator.createAVSRewardsSubmission` and `RewardsCoordinator.createOperatorDirectedAVSRewardsSubmission` can continue to be used while AVSDirectory is being used.
:::

For information on Rewards concepts, refer to [Rewards Overview](../../../eigenlayer/concepts/rewards/rewards-concept.md).

Submitting rewards for an AVS is handled by the [RewardsCoorinator core contract](../../Concepts/eigenlayer-contracts/core-contracts.md).

To submit rewards submissions, use [`RewardsCoordinator.createOperatorDirectedOperatorSetRewardsSubmission`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createoperatordirectedoperatorsetrewardssubmission).

An AVS can use onchain or offchain data in rewards logic to determine the reward amount per Operator. The rewards can be calculated 
based on the work performed by Operators during a certain period of time, can be a flat reward rate, or another structure based on 
the AVS’s economic model. An AVS can distribute rewards in any ERC20 token.

For more flexibility, an AVS can submit multiple performance-based Operator rewards denominated in different tokens.

:::note
The reward rate for Stakers is based on the amount of stake delegated to an Operator and does not change based on the 
rewards calculation per Operator by the AVS.
:::

## Implementation Notes 

Each rewards submission specifies:

* Time range for which the rewards submission is valid. Rewards submissions can be retroactive from the [M2 upgrade](https://github.com/Layr-Labs/eigenlayer-contracts/releases/tag/v0.2.3-mainnet-m2)
  and last up to 30 days in the future.
* List of strategies and multipliers that enables the AVS to weigh the relative payout to each strategy within a single rewards submission.
* ERC20 token in which rewards should be denominated.

Additional considerations: 

* Reward roots are posted weekly on Mainnet and daily on Testnet.
* Reward roots are on a 7-day activation delay (that is, when it is claimable against) on Mainnet and 2-hour activation delay on Testnet.
* Reward amounts are calculated based on activity across a 24 hour window. Each window's amounts are cumulative and include day + (day - 1). 
  Reward roots are posted weekly on Mainnet based on that day's snapshot date which correlates to a 24 hour window. Mainnet and Testnet are 
  functionally equivalent in their calculations. The reward roots are only posted weekly for Mainnet.
* Once a rewards submission is made by an AVS, the AVS is unable to retract those rewards. If the AVS does not have any Operators opted 
  into the AVS on a day of an active reward, those tokens are not distributed pro-rata to future days, and are refunded to the AVS. 
  There are two cases where this occurs:
    * An operator is not registered for the entire duration of the submission. The entire operator amount is refunded to the AVS.
    * If an operator is only registered for m days out of n days duration. The operator is only paid amount/m on each of those m days.
* Operators are only distributed rewards on days that they have opted into the AVS for the full day.
* Due to the rounding in the off-chain process, we recommend not making range submission token amounts with more than 15 significant digits of precision. 
  If more than 15 significant digits are provided, the extra precision is truncated.
* Rewards can be made in multiple ERC-20 tokens by submitting rewards submissions for each ERC-20 token to reward in.

## When Rewards are Included
An AVSs reward submission is included in the calculation 2 days after it is submitted. For example, if the AVS submits a 
rewards submission on August 2nd, it is included in the August 4th rewards calculation.

## When Rewards can be Claimed
At most, Restakers and Operators of an AVS will have to wait 16 days to claim a reward (2 day calculation delay + 7 day root 
submission cadence + 7 day activation delay).

At minimum, Restakers and Operators have to wait 9 days to claim a reward.

