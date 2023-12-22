# Create EigenPod and Set Withdrawal Credentials

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract used by EigenLayer to manage validator balance and withdrawal status. Please review the following considerations when planning your EigenPod and validator operations:

* You may repoint any number of validators to a single EigenPod.
* An Ethereum address can only deploy a single EigenPod.
* The address that deploys an EigenPod becomes the owner of the contract, and gains special permissions.
* Ownership of an EigenPod cannot be transferred.



**Step 1:** Open the [EigenLayer App](http://app.eigenlayer.xyz/) and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.



**Step 2:** Click **Create Pod**:

<figure><img src="../../../../.gitbook/assets/Screen Shot 2023-06-14 at 12.02.49 PM.jpeg" alt=""/><figcaption></figcaption></figure>

If successful, you should receive the following confirmation:

<figure><img src="../../../../.gitbook/assets/Screen Shot 2023-06-14 at 12.02.57 PM.jpeg" alt=""/><figcaption></figcaption></figure>

Click **Pod Details** to view your EigenPod address:

<figure><img src="../../../../.gitbook/assets/Screen Shot 2023-06-14 at 12.03.34 PM.jpeg" alt=""/><figcaption></figcaption></figure>

<figure><img src="../../../../.gitbook/assets/Screen Shot 2023-06-14 at 12.07.05 PM.jpeg" alt=""/><figcaption></figcaption></figure>

**Copy** this address.

{% hint style="info" %}
This address is responsible for all subsequent restaking and withdrawal operations from that EigenPod.
{% endhint %}

{% hint style="warning" %}
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
{% endhint %}
