---
sidebar_position: 2
title: Economy Calculation and Formulas
---


## Data Quality and Reconciliation

As a foundation to showcase EigenLayer's economy, we provide the best data quality possible by indexing data from Ethereum directly and reconciling each data point with other independent sources to guarantee the most accurate and up-to-date information.


## Data Freshness

Some data is updated every minute, while others are updated every hour.

Please refer to each metric below for their data freshness.


## Economy Metrics

### EIGEN Token Metadata


Definition:
- EIGEN Market Cap: The total market capitalization of circulating EIGEN tokens.
- EIGEN FDV: The fully diluted valuation of EIGEN tokens.
- EIGEN Trading Volume: The total trading volume of EIGEN tokens in the last 24 hours.
- Percentage of EIGEN Staked: The percentage of circulating EIGEN tokens that are currently staked.

Data Sources: Coingecko, Ethereum RPC
Data Fresh Frequency: Every 1 minute


### Total Value Locked (TVL) in USD


Definition: The total value in USD of all assets locked in EigenLayer's ecosystem, including all ETH LSTs, native ETH from EigenPods, EIGEN tokens, and all other permissionless assets restaked.

Formula:

1. To index all strategies' TVL in EigenLayer, except the beacon strategy (aka, native-ETH strategy) and EIGEN strategy:

- Index strategies in EigenLayer from all `StrategyAddedToDepositWhitelist` events minus `StrategyRemovedFromDepositWhitelist` events from the `StrategyManager` contract, which will include all strategies except the beacon strategy.
- For each strategy in EigenLayer, get their underlying tokens.
- Convert underlying tokens to token amounts via token decimals, `token amount = underlying token / power(10, token decimals)`.
- Multiply token amounts by the corresponding token's pricing from Coingecko, and sum them up.
    - Note that some tokens may lack pricing data on Coingecko; these will be excluded from the TVL in USD calculation.


2. To index the beacon strategy:

- Index all `PodDeployed` events from the `EigenPodManager` contract.
- For each EigenPod, query the beacon chain to check which validators have pointed their withdrawal credentials to the pod.
    - Withdrawal credentials will be of the format: `0x010000000000000000000000 + <eigen_pod_address>`
    - Note: Multiple validator withdrawal credentials can point to a single EigenPod.
- For each EigenPod, get its ETH balance on the execution layer
- Sum up all validators balance, multiply by ETH pricing from Coingecko


3. To index EIGEN strategy:

Follow the same steps in 1, with exception that EIGEN strategy is backed by bEIGEN (Backing EIGEN) token instead of
EIGEN token.
Coingecko only provides EIGEN token pricing, so we need to use EIGEN token pricing multiply by bEIGEN token amounts
to calculate TVL in USD for EIGEN strategy.


4. Sum up above 3 TVLs in USD to get the total TVL in USD for EigenLayer.


Data Sources: Ethereum events, ERC20 contracts, Beacon Chain data, Coingecko
Data Fresh Frequency: Every 1 hour


### Number of EIGEN Holders

Definition: Total number of unique addresses that hold EIGEN tokens.

Formula:

- Index all `Transfer` events from EIGEN token contract.
- Get EIGEN token balance for each wallet address.
- Count unique addresses that have non-zero EIGEN token balance.

Data Sources: Ethereum events
Data Fresh Frequency: Every 1 hour


### Total Rewards Distributed

Definition: Total rewards in USD distributed to date to EigenLayer's ecosystem.

Formula:

- Index all `AVSRewardsSubmissionCreated` and `RewardsSubmissionForAllEarnersCreated` events from the `RewardsCoordinator` contract.
- For each rewards submission, get the token amount by converting `amount` with the reward token decimals.
- Multiply the token amount by the corresponding token's pricing from Coingecko, and sum them up.

Data Sources: Ethereum events, ERC20 contracts, Coingecko
Data Fresh Frequency: Every 1 hour


### Total AVS FDV

Definition: Total Fully Diluted Valuation (FDV) of all Actively Validated Services(AVSs) in EigenLayer's ecosystem.

Formula:


Data Sources: Coingecko
Data Fresh Frequency: Every 1 hour


### Restakers Funnel

Definition: The funnel of restakers in EigenLayer's ecosystem, which includes the number of restakers who delegated more than \$1M, \$50M, and \$100M.

Formula:

- Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from the `DelegationManager` contract.
- For each restaker, get their delegated shares amount to date, convert shares to underlying tokens by strategy's ratio of shares to underlying token, then convert to tokens amount via token decimals, to USD by multiplying with the corresponding token pricing from Coingecko.
- Sum up all USD value of delegated tokens for each restaker, count them by \$1M, \$50M, and \$100M thresholds.
- Cumulate the thresholds, meaning the number of restakers who delegated more than \$1M includes that of who delegated more than \$50M and \$100M, the number of restakers who delegated more than \$50M includes that of who delegated more than \$100M.

Data Sources: Ethereum events, ERC20 contracts, Coingecko.
Data Fresh Frequency: Every 1 hour.


### Operators Funnel

Definition: The funnel of operators in EigenLayer's ecosystem, which includes the number of operators:
 1. Who registers on EigenLayer.
 2. Who are active (registers to at least one AVS on EigenLayer with delegated shares larger than 0 in ETH or EIGEN strategies) on EigenLayer.
 3. Who have been distributed rewards to.

Formula:

- `Registered Operators`: Index `OperatorMetadataURIUpdated` event from the `AVSDirectory` contract, count the number of unique operator addresses registered
- `Active Operators`:
    - Index `OperatorAVSRegisterationStatus` event from the `AVSDirectory` contract, count the number of unique operator addresses who are registered to at least 1 AVS.
    - Index `OperatorSharesIncreased` and `OperatorSharesDecreased` events from the `DelegationManager` contract, count the number of operators who are in step above and also have shares larger than 0 in any of ETH AND EIGEN strategies, as "number of active operators".
- `Operators that have been distributed rewards to`: Count number of operators above who have been distributed rewards to, by querying rewards data published (see `rewards` section for details).

Data Sources: Ethereum events.
Data Fresh Frequency: Every 1 hour.


### AVSs Funnel


Definition: The funnel of AVSs in EigenLayer's ecosystem, which includes the number of AVSs who are in development on EigenLayer testnet and mainnet, who are active (has at least 1 operator registered to it on EigenLayer) on EigenLayer mainnet, and who have distributed rewards to operators and stakers on EigenLayer mainnet.

Note this is the only metrics that contains data from testnet, all other metrics are from mainnet only.

Formula:
- `AVSs in Development`: Use data across mainnet, testnet and private channels.
- `Active AVSs`: Count number of AVSs who have at least 1 "active operator" registered to it on EigenLayer mainnet.
- `AVSs that have distributed rewards`: Index `avs_reward_submission_created` event from the `RewardCoordinator` contract, count number of AVSs who have also have distributed rewards to operators and stakers, and also in above "active AVSs" list.

Data Sources: Ethereum events from testnet and mainnet, private data.
Data Fresh Frequency: Every 1 hour.
