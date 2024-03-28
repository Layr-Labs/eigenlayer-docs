---
sidebar_position: 2
---

# Set Validator Withdrawal Credentials

:::info
If you do not know your withdrawal prefix, please review [Validator Withdrawal Prefix][ref1] before starting this guide.
:::

This guide provides a step-by-step walkthrough for users to set their validators' withdrawal credentials using one of three available methods: via [ethdo][ref2], through the [Consensus Client][ref3], or directly from their [staking hardware device][ref4].

### Option 1: ethdo

ethdo is a CLI developed by independent Ethereum contributors. It abstracts a lot of complexity and has clear documentation.

1. Install [ethdo][ref5]
2. Copy your **EigenPod address** from the EigenLayer app
3. Follow the [basic][ref6] or [advanced][ref7] guide for changing your validator's withdrawal credentials.

:::info
Input the address copied in **step 2** as the **`--withdrawal-address`** flag.
:::

4. Check that your validator has its withdrawal credentials correctly set by running the following command and replacing **VALIDATOR_INDEX** with your validator's index.

```
ethdo validator credentials get --validator=VALIDATOR_INDEX
```

5. Finally, navigate to the your EigenPod dashboard on the EigenLayer app and check that the number of restaked validators matches the number of validators whose withdrawal credentials you repointed:

![native-withdraw][ref8]

### Option 2: Consensus Client

Some consensus clients also have their own, implementation-specific, support for withdrawal credential repointing.

1. Copy your `EigenPod address` from the EigenLayer app.
2. Follow your validator's consensus client guide and set the withdrawal address to the **EigenPod address**.

- [Prysm][ref9]
- [Teku][ref10]
- [Lighthouse][ref11]
- [Nimbus][ref12]


For further information, please refer to the [notes][ref13] from the Ethereum organization

### Option 3: DAppNode, Avado, etc.

1. Use this tool: [https://github.com/stake-house/wagyu-key-gen/releases][ref14]
   - Click on "use existing recovery phrase" and generate BLS signature, which lets you unstake from the beacon chain and receive staking funds back in the execution layer.
   - We encourage airgapping (disconnect from the internet) while typing in your seed phrase.
2. Locate your validator ID in the Beacon chain explorer ([beaconcha.in][ref15])
3. Broadcast the signature you generated in step 1 using this tool: [https://beaconcha.in/tools/broadcast][ref16]

:::warning
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::

[ref1]: validator-eligibility-withdrawal-prefix.md "mention"
[ref2]: #option-1-ethdo
[ref3]: #option-2-consensus-client
[ref4]: #option-3-dappnode-avado-etc
[ref5]: https://github.com/wealdtech/ethdo
[ref6]: https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#basic-operation
[ref7]: https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#advanced-operation
[ref8]: /img/restake-guides/set-validator-withdrawal-credentials.png
[ref9]: https://docs.prylabs.network/docs/wallet/withdraw-validator#option-1-partial-earnings-withdrawals
[ref10]: https://docs.teku.consensys.net/HowTo/Withdrawal-Keys
[ref11]: https://lighthouse-book.sigmaprime.io/voluntary-exit.html#faq
[ref12]: https://nimbus.guide/withdrawals.html#updating-your-withdrawal-credentials
[ref13]: https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-How-do-I-fully-withdraw-exit-my-validator
[ref14]: https://github.com/stake-house/wagyu-key-gen/releases
[ref15]: https://beaconcha.in/
[ref16]: https://beaconcha.in/tools/broadcast