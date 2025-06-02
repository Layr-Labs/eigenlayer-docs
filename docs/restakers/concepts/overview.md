---
sidebar_position: 1
title: Restaking Overview
---


## **Liquid & Native Restaking**

**Liquid restaking** is the process of depositing "liquid" tokens, including LSTs, EIGEN token, and any ERC20 token into the EigenLayer smart contracts. For more information about adding new ERC20 tokens, please see [Permissionless Token Strategies](/docs/developers/HowTo/build/avs-permissionlesss.md).


**Native restaking** is the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://launchpad.ethereum.org/).

### EigenPod Overview 

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address (wallet) can only deploy a single EigenPod instance.
- The address that deploys an EigenPod becomes the owner of the contract (EigenPod Owner) and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

### Checkpoint Proofs

[Checkpoint Proofs](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/EigenPod.md#checkpointing-validators) convert native validator ETH and validator yield to actively restaked shares. These proofs are initiated 
before any Restaking or Withdrawal action and are necessary to prove the expected funds are deposited in the EigenPod and/or validator. 
Checkpoint proofs are a two step process:
1. Starting a Checkpoint: this step occurs once.
1. Verify (and Completing) a Checkpoint: this step occurs multiple times until all of the remaining unproven ETH balance in the 
EigenPod has been proven.

## Delegation

Delegation is the process of assigning Restaked balance to an Operator. The Restaker will receive fees according to the AVSs 
that the Operator chooses to run. Restakers can undelegate their balance to end their assignment to the Operator and later 
redelegate the balance to a new Operator.

Please note the following conditions:
- Stakers can only delegate to a single Operator at a time.
- Delegation is an "all or nothing" operation. You must delegate all of your available Restaked balance to a single Operator.
- Delegation is not possible for Native Restakers while their validators are in the activation (aka entry) queue. Native Restaked 
tokens must be fully Restaked and proven on-chain before they can be delegated.
- If you have already delegated your stake to an operator, all new stakes will be delegated to the same operator automatically.
- If the delegated Operator is no longer in the active set of an AVS (such as due to operator ejection), the Restaker has 
the option to Redelegate their TVL balance to another Operator.

## Slashing 

:::important
Stake delegated to an Operator can become slashable, and when redistributable slashing is live on mainnet, previously delegated
stake can become redistributable. Stakers are responsible for ensuring that they fully understand and confirm 
their risk tolerances for existing and future delegations to Operators and the Operator’s slashable allocations. Additionally, 
stakers are responsible for continuing to monitor the allocations of their chosen Operators as they update allocations across 
various Operator Sets.
:::

:::note
[ELIP-006 Redistibutable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced Redistributable Operator Sets. 
Redistibutable Slashing is available in v1.5 on testnets and will be available on mainnet in Q3.
:::

AVSs create [Operator Sets](../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) that may include slashable
[Unique Stake](../../eigenlayer/concepts/slashing/unique-stake.md), or be Redistributable Operator Sets, and Operators can 
allocate their delegated stake to Operator Sets. If a Staker has previously delegated stake to an Operator, the delegated stake 
becomes slashable when the Operator opts into an Operator Set and allocates Unique Stake. Slashed funds can be burnt or
redistributed.

Stakers are responsible for understanding the increased risk posed by allocation of their delegated stake as slashable
Unique Stake to an AVS. While the allocation of delegated stake to an Operator Set may be subject to the [Allocation Config
Delay and Allocation Delay](../../eigenlayer/reference/safety-delays-reference.md), it is important to understand the increased risk.

For more information on the safety delays for Stakers, refer to the [Safety Delays reference](../../eigenlayer/reference/safety-delays-reference.md).

### Redistributable Operator Sets

With Redistributable Operator Sets, Stakers should carefully consider the protocols that their delegated Operators are running, 
and consider the risk and reward trade-offs. Redistributable Operator Sets may offer higher rewards, but these should be considered
against the increased slashing risks. 

Security implications for Redistributable Operator Sets mean Stakers are potentially at risk from malicious AVSs and Operators. 
If the AVS’s governance or its slashing functionality is corrupted, an attacker may be able to drain Operator-delegated funds. 
If an Operator itself is compromised, it may stand up its own AVS to steal user funds. Stakers should carefully consider the 
reputation and legitimacy of Operators when making delegations. For more information on these attack scenarios, refer to 
[this forum post](https://forum.eigenlayer.xyz/t/risks-of-an-in-protocol-redistribution-design/14458).

## Withdrawal Delay (Withdrawal Escrow)

EigenLayer contracts feature a withdrawal delay for all Liquid and Native restaking, a critical security measure for instances 
of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. Please see [Withdrawal Delay](/docs/eigenlayer/security/withdrawal-delay.md) 
for more detail.

## Slash Escrow 

EigenLayer has a slashing delay, Slash Escrow, which is a critical security measure to bring guarantees to protocol outflows. All slashed funds
(burnt or redistributed) go through a 4-day escrow period. For more information, refer to [Slash Escrow](../../eigenlayer/security/slash-escrow.md)