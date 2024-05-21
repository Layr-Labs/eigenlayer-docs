---
sidebar_position: 2
title: Native Restaking
---

# Native Restaking

Native restaking describes the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://launchpad.ethereum.org/).

:::warning
Please read this entire guide before launching your new validator or integrating your existing validator.

Before you deploy a new validator you must plan to either:

- Initially provision the withdrawal credentials to your EigenPod address (created on the next page).
- Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address.

:::

Native Restaking on EigenLayer consists of the following actions:

1. Create New EigenPod, Set Withdrawal Credentials, Enable Restaking
1. Upgrade Existing EigenPod
1. Withdraw from EigenLayer

## Stage 1 EigenPods Upgrade Requirement

Existing Stage 1 EigenPods will need to be **Upgraded** in order to be **actively restaked**.  After the Eigenlayer contracts are updated for Stage 2 the EigenPod's "Current Restaked" amount will be moved to "Awaiting Restake" and the "Upgrade EigenPod" button will be clickable. EigenPods can then become actively Restaked by following the instructions in Upgrade Existing Eigenpod(link).


## Deposit and Withdrawal Costs

Native Restaking Deposit and Withdrawal transactions will incur additional gas fees due to the required proof verification. Restaking with EigenLayer requires proof of beacon chain staking and active validator status. This proof is generated off chain during Deposit and Withdrawal then verified on chain. The verification process will incur a gas fee of approximately 200k gas + some fixed gas per proof. Please plan and budget accordingly for associated costs.


## Safe Wallets and Native Restaking

Restakers are welcome to leverage Safe Wallets for Native Restaking with EigenLayer. Restakers can choose either:

- Native Restaking via the [EigenLayer Web App](https://app.eigenlayer.xyz/), [Safe and WalletConnect](https://help.safe.global/en/articles/108235-how-to-connect-a-safe-to-a-dapp-using-walletconnect). This option will provide the simplest user experience.
- Restaking via Smart Contracts. Users with more advanced development and smart contract experience are welcome to:
  - Learn how EigenLayer Native Restaking contracts work via reviewing our [eigenlayer-contracts documentation](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs#common-user-flows).
  - Initiate the required transactions via [Safe Core or Safe Wallet](https://docs.safe.global/home/what-is-safe).