---
sidebar_position: 2
---


# Unstake and Withdraw

:::info
Unstaking is the first step in the process of exiting restaked assets from EigenLayer. Unstaked tokens enter the withdrawal
queue for the [Escrow Period](../../testnet/README.md#testnet-vs-mainnet-differences). Withdrawing is the final step to move the tokens back to your wallet.
:::

To unstake and withdraw tokens:

1. In the [EigenLayer app](https://app.eigenlayer.xyz/), navigate to the token you wish to unstake. Click **Unstake** to continue.
2. Choose the amount of the asset you wish to unstake. Click **Submit** to continue.
3. When prompted by your wallet, click **Confirm** to sign the queue withdrawal transaction.
4. Observe the Unstake confirmation page. Your withdrawal is now in escrow.
5. Wait for the escrow period to complete. The [Withdraw queue](#view-remaining-time-in-withdrawal-queue) displays the approximate amount of time remaining in escrow.
6. Once the escrow completes, you'll see the withdrawable balance under Available to Withdraw. Click **Withdraw** to complete the withdrawal.
7. When prompted by your Web3 wallet, sign the transaction. After the transaction is completed the withdrawn assets are visible in your Web3 wallet.

## View Remaining Time in Withdrawal Queue

On the Dashboard tab in the EigenLayer app, the *Withdraw queue* field displays the total value currently in the withdrawal
queue.

To view the remaining time in the withdrawal queue for an specific token, navigate to that token. The **Withdraw Queue** field
displays the approximate amount of time remaining until the token is withdrawable.