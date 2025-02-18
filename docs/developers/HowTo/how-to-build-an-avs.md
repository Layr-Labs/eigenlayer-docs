---
sidebar_position: 2
title: Build Your Own AVS
---

This section will walk you through the process of designing and building your own AVS from scratch. It is intended to take you from an idea to a working local prototype.

Before proceeding, please review the previous sections on [AVS Overview](../Concepts/avs-developer-guide.md), [EigenLayer Overview](/docs/eigenlayer/overview/README.md) and the [Quick Start example](quickstart.md) to become familiar with the basic concepts.


## Step 1: AVS Design

### Design Your AVS Security (Trust Model)

The first step toward designing your AVS is to determine how its off-chain operations will be validated on-chain. Consider which Operator behaviors should be rewarded and which behaviors are malicious and should be slashed or penalized. Determine which data (or evidence) of their operations can be written on-chain to validate their behavior.

Operators are most often expected to **run the same workload** among all Operators in the AVS's quorum. This ensures that malicious behaviors can be easily validated on-chain. When designing your Operator workload, consider a task that can be easily scaled to run among all Operators in the quorum.

### BLS and ECDSA Signature Types

In the EigenLayer ecosystem, signatures play a crucial role in ensuring the integrity and authenticity of operations. Signatures cryptographically confirm that a specific wallet address has signed a given message (e.g., a string value) with its private key. Currently, there are two primary types of signatures used within EigenLayer:
- BLS (Boneh-Lynn-Shacham) signatures offer native aggregation, combining multiple operator signatures to be combined into one, reducing on-chain storage needs, verification time and gas costs. However, they require a slightly more complex implementation that includes an aggregator entity.
- ECDSA signatures are simpler to implement, because ECDSA does not support aggregation and so ECDSA services do not require an aggregator entity. However, this lack of aggregation support requires each ECDSA signature to be stored and verified individually, which increases both storage and gas costs as the number of signatures grows.
- Please note: as of [eigenlayer-middleware v0.2.1](https://github.com/Layr-Labs/eigenlayer-middleware/releases/tag/v0.2.1-mainnet-rewards) the [ECDSAServiceManagerBase contract](https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.1-mainnet-rewards/src/unaudited/ECDSAServiceManagerBase.sol) was not yet fully audited. Please check the most recent release as this is expected to change.


### Task and Signature Aggregation

Operator responses to tasks are often signed using the BLS or ECDSA algorithm. These signatures can be aggregated by any entity at any time, but they are often aggregated by an entity run by the AVS (the "aggregator"). A common AVS design involves combining multiple Operator BLS signatures into a single aggregate signature and written on-chain ([example here](https://github.com/Layr-Labs/eigensdk-go/blob/dev/services/bls_aggregation/blsagg.go) written in Go). The aggregate signature can then be verified to confirm whether any of the individual Operators were included in the aggregate.




      
## Step 2: Idea to Code (Building and Deploying your AVS Locally)

The following section covers the minimum set of smart contract integrations and deployment scripts that an AVS needs to build in order to:
1. Be considered a fully functional AVS for demo and proof of concept purposes.
2. Prepare your AVS to integrate Slashing functionality. Slashing is [live on Holesky Testnet](https://www.blog.eigenlayer.xyz/introducing-slashing/) and Mainnet deployment is proposed for late Q1 2025.


:::info
To begin the process below, fork the example repo here [hello-world-avs](https://github.com/Layr-Labs/hello-world-avs).
:::


### Smart Contract Requirements


**1: Integration with EigenLayer Core (AVS Directory)**  
Implement an instance of ECDSAServiceManagerBase or ServiceManagerBase (BLS).  
Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/src/HelloWorldServiceManager.sol) and incredible-squaring-avs [here](https://github.com/Layr-Labs/incredible-squaring-avs/blob/master/contracts/src/IncredibleSquaringServiceManager.sol).

**2: on-chain Verification**  
Implement at least one on-chain provable event. The most common approach is to write an ECDSA or BLS aggregate signature on-chain.
Please see the example from incredible-squaring-avs [here](https://github.com/Layr-Labs/incredible-squaring-avs/blob/8bd0ac663dcc2289cad02af4a7f0002ea07bc1d8/contracts/src/IncredibleSquaringTaskManager.sol#L102) and from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L130).


### Contract Deployment Requirements

Implement deployment scripts to deploy your contracts to your [local Anvil node](https://book.getfoundry.sh/reference/anvil/).

**1: Deploy of EigenLayer Contracts and State**  
Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/utils/anvil/deploy-eigenlayer-save-anvil-state.sh).

**2: Deploy your AVS contracts**  
Please see the example forge deployment script from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/script/HelloWorldDeployer.s.sol) and bash deployment script [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/utils/anvil/deploy-eigenlayer-save-anvil-state.sh).



### Operator (Off-Chain) Requirements

**1: Operator Registration to AVS**  
Provide a mechanism for the Operator register to the AVS.  

Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L41). 

**2: At least one event written to your AVSs on-chain contracts**  
The Operator binary (or off-chain aggregation service code) must write at least one event to the AVSs on-chain contracts to be used for future on-chain verification, rewards, and slashing purposes.  

Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L25).

## Step 3: Deploy and Test Locally

Use [AVS Devnet](test-avs.md) to deploy and test the AVS locally.

## Get in Touch

If you would like to discuss your ideas to build an AVS on EigenLayer, submit your contact information via [this form](https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l) and we'll be in touch shortly.