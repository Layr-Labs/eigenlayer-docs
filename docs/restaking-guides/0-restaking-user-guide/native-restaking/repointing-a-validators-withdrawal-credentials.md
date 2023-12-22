# Set Validator Withdrawal Credentials

{% hint style="info" %}
If you do not know your withdrawal prefix, please review [validator-eligibility-withdrawal-prefix.md](validator-eligibility-withdrawal-prefix.md "mention") before starting this guide.
{% endhint %}

### Option 1: ethdo

ethdo is a CLI developed by independent Ethereum contributors. It abstracts a lot of complexity and has clear documentation.

1. Install [ethdo](https://github.com/wealdtech/ethdo)
2. Copy your **EigenPod address** from the EigenLayer app
3. Follow the [basic](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#basic-operation) or [advanced](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md#advanced-operation) guide for changing your validator's withdrawal credentials.&#x20;

{% hint style="info" %}
**I**nput the address copied in **step 2** as the **`--withdrawal-address`** flag.
{% endhint %}

4. Check that your validator has its withdrawal credentials correctly set by running the following command and replacing **VALIDATOR\_INDEX** with your validator's index.

```shell
ethdo validator credentials get --validator=VALIDATOR_INDEX
```

5. Finally, navigate to the your EigenPod dashboard on the EigenLayer app and check that the number of restaked validators matches the number of validators whose withdrawal credentials you repointed:

<figure><img src="../../../.gitbook/assets/telegram-cloud-photo-size-1-5176911445978360756-y.jpg" alt=""/><figcaption></figcaption></figure>

### Option 2: Consensus Client

Some consensus clients also have their own, implementation-specific, support for withdrawal credential repointing.

1. Copy your `EigenPod address` from the EigenLayer app.
2. Follow your validator's consensus client guide.

{% hint style="success" %}
Input the **EigenPod address** copied as the withdrawal address.
{% endhint %}

* [Prysm](https://docs.prylabs.network/docs/wallet/withdraw-validator#option-1-partial-earnings-withdrawals)
* [Teku](https://docs.teku.consensys.net/HowTo/Withdrawal-Keys)
* [Lodestar](https://chainsafe.github.io/lodestar/reference/cli/#validator-bls-to-execution-change)

{% hint style="info" %}
For further information, please refer to the [notes](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-How-do-I-fully-withdraw-exit-my-validator) from the Ethereum organization &#x20;
{% endhint %}

### Option 3: DAppNode, Avado, etc.

1. Use this tool: [https://github.com/stake-house/wagyu-key-gen/releases](https://github.com/stake-house/wagyu-key-gen/releases)&#x20;
   * Click on "use existing recovery phrase" and generate BLS signature, which lets you unstake from the beacon chain and receive staking funds back in the execution layer.
   * We encourage airgapping (disconnect from the internet) while typing in your seed phrase.
2. Locate your validator ID in the Beacon chain explorer ([beaconcha.in](https://beaconcha.in/))
3. Broadcast the signature you generated in step 1 using this tool: [https://beaconcha.in/tools/broadcast](https://beaconcha.in/tools/broadcast)

{% hint style="warning" %}
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
{% endhint %}
