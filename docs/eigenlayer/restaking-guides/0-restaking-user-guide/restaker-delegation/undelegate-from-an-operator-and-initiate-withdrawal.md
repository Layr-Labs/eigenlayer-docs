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

![](/img/googleusercontentbackup/SzsWbRMQ-9NYYfah1kBT89hfCZSEvd04Rtk_G1J1en31FbZHEYalivDgIsH-E7sHrKtLQUEFIcq7CdmMvCrFXO3_qYpts5t__y3YMSuqH3GiQa95MrE-BRfHlFDkaqlAolLVXCiybmHm48TZdRLEQMI.png)

**Step 2:** Confirm the two transactions in your Web3 wallet.

**Step 3:** Observe that your Restaked balances are now 0.0 TVL.

![](/img/googleusercontentbackup/DStQhIFho5ga5_1h945XDiJGtnQvrEy_KzXm1jnhCCysFWJCV2JoOSnEY4xX35loBDGw-tjjoWq_vUAGICkyR9Gz0eUplNKsuDJkp73rFOFMwd2NQYE5Gs_cVZ7riCGsF7j86PARHtyhf14PH3sKb2Y.png)

**Step 4:** Visit the pages for your unstaked assets and to observe your **Unstaked** balance has increased the corresponding amount.

**Step 5:** Wait for the escrow period to end before continuing. Please see [Testnet vs Mainnet differences for detail](/docs/eigenlayer/restaking-guides/0-restaking-user-guide/testnet/README.md#testnet-vs-mainnet-differences).

**Step 6:** Click **Withdraw** to finalize the withdrawal.

![](/img/googleusercontentbackup/7-TpReNxUQnJlp0W_KqCyaQf7osXcMwHFDKaAybtmTUgEhGmdHreUrAE0jPj7ZZisKqaLhIhkZtksYFz3r8_KShhr-92FyA6pERdXbQhzZQ4bZlceEDIKhR-M_wutvom_JTc8E9h-GSfl3jxDxdf6EE.png)

:::info
The "Redeposit" button is also available for the user to Restake funds if the withdrawal was initiated by mistake.
:::
