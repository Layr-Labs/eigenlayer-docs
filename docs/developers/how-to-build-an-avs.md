---
sidebar_position: 3
title: Build Your Own AVS
---

This section will walk you through the process of designing and building your own AVS from scratch. It is intended to take you from an idea to a working local prototype.

Before proceeding, please review the previous sections on [AVS Overview](./avs-developer-guide.md), [EigenLayer Overview](/docs/eigenlayer/overview/README.md) and the [Quick Start example](./quickstart.md) to become familiar with the basic concepts.


## Step 1: AVS Design

[todo lots of work here]

### Validation Techniques (Trust Engineering)


### Task Design

Tasks are a common design model used for AVS operations. They are not required, but they are a common mechanism used by AVS designers. Tasks enable the AVS to organize discrete units of work performed by Operators offchain, which are later validated onchain.

Tasks can be submitted either:
1) Onchain by the Consumer (end user) to the AVS contracts.
2) Offchain by the Consumer directly to the Operators. 

### Signature Types

In the EigenLayer ecosystem, signatures play a crucial role in ensuring the integrity and authenticity of operations. Signatures cryptographically confirm that a specific wallet address has signed a message (e.g., a string value) with its private key. Currently, there are two primary types of signatures used within EigenLayer: BLS (Boneh-Lynn-Shacham) and ECDSA (Elliptic Curve Digital Signature Algorithm) signatures.

### Task and Signature Aggregation

Operator responses to tasks are often signed using the BLS or ECDSA algorithm. These signatures can be aggregated by any entity at any time, but they are often aggregated by an entity run by the AVS (the "aggregator"). A common AVS design involves combining multiple Operator BLS signatures into a single aggregate signature and written on chain ([example here](https://github.com/Layr-Labs/eigensdk-go/blob/dev/services/bls_aggregation/blsagg.go) written in Go). The aggregate signature can then be verified to confirm whether any of the individual Operators were included in the aggregate.

### Design Your AVS Security (Trust Model)

Consider the following requirements for your AVS:
- Which portion of your project needs to be proven on chain?
- Which Operator behaviors should be rewarded, and which behaviors are malicious and should be slashed or penalized?”
- How do you envision Operators fulfilling this purpose as a network of Actively Validated Operators in your AVS?


      
## Step 2: Idea to Code: Testing and Deploying your AVS Locally

The following section covers the minimum set of smart contract integrations and deployment scripts that an AVS needs to build in order to:
1. Be considered a fully functional AVS for demo and proof of concept purposes.
2. Prepare your AVS to integrate Slashing functionality, which will be release soon.


:::info
To begin the process below, fork the example repo here [hello-world-avs](https://github.com/Layr-Labs/hello-world-avs).
:::


### Smart Contract Requirements


**1: Integration with EigenLayer Core (AVS Directory)**  
Implement an instance of ECDSAServiceManagerBase or ServiceManagerBase (BLS).  
Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/src/HelloWorldServiceManager.sol) and incredible-squaring-avs [here](https://github.com/Layr-Labs/incredible-squaring-avs/blob/master/contracts/src/IncredibleSquaringServiceManager.sol).

**2: On Chain Verification**  
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

**2: At least one event written to your AVSs on chain contracts**  
The Operator binary (or off chain aggregation service code) must write at least one event to the AVSs on chain contracts to be used for future on-chain verification, rewards, and slashing purposes.  

Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L25).


## Step 3: Deploy and Test Locally

Follow the existing pattern in the Hello World [Local Devnet Deployment](https://github.com/Layr-Labs/hello-world-avs?tab=readme-ov-file#local-devnet-deployment) steps. Modify your steps as needed.







## Get in Touch

If you would like to discuss your ideas to build an AVS on EigenLayer, submit your contact information via [this form](https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l) and we'll be in touch shortly.