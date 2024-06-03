---
sidebar_position: 1
---

# Rewards and Claiming

## Overview

The EigenLayer Rewards protocol enables AVSs to make rewards to stakers and operators. Operators earn rewards by opting in to AVSs that make `RewardsSubmissions` to the `RewardsCoordinator`, a core protocol contract. Within a single `RewardsSubmission`, an AVS can specify a time range for which the reward will be distributed, a relative weighting of LSTs and NativeETH for the reward, and an ERC20 token to make rewards in.  

Operators will earn a flat 10% commission on rewards. The rest of the reward is passed on to the operator's delegated stakers. Rewards are proportional to:
- The amount of stake.
- The AVS's relative weighting of strategies in a rewards submission.
Rewards are calculated via an offchain process. Every week a merkle root is posted which represents the cumulative rewards across all earners. There is an additional 4 day delay after posting in order for the root to be claimable against with a valid merkle proof. The deterministic calculation of the distribution of rewards is specified in our [technical docs](https://hackmd.io/u-NHKEvtQ7m7CVDb4_42bA). 

Reward Earners (Stakers and Operators) can set a claimer address that can claim rewards for the tokens they've earned. An Earner is its own claimer by default and only the claimer address can claim rewards. If a new claimer is set, the new address can claim all of the previously unclaimed rewards. The earner can always configure their designated claimer address.


## AVS Integrations

AVSs can make rewards submissions via calling `createAVSRewardsSubmission` on the `RewardsCoordinator` contract. Each rewards submission specifies:  

1. A time range for which the rewards submission is valid. Rewards submissions can be retroactive from the M2 upgrade and last up to 30 days in the future.
2. A list of strategies and multipliers, which enables the AVS to weigh the relative payout to each strategy within a single rewards submission.
3. An ERC20 token that rewards are denominated in
Rewards MUST come from an AVSs ServiceManager contract. An example integration can be found [here](https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.0-rc2-holesky-preprod-rewards/src/ServiceManagerBase.sol#L76-L104).  

Integration Notes:
- The rewards passed on to earners are calculated daily and posted on-chain weekly.
- If the AVS does not have any operators opted into the AVS on a day of an active reward, those tokens are not distributed pro-rata to future days.
- Rewards cannot be clawed back by AVSs.
- Operators will only be distributed rewards on **entire** days that they have opted into the AVS.
- Due to the rounding in the off-chain process, we recommend not making range submission token amounts with more than 15 significant digits of precision. If more than 15 significant digits are provided, the extra precision will be truncated.
- There are several requirements for successfully calling `createAVSRewardsSubmission`. It's recommended to read further details [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v0.3.0-rc3-holesky-preprod-rewards/docs/core/RewardsCoordinator.md#createavsrewardssubmission).


## Rewards Contract Configurations

### Earners 
Operators and Stakers are both categorized as "Earners" when it comes to claiming and are distinct by their addresses. Actual reward calculations are explained further in the Offchain Architecture section but to summarize, reward calculations are performed daily with snapshotting the on-chain state and once a week a Merkle root is posted to the contract that allows Earners to claim their updated earnings.

Note: Earners or their designated claimers do not have to claim weekly against every single Merkle root to receive all their earnings up to that point. Earnings are calculated cumulatively so simply claiming one time against the latest Merkle root posted on the `RewardsCoordinator` contract will reward them with all their cumulative earnings even if there was several roots posted to the contract that were not claimed against.

### Setting Designated Claimers
Earners can set designated claimer addresses on the `RewardsCoordinator` contract. By default, if this is not configured then the Earner address can claim their earnings themselves but this optionality allows a third party to claim on an Earner's behalf. 

### Rewards Recipient Address
Not to be confused with the designated claimer address specified above, the recipient address is the address that will actually receive the ERC20 token rewards. The designated claimer(or the earner themself) has the ability to call `RewardsCoordinator.processClaim` for the earner while also specifying a recipient address to receive all the rewards.