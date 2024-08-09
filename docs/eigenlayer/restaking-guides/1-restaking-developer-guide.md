
# Restaking Developer Guide

Smart Contract Restaking allows the user to interact directly with the EigenLayer core contracts. The following sections describe how to setup your Restaking integration with the EigenLayer contracts directly with no reliance on the EigenLayer Web App.

The Smart Contract Restaking user guides below serve as a high level overview of the most important steps for required for Restaking.

Please note the following resources are available for users that wish to take a deeper dive on the contracts:
* [EigenLayer Protocol Developer Docs](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs): detailed protocol specifications for restaking smart contract integration developers.
* [EigenLayer Protocol Contract Addresses](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments): deployed contract addresses for Mainnet and Testnet.
* [EigenLayer Protocol Integration Tests](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/test/integration): tests that serve as examples on how to interact with the EigenLayer core contracts.





# Smart Contract Liquid Restaking User Guide

## Steps to Deposit (Restake) Liquid Tokens

1. For the token being deposited, invoke ERC20(token).approve(StrategyManager, amount) to authorize EigenLayer contracts before depositing.
2. Call StrategyManager.depositIntoStrategy() .
3. User is now actively Restaked.

## Steps to Withdraw (Unstake) Liquid Tokens

1. Queue Withdrawal: call DelegationManager.queueWithdrawal() to trigger the escrow period. Wait for Escrow Period: 24 days for $EIGEN, 7 days for all other tokens. Please see further detail [here](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/#escrow-period-withdrawal-delay).

2. Complete Withdrawal as Tokens: call DelegationManager.completeQueuedWithdrawal() to complete the withdrawal and return assets to the withdrawer's wallet.


# Smart Contract Delegation User Guide

The process of Delegating assets is the same for both liquid and native restaked assets. The user's Restaking wallet must Delegate all restaked assets to a single Operator. After the initial Delegate operation - any subsequent Deposited (Restaked) assets are also automatically delegated to the current operator.

## Steps to Delegate Assets

1. Call DelegationManager.delegateTo()
   a. operator: the address of the operator you want to delegate to.
   b. approverSignatureAndExpiry: can be left blank.
   c. approverSalt: can be left blank.
2. Your Restaked assets are now delegated.

## Steps to Change Actively Delegated Operator

_Coming Soon_ In the meantime, please see the smart contract specifications above and the high level process walkthrough [here](./0-restaking-user-guide/restaker-delegation/redelegation-process.md).


# Smart Contract Native Restaking User Guide

For users planning to restake multiple validators, we recommend they connect many validators to a single EigenPod in order to reduce cost and complexity where possible. "Generate Proof Via eigenpod-proofs-generation CLI" will prove all connected validators.

## PEPE Release

EigenLayer core contracts have had two previous major releases: M1 and M2. PEPE (Protocol: EigenPod Enhancement upgrade) is the current major release that focuses primarily on enhancements to Native Restaking and EigenPod design. The PEPE release will result in significantly lower gas fees and great compatibility with future scheduled Ethereum network upgrades.

Please see the [this document](https://hackmd.io/@-HV50kYcRqOjl_7du8m1AA/SkJPfqBeC) and [PR #515](https://github.com/Layr-Labs/eigenlayer-contracts/pull/515) for a design history and motivation for the PEPE Release.


## EigenPod Upgrades and Pending Consensus Rewards

For all M1 to PEPE migrations - we no longer require users to upgrade their EigenPod contracts per the deprecated activateRestaking() method. M1 pods will be upgraded automatically to PEPE compliant EigenPods by EigenLabs.

The delayed withdrawal router is being deprecated with the PEPE release, but will remain functional. It will not receive new consensus rewards from EigenPods, however if you have existing rewards you may continue to claim them as they become claimable.

To claim consensus rewards invoke DelayedWithdrawalRouter.claimDelayedWithdrawals().
References:
* [DelayedWithdrawalRouter.claimDelayedWithdrawals](https://github.com/Layr-Labs/eigenlayer-contracts/blob/3b47ccf0ff98dc3f08befd24e3ae70d7ecce6342/src/contracts/pods/DelayedWithdrawalRouter.sol#L94)
* [Contract Deployment Addresses](https://github.com/Layr-Labs/eigenlayer-contracts/tree/v0.3.2-mainnet-rewards?tab=readme-ov-file#deployments): find the Proxy address of DelayedWithdrawalRouter here.

Eigen Labs will push through any rewards that are still in the delayed withdrawal router 7 days after the PEPE upgrade (after which point all rewards in there will be claimable). So if you haven’t claimed by this point, we’ll automatically process those claims on your behalf and send them to the wallet of the EigenPod owner.


## Prerequisites

The user will need an environment available to run the [EigenPod Proof Gen CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#quickstart) including its software prerequisites.


## Key Management and EigenPod Proof Submitter

EigenLayer Native Restaking requires submitting proofs to EigenLayer contracts to prove the amount of validator ETH is active and its withdrawal address is pointing to the EigenPod. For users who do not wish to include the "EigenPod Owner" (aka The EigenPod generation key) in their proof generation commands, you may identify another wallet as the **Proof Submitter** and delegate its privilege to submit proofs on its behalf using the assign_submitter command. At any point in the future the `sender` of the proof can be the assigned submitter. The EigenPod owner can also designate a new Proof Submitter as needed.

Use the following command to assign a submitter for your EigenPod:
```bash
/cli assign-submitter --execNode $NODE_ETH --podAddress $EIGENPOD_ADDRESS --sender $EIGENPOD_OWNER_PK
```

Consider using a cold key for the EigenPod Owner role. This key should be stored securely and used infrequently. For cold keys, we recommend using hardware wallets (e.g., Ledger, HSMSs) or smart contract multisigs (e.g., Safe). 

We strongly recommend using a seperate key for the Proof Submitter, which can be considered a hot key. The Proof Submitter is any other address approved to submit proofs on behalf of the EigenPod owner. This separation allows the EigenPod owner key to remain secure and cold. Hot keys, while less secure, can be managed with solutions like Vault (Hashicorp) or environment variables. It is crucial not to store any meaningful value in your hot keys as operational keys are considered less secure. 



## Steps to Restake New Validator Native Beacon Chain ETH

The steps below are only required for new validator native beacon chain ETH. Any validator native beacon chain ETH that was restaked prior to the PEPE release will not need to repeat these steps.

### Part 1: Create EigenPod

Call EigenPodManager.createPod() .  

### Part 2: Configure validator(s) withdrawal credentials

1. Configure the validator(s) credentials to point to the EigenPod address when the validator is created. Please see [Ethereum Launchpad](https://launchpad.ethereum.org/en/withdrawals#enabling-withdrawals) for more information. 
    a. Optional: you may choose to set the FEE_RECIPIENT to your EigenPod address if you wish to Restake those fees.

2. Wait for the validator(s) to become active on-chain. Please see https://beaconcha.in/ to follow your validator status.

3. Run the `status` command via the [EigenPod Proofs Generation CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#proof-generation). The command will confirm the withdrawal address is set correctly and the validator is active on the beacon chain.

![](/img/restake-guides/native-cli-status.png)


### Part 3: Link the Validator to the EigenPod via Proof Generation

1. Run the `credentials` command via the [EigenPod Proofs Generation CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#proof-generation).
    

2. Invoke the `credentials` command with the `--sender $EIGENPOD_OWNER_PK` argument so that CLI will submit proofs and act onchain for you. This is the private key of the wallet that was used to create the EigenPod. Example here:
```bash
./cli credentials --execNode $NODE_ETH --beaconNode $NODE_BEACON --podAddress $EIGENPOD_ADDRESS --sender $EIGENPOD_OWNER_PK
```


Your validator ETH balance is now Restaked.




## Steps to Convert Consensus Rewards to Restaked Shares

As of the PEPE release, users can now convert consensus rewards and validator execution fees to restaked shares.  Initiating and completing a checkpoint proof will automatically convert any consensus rewards to restaked shares for the EigenPod.

1. Check the status command via `./cli status` to determine how many additional shares the user would gain from completing a checkpoint at this time.
2. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint. This command will both start the checkpoint and run verify proofs until the checkpoint is completed.


### Checkpoint Frequency

Users should not initiate a checkpoint more frequently than once every two weeks (approximately). 
The longer you wait before performing a checkpoint, the more gas users will save. The gas cost of a checkpoint is the same, regardless of how many consensus rewards will be proven. Each user should determine the best interval to fit their gas cost and restaking benefit needs.

Consensus rewards are moved from the beacon chain to your EigenPod once every approximately 8 days per the Ethereum protocol. Checkpoint intervals more frequently than 8 days would result in no benefit for the user.


## Steps to Withdraw Validator Restaked Balance

1. Validator Exit
   1. Fully exit the Validator. You may monitor its activity via [beaconcha.in/validator/\[yourvalidatorid](http://beaconcha.in/validator/\[yourvalidatorid)\] .
   2. Wait for the final beacon chain withdrawal to be deposited to your EigenPod. There can be a lag of up to 24 hours to 7 days between the validator appearing as "exited" and the withdrawal amount deposited to EigenPod.  Please see the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/\[yourvalidatorid\]#withdrawals . The ETH will then be recognized in the EigenPod.
2. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.
3. Call the DelegationManager.queueWithdrawal() function. 
   * At this point the user's restaked is reduced by the number of shares sent to the queueWithdrawal() function.
4. Wait for Escrow Period to complete.
5. Call DelegationManager.completeQueuedWithdrawal().


## Steps to Withdraw Yield Only

This process is intended to allow users to withdraw yield (beacon chain consensus rewards, execution fees, and ETH) from the EigenPod.

1. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.
2. Invoke the DelegationManager.queueWithdrawal() function with the amount of the yield to be withdrawn. This function can only be invoked by the **EigenPod Owner wallet**. 
   * Parameters: please see the [QueuedWithdrawalParams](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v0.3.2-mainnet-rewards/src/contracts/interfaces/IDelegationManager.sol#L93)
      * strategies - use the Beacon chain ETH strategy (`0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0`).
      * shares - amount of yield in wei.
      * withdrawer - address of the EigenPod owner.
3. Wait for Escrow Period to complete (7 days).
4. Call DelegationManager.completeQueuedWithdrawal(). This function can only be invoked by the **EigenPod Owner wallet**.


