---
sidebar_position: 1
---

# Partial Withdrawals

:::info
Due to how withdrawals from Ethereum are designed, users can only initiate one partial withdrawal per[ sequential sweep](https://ethereum.org/en/staking/withdrawals/#validator-sweeping) of all validators (which takes approximately 4-5 days).

All funds unstaked from EigenLayer go through a escrow period before being able to be withdrawn. After you unstake and queue the withdrawal, you must wait for the escrow period to end before being able to withdraw your assets.
:::

Partial withdrawals require on-chain proofs in order to process the withdrawal. Please consider deferring your withdrawals until full withdrawals are needed due to the gas costs associated with the proof.

The verification process will incur a gas fee of approximately 200k gas + some fixed gas per proof. Each of these proofs will be able to prove up to 20 beacon chain withdrawals (batched into one transaction). The user will be prompted to sign additional transactions - one per each additional batch.

**Step 1:** Note the values for "Validator ETH Yield" and "Redeemable". 
:::warning
The Redeemable value may temporarily appear lower than the Validator ETH Yield (beacon chain) due to:
1. The time lag associated with Ethereum beacon chain validator sweeps, which can be up to 65812 slots or 9 days. Please see the Ethereum docs [here](https://ethereum.org/en/staking/withdrawals/#validator-sweeping) for more information.
1. The time lag associated with the EigenLayer beacon chain oracle. This sync occurs approximately every 4 hours.
:::


**Step 2:** Click **Redeem** to initiate the escrow period.

**Step 3:** Observe the gas fee warning. Click **Continue**.

**Step 4:** Enter the amount you wish to withdraw. Click **Confirm**.

If the Awaiting Restake value is greater than zero, the confirmation step above will generate proofs to restake that amount first.

**Step 5:** Observe the Fetching Proofs status message. Proofs will be submitted on chain and you will be prompted to sign the transaction to proceed.

Note: if the user has more than 16 partial withdrawal transactions queued on the beacon chain, additional transactions will be generated for each batch of partial withdrawals in increments of 16 partial withdrawals.

Observe the Unstaking balance has increased after the transaction is confirmed on chain.

**Step 6:** Click **Withdraw** after the escrow period to withdraw funds. Two wallet transactions will be generated for you to approve and proceed.

Observe your funds have been sent to your wallet.
