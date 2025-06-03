---
sidebar_position: 3
title: Restaking Smart Contract Developer
---



Smart Contract Restaking allows the user to interact directly with the EigenLayer core contracts. The following sections describe how to setup your Restaking integration with the EigenLayer contracts directly with no reliance on the EigenLayer Web App.

Key EigenLayer Protocol references for this guide:
* [Source Code](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/contracts): for all the following references to EigenLayer core contracts and functions, please see the src/contracts folder for their source code.
* [Developer Documentation (specifications)](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs): detailed protocol specifications for restaking smart contract integration developers.
* [Deployed Contract Addresses](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments): deployed contract addresses for Mainnet and Testnet.
* [Integration Tests](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/test/integration): tests that serve as examples on how to interact with the EigenLayer core contracts.

## Liquid Restaking Guide

The following sections describe the steps to Restake "liquid" tokens (including LSTs EIGEN token, and any ERC20 token).

### Deposit (Restake) Liquid Tokens

1. For the token being deposited, invoke ERC20(token).approve(StrategyManager, amount) to authorize EigenLayer contracts before depositing.
2. Invoke `StrategyManager.depositIntoStrategy()` .
   * Parameters:
     * `strategy` - use the address of the deployed strategy ([example list here](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments)).
     * `token` - use the address of the token associated with that strategy.
4. User is now actively Restaked.

### Withdraw (Unstake) Liquid Tokens

