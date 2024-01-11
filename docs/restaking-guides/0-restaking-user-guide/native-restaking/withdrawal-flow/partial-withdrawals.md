---
sidebar_position: 1
---


# Partial Withdrawals

:::info
Due to how withdrawals from Ethereum are designed, users can only initiate one partial withdrawal per[ sequential sweep](https://ethereum.org/en/staking/withdrawals/#validator-sweeping) of all validators (which takes approximately 4-5 days).

All funds unstaked from EigenLayer go through a 7-day escrow period before being able to be withdrawn. Thus after you initiate your unstake, you must wait 7-days before being able to withdraw your assets.
:::

**Step 1:** Unstake - click **Unstake** to queue the withdrawal and initiate the escrow period.

![escrow](/img/restake-guides/native-partial-withdrawal1.png)

If successful, you should receive a confirmation.
Once the transaction confirms, you should see your EigenPod balance move to _Unstake pending:_

![confirm](/img/restake-guides/native-partial-withdrawal2.png)

**Step 2:** Wait for the escrow period to complete.

**Step 3:** Withdraw - upon completion of the escrow period. Click **Withdraw** to transfer the funds to your wallet.

![withdrawl](/img/restake-guides/native-partial-withdrawal3.png)

If successful, you should receive a confirmation.
