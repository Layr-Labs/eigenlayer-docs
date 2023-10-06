---
description: >-
  This guide is intended to help you withdraw from Ethereum consensus and
  EigenLayer with 32ETH + staking rewards
---

# Full Withdrawals

:::info
Ensure you have already [repointed your withdrawal credentials ](../repointing-a-validators-withdrawal-credentials.md) to your EigenPod before proceeding.

All funds unstaked from EigenLayer Mainnet go through a 7-day escrow period before being able to be withdrawn. Thus after you initiate your unstake, you must wait 7-days before being able to withdraw your assets.
:::

**Step 1:** Withdraw from Ethereum

First, [initiate a withdrawal](withdrawing-a-validator-from-consensus-layer.md) from your consensus client to your EigenPod contract.&#x20;

Once you withdraw from Ethereum, your staked ETH balance is credited to your EigenPod address and can be viewed on the EigenLayer app.

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-23 at 2.04.08 PM.png" alt=""/><figcaption></figcaption></figure>

**Step 2:** Unstake

Click **Unstake** to initiate the 7-day escrow period. Once the transaction confirms, you should see your EigenPod balance move to _Unstake pending_**:**

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-23 at 2.09.26 PM.png" alt=""/><figcaption></figcaption></figure>

**Step 3:** Withdraw

Upon completion of the 7-day escrow, click **Withdraw** to transfer the ETH to your wallet:

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-23 at 2.12.35 PM.png" alt=""/><figcaption></figcaption></figure>

If successful, you should receive the following confirmation:

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-23 at 2.13.15 PM.png" alt=""/><figcaption></figcaption></figure>
