---
description: How to restake and withdraw with Native Staking
---

# Native Restaking

Native Restaking is the process of pointing an Ethereum validator's [withdrawal credentials][ref1] to the user's [EigenPod][ref2]. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation][ref3].

:::info
Please read this entire guide before launching your new validator or integrating your existing validator. Before you deploy a new validator you must plan to either:
- Initially provision the withdrawal credentials to your EigenPod address (created on the next page).
- Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address. Note that you can only change the withdrawal credential for 0x00 validators once.
:::

Native Restaking on EigenLayer consists of the following actions:
1. [Verify Validator Withdrawal Prefix][ref4]
1. For existing 0x01 validators you need to [exit your validators][ref5].
1. [Create EigenPod][ref6].
1. Deploy New Validators and [Set Withdrawal Credentials][ref7] to your EigenPod or provision as 0x00 prefix to change later.
1. If deployed as 0x00 prefix you will need to [Set Withdrawal Credentials][ref8] Credentials to your EigenPod.
1. [Withdraw from EigenLayer][ref9].

[ref1]: https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals
[ref2]: ./create-eigenpod/README.md
[ref3]: https://launchpad.ethereum.org/
[ref4]: validator-eligibility-withdrawal-prefix.md
[ref5]: ./withdrawal-flow/withdrawing-a-validator-from-consensus-layer.md
[ref6]: ./create-eigenpod/README.md
[ref7]: repointing-a-validators-withdrawal-credentials.md
[ref8]: repointing-a-validators-withdrawal-credentials.md
[ref9]: ./withdrawal-flow/README.md