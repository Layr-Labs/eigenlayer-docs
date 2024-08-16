---
sidebar_position: 2
title: Rewards Claiming FAQ
---



### When can I claim my rewards?

After a root is posted, rewards are claimable after an activation delay. On mainnet this delay is 1 week and on testnet it is 2 hours.

### What portion of rewards goes to my operator?

Operators get a fixed 10% portion rewards, though this is subject to change in a future release to be variable.

### How can I receive rewards on testnet?

To accumulate rewards on testnet for testing purposes you must be an operator (or delegate to one) who has opted into an AVS with active rewards. EigenDA is one such AVS.

### Are reward distributions based on the amount of work performed by an operator, the Operator's total delegated stake or both?

The current rewards calculation assumes that work done is directly proportional to stake; therefore, rewards are distributed proportional to stake. If an operator does not perform the tasks expected of it, the AVS should eject or "churn" the operator (which we have examples for in our middleware contracts).

### Will the AVS Rewards be distributed using the same ERC20 token used to Stake / Operate (opt-in) to the AVS?

An AVS can distribute any token it chooses for each week's [RewardSubmission](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createavsrewardssubmission). These Reward Token(s) can be different from the list of Strategies (assets) that were originally staked, delegated and opted into the Restaker, Operator, and AVS.

For examples Restakers could delegate stETH (lido eth) to an Operator. The Operator could opt in to the AVS quorum with stETH strategy. Then a week later the AVS could pay rewards in rETH (rocketpool) eth. The decision is entirely up to to the AVS to determine.