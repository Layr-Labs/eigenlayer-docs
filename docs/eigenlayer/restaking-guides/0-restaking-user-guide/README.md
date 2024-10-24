# Restaking User Guide

These guides will walk you through how EIGEN token holders, LST holders and Native Stakers can restake, delegate, and withdraw on the [EigenLayer Web App](https://app.eigenlayer.xyz/).

## **Liquid vs Native Restaking**

**Liquid restaking** is the process of depositing "liquid" tokens, including LSTs, EIGEN token, and any ERC20 token into the EigenLayer smart contracts.

For more information about adding new ERC20 tokens, please see [Permissionless Token Strategies](/docs/developers/avs-permissionlesss.md)


**Native restaking** describes the process of setting an Ethereum validator's `withdrawCredential` to EigenLayer's smart contracts (EigenPod). You must operate an Ethereum Validator node in order to participate in Native Restaking.

## Escrow Period (Withdrawal Delay)

EigenLayer contracts feature a **7-day** withdrawal delay for all tokens and Native Restaking, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) for more detail.
