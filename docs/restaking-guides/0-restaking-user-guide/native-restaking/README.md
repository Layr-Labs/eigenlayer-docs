---
description: How to restake and withdraw with Native Staking
---

# Native Restaking

Native Restaking is the process of pointing an Ethereum validator's [withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to the user's EigenPod. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://goerli.launchpad.ethereum.org/).

:::info
Please read this entire guide before launching your new validator or integrating your existing validator.

Before you deploy a new validator you must plan to either:

- Initially provision the withdrawal credentials to your EigenPod address (created on the next page).
- Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address. Note that you can only change the withdrawal credential for 0x00 validators once.

:::

Native Restaking on EigenLayer consists of the following actions:

[Verify Validator Withdrawal Prefix](validator-eligibility-withdrawal-prefix.md)

1. For existing 0x01 validators you need to exit your validators.
2. Create EigenPod.
3. Deploy New Validators and Set Withdrawal Credentials to your EigenPod or provision as 0x00 prefix to change later.
4. If deployed as 0x00 prefix you will need to Set Validator Withdrawal Credentials to your EigenPod.
5. Withdraw from EigenLayer.
