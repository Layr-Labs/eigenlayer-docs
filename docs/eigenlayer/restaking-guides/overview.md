---
sidebar_position: 1
title: Restaking Overview
---


## **Liquid & Native Restaking**

**Liquid restaking** is the process of depositing "liquid" tokens, including LSTs, EIGEN token, and any ERC20 token into the EigenLayer smart contracts. For more information about adding new ERC20 tokens, please see [Permissionless Token Strategies](/docs/developers/avs-permissionlesss.md).


**Native restaking** is the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://launchpad.ethereum.org/).


## Native Restaking Overview

### EigenPod Overview 

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address (wallet) can only deploy a single EigenPod instance.
- The address that deploys an EigenPod becomes the owner of the contract (EigenPod Owner) and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.


### PEPE Release and CheckPoint Proofs

EigenLayer core contracts have had two previous major releases: M1 and M2. The "PEPE" release (Protocol: EigenPod Enhancement upgrade) is the current major release that focuses primarily on enhancements to Native Restaking and EigenPod design. The PEPE release brings significantly lower gas fees and better compatibility with future scheduled Ethereum network upgrades.

The PEPE release takes advantage of a new [Checkpoint Proof](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/EigenPod.md#checkpointing-validators) system to convert native validator ETH and validator yield to actively restaked shares. These proofs are initiated prior to any Restaking or Withdrawal action and are necessary to prove the expected funds are deposited in the EigenPod and/or validator. Checkpoint proofs are a two step process consisting of:
1. Starting a Checkpoint: this step occurs once.
1. Verify (and Completing) a Checkpoint: this step occurs multiple times until all of the remaining unproven ETH balance in the EigenPod has been proven.



## Escrow Period (Withdrawal Delay)

EigenLayer contracts feature a withdrawal delay for all Liquid and Native restaking, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) for more detail.
