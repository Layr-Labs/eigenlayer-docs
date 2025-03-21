---
sidebar_position: 1
title: Overview
---

Rewards are tokens distributed to Stakers and Operators by an AVS to reward Stakers and Operators for participation in securing AVSs.
Rewards implements the [EigenLayer Improvement Proposal-001: Rewards v2](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-001.md).

EigenLayer has a flexible rewards mechanism that enables:

* [Operator directed Rewards](rewards-submission.md)

    AVSs can [direct performance-based rewards](../../../developers/HowTo/build/submit-rewards-submissions.md) to specific Operators using custom logic. Operator directed Rewards enable 
    rewards to be distributed based on work completion, quality or other parameters determined by the AVS, allowing flexible and tailored incentives.

* [Variable Operator Fee Splits for AVS Rewards](rewards-split.md)

    Operators can [set their per-AVS fee rate](../../../operators/howto/confirgurerewards/set-rewards-split.md) on AVS Rewards to any amount from 0% to 100%. The default split is 10%. Setting
    a variable split per-AVS enables Operators to align their fee structures with their economic needs and the complexity and diversity of AVS demands. 
    Operator fees can be varied by Operator Set for more granular reward fee structures.

* [Variable Operator Splits for Programmatic Incentives](rewards-split.md)

    Operators can [set their split of Programmatic Incentives](../../../operators/howto/confirgurerewards/set-pi-split) to any amount from 0% to 100%. The default split is 10%. Setting 
    a split enables Operators to have flexibility in determining the appropriate take rate. The Programmatic Incentive splits 
    integrate with the Rewards distribution process which ensures that Stakers delegating to Operators benefit proportionately.

Rewards are submitted, calculated, and distributed as follows:

1. [AVSs submit rewards submissions to Operators and Stakers](../../../developers/HowTo/build/submit-rewards-submissions.md).
2. The Rewards updater calculates Rewards offchain and consolidates these into a merkle root posted onchain.
3. [Operators and Stakers claim their allocated Rewards](rewards-claiming).

## Rewards Calculation 

Rewards are calculated via an offchain process. A Merkle root (known as the distribution root) is posted which represents
the cumulative rewards across all earners weekly on mainnet and daily on testnet. There is an additional 2 hour delay on
testnet and 1 week delay on mainnet after posting for the root to be claimable against with a valid Merkle proof. For more
information on the deterministic calculation of the distribution of rewards, refer to the [Rewards Calculation technical documentation](https://github.com/Layr-Labs/sidecar/blob/master/docs/docs/sidecar/rewards/calculation.md).

The posted distribution roots contain cumulative earnings. That is, Stakers and Operators do not have to claim against every
root and claiming against the most recent root claims anything not yet claimed.
