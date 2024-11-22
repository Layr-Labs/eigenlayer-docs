---
sidebar_position: 2
title: Rewards Claiming FAQ
---



### When can I claim my rewards?

After a root is posted, rewards are claimable after an activation delay. On mainnet this delay is 1 week and on testnet it is 2 hours.

### What portion of rewards goes to my operator?

Operators get a fixed 10% portion rewards, though this is subject to change in a future release to be variable.

### How can I test reward distributions and claiming on testnet?

To accumulate rewards on testnet for testing purposes you must be an operator (or delegate to one) who has opted into an AVS with active rewards. AVSs that currently distribute rewards on testnet include:
- EigenDA.
- [Faucet AVS](https://holesky.etherscan.io/address/0xfd942824562d21b372926fCbe8D67189A812099a).

### Are reward distributions based on the amount of work performed by an operator, the Operator's total delegated stake or both?

The current rewards calculation assumes that work done is directly proportional to stake; therefore, rewards are distributed proportional to stake. If an operator does not perform the tasks expected of it, the AVS should eject or "churn" the operator (which we have examples for in our middleware contracts).

### Will the AVS Rewards be distributed using the same ERC20 token used to Stake / Operate (opt-in to) the AVS?

An AVS can distribute any ERC-20 token it chooses in a [RewardSubmission](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#createavsrewardssubmission). These reward token(s) can be different from the list of Strategies (assets) that were originally staked, delegated and opted into by the Restaker, Operator, and AVS.

For example, Restakers could delegate stETH (lido eth) to an Operator. The Operator could opt in to an AVS with the stETH strategy. Then a week later the AVS could pay rewards in USDC. The decision of which ERC20 token to reward to a Strategy is entirely up to the AVS to determine.

### How is the APR calculated?

The UI shows up to a 7-day averaged APR for a given strategy. Due to the 2 day calculation delay, neither APR nor accrual of rewards can be observed until 2 days after a user has restaked and delegated qualifying assets to an Operator that is earning rewards. The APR is given by the following equation:

$$
\frac{E_{\text{earned}, s}}{\sum_{7 \ \text{days}}E_{\text staked, s}}*365\ \text{days}
$$

That is, $$ E_{\text{earned}, s} $$ is the ETH value of all reward tokens earned over the past 7 days from restaking strategy $$ s $$. 
$$ E_{\text staked, s} $$ is the ETH value of tokens staked in restaked strategy $$ s $$ on a given day, excluding any days in which no reward is earned.

ETH values are calculated using the latest price feeds sourced from Coingecko. Reward tokens that do not have a public price available from Coingecko are not included in the calculation. APR is not calculated for staked tokens that do not have a public price available from Coingecko.
