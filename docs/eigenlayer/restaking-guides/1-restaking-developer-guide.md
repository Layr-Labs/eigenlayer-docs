
# Restaking Developer Guide

Smart Contract Restaking allows the user to interact directly with the EigenLayer core contracts. The following sections describe how to setup your Restaking integration with the EigenLayer contracts directly with no reliance on the EigenLayer Web App.

The Smart Contract Restaking user guides below serve as a high level overview of the most important steps for required for Restaking.

Please note the following resources are available for users that wish to take a deeper dive on the contracts:
* [EigenLayer Protocol Developer Docs](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs): detailed protocol specifications for restaking smart contract integration developers.
* [EigenLayer Protocol Contract Addresses](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments): deployed contract addresses for Mainnet and Testnet.
* [EigenLayer Protocol Integration Tests](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/test/integration): tests that serve as examples on how to interact with the EigenLayer core contracts.





# Smart Contract Liquid Restaking User Guide

## Steps to Deposit (Restake) Liquid Tokens

1. Call StrategyManager.depositIntoStrategy() .
2. User is now actively Restaked.

## Steps to Withdraw (Unstake) Liquid Tokens

1. Queue Withdrawal: call DelegationManager.queueWithdrawal() to trigger the escrow period. Wait for Escrow Period: 24 days for $EIGEN, 7 days for all other tokens. Please see further detail [here](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/#escrow-period-withdrawal-delay).

2. Complete Withdrawal as Tokens: call DelegationManager.completeQueuedWithdrawal() to complete the withdrawal and return assets to the withdrawer's wallet.


# Smart Contract Delegation User Guide

The process of Delegating assets is the same for both liquid and native restaked assets. The user's Restaking wallet must Delegate all restaked assets to a single Operator. After the initial Delegate operation - any subsequent Deposited (Restaked) assets are also automatically delegated to the current operator.

## Steps to Delegate Assets

1. Call DelegationManager.delegateTo()
2. Your Restaked assets are now delegated.

## Steps to Change Actively Delegated Operator

_Coming Soon_ In the meantime, please see the smart contract specifications above and the high level process walkthrough [here](./0-restaking-user-guide/restaker-delegation/redelegation-process.md).


# Smart Contract Native Restaking User Guide

## PEPE Release

EigenLayer core contracts have had two previous major releases: M1 and M2. PEPE (Protocol: EigenPod Enhancement upgrade) is the current major release that focuses primarily on enhancements to Native Restaking and EigenPod design. The PEPE release will result in significantly lower gas fees and great compatibility with future scheduled Ethereum network upgrades.

Please see the [this document](https://hackmd.io/@-HV50kYcRqOjl_7du8m1AA/SkJPfqBeC) and [PR #515](https://github.com/Layr-Labs/eigenlayer-contracts/pull/515) for a design history and motivation for the PEPE Release.

## Key Management and Proof Submitter

Use a secure key management solution for your EigenPod generation key (aka the EigenPod "owner"), such as a hardware wallet solution.

We recommend using a different key for the Proof Submitter. The Proof Submitter is any other address that is approved to submit proofs on behalf of the EigenPod owner. This allows the EigenPod owner key to remain used less frequently and remain more secure.

[todo ask @antojoseph to suggest wording here]

## Prerequisites

The user will need an environment available to run the [EigenPod Proof Gen CLI](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#quickstart) including its software prerequisites.

## Steps to Deposit (Restake) Validator Native Beacon Chain ETH

For users planning to restake multiple validators, we recommend they connect many validators to a single EigenPod in order to reduce cost and complexity where possible. "Generate Proof Via eigenpod-proofs-generation CLI" will prove all connected validators.




## Steps to Convert Consensus Rewards to Restaked Shares

As of the PEPE release, users can now convert consensus rewards and validator execution fees to restaked shares.  Initiating and completing a checkpoint proof will automatically convert any consensus rewards to restaked shares for the EigenPod.

1. Check the status command via `./cli status` to determine how many additional shares the user would gain from completing a checkpoint at this time.
2. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint. This command will both start the checkpoint and run verify proofs until the checkpoint is completed.


### Checkpoint Frequency

Users should not initiate a checkpoint more frequently than once every two weeks (approximately). 
The longer you wait before performing a checkpoint, the more gas users will save. The gas cost of a checkpoint is the same, regardless of how many consensus rewards will be proven. Each user should determine the best interval to fit their gas cost and restaking benefit needs.

Consensus rewards are moved from the beacon chain to your EigenPod once every approximately 8 days per the Ethereum protocol. Checkpoint intervals more frequently than 8 days would result in no benefit for the user.


## Steps to Withdraw Restaked Balance

1. Validator Exit
   1. Fully exit the Validator. You may monitor its activity via [beaconcha.in/validator/\[yourvalidatorid](http://beaconcha.in/validator/\[yourvalidatorid)\] .
   2. Wait for the final beacon chain withdrawal to be deposited to your EigenPod. There can be a lag of up to 24 hours to 7 days between the validator appearing as "exited" and the withdrawal amount deposited to EigenPod.  Please see the "Withdrawals" tab and "Time" column for your validator via beaconcha.in/validator/\[yourvalidatorid\]#withdrawals . The ETH will then be recognized in the EigenPod.
2. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.
3. Call the DelegationManager.queueWithdrawal() function.
4. Wait for Escrow Period to complete.
5. Call DelegationManager.completeQueuedWithdrawal()

## Steps to Withdraw Yield Only

This process is intended to allow users to withdraw yield (beacon chain consensus rewards, execution fees, and ETH) from the EigenPod.

1. Generate [checkpoint proof ](https://github.com/Layr-Labs/eigenpod-proofs-generation/tree/master/cli#checkpoint-proofs)via eigenpod-proofs-generation CLI in order to initiate and complete a checkpoint.
2. [todo: complete this process with Eng]
   1. ?Call the DelegationManager.queueWithdrawal() function?
   2. I [couldn't find out](https://github.com/Layr-Labs/eigenlayer-contracts/blob/feat/partial-withdrawal-batching/docs/core/DelegationManager.md#queuewithdrawals) how the user should limit their withdrawal to only Yield amounts, to avoid interfering with native restaked validator ETH balances.
3. Wait for Escrow Period to complete.
4. Call DelegationManager.completeQueuedWithdrawal()?