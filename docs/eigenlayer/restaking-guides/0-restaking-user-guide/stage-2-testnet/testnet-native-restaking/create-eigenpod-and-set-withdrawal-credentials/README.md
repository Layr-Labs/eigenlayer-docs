# Create EigenPod and Set Withdrawal Credentials

An [EigenPod](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/EigenPodManager.md) is a smart contract managed by users, designed to facilitate the EigenLayer protocol in monitoring and managing balance and withdrawal statuses. Please review the following considerations when planning your EigenPod and validator operations:

- You may repoint any number of validators to a single EigenPod.
- An Ethereum address can only deploy a single EigenPod.
- The address that deploys an EigenPod becomes the owner of the contract and gains permission for restaking and withdrawal operations.
- Ownership of an EigenPod cannot be transferred.

**Step 1:** Open the[ EigenLayer App](https://holesky.eigenlayer.xyz/) and connect your Web3 wallet, making sure you are connected to Ethereum mainnet.

![](/img/googleusercontentbackup/HNaZjUx0-Tp6xqPD7T6BVccmiXiwbTLD2g4jw4R87xpGw_XsTAqXXJ1eYIBOeYKZOaQ0RcYBsOr3OrZL0xUG8l6xumGHqAbByRFYHe6Qoe5zeUgHL2fYCWnCi1SNNgIkTIdj8db9t3LHVsAJi6qA5Ys.png)

**Step 2:** Review the Terms of Service & Privacy Policy. Click Sign to continue and accept the transaction in your wallet to continue.

![](/img/googleusercontentbackup/NAjPWmiVugcK4LBKRe-Sj8bZKf5c9oR-hRmvr0jeQg3XN-eUdlasEru71Zjb59p30QnF-7fUbflVfEMxnfqC9HdQJXV2zpo3E7x1HgJm91bNybpzYbo4er1cPO8fv514uyZVcdT6Xu8GVFQHA6iT1pI.png)

![](/img/googleusercontentbackup/iLPD5MfrJT8krjQtly8sUUiqKtpTWXD58Ajp_jfKNTnNcV07s8TD-A2H0GLyPOmTHvFUWGho7qjICYzzhAvpyTwJh_Mpiq_k6lMWsNL7H5ns9OCVRa6MnjMpFpNDkNakfdTPVRcElFSfslcVJTHByN0.png)

**Step 3:** Click **Create EigenPod**

![](/img/googleusercontentbackup/JmrdFSRiYNSe_77cpb8ut3ZEH4FIgyO1D4Sm76QM3mi6agrvsXQ1_I6t_CVnZ3hP3YRFrVGPvHWo7rQFxhYylYSO02XTQ02wKFjpRdN1auJDmGJAdJJ6ubmAJ0XfbiEbeH_4n9Aq0VDMBkD_I4g-n_0.png)

**Step 4:** Review the fee recipient warning and click **Create EigenPod**

![](/img/googleusercontentbackup/gCiv9UYN6M4LTyyb78MXQJ9GeXCW-Sf-23FgWOw9JHs7wRvuSjMlfejOVgcc6ymUE0Lu98ojF-k6MZzdeV45KmYlnCM_jjdoecJcdozIacCGqd0cFNet-hdZdJ9iwVkL9-kg9suCQQhkYF9364PK_yQ.png)

If successful, you should receive a confirmation and the EigenPod Address will be displayed:

![](/img/googleusercontentbackup/LWnVdggenjRiCYhEeXbCGbr_HxNcSQx2BlGJFcAVn7V65J7jCpXXYnRYSWp-na2RZ39ZaqthMqjrKBmwCaRXrI_wFM9q1W_Aqb1QF9lOuMqWkhNh1mnOQbcRCdQZtgX9aEC7n3sWFKC4B5VsLifP6Uc.png)

:::info
This address is responsible for all subsequent restaking and withdrawal activities associated with that EigenPod.
:::

:::danger
Validators SHOULD NOT direct execution rewards (`suggested_fee_recipient`) to their EigenPod. These funds may be irretrievably stuck.
:::
