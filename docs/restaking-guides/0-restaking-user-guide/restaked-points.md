---
description: Your Contribution to Shared Security
---

# Restaked Points

## Overview

Restaked points are a measure of your contribution to the shared security of the EigenLayer ecosystem. They are a measure of staking participation equal to the time-integrated amount staked.

## Calculations

In the formulas that follow, $i$ represents the index of a staker, while $j$ represents the index of a token.

The participation measure of a staker $$i$$ for a token $$j$$ is given by the formula

$$
P_{ij} = \int_{t=0}^T S_{ij}(t)dt
$$

where $$S_{ij}(t)$$ represents the amount of token $$j$$ held by staker $$i$$ at time $$t$$, measured in nominal units of ETH. For the purposes of the nominal participation measure, we treat all tokens, such as natively staked ETH, stETH, and rETH, equivalently and calculate the total participation measure in units of ETH $$\cdot$$ hours.

For instance, a user who stakes 1 stETH for 10 days should accrue 240 restaking points over this time period (1 ETH $$\times$$ 10 days $$\times$$ 24 hours/day = 240 ETH $$\cdot$$ hours)

For natively staked ETH, we treat $$S_{ij}(t)$$ as a step function for each validator which transitions from 0 to 32ETH at the validator's activation epoch or BLS to execution change epoch and then back to 0 at the validator's exit epoch.

To obtain the total participation measure for a staker $$i$$, we sum the measures for each token held by that staker:

$$
P_i = \sum_j P_{ij}.
$$

Finally, the restaked ratio gives the ratio of a given staker $$i$$'s participation measure to the aggregated participation measures across all stakers:

$$
R_i = \frac{P_i}{\sum_{i'} P_{i'}}.
$$

Consensus layer rewards are not included in the points calculation.
