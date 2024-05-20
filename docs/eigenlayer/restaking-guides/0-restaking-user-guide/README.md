# Restaking User Guide

These guides will walk you through how EIGEN token holders, LST holders and Native Stakers can restake, withdraw and earn points on the [EigenLayer Web App](https://app.eigenlayer.xyz/).

## **Liquid vs Native Restaking**

**Liquid restaking** is the process of depositing liquid staking tokens (LSTs) and EIGEN tokens into the EigenLayer smart contracts. At this time, the protocol supports the following tokens:

- EIGEN (EigenLayer)
- stETH (Lido)
- rETH (Rocket Pool)
- cbETH (Coinbase)
- wBETH (Binance)
- osETH (Stakewise)
- swETH (Swell)
- AnkrETH (Ankr)
- EthX (Stader)
- OETH (Origin ETH)
- sfrxETH (Frax Ether)
- lsETH (Liquid Staked ETH)
- mETH (Mantle Staked Ether)

The protocol plans to support additional liquid staking tokens in the future. If you would like to introduce your LST to the EigenLayer community, please do so on [the forum](https://forum.eigenlayer.xyz/t/about-the-new-lst-token-on-eigenlayer-category/6641).

**Native restaking** describes the process of setting an Ethereum validator's `withdrawCredential` to EigenLayer's smart contracts (EigenPod). You must operate an Ethereum Validator node in order to participate in Native Restaking.

## Escrow Period (Withdrawal Delay)

EigenLayer contracts feature a **7-day** withdrawal delay for LST tokens and Native Restaking, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. The withdrawal window for EIGEN token is **24-days**, which is necessary to support future planned functionality unique to the token. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) for more detail.
