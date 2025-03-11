---
sidebar_position: 4
title: Restaking Smart Contract Developer (Testnet)
---

:::important
While the Holesky network instability continues:
* EigenPods and native ETH restaking are not available on Holesky.
* AVS developers can use Sepolia for development and testing.

For more information, refer to the [EigenLayer blog](https://www.blog.eigenlayer.xyz/).
:::

The following instructions include an overview of the changes to Smart Contract Restaking per the Slashing and Operator Set release (Currently in Testnet). All existing instructions on [Restaking Smart Contract Developer](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-developer-guide) remain unchanged for this update, except where noted below.

The following is not a complete description of the Slashing and Operator Sets upgrade and is qualified in its entirety by reference to the [Unique Stake Allocation & Deallocation ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md#unique-stake-allocation--deallocation).

Key EigenLayer Protocol references for this guide:

* [Source Code](https://github.com/Layr-Labs/eigenlayer-contracts/tree/slashing-magnitudes/src/contracts): for all the following references to EigenLayer core contracts and functions, please see the src/contracts folder for their source code.  
* [Developer Documentation (specifications)](https://github.com/Layr-Labs/eigenlayer-contracts/tree/slashing-magnitudes/docs): detailed protocol specifications for restaking smart contract integration developers.  
* [Deployed Contract Addresses](http://todo): deployed contract addresses for Mainnet and Testnet.  
* [Integration Tests](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/test/integration): tests that serve as examples on how to interact with the EigenLayer core contracts.

### Withdraw (Unstake) Liquid Tokens[​](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-developer-guide#withdraw-unstake-liquid-tokens)

1. Invoke `DelegationManager.getWithdrawableShares()` to determine the Staker’s **withdrawable shares**, which represent deposited shares minus slashed shares.  withdrawable shares, which represent deposited shares minus slashed shares.  
2. Prepare the 'depositShares' parameter for the queueWithdrawals() function.  
   * Pass the number of **withdrawable shares** as input to the `convertToDepositShares()` function.  
   * The resulting value represents the amount to be used in the 'depositShares' parameter in the queueWithdrawals() function.  
3. Queue Withdrawal: invoke DelegationManager.[queueWithdrawals()](https://github.com/Layr-Labs/eigenlayer-contracts/blob/slashing-magnitudes/src/contracts/core/DelegationManager.sol#L195) to trigger the escrow period.   
   * Please see the `QueuedWithdrawalParams` struct documentation for more details on how to construct the input parameters.
   * Please see further detail [here](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/#escrow-period-withdrawal-delay) on the escrow period.  
4. Complete Withdrawal as Tokens: invoke DelegationManager.completeQueuedWithdrawal() to complete the withdrawal and return assets to the withdrawer's wallet.

### Delegation

The [Delegation steps](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-developer-guide#smart-contract-delegation-user-guide) remain unchanged for the Slashing and Operator Set release. 

Note: For a given asset, if the Operator has been slashed 100% for that Strategy, then **no new Stakers** can delegate to the Operator if they hold this Strategy asset. This was designed to avoid smart contract division by zero (0) errors.

### Withdraw Native ETH Balance[​](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-developer-guide#withdraw-validator-restaked-balance)

This process is intended to allow users to withdraw their Native beacon chain balance from the EigenPod.

1. Validator Exit  
   * Fully exit the Validator. You may monitor its activity via beaconcha.in/validator/\[yourvalidatorid\] . 
   * Wait for the final beacon chain withdrawal to be deposited to your EigenPod. There can be a lag of up to 24 hours to 7 days between the validator appearing as "exited" and the withdrawal amount deposited to EigenPod. Please see the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/\[yourvalidatorid\]\#withdrawals . The ETH will then be recognized in the EigenPod.  
2. Generate [checkpoint proof](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs) via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.  
3. Determine the number of **withdrawable shares**.  
   * Invoke `DelegationManager.getWithdrawableShares()` to determine the Staker’s withdrawable shares, which represent deposited shares minus slashed shares.  
   * Invoke `[YourEigenPod].withdrawableRestakedExecutionLayerGwei()` to get the amount of withdrawable execution layer ETH in gwei. Convert the gwei to wei (multiply by by 10^9 or 1,000,000,000).  
   * Confirm the number of withdrawable shares is less than withdrawableRestakedExecutionLayerGwei. Otherwise, the withdrawal will not be completable after it is queued.  
4. Prepare the `depositShares` parameter for the queueWithdrawals() function.  
   * Pass the number of **withdrawable shares** as input to the `convertToDepositShares()` function.  
   * The resulting value represents the amount to be used in the `depositShares` parameter in the queueWithdrawals() function.  
5. Invoke the DelegationManager.queueWithdrawals() function.  
   * This function can only be invoked by the EigenPod Owner wallet.  
   * Please see the `QueuedWithdrawalParams` struct documentation for more details on how to construct the input parameters.
   * strategies \- use the Beacon chain ETH strategy (0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0).  
6. Wait for the Escrow Period to complete.  
7. Invoke `DelegationManager.completeQueuedWithdrawal()`.

### Withdraw Yield Only[​](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-developer-guide#withdraw-yield-only)

This process is intended to allow users to withdraw yield (beacon chain consensus rewards, execution fees, and ETH) from the EigenPod.

1. Generate [checkpoint proof](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs) via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.  
2. Determine the number of **withdrawable shares**.  
   * Invoke `DelegationManager.getWithdrawableShares()` to determine the Staker’s withdrawable shares, which represent deposited shares minus slashed shares.  
   * Invoke `[YourEigenPod].withdrawableRestakedExecutionLayerGwei()` to get the amount of withdrawable execution layer ETH in gwei. Convert the gwei to wei (multiply by by 10^9 or 1,000,000,000).  
   * Confirm the number of withdrawable shares is less than withdrawableRestakedExecutionLayerGwei. Otherwise, the withdrawal will not be completable after it is queued.  
3. Prepare the `depositShares` parameter for the queueWithdrawals() function.  
   * Pass the number of **withdrawable shares** as input to the `convertToDepositShares()` function.  
   * The resulting value represents the amount to be used in the `depositShares` parameter in the queueWithdrawals() function.  
4. Invoke the DelegationManager.queueWithdrawals() function.  
   * This function can only be invoked by the EigenPod Owner wallet.  
   * Please see the `QueuedWithdrawalParams` struct documentation for more details on how to construct the input parameters.
   * strategies \- use the Beacon chain ETH strategy (0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0).  
5. Wait for the Escrow Period to complete.  
6. Invoke DelegationManager.completeQueuedWithdrawal().