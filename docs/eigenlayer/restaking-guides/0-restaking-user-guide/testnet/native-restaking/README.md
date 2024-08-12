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
1. Restake New Validator Native Beacon Chain ETH
2. Convert Consensus Rewards to Restaked Shares
3. Withdraw Restaked Balance
4. Withdraw Yield Only


:: info
Users with many validators - we can only prove up to 80 validators per proof transaction batch. Multiple validators will require more transactions // todo wes finish this here.
The modal windows will indicate the user's progress through.


:::info
As of Monday 8/12/24 this section is under construction. Please check back soon for the full user guide.
:::


# Restake New Validator (Native Beacon Chain ETH)
1. Click Create EigenPod.
2. Sign transaction.
3. Repoint validator to EigenPod. Update your withdrawal credentials. 
4. Wait for Validator will be awaiting Restake. This could take up to 7 days due to the Beacon Chain deposit queue.
5. Click Restake, sign transaction.
6. you are actively restaked
7. User is given the option to choose an Operator to delegate


# Restake Validator Yield (Rewards, Fees, and $ETH)
Give an overview 
0. Unstaked Balance becomes greater than zero. Reuse checkpoint frequency language 
  https://github.com/Layr-Labs/eigenlayer-docs/pull/297/files#diff-5f8cb8d4b2c0e677212ee54b81c0ee8b3bae4e62aa2a9f0230e5600b8fb531adR138
1. 2x transactions: Begin Restake (initiate a checkpoint proof)
2. Restake  // todo compare this to smart contract flow for additional detail
3. Restaked balance increased by that amount


# Withdrawals

Overview: the number Available to Queue will include any exited validators where the balance was withdrawn to EigenPod plus any yield (consensus rewards, execution fees or native $ETH sent to the EigenPod)


Gas cost considerations. 
:: Warn queue'ing withdrawal, there will be a checkpoint for each withdraw - plan accordingly.
Note to Wes: maybe consider ...

1) Click queue withdraw. Checkpoint proof is initiated.
2) Choose the amount
3) Sign transaction
4) Wait for escrow
5) Available to withdraw
6) Choose to Restake (Redposit) or Withdraw)


# Delegate and Undelegate

Undelegate and/or Change Delegation
1. Click Undelegate
1. Sign transaction.
// We do not show them that we're queuing the withdrawal in the backend .. the amount will not appear in the withdrawal queue, validator will not be able to be exited.

// Wes todo: this is only an undelegate flow for Natively Restaked ETH

1. Delegate -> choose an operator
1. Now you're delegated to the new operator


# todo
// Wes to check with Alex and cc Jon confirming - no upgrade UI documentation is needed.



Questions: Upgrade?