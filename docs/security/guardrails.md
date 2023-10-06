---
sidebar_position: 4
---

# Guardrails

EigenLayer restaking has been deployed on Ethereum mainnet at the following contract addresses:

* **StrategyManager:** 0x858646372CC42E1A627fcE94aa7A7033e7CF075A
* **EigenPodManager:** 0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338

To restake on mainnet, visit the EigenLayer app at: [app.eigenlayer.xyz](https://app.eigenlayer.xyz)

In the interest of caution with regards to protocol security, EigenLayer is launching with restaking limits. These limits will be raised progressively, with the goal of reaching an open and uncapped state where any user can restake any amount of staked Ether.

In addition, the protocol facilitates native restaking, allowing users to create EigenPods and assign the withdrawal credentials of multiple validators to the addresses of their EigenPods.

The following restaking limits and conditions are in place:

* Within Liquid restaking, there is a deposit limit of 32 tokens per user transaction.
* There will be a 7-day withdrawal delay that will serve as a security measure during the early stages of the EigenLayer mainnet, to optimize for the safety of assets. This withdrawal lag, which is common in staking protocols, is required when AVSs go live, as there is a lag to verify that activity associated with any AVS was completed successfully.

Read the [user guide to liquid restaking here;](https://docs.eigenlayer.xyz/guides/liquid-restaking) and the [user guide to native restaking here](https://docs.eigenlayer.xyz/restaking-guides/restaking-user-guide/native-restaking).
