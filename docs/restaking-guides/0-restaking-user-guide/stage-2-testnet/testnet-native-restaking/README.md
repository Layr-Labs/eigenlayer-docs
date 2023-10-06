# Testnet Native Restaking

Native restaking describes the process of changing an Ethereum validator's[ withdrawal credentials](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-withdrawals) to EigenLayer's smart contracts. You must operate an Ethereum Validator node in order to participate in Native Restaking. To learn more or set up your Ethereum Validator please follow this link from the[ Ethereum Foundation](https://goerli.launchpad.ethereum.org/).

:::warning
Please read this entire guide before launching your new validator or integrating your existing validator.

Before you deploy a new validator you must plan to either:

- Initially provision the withdrawal credentials to your EigenPod address (created on the next page).
- Initially provision the withdrawal credentials to an 0x00 address. You can then later modify your withdrawal credentials to your EigenPod address.

:::

Native Restaking on EigenLayer consists of the following actions:

1. Create EigenPod and Setting Withdrawal Credentials
2. Repoint Validator Withdrawal Credentials
3. Withdraw from EigenLayer

**Deposit and Withdrawal Costs**

Native Restaking Deposit and Withdrawal transactions will incur additional gas fees due to the required proof verification. Restaking with EigenLayer requires proof of beacon chain staking and active validator status. This proof is generated off chain during Deposit and Withdrawal then verified on chain. The verification process will incur a gas fee of approximately 200k gas + a fixed fee per proof that will be around 0.01 ETH. Please plan and budget accordingly for associated costs.
