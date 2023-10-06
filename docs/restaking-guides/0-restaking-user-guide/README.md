# Restaking User Guide

These guides will walk you through how LST holders and Native Stakers can restake, withdraw and earn points on the [EigenLayer app](https://app.eigenlayer.xyz/).

## **Liquid vs Native Restaking**

**Liquid restaking** is the process of depositing liquid staking tokens (LSTs) into the EigenLayer smart contracts. At this time, the protocol supports the following LSTs:

- stETH (Lido)
- rETH (Rocket Pool)
- cbETH (Coinbase)
- wBETH (Binance)
- osETH (Stakewise)
- swETH (Swell)
- AnkrETH (Ankr)
- EthX (Stader)
- OETH (Origin ETH)

The protocol plans to support additional liquid staking tokens in the future. If you would like to introduce your LST to the EigenLayer community, please do so on [the forum](https://forum.eigenlayer.xyz/t/about-the-new-lst-token-on-eigenlayer-category/6641).

**Native restaking** describes the process of setting an Ethereum validator's `withdrawCredential`to EigenLayer's smart contracts (EigenPod). You must operate an Ethereum Validator node in order to participate in Native Restaking.

## [**Withdrawal Delay**](https://docs.eigenlayer.xyz/security/withdrawal-delay)

EigenLayer is launching with a maximally conservative withdrawal delay, which is intended to only decrease over time.

A 7-day delay window should give ample time to review withdrawals for anything suspicious and pause relevant functionality if needed.
