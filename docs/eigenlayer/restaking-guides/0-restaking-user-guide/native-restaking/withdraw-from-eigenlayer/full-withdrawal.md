---
sidebar_position: 2
---

# Full Withdrawal

Full Withdrawal is the process of unlocking the entire balance held by their validator, including both the initial stake and any accumulated rewards.

All funds unstaked from EigenLayer go through a escrow period before being able to be withdrawn. After you unstake and queue the withdrawal, you must wait for the escrow period to end before being able to withdraw your assets.

:::tip
Exits from the beacon chain can be completed in independently of (in parallel, at the same time as) queuing a Full Withdrawal from EigenLayer.  This optimization may reduce your overall (end to end) time required to withdraw Native restaked funds from EigenLayer.
:::

:::warning
Ensure you have [repointed your withdrawal credentials](../repointing-a-validators-withdrawal-credentials.md) to your EigenPod before proceeding.
:::
 
**Step 1:** Enter the amount you wish to withdraw in the text box next to the Unstake button.

You can queue a withdrawal for any amount. However, when you choose to complete the withdrawal, you will be required to exit enough validators and have the proofs generated for the required amount.

![](/img/googleusercontentbackup/Iil3RwJtYPpGzrPFVjgwUvYmHwTdUk2tExBTvAOEN-tTzXa83LXQIwr8F1oTHM561YQMCpHEqVZWggqE75pjAmduoIoHaBqY7HpnKWbkE6k46QQTeBvOfnFZ0KYLJSIUsXyeS0mCtOMZehMRmBxy_Q8.png)

**Step 2:** Click **Unstake**. **Sign** the transaction using your Web3 wallet.

**Step 3:** Wait for the escrow period to complete. Observe the Unstaking balance has increased during the escrow period.

![](/img/googleusercontentbackup/QZvihKxzjPXs4XBWp8xNZdsc8FmLl7VuJ0m5yom_TqgqiFkpROSVSqEr_4XdMWMmhD-ZcTVOjRYxEaTmwpQzIz87dJdgpNs79jDQvw7TKgNxIXr3P1OJCsWeKZoew4I2iG_6Phy5rlej99HvuoKnY-g.png)

**Step 4:** Observe the Unstaked Beacon Chain balance has increased after the escrow period.

:::warning
At this point you must exit your beacon chain validators prior to continuing. The validators must have completely exited from the validator queue before continuing. You may use [beaconcha.in](https://beaconcha.in) as a reference during this process.
:::

After your validators have exited, the Execution Chain amount should increase by the amount of those exited validators.

The Redeposit button is available at this point to allow the user to Restake back into EigenLayer in case the withdrawal was queued by mistake.

**Step 5:** Once your validator has been exited click Withdraw to complete your deposit. **Sign** the transaction using your Web3 wallet.

:::info
Redelegation is available for a user who accidentally queues a withdrawal, but would like to resume staking and delegation without having to exit and re-enter their validators from the beacon chain.
:::
