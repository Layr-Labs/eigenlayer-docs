---
title: Restaked Points
sidebar_position: 5
---



## Overview

Restaked points are a measure of your contribution to the shared security of the EigenLayer ecosystem. They are a measure of staking participation equal to the time-integrated amount staked in units of ETH $$\cdot$$ hours.

## Calculations

In the formulas that follow, $$i$$ represents the index of a staker, while $$j$$ represents the index of a token.

The participation measure of a staker $$i$$ for a token $$j$$ is given by the formula

$$
P_{ij} = \int_{t=0}^T S_{ij}(t)dt
$$

where $$S_{ij}(t)$$ represents the amount of token $$j$$ held by staker $$i$$ at time $$t$$, measured in nominal units of ETH. For the purposes of the nominal participation measure, we treat all tokens, such as Native Restaked ETH and Liquid Staked ETH (LSTs) equivalently and calculate the total participation measure in units of ETH $$\cdot$$ hours. Points are accrued for each Ethereum block that a token is actively staked.

For instance, a user who stakes 1 stETH for 10 days should accrue 240 restaking points over this time period (1 ETH $$\times$$ 10 days $$\times$$ 24 hours/day = 240 ETH $$\cdot$$ hours).

For natively staked ETH, we treat $$S_{ij}(t)$$ as a step function for each validator which transitions from 0 to 32ETH at the validator's activation epoch or BLS to execution change epoch and then back to 0 at the validator's exit epoch.

To obtain the total participation measure for a staker $$i$$, we sum the measures for each token held by that staker:

$$
P_i = \sum_j P_{ij}.
$$

Finally, the restaked ratio gives the ratio of a given staker $$i$$'s participation measure to the aggregated participation measures across all stakers:

$$
R_i = \frac{P_i}{\sum_{i'} P_{i'}}.
$$


Additional clarifications for Native Restaking:
- Consensus layer rewards are not included in the points calculation. Restaked points for native restaked is based on the validator's Effective Balance (capped at 32 ETH), rather than the validator's Current Balance (which includes rewards).
- For Native Restaking, points accrual ends at the “Complete Withdrawal” action when the funds have exited EigenLayer completely.
