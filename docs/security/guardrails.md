# Guardrails

EigenLayer restaking has been deployed on Ethereum mainnet at the following contract addresses:

* **StrategyManager:** 0x858646372CC42E1A627fcE94aa7A7033e7CF075A
* **EigenPodManager:** 0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338

To restake on mainnet, visit the EigenLayer app at: [app.eigenlayer.xyz](https://app.eigenlayer.xyz)

In the interest of caution with regards to protocol security, EigenLayer is launching with restaking limits. These limits will be raised progressively, with the goal of reaching an open and uncapped state where any user can restake any amount of staked Ether.

At this time, the protocol supports liquid staking of Lido stETH ([stETH](https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84)), Rocket Pool ETH ([rETH](https://etherscan.io/token/0xae78736cd615f374d3085123a210448e74fc6393)), and Coinbase Wrapped Staked ETH ([cbETH](https://etherscan.io/token/0xBe9895146f7AF43049ca1c1AE358B0541Ea49704)). The protocol will support _many_ more liquid staking tokens in the future, and is already working with several staking protocols on launch plans. If you would like to introduce your LST to the EigenLayer community, please do so on the [forum](https://forum.eigenlayer.xyz/t/about-the-new-lst-token-on-eigenlayer-category/6641).

In addition, the protocol facilitates native restaking, allowing users to create EigenPods and assign the withdrawal credentials of multiple validators to the addresses of their EigenPods.

The following restaking limits and conditions are in place:

* Within Liquid restaking, there is a limit of 3,200 tokens that can be deposited for each supported asset. That is, only a maximum of 3,200 stETH; 3,200 rETH; and 3,200 cbETH may be restaked.
* Within Liquid restaking, there is a deposit limit of 32 tokens per user transaction.
* The creation of additional EigenPods will be paused once native restaking hits approximately 9,600 ETH. No restrictions have been placed on the number of validators that a user may link to a givenEigenPod.
* There will be a 7-day withdrawal delay that will serve as a security measure during the early stages of the EigenLayer mainnet, to optimize for the safety of assets. This withdrawal lag, which is common in staking protocols, is required when AVSs go live, as there is a lag to verify that activity associated with any AVS was completed successfully.

Read the [user guide to liquid restaking here;](https://docs.eigenlayer.xyz/guides/liquid-restaking) and the [user guide to native restaking here](https://docs.eigenlayer.xyz/guides/native-restaking).
