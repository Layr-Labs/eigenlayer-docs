# Create EigenPod and Set Withdrawal Credentials

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract used by EigenLayer to manage validator balance and withdrawal status. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address can only deploy a single EigenPod.
- The address that deploys an EigenPod becomes the owner of the contract and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

**Step 1:** Open the [EigenLayer App](http://app.eigenlayer.xyz/) and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.

**Step 2:** Click **Create Pod**:

![create-pod](/img/restake-guides/native-create-eigenpod1.png)

If successful, you will receive a confirmation. Observe that your EigenPod address is available on the right portion of the screen.

![pod-detail](/img/restake-guides/native-create-eigenpod3.png)


**Step 3:** Copy this address for future use setting your validator's withdrawal credentials.

![copy-address](/img/restake-guides/native-create-eigenpod4.png)

:::info
This address is responsible for all subsequent restaking and withdrawal operations from that EigenPod.
:::

:::warning
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::
