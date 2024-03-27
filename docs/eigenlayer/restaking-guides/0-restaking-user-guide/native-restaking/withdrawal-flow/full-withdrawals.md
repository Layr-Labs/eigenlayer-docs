---
sidebar_position: 2
---

# Full Withdrawals

:::info
Ensure you have already [repointed your withdrawal credentials ][ref1] to your EigenPod before proceeding.

All funds unstaked from EigenLayer Mainnet go through a 7-day escrow period before being able to be withdrawn. Thus after you initiate your unstake, you must wait 7-days before being able to withdraw your assets.
:::

**Step 1:** Withdraw your validator from Ethereum - [initiate a withdrawal][ref2] from your consensus client to your EigenPod contract. 

**Step 2:** Wait for your validator to fully exit the validator queue. A full exit from the validator queue is required, which can take multiple days. Please refer to [validatorqueue.com][ref3] for the latest expected timing.

Once the validator withdrawal from Ethereum is completed, your staked ETH balance is credited to your EigenPod address and can be viewed on the EigenLayer app.

![withdrawal][ref4]

**Step 3:** Unstake - click **Unstake** to initiate the 7-day escrow period. Once the transaction confirms, you should see your EigenPod balance move to _Unstake pending_

![withdrawal-unstake][ref5]

**Step 4:** Wait for the 7-day escrow period to complete.

**Step 5:** Withdraw your ETH. Click **Withdraw** to transfer the ETH to your wallet

![pending][ref6]

If successful, you will receive a confirmation.

[ref1]: ../repointing-a-validators-withdrawal-credentials.md
[ref2]: withdrawing-a-validator-from-consensus-layer.md
[ref3]: https://www.validatorqueue.com/
[ref4]: /img/restake-guides/native-full-withdrawal1.png
[ref5]: /img/restake-guides/native-full-withdrawal2.png
[ref6]: /img/restake-guides/native-full-withdrawal3.png