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

:::info
As of Monday 8/12/24 this section is under construction. Please check back soon for the full user guide.
:::



## Safe Wallets and Native Restaking

Restakers are welcome to leverage Safe Wallets for Native Restaking with EigenLayer. Restakers can choose either:

- Native Restaking via the [EigenLayer Web App](https://app.eigenlayer.xyz/), [Safe and WalletConnect](https://help.safe.global/en/articles/108235-how-to-connect-a-safe-to-a-dapp-using-walletconnect). This option will provide the simplest user experience.
- Restaking via Smart Contracts. Users with more advanced development and smart contract experience are welcome to:
  - Learn how EigenLayer Native Restaking contracts work via reviewing our [eigenlayer-contracts documentation](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs#common-user-flows).
  - Initiate the required transactions via [Safe Core or Safe Wallet](https://docs.safe.global/home/what-is-safe).