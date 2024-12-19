---
sidebar_position: 1
title: Restaking Overview
---


## **Liquid & Native Restaking**

**Liquid restaking** is the process of depositing "liquid" tokens, including LSTs, EIGEN token, and any ERC20 token into the EigenLayer smart contracts. For more information about adding new ERC20 tokens, please see [Permissionless Token Strategies](/docs/developers/avs-permissionlesss.md).


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



## Slashing via Unique Stake & Operator Sets (Currently in Testnet)

The following is not a complete description of the Slashing and Operator Sets upgrade and is qualified in its entirety by reference to the [ELIP-002: Slashing via Unique Stake & Operator Sets](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md).

The Slashing & Operator Set update adds new protocol interfaces and primitives for Operator Sets, Unique Stake Allocations, and Slashing to provide:

* A new, iterative rewards mechanism for AVSs to reward Operators based on tasks tied to Operator Sets and slashable Unique Stake.  
* A mechanism for Operators to allocate and deallocate Unique Stake to and from Operator Sets.  
* A slasher function for AVSs to slash an Operator’s Unique Stake allocated to a single Operator Set.

An Operator Set is a logical and segmented set of Operators created by the AVS. These groups of Operators may be split up for whatever reason an AVS can think of. AVSs may assign arbitrary “tasks” to Operator Sets that can represent anything Operators may be asked to do.

Unique Stake is an accounting tool defined on the level of Operator Sets that ensures AVSs and Operators maintain key safety properties when handling staked security and slashing on EigenLayer. Unique Stake is allocated to different Operator Sets on an opt-in basis by Operators. Only Unique Stake is slashable by AVSs, and it represents proportions of the Operator’s delegated stake from Stakers.

When Stakers deposit assets on EigenLayer, they are stored in accounting contracts known as Strategies. Strategies are different expressions of security on EigenLayer that may represent different tokens, for example. In order to make delegations slashable, Operators must allocate individual proportions of their delegated stake as Unique Stake to Operator Sets. Allocations are exclusively slashable by the AVS that created that Operator Set.

### Slashable Stake Risks

Once the Slashing and Operator Sets upgrade is live on mainnet, AVSs may create Operator Sets (which may include slashable Unique Stake) and Operators may allocate their delegated stake to any created Operator Sets. If a Staker is already delegated to an Operator, its stake can become slashable as soon as the Operator opts-in to an Operator Set and allocates Unique Stake. While the allocation of delegated stake to an Operator Set may be subject to the Allocation Config Delay and Allocation Delay, Stakers should consider the increased risk posed by allocation of their delegated stake as slashable Unique Stake to an AVS. To better understand the safety delays for Stakers, please see the Allocation Config Delay and Allocation Delay described in further detail in the [Allocating and Deallocating to Operator Sets section of ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md).

Stakers should review and confirm their risk tolerances for existing and future delegations to Operators and that Operator’s slashable allocations. Stakers will be able to monitor available on-chain data on app.eigenlayer.xyz, such as the creation of Operator Sets, Operator allocations to Operator Sets, the applicable Allocation Delay set by an Operator and the history of slashing activity on app.eigenlayer.xyz. 



## Escrow Period (Withdrawal Delay)

EigenLayer contracts feature a withdrawal delay for all Liquid and Native restaking, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) for more detail.
