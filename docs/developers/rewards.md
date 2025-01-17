---
sidebar_position: 8
title: AVS Rewards
---

## Overview

Before proceeding, please review the [Rewards Overview](/docs/eigenlayer/rewards-claiming/rewards-claiming-overview.md) for background information on how Rewards distributions work.


## Operator Directed Rewards

With the release of Rewards v2, AVSs have the flexibility to set custom logic for rewards to individual Operators, based on work completed or anything else they may design or desire (e.g., more equal distribution of operator support for decentralization or security reasons). Variable Operator fees per AVS, set by Operators, allows Operators to take less or more than the 10% default fee on rewards. This keeps EigenLayer fee-agnostic as a protocol and unlocks flexibility via a variable take rate for operators in choosing which AVS to run and in attracting new stake.

Please see [ELIP-001 Operator Directed Rewards](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md#distribution-of-operator-directed-rewards) for more information.


## AVS Integration

AVSs can make rewards submissions via calling `createAVSRewardsSubmission` or `createOperatorDirectedAVSRewardsSubmission()` on the `RewardsCoordinator` contract. Each rewards submission specifies:  

1. A time range for which the rewards submission is valid. Rewards submissions can be retroactive from the M2 upgrade and last up to 30 days in the future.
2. A list of strategies and multipliers, which enables the AVS to weigh the relative payout to each strategy within a single rewards submission.
3. The ERC20 token in which rewards should be denominated.
4. Rewards MUST come from an AVSs ServiceManager contract.

Integration Notes:
- Reward roots are posted **weekly** on Mainnet and **daily** on Testnet.
- Reward roots are on a 7-day activation delay (ie. when it is claimable against) on Mainnet and 2-hour activation delay on Testnet.
- Reward amounts are calculated based on activity across a 24 hour window. Each window's amounts are cumulative and include `day + (day - 1)`. Reward roots are posted weekly on Mainnet based on that day's snapshot date which will correlate to a 24 hour window. Mainnet and Testnet are functionally equivalent in their calculations, however the reward roots are only posted weekly for Mainnet.
- Once a rewards submission is made by an AVS, the AVS is unable to retract those rewards. However, if the AVS does not have any operators opted into the AVS on a day of an active reward, those tokens are not distributed pro-rata to future days and are instead refunded to the AVS. There are two cases where this may happen:
    1. An operator is not registered for the entire duration of the submission. In this case the entire operator amount is refunded to the AVS.
    2. If an operator is only registered for m days out of n days duration. Then the operator is only paid amount/m on each of those m days.
- Operators will only be distributed rewards on days that they have opted into the AVS for the full day.
- Due to the rounding in the off-chain process, we recommend not making range submission token amounts with more than 15 significant digits of precision. If more than 15 significant digits are provided, the extra precision will be truncated.
- Rewards can be made in multiple ERC-20 tokens by calling `createAVSRewardsSubmission` for each ERC-20 token to reward in.  
- There are several requirements for successfully calling `createAVSRewardsSubmission`. It's recommended to read further details [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createavsrewardssubmission).

## FAQ

### When are rewards submissions included in daily calculation?

An AVS' reward submission is included in the calculation 2 days after it is submitted. For example, if the AVS submits a rewards submission on August 2nd, it will be included in the August 4th rewards calculation.

### How long will stakers and operators of my AVS have to wait to claim their rewards?

At most Restakers and Operators of an AVS will have to wait 16 days to claim a reward (2 day calculation delay + 7 day root submission cadence + 7 day activation delay). At minimum Restakers and Operators will have to wait 9 days to claim a reward.

