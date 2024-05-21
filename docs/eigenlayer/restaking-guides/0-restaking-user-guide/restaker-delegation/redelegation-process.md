---
sidebar_position: 3
title: Change Your Delegation
---

# Change Your Delegation to a New Operator

The following steps are intended for a Restaker that would like to change their Delegated balance to a New Operator.

:::warning
Please follow the recommended steps below to avoid a "partially delegated state". A partially delegated state is when some portion of your assets in Delegated state and other assets in a "queued for withdrawal" or "withdrawal ready for completion" state.
:::

## Process to Change Your Delegation to a New Operator

**Step 1:** Visit the **Operator** page for your currently delegated Operator. Click **Undelegate**.

![undelegate button](/img/restake-guides/change-delegation-1.png)

**Step 2:** Confirm the two transactions in your Web3 wallet.

**Step 3:** Observe that your Restaked balances are now 0.0 TVL.

**Step 4:** Those assets becomes Undelegated from the Operator and Assets and appear in "Pending Withdraw" state.

:::warning
Do not click Unstake the assets at the Operator page. This can cause a partially delegated state.
:::

**Step 5:** Wait for the escrow period to end before continuing. Please see [Testnet vs Mainnet differences for detail](/docs/eigenlayer/restaking-guides/0-restaking-user-guide/stage-2-testnet/README.md#testnet-vs-mainnet-differences).


**Step 6:** Manually Redeposit each asset. Visit each asset page individually. Navigate to the **Unstake** tab, click **Redeposit**. This will prompt a Redeposit transaction for each asset that you will confirm in your Web3 wallet.

**Step 7:** After all assets have been redeposited, visit the Operator page for the new operator you wish to delegate to. Click **Delegate** button.


![](/img/googleusercontentbackup/z3oR0kwjxB8nk66ebFuRRVh8T90fIpWSdEDvbaydgghNnmqrUxhb4RIRhO5HvtUdJfPMICshYA7NM9Ifn637zv8QJa9HUipLDPD_KcddXjAhVadRyrjyuKDQXdzHzKnmcYsHQC9dzxJqA9Pf1qdb8dQ.png)


**Step 8:** Observe that your delegation has been changed to the new Operator.


:::info
The **Redelegate** button on the Operator page is intended to be used only for users that have funds in a "partially delegated state".
:::