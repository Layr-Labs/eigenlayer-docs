---
sidebar_position: 1
---

# Create EigenPod and Set Withdrawal Credentials

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address can only deploy a single EigenPod.
- The address that deploys an EigenPod becomes the owner of the contract and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

**Step 1:** Open the [EigenLayer App](https://app.eigenlayer.xyz/) and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.

![](/img/restake-guides/native-create-pod1.png)

**Step 2:** Click **Create EigenPod** to continue.

**Step 3:** Click **Create EigenPod**

![](/img/restake-guides/native-create-pod2.png)

If successful, you should receive a confirmation and the EigenPod Address will be displayed:
![](/img/restake-guides/native-create-pod3.png)

:::info
This address is responsible for all subsequent restaking and withdrawal activities associated with that EigenPod.
:::

