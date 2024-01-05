---
sidebar_position: 2
---

# Set Validator Withdrawal Credentials

:::info
If you do not know your withdrawal prefix, please review [validator-eligibility-withdrawal-prefix.md](validator-eligibility-withdrawal-prefix.md "mention") before starting this guide.
:::

### Option 1: ethdo

ethdo is a CLI developed by independent Ethereum contributors. It abstracts a lot of complexity and has clear documentation.

1. Install [ethdo](https://github.com/wealdtech/ethdo)
2. Copy your **EigenPod address** from the EigenLayer app
3. Follow the [basic](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#basic-operation) or [advanced](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#advanced-operation) guide for changing your validator's withdrawal credentials.

:::info
Input the address copied in **step 2** as the **`--withdrawal-address`** flag.
:::

4. Check that your validator has its withdrawal credentials correctly set by running the following command and replacing **VALIDATOR_INDEX** with your validator's index.

```
ethdo validator credentials get --validator=VALIDATOR_INDEX
```

5. Finally, navigate to the your EigenPod dashboard on the EigenLayer app and check that the number of restaked validators matches the number of validators whose withdrawal credentials you repointed:

![native-withdraw](/img/restake-guides/native-withdraw-1.jpg)

### Option 2: Consensus Client

Some consensus clients also have their own, implementation-specific, support for withdrawal credential repointing.

1. Copy your `EigenPod address` from the EigenLayer app.
2. Follow your validator's consensus client guide.

:::success
Input the **EigenPod address** copied as the withdrawal address.
:::

- [Prysm](https://docs.prylabs.network/docs/wallet/withdraw-validator#option-1-partial-earnings-withdrawals)
- [Teku](https://docs.teku.consensys.net/HowTo/Withdrawal-Keys)
- [Lodestar](https://chainsafe.github.io/lodestar/reference/cli/#validator-bls-to-execution-change)

:::info
For further information, please refer to the [notes](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-How-do-I-fully-withdraw-exit-my-validator) from the Ethereum organization
:::

### Option 3: DAppNode, Avado, etc.

1. Use this tool: [https://github.com/stake-house/wagyu-key-gen/releases](https://github.com/stake-house/wagyu-key-gen/releases)
   - Click on "use existing recovery phrase" and generate BLS signature, which lets you unstake from the beacon chain and receive staking funds back in the execution layer.
   - We encourage airgapping (disconnect from the internet) while typing in your seed phrase.
2. Locate your validator ID in the Beacon chain explorer ([beaconcha.in](https://beaconcha.in/))
3. Broadcast the signature you generated in step 1 using this tool: [https://beaconcha.in/tools/broadcast](https://beaconcha.in/tools/broadcast)

:::warning
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::
