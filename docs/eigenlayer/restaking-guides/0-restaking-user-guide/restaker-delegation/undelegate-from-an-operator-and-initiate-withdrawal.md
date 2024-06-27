---
sidebar_position: 2
title: Undelegate and Initiate Withdrawal
---

# Undelegate from an Operator and Initiate Withdrawal

Restakers can Undelegate their balance from an Operator at any time. Undelegation flows are the same for both Native and LST Restakers.

:::info
Initiating an Undelegate transaction will also **automatically queue a withdrawal**, but not complete (finalize) the withdrawal. The Undelegate and Queue Withdrawal transactions are combined due to the security architecture of EigenLayer smart contracts. If you wish to redeposit, you can do so immediately after the escrow period ends. If you want to complete the withdrawal, you can do so immediately after the escrow period ends.
:::


## Instructions to Undelegate and Queue Withdraw

**Step 1:** Navigate to the Operator tab, click the tile for the Operator you have delegated your funds to. Click the Undelegate button to continue.

![](/img/restake-guides/delegate-4.png)

**Step 2:** Confirm the Undelegate and Queue Withdrawal transactions in your Web3 wallet.

**Step 3:** Observe that your Restaked balances are now 0.0 TVL.

**Step 4:** Wait for the escrow period to end before continuing. Please see [Testnet vs Mainnet differences for detail](/docs/eigenlayer/restaking-guides/0-restaking-user-guide/testnet/README.md#testnet-vs-mainnet-differences).

**Step 5:** Visit any individual page for your unstaked assets and observe your **Unstaked** balance has increased by the corresponding amount.

**Step 6:** Click **Withdraw** to finalize the withdrawal for the asset.

![](/img/restake-guides/delegate-5.png)

:::info
The "Redeposit" button is also available for the user to Restake funds in case the withdrawal was initiated by mistake.
:::

**Step 7:** Repeat steps 5 and 6 above for any remaining assets where you wish to finalize withdrawal.
