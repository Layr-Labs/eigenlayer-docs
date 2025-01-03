---
sidebar_position: 1
title: Economy Calculation and Formulas
---

## Overview

EigenLayer strives to do its best and provide legibility and transparency to users.

Therefore, we built a website to show the critical metrics of the network, metrics that we deem
important for users to understand the protocol and its performance. Please see the Eigen Economy site at **[economy.eigenlayer.xyz](https://economy.eigenlayer.xyz/)**.


## Data Quality and Reconciliation

As a foundation to showcase EigenLayer's economy, we provide the best data quality possible by indexing data from Ethereum directly and reconciling each data point with other independent sources to guarantee the most accurate and up-to-date information.


## Data Freshness

Please refer to each metric below for their data freshness.


## Economy Metrics


### ETH TVL / EIGEN TVL / Total TVL in USD

Definition: Dollar value of total assets staked/restaked in EigenLayer, including all ETH (LSTs and native ETH), EIGEN tokens, and all other permissionless assets restaked.

Formula:

1. For all strategies' TVL in EigenLayer, except the beacon strategy (aka, native-ETH strategy) and EIGEN strategy:

- Index strategies in EigenLayer from all `StrategyAddedToDepositWhitelist` events minus `StrategyRemovedFromDepositWhitelist` events from the `StrategyManager` contract, which will include all strategies except the beacon strategy.
- For each strategy in EigenLayer, get their underlying tokens.
- Convert underlying tokens to token amounts via token decimals, `token amount = underlying token / power(10, token decimals)`.
- Multiply token amounts by the corresponding token's pricing from Coingecko, and sum them up.
    - Note that some tokens may lack pricing data on Coingecko; these will be excluded from the TVL in USD calculation.


2. For the beacon strategy:

- Index all `PodDeployed` events from the `EigenPodManager` contract.
- For each EigenPod, query the beacon chain to check which validators have pointed their withdrawal credentials to the pod.
    - Withdrawal credentials will be of the format: `0x010000000000000000000000 + <eigen_pod_address>`
    - Note: Multiple validator withdrawal credentials can point to a single EigenPod.
- For each EigenPod, get all its validators' ETH balance
- Sum up all validators balance, multiply by ETH pricing from Coingecko

- Note:
    - This approach is also [adopted by defillama](https://github.com/DefiLlama/DefiLlama-Adapters/blob/1e921c7ab6684500cfd73b6890713f495ba28f2a/projects/eigenlayer/index.js#L13)     
    - We will consider in the future to switch to use [EigenPod Upgrade](https://www.blog.eigenlayer.xyz/introducing-the-eigenpod-upgrade/) native data, to remove dependency on beacon chain data and be more close to rest strategies


3. For EIGEN strategy:

Follow the same steps in 1, with exception that EIGEN strategy is backed by bEIGEN (Backing EIGEN) token instead of
EIGEN token.
Coingecko only provides EIGEN token pricing, so we need to use EIGEN token pricing multiply by bEIGEN token amounts
to calculate TVL in USD for EIGEN strategy.


4. Sum up above 3 values to get the total TVL in USD for EigenLayer, or use them separately for ETH TVL and EIGEN TVL


Data Sources: Ethereum events, ERC20 contracts, Beacon Chain data, Coingecko
Data Fresh Frequency: Every 1 hour



### # of Restakers¹

Definition: Number of addresses staked/restaked in EigenLayer

Formula:

- Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from `DelegationManager` contract.
- Calculate delegation balance for each staker.
- Count # of unique stakers who has non-zero balance on at least 1 strategy.

Data Sources: Ethereum events
Data Fresh Frequency: Every 1 hour


### # of EIGEN Holders

Definition: Number of unique addresses that hold EIGEN tokens.

Formula:

- Index all `Transfer` events from EIGEN token contract.
- Calculate EIGEN token balance for each wallet address.
- Count # of unique addresses that have non-zero EIGEN token balance.

Data Sources: Ethereum events
Data Fresh Frequency: Every 1 hour



### % of ETH Restaked

Definition: Percentage of total ETH that is restaked, out of ETH circulating supply.

Formula:

- Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from `DelegationManager` contract.
- Calculate total delegated ETH amount for all ETH strategies, by convert shares to underlying tokens by strategy's ratio of shares to underlying token, then convert underlying tokens amount to tokens amount with token decimals `token amount = underlying token / 1e18`.
- Divide total delegated ETH amount by ETH circulating supply from Coingecko.

Data Sources: Ethereum events, Coingecko
Data Fresh Frequency: Every 1 hour



### % of circulating EIGEN staked

Definition: Percentage of circulating supply of EIGEN that is staked. This excludes locked tokens that are staked.

Formula:

 Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from `DelegationManager` contract.
- Calculate total delegated EIGEN amount for EIGEN strategy, by converting shares amount to underlying tokens amount as 1:1, then convert underlying tokens amount to tokens amount with token decimals `token amount = underlying token / 1e18`.
- Subtract the amount of locked tokens that are staked from the total delegated EIGEN amount.
- Divide the adjusted EIGEN amount by EIGEN circulating supply from Coingecko.

Data Sources: Ethereum events, Coingecko
Data Fresh Frequency: Every 1 hour



### Total Rewards Earned

Definition: Dollar value of total rewards earned in EigenLayer.

Formula:

- Index all `AVSRewardsSubmissionCreated` and `RewardsSubmissionForAllEarnersCreated` events from the `RewardsCoordinator` contract.
- For each rewards submission, get the token amount by converting `amount` with the reward token decimals.
- Multiply the token amount by the corresponding token's pricing from Coingecko, and sum them up.

Data Sources: Ethereum events, ERC20 contracts, Coingecko
Data Fresh Frequency: Every 1 hour



### Total AVS FDV

Definition: US Dollar value of all AVS Token FDVs

Note: EIGEN is not counted in the AVS FDV calculation.

Formula: 

- Retrieve tokens from all Mainnet AVSs that have an associated token.
- For each token, obtain its FDV (Fully Diluted Valuation) from Coingecko.
- Sum up the FDVs of all tokens to get the total AVS FDV.

Data Sources: Coingecko
Data Fresh Frequency: Every 1 hour



### Restakers Funnel

Definition: The funnel of restakers in EigenLayer, which includes the number of restakers who restaked (delegated) more than \$1M, \$50M, and \$100M cumulatively.

Formula:

- Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from the `DelegationManager` contract.
- For each restaker, get their delegated shares amount to date, convert shares to underlying tokens by strategy's ratio of shares to underlying token, then convert to tokens amount via token decimals, then convert to USD amount by multiplying with the corresponding token pricing from Coingecko.
- Sum up all USD value of delegated tokens for each restaker, count them by \$1M, \$50M, and \$100M thresholds.
- Cumulate thresholds, meaning the number of restakers who delegated more than \$1M includes that of who delegated more than \$50M and \$100M, the number of restakers who delegated more than \$50M includes that of who delegated more than \$100M.

Data Sources: Ethereum events, ERC20 contracts, Coingecko.
Data Fresh Frequency: Every 1 hour.



### Operators Funnel

Definition: The funnel of operators in EigenLayer, which includes the number of operators who:
 1. Registers on EigenLayer.
 2. Are active (registers to at least one AVS on EigenLayer with delegated shares larger than 0 in ETH or EIGEN strategies) on EigenLayer.
 3. Have earned rewards.


Formula:

- `Registered Operators`: Index `OperatorMetadataURIUpdated` event from the `AVSDirectory` contract, count the number of unique operator addresses registered
- `Active Operators`:
    - Index `OperatorAVSRegistrationStatus` event from the `AVSDirectory` contract, count the number of unique operator addresses who are registered to at least 1 AVS.
    - Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from `DelegationManager` contract, count the number of operators who have shares larger than 0 in any of ETH and EIGEN strategies, and also registered to at least 1 AVS, as "number of active operators".
- `Operators that have earned rewards`: Count number of operators above who have earned rewards, by querying rewards data published (see `rewards` section for details).

Data Sources: Ethereum events, EigenLayer rewards data
Data Fresh Frequency: Every 1 hour.



### AVSs Funnel


Definition: The funnel of AVSs in EigenLayer, which includes AVSs who:
1. Are in development on EigenLayer testnet and mainnet.
2. Are active by having at least 1 active operator registered to it on EigenLayer mainnet.
3. Have distributed rewards to operators and stakers on EigenLayer mainnet.

Note this is the only metric that contains data from testnet, all other metrics are for mainnet only.

Formula:
- `AVSs in Development`: Use data across mainnet, testnet and private channels.
- `Active AVSs`: Count number of AVSs who have at least 1 "active operator" registered to it on EigenLayer mainnet.
- `AVSs that have distributed rewards`: Index `avs_reward_submission_created` event from the `RewardCoordinator` contract, count number of AVSs who have also have distributed rewards to operators and stakers, and also in above "active AVSs" list.

Data Sources: Ethereum events from testnet and mainnet, private data.
Data Fresh Frequency: Every 1 hour.


 ¹ _The number of restakers reflects the various ways LRT holders create EigenPods. As a result, many users of LRT platforms may appear as one or a few wallets in the data. This metric aims to provide insight into the LRT-holders' participation._
