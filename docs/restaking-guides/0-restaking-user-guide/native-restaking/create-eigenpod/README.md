# Create EigenPod and Set Withdrawal Credentials

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract used by EigenLayer to manage validator balance and withdrawal status. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address can only deploy a single EigenPod.
- The address that deploys an EigenPod becomes the owner of the contract and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

**Step 1:** Open the [EigenLayer App](http://app.eigenlayer.xyz/) and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.

**Step 2:** Click **Create Pod**:

![create-pod](/img/restake-guides/native-1-create-pod.jpeg)

If successful, you should receive the following confirmation:

![confirm-pod](/img/restake-guides/native-2-confirm-pod.jpeg)

Click **Pod Details** to view your EigenPod address:

![pod-detail](/img/restake-guides/native-3-pod-details.jpeg)
![pod-address](/img/restake-guides/native-4-pod-address.jpeg)

**Copy** this address.

:::info
This address is responsible for all subsequent restaking and withdrawal operations from that EigenPod.
:::

:::warning
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::
