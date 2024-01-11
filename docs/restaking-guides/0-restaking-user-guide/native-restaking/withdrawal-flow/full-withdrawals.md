---
sidebar_position: 2
---

# Full Withdrawals

:::info
Ensure you have already [repointed your withdrawal credentials ](../repointing-a-validators-withdrawal-credentials.md) to your EigenPod before proceeding.

All funds unstaked from EigenLayer Mainnet go through a 7-day escrow period before being able to be withdrawn. Thus after you initiate your unstake, you must wait 7-days before being able to withdraw your assets.
:::

**Step 1:** Withdraw your validator from Ethereum - [initiate a withdrawal](withdrawing-a-validator-from-consensus-layer.md) from your consensus client to your EigenPod contract. 

**Step 2:** Wait for your validator to fully exit the validator queue. A full exit from the validator queue is required, which can take multiple days. Please refer to [validatorqueue.com](https://www.validatorqueue.com/) for the latest expected timing.

Once the validator withdrawal from Ethereum is completed, your staked ETH balance is credited to your EigenPod address and can be viewed on the EigenLayer app.

![withdrawal](/img/restake-guides/native-full-withdrawal1.png)

**Step 3:** Unstake - click **Unstake** to initiate the 7-day escrow period. Once the transaction confirms, you should see your EigenPod balance move to _Unstake pending_

![withdrawal-unstake](/img/restake-guides/native-full-withdrawal2.png)

**Step 4:** Wait for the 7-day escrow period to complete.

**Step 5:** Withdraw your ETH. Click **Withdraw** to transfer the ETH to your wallet

![pending](/img/restake-guides/native-full-withdrawal3.png)

If successful, you will receive a confirmation.
