---
description: How to restake and withdraw with Native Staking
---

# Native Restaking

Native Restaking is the process of pointing an Ethereum validator's [withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to the EigenLayer smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking.  To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://goerli.launchpad.ethereum.org/).

{% hint style="info" %}
Please read this entire guide before launching your new validator or integrating your existing validator.



Before you deploy a new validator you must plan to either:

* Initially provision the withdrawal credentials to your EigenPod address (created below).
* Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address.
{% endhint %}



Native Restaking on EigenLayer consists of the following actions:

1. Create EigenPod and Setting Withdrawal Credentials
2. Repoint Validator Withdrawal Credentials
3. Withdraw from EigenLayer

