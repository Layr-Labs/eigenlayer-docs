---
sidebar_position: 1
title: Restaking Overview
---


## **Liquid & Native Restaking**

**Liquid restaking** is the process of depositing "liquid" tokens, including LSTs, EIGEN token, and any ERC20 token into the EigenLayer smart contracts. For more information about adding new ERC20 tokens, please see [Permissionless Token Strategies](/docs/developers/HowTo/avs-permissionlesss.md).


**Native restaking** is the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://launchpad.ethereum.org/).

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

## Delegation

Delegation is the process of assigning Restaked balance to an Operator. The Restaker will receive fees according to the AVSs that the Operator chooses to run. Restakers can undelegate their balance to end their assignment to the Operator and later redelegate the balance to a new Operator.

Please note the following conditions:
- Stakers can only delegate to a single Operator at a time.
- Delegation is an "all or nothing" operation. You must delegate all of your available Restaked balance to a single Operator.
- Delegation is not possible for Native Restakers while their validators are in the activation (aka entry) queue. Native Restaked tokens must be fully Restaked and proven on-chain before they can be delegated.
- If you have already delegated your stake to an operator, all new stakes will be delegated to the same operator automatically.
- If the delegated Operator is no longer in the active set of an AVS (such as due to operator ejection), the Restaker has the option to Redelegate their TVL balance to another Operator.

## Slashing 

Review the [Slashing Concept](../../eigenlayer/archived/arhived-slashing.md) content for information on risks related to Slashable Stake.

## Escrow Period (Withdrawal Delay)

EigenLayer contracts feature a withdrawal delay for all Liquid and Native restaking, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) for more detail.
