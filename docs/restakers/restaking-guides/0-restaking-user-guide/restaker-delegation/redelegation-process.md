---
sidebar_position: 3
title: Change Your Delegation
---

# Change Your Delegation to a New Operator

The following steps are necessary for a Restaker to **move** their Delegated balance to a New Operator. The process below requires users to perform each of the following steps in order:
- **Undelegate** assets, which automatically queues a **withdrawal**. The Undelegate and Queue Withdrawal transactions are combined due to the security architecture of EigenLayer smart contracts. 
- **Redeposit** each asset.
- **Delegate** to the new Operator.

:::warning
Follow the steps below carefully to avoid a "partially delegated state". A partially delegated state is when some portion of your assets in Delegated state and other assets in a "queued for withdrawal" or "withdrawal ready for completion" state.
:::

## Process to Change Your Delegation to a New Operator

**Step 1:** Visit the **Operator** page for your currently delegated Operator. Click **Undelegate**.

![undelegate button](/img/restake-guides/delegate-3.png)


**Step 2:** **Confirm** the Undelegate transaction in your Web3 wallet.

**Step 3:** **Observe** that your Restaked balances are now 0.0 TVL. Those assets are now undelegated from the previous Operator appear in "Pending Withdraw" state.

**Step 4:** **Wait** for the escrow period to end before continuing. Please see [Testnet vs Mainnet differences for detail](/docs/restakers/restaking-guides/testnet/README.md#testnet-vs-mainnet-differences).

**Step 5:** Manually Redeposit each asset. **Navigate** to each asset page individually. Navigate to the  **Unstake** tab, click **Redeposit**. This will prompt a Redeposit transaction for each asset that you will confirm in your Web3 wallet.

**Step 6:** After all assets have been redeposited, **navigate** to the Operator page for the new operator you wish to delegate to. Click **Delegate** button.


![](/img/restake-guides/delegate-2.png)


**Step 7:** **Observe** that your delegation has been changed to the new Operator.


:::info
Do not click the **Redelegate** button on the Operator page. The button is intended to be used only for users that have funds in a "partially delegated state".
:::