---
sidebar_position: 2
---

# Full Withdrawal

Full Withdrawal is the process of unlocking the entire balance held by their validator, including both the initial stake and any accumulated rewards. The following order of operations are required to complete a Full withdrawal of your natively restaked ETH and avoid proof generation errors.


**Step 1:** Ensure you have [repointed your validator's withdrawal credentials](../create-eigenpod-and-set-withdrawal-credentials/repointing-a-validators-withdrawal-credentials.md) to your EigenPod.

**Step 2:** Fully exit your validator from the beacon chain. You may monitor its activity via beaconcha.in/validator/[yourvalidatorindex] or [yourvalidatorpublickey] .

**Step 3:** Wait for the final beacon chain withdrawal to be deposited to your EigenPod. There can be a lag of up to 24 hours to 7 days between the validator appearing as "exited" and the withdrawal amount deposited to EigenPod. Please see the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/[yourvalidatorid]#withdrawals .

**Step 4:**. Queue the full withdrawal from your Eigenpod. Navigate to the **Beacon Ether** asset page in the (EigenLayer App)[https://app.eigenlayer.xyz/].

**Step 5:** Enter the amount in the text box next to the Unstake button.

You can queue a withdrawal for any amount. However, when you choose to complete the withdrawal, you will be required to exit enough validators and have the proofs generated for the required amount.

![](/img/googleusercontentbackup/Iil3RwJtYPpGzrPFVjgwUvYmHwTdUk2tExBTvAOEN-tTzXa83LXQIwr8F1oTHM561YQMCpHEqVZWggqE75pjAmduoIoHaBqY7HpnKWbkE6k46QQTeBvOfnFZ0KYLJSIUsXyeS0mCtOMZehMRmBxy_Q8.png)

**Step 6:** Click **Unstake**. **Sign** the transaction using your Web3 wallet.

**Step 7:** Wait for the escrow period to complete. Observe the Unstaking balance has increased during the escrow period.

![](/img/googleusercontentbackup/QZvihKxzjPXs4XBWp8xNZdsc8FmLl7VuJ0m5yom_TqgqiFkpROSVSqEr_4XdMWMmhD-ZcTVOjRYxEaTmwpQzIz87dJdgpNs79jDQvw7TKgNxIXr3P1OJCsWeKZoew4I2iG_6Phy5rlej99HvuoKnY-g.png)

**Step 8:** Observe the Unstaked Beacon Chain balance has increased after the escrow period. The Execution Chain amount should have increased by the amount of those exited validators.

:::info
The Redeposit button is available at this point to allow the user to Restake back into EigenLayer in case the withdrawal was queued by mistake.
:::

**Step 9:** Click Withdraw to complete your withdrawal. **Sign** the transaction using your Web3 wallet.

:::info
Redelegation is available for a user who accidentally queues a withdrawal, but would like to resume staking and delegation without having to exit and re-enter their validators from the beacon chain.
:::