1. Queue Withdrawal: invoke `DelegationManager.queueWithdrawal()` to trigger the escrow period. Wait for Escrow Period: 7 days. Please see further detail [here](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/#escrow-period-withdrawal-delay).
   * Parameters: please see the [QueuedWithdrawalParams](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v0.3.2-mainnet-rewards/src/contracts/interfaces/IDelegationManager.sol#L93)
   * `strategy` - use the address of the deployed strategy ([example list here](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments)).
   * `shares` - the number of shares in the given strategy. Note this parameter is not meant to reference the amount of the underlying token. Invoke `[Strategy].underlyingToShares()` and `[Strategy].sharesToUnderlying()` as needed to convert their current balances between strategy shares and underlying token amounts.

2. Complete Withdrawal as Tokens: invoke `DelegationManager.completeQueuedWithdrawal()` to complete the withdrawal and return assets to the withdrawer's wallet.


## Smart Contract Delegation User Guide

The process of Delegating assets is the same for both liquid and native restaked assets. The user's Restaking wallet must Delegate all restaked assets to a single Operator. After the initial Delegate operation - any subsequent Deposited (Restaked) assets are also automatically delegated to the current operator.

### Delegate Assets

1. Invoke `DelegationManager.delegateTo()`. Please observe the following notes on the parameters:
   a. operator: the address of the operator you want to delegate to.
   b. approverSignatureAndExpiry: can be left blank.
   c. approverSalt: can be left blank.
2. Your Restaked assets are now delegated.

### Change Actively Delegated Operator


The following steps are necessary for a Restaker to **move** their Delegated balance to a New Operator. The process below requires users to perform each of the following steps in order:
- **Undelegate** assets, which 
- **Redeposit** each asset.
- **Delegate** to the new Operator.

1. Undelegate: invoke `DelegationManager.undelegate()`.
   * Note: this action automatically **queues a withdrawal for all restaked assets**. The Undelegate and Queue Withdrawal transactions are intentionally combined due to the security architecture of EigenLayer smart contracts.
2. Wait for the Escrow Period to complete.
3. Invoke DelegationManager.completeQueuedWithdrawal(). **Important:** you will choose to complete the withdrawal as shares, which is effectively a **redeposit** action.
   * `receiveAsTokens` should be set to _false_.
4. Invoke `DelegationManager.delegateTo()` to delegate your restaked assets to the new Operator.





## Native Restaking Guide

The following instructions describe how to Restake validator ETH. This mechanism is referred to as "Native Restaking".

Native Restaking consists of the following actions:
* [Restake New Validator Native Beacon Chain ETH](#restake-new-validator-native-beacon-chain-eth)
* [Convert Consensus Rewards to Restaked Shares](#convert-consensus-rewards-to-restaked-shares)
* [Withdraw](#withdraw)

### Gas Cost Planning

For users planning to restake multiple validators, connecting many validators to a single EigenPod where possible reduces 
gas cost and complexity. "Generate Proof Via eigenpod-proofs-generation CLI" will prove all connected validators.

### EigenPod Upgrades and Pending Consensus Rewards

For all M1 to PEPE migrations - we no longer require users to upgrade their EigenPod contracts per the deprecated `activateRestaking()` method. M1 pods will be upgraded automatically to PEPE compliant EigenPods by EigenLabs.

The delayed withdrawal router is being deprecated with the PEPE release, but will remain functional. It will not receive new consensus rewards from EigenPods, however if you have existing rewards you may continue to claim them as they become claimable.

To claim consensus rewards invoke `DelayedWithdrawalRouter.claimDelayedWithdrawals()`.
References:
* [DelayedWithdrawalRouter.claimDelayedWithdrawals](https://github.com/Layr-Labs/eigenlayer-contracts/blob/3b47ccf0ff98dc3f08befd24e3ae70d7ecce6342/src/contracts/pods/DelayedWithdrawalRouter.sol#L94)
* [Contract Deployment Addresses](https://github.com/Layr-Labs/eigenlayer-contracts/tree/v0.3.2-mainnet-rewards?tab=readme-ov-file#deployments): find the Proxy address of DelayedWithdrawalRouter here.

Eigen Labs will push through any rewards that are still in the delayed withdrawal router 7 days after the PEPE upgrade (after which point all rewards in there will be claimable). So if you haven’t claimed by this point, we’ll automatically process those claims on your behalf and send them to the wallet of the EigenPod owner.



### Key Management and EigenPod Proof Submitter

EigenLayer Native Restaking requires submitting proofs to EigenLayer contracts to prove the amount of validator ETH is active and its withdrawal address is pointing to the EigenPod. For users who do not wish to include the "EigenPod Owner" (aka The EigenPod generation key) in their proof generation commands, you may identify another wallet as the **Proof Submitter** and delegate its privilege to submit proofs on its behalf using the assign_submitter command. At any point in the future the `sender` of the proof can be the assigned submitter. The EigenPod owner can also designate a new Proof Submitter as needed.

Use the following command to assign a submitter for your EigenPod:
```bash
/cli assign-submitter --execNode $NODE_ETH --podAddress $EIGENPOD_ADDRESS --sender $EIGENPOD_OWNER_PK
```

Consider using a cold key for the EigenPod Owner role. This key should be stored securely and used infrequently. 
For cold keys, best practice is using hardware wallets (e.g., Ledger, HSMSs) or smart contract multisigs (e.g., Safe). 

Best practice is using a seperate key for the Proof Submitter, which can be considered a hot key. The Proof Submitter 
is any other address approved to submit proofs on behalf of the EigenPod owner. This separation allows the EigenPod owner 
key to remain secure and cold. Hot keys, while less secure, can be managed with solutions like Vault (Hashicorp) or environment 
variables. It is crucial not to store any meaningful value in your hot keys as operational keys are considered less secure. 

### Restake New Validator Native Beacon Chain ETH

The steps below are only required for new validator native beacon chain ETH. Any validator native beacon chain ETH that was restaked prior to the PEPE release will not need to repeat these steps.

**Prerequisites**

The user will need an environment available to run the [EigenPod Proof Gen CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#quickstart) including its software prerequisites.

#### Part 1: Create EigenPod

Invoke `EigenPodManager.createPod()`.  

#### Part 2: Configure Validator(s) Withdrawal Credentials

1. Configure the validator(s) credentials to point to the EigenPod address when the validator is created. Please see [Ethereum Launchpad](https://launchpad.ethereum.org/en/withdrawals#enabling-withdrawals) for more information. 
    a. Optional: you may choose to set the FEE_RECIPIENT to your EigenPod address if you wish to Restake those fees.

2. Wait for the validator(s) to become active on-chain. Please see https://beaconcha.in/ to follow your validator status.

3. Run the `status` command via the [EigenPod Proofs Generation CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#proof-generation). The command will confirm the withdrawal address is set correctly and the validator is active on the beacon chain.

![](/img/restake-guides/native-cli-status.png)


#### Part 3: Link the Validator to the EigenPod via Proof Generation

1. Run the `credentials` command via the [EigenPod Proofs Generation CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#proof-generation).
    

2. Invoke the `credentials` command with the `--sender $EIGENPOD_OWNER_PK` argument so that CLI will submit proofs and act on-chain for you. This is the private key of the wallet that was used to create the EigenPod. Example here:
```bash
./cli credentials --execNode $NODE_ETH --beaconNode $NODE_BEACON --podAddress $EIGENPOD_ADDRESS --sender $EIGENPOD_OWNER_PK
```

3. Invoke the `status` command to confirm restaked shares increased by the anticipated amount.

4. Your validator ETH balance is now Restaked.




### Convert Consensus Rewards to Restaked Shares

As of the PEPE release, users can now convert consensus rewards and validator execution fees to restaked shares.  Initiating and completing a checkpoint proof will automatically convert any consensus rewards to restaked shares for the EigenPod.

1. Check the status command via `./cli status` to determine how many additional shares the user would gain from completing a checkpoint at this time.
2. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint. This command will both start the checkpoint and run verify proofs until the checkpoint is completed.


#### Checkpoint Frequency

To optimize gas costs, initiating a checkpoint no more than once every two weeks is generally recommended. Waiting longer 
before performing a checkpoint can lead to greater gas savings, as the gas cost remains the same regardless of the number of 
consensus rewards being proven. Users should choose a checkpoint interval that aligns with their gas cost considerations and restaking benefits.

Consensus rewards are transferred from the beacon chain to your EigenPod approximately every 9 days, according to the Ethereum protocol. 
Creating checkpoints more than once per sweep provides no additional benefit.

### Withdraw 

There are two options when withdrawing restaked validator ETH:
* Exit validator and withdraw restaked balance.
* Continue as a validator and withdraw yield only.

With the exception of stopping and exiting the validator, the two processes are the same. The process to withdraw restaked validator ETH is:

1. [If exiting the validator, stop the validator and wait for the validator to go through the exit queue.](#step-1-stopping-validator)
2. [Generate a checkpoint proof to bring the balance in your EigenPod up to date.](#step-2-generate-checkpoint-proof)
3. [Determine the number of shares available to withdraw.](#step-3-determine-the-number-of-withdrawable-shares)
4. [Queue a withdrawal, and wait for EigenLayer escrow period.](#step-4-queue-withdrawal)
5. [Complete withdrawal.](#step-5-complete-withdrawal)

#### Step 1 Stopping Validator

If exiting validator and withdrawing restaked balance, fully exit the validator:
1. Monitor the validator activity at [beaconcha.in/validator/\[yourvalidatorid](http://beaconcha.in/validator/\[yourvalidatorid)\].
2. Wait for the final beacon chain withdrawal to be deposited to your EigenPod.

After a validator's status changes to "exited", it can take between 24 hours and 10 days for its ETH to be transferred to
the EigenPod. See the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/[yourvalidatorid]#withdrawals .
The ETH will then be viewable in the EigenPod's address on the Execution Layer.

#### Step 2 Generate Checkpoint Proof

Generate checkpoint proof using [eigenpod-proofs-generation CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs) to account for any ETH that has accumulated in the EigenPod. 
Once completed, the balance in your EigenPod is up to date.

#### Step 3 Determine the Number of Withdrawable Shares

To determine the number of withdrawable shares:
1. Invoke `[YourEigenPodContract].withdrawableRestakedExecutionLayerGwei()` to get the amount of withdrawable execution layer ETH in Gwei.
2. Convert the Gwei to Wei (multiply Gwei by 10^9 or 1,000,000,000).

#### Step 4 Queue Withdrawal

To queue withdrawal:

1. As the EigenPod Owner wallet, invoke the [`DelegationManager.queueWithdrawals()`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#queuewithdrawals) function with:
   * [`QueuedWithdrawalParams`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/src/contracts/interfaces/IDelegationManager.sol#L116)
   * Beacon chain ETH strategy (`0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0`).
   * Amount of withdrawable shares in Wei.
2. Wait for the EigenLayer escrow period.

:::note
If you queue a withdrawal with an amount of shares higher than the withdrawable shares, you may have to exit validators and complete 
a checkpoint or restart the escrow process before the withdrawal can be completed.
:::

#### Step 5 Complete withdrawal

As the EigenPod Owner Wallet, invoke the [`DelegationManager.completeQueuedWithdrawal()`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#completequeuedwithdrawal) function.

:::note
Withdrawals can only be cancelled after waiting the full escrow period. To cancel a withdrawal, invoke the [`DelegationManager.completeQueuedWithdrawal()`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#completequeuedwithdrawal)
function with the parameter `receiveAsTokens` set to `FALSE`.
:::

## FAQ

### Queue withdrawal takes an `amount` as input, what will that value be?

The input amount for `DelegationManager.queueWithdrawal()` can be any amount you like. However, it must be less than or 
equal to `withdrawableRestakedExecutionLayerGwei` when the withdrawal is completed.

The value of `withdrawableRestakedExecutionLayerGwei` is any withdrawable (that is, has not been slashed in EigenLayer) ETH
in the EigenPod contract address after a checkpoint, independent of its source. Sources of withdrawable ETH include consensus 
rewards, exited validators, direct transfers of ETH, and ETH from self-destructed contracts.

### How do you account for the exchange rates between Strategy token `amounts` and `shares`?

Invoke `[Strategy].underlyingToShares()` and `[Strategy].sharesToUnderlying()` as needed to convert their current balances between shares and underlying token amounts.
