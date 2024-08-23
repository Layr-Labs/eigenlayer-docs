---
sidebar_position: 2
title: Native Restaking (PEPE)
---

# Native Restaking (PEPE Release)

Native restaking describes the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://launchpad.ethereum.org/).

:::warning
Please read this entire guide before launching your new validator or integrating your existing validator. Before you deploy a new validator you must plan to either:
- Initially provision the withdrawal credentials to your EigenPod address (created on the next page).
- Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address.
:::

Native Restaking on EigenLayer consists of the following actions:
1. [Restake New Validator Native Beacon Chain ETH](#restake-new-validator-native-beacon-chain-eth)
2. [Restake Validator Yield (Rewards, Fees, and ETH)](#restake-validator-yield-rewards-fees-and-eth)
3. [Withdraw Native ETH or Validator Yield](#withdraw-native-eth-or-validator-yield)
4. [Delegate and Undelegate](#delegate-and-undelegate)

## EigenPod and Gas Costs

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address (wallet) can only deploy a single EigenPod instance.
- The address that deploys an EigenPod becomes the owner of the contract (EigenPod Owner) and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.


## PEPE Release and CheckPoint Proofs

EigenLayer core contracts have had two previous major releases: M1 and M2. PEPE (Protocol: EigenPod Enhancement upgrade) is the current major release that focuses primarily on enhancements to Native Restaking and EigenPod design. The PEPE release will result in significantly lower gas fees and great compatibility with future scheduled Ethereum network upgrades.

The PEPE release takes advantage of a new [Checkpoint Proof](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/EigenPod.md#checkpointing-validators) system to convert native validator ETH and validator yield to actively restaked shares. These proofs are initiated prior to any Restaking or Withdrawal action and are necessary to prove the expected funds are deposited in the EigenPod and/or validator. Checkpoint proofs are a two step process consisting of:
1. Starting a Checkpoint: this step occurs once.
1. Verify (and Completing) a Checkpoint: this step occurs multiple times until all of the remaining unproven ETH balance in the EigenPod has been proven.

We recommend users connect many validators to a single EigenPod in order to reduce cost and complexity where practical. For each of the actions below that require a checkpoint proof, the web app will batch up to 80 validators per proof transaction batch. Users with more validators will require additional transactions to complete each checkpoint proof. Please plan your gas costs accordingly.


## Restake New Validator (Native Beacon Chain ETH)

Create EigenPod:
1. Visit the [Holesky EigenLayer App](https://holesky.eigenlayer.xyz/).
1. Click Create EigenPod.
1. Sign transaction.
2. Observe the new EigenPod contract address is displayed.

:::info
This address is responsible for all subsequent restaking and withdrawal activities associated with that EigenPod.
:::

Repoint Validator:
1. Configure the validator(s) credentials to point to the EigenPod address when the validator is created. Please see [Ethereum Launchpad](https://launchpad.ethereum.org/en/withdrawals#enabling-withdrawals) for more information. 
    * Confirming Withdrawal Address: you can confirm your withdrawal credentials (which should match your EigenPod), via the following URL: https://beaconcha.in/validator/[validator_index]#deposits
    * Optional: as of the PEPE release you may choose to set the FEE_RECIPIENT to your EigenPod address if you wish to Restake those fees.
1. Wait for the validator(s) to become active on-chain. Please see https://beaconcha.in/[validator_index] to follow your validator status. Please note: this process could take up to 7 days depending on the the Beacon Chain deposit queue.
1. The validator's state will transition to `Awaiting Restake` in the web app.

Activate Restaking:
1. Once the Validator is active on-chain and the withdrawal address has been configured to point to the EigenPod address, the Restake button will become active.
1. Click **Restake** to initiate restaking the validator.
1. Sign the transaction with your web3 wallet.
1. Your validator is now **Restaked**.
1. You now have the option to delegate your restaked assets to your selected Operator. If you are already delegated to an Operator, your assets will automatically delegate to your currently selected Operator.


# Restake Validator Yield (Rewards, Fees, and ETH)

As of the PEPE release, users can now convert consensus rewards, validator execution fees and ETH sent to the EigenPod to restaked shares (referred to broadly in this document as "Validator Yield").  Initiating and completing a checkpoint proof will automatically convert any consensus rewards to restaked shares for the EigenPod.

1. Observe the value of `Unstaked Balance` becomes greater than zero when there is ETH available to convert to restaked shares in the EigenPod.
1. Click **Restake** to initiate a checkpoint proof.
1. Sign two transactions: Begin Restake (to initiate a checkpoint proof) and Restake (to complete the checkpoint proof).
1. Observe the Restaked Balance has increased by the amount of validator yield proven in the previous step.

:::info
1. The time lag associated with Ethereum beacon chain validator sweeps, which can be up to 65812 slots or 9 days. Please see the Ethereum docs [here](https://ethereum.org/en/staking/withdrawals/#validator-sweeping) for more information.
:::

### Checkpoint Frequency

Users should not initiate a checkpoint more frequently than once every two weeks (approximately). 
The longer you wait before performing a checkpoint, the more gas users will save. The gas cost of a checkpoint is the same, regardless of how many consensus rewards will be proven. Each user should determine the best interval to fit their gas cost and restaking benefit needs.

Consensus rewards are moved from the beacon chain to your EigenPod once every approximately 8 days per the Ethereum protocol. Checkpoint intervals more frequently than 8 days would result in no benefit for the user.



# Withdraw Native ETH or Validator Yield

Overview: the amount of ETH available to be queued for withdrawal will appear under "Available to Queue" in the web app. This amount will include any exited validators where the balance was withdrawn to EigenPod and any validator yield available to be withdrawn.


If you wish to withdraw native ETH from an active validator, complete the following steps before proceeding:
1. Ensure you have repointed your validator's withdrawal credentials to your EigenPod prior to continuing. Please see [Ethereum Launchpad](https://launchpad.ethereum.org/en/withdrawals#enabling-withdrawals) for more information. 
1. Fully exit your validator from the beacon chain. You may monitor its activity via beaconcha.in/validator/[validator_index].
1. Wait for the final beacon chain withdrawal to be deposited to your EigenPod. There can be a lag of up to 24 hours to 7 days between the validator appearing as "exited" and the withdrawal amount deposited to EigenPod. Please see the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/[validator_index]#withdrawals .


:::warn
Each queue withdrawal action will trigger a checkpoint and the associated gas costs. Please review the [Checkpoint Frequency](#checkpoint-frequency) section and plan for gas costs accordingly.
:::

Queue the Withdrawal:
1. Click **Queue Withdrawal** in the web app.
1. Choose the amount you wish to queue for withdrawal and continue
1. A checkpoint proof is initiated. **Sign** the associated transaction with your web3 wallet.
1. Wait for the [Escrow Period](../../README.md#escrow-period-withdrawal-delay) to complete.


Redeposit or Complete Withdrawal:
Redeposit or Complete Withdrawal: Redepositing is available at this step for users who accidentally queued a withdrawal, but would like to resume staking and delegation.
1. Choose to either **Restake** (to Redposit the assets) or **Withdraw** (to complete the withdrawal).
1. **Sign** the transaction using your web3 wallet.


# Delegate and Undelegate

Undelegate and/or Change Delegation
1. Click Undelegate
1. **Sign** the transaction using your web3 wallet. Note: a queue withdrawal event occurs via the smart contracts at this time, because Undelegate and Queue Withdrawal actions are linked at the smart contract level. This information is not presented to the user in order simplify the user flow and focus on the change delegation action.
1. User is now Undelegated from the Operator.
1. Wait for the [Escrow Period](../../README.md#escrow-period-withdrawal-delay) to complete.

Delegate to a New Operator
1. Navigate to an Operator you wish to delegate your assets to.
1. Click **Delegate** to delegate to the new Operator.
1. **Sign** the transaction using your web3 wallet.
1. You are now delegated to the new operator
