# Create EigenPod and Set Withdrawal Credentials

An [EigenPod][ref1] is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may point any number of validators to a single EigenPod.
- An Ethereum address can only deploy a single EigenPod.
- The address that deploys an EigenPod becomes the owner of the contract and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

**Step 1:** Open the [EigenLayer App][ref2] and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.

**Step 2:** Click **Create EigenPod**:

![create-pod][ref3]

If successful, you will receive a confirmation. Observe that your EigenPod address is available on the right portion of the screen.

![pod-detail][ref4]


**Step 3:** Copy this address for future use setting your validator's withdrawal credentials.

![copy-address][ref5]

:::info
This address is responsible for all subsequent restaking and withdrawal activities associated with that EigenPod.
:::

:::warning
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::

[ref1]: https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md
[ref2]: http://app.eigenlayer.xyz/
[ref3]: /img/restake-guides/native-create-eigenpod1.png
[ref4]: /img/restake-guides/native-create-eigenpod3.png
[ref5]: /img/restake-guides/native-create-eigenpod4.png