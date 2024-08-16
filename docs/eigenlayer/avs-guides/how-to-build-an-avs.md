---
sidebar_position: 2
title: Building an AVS
---


## Step 1: Learn EigenLayer fundamentals 

Before diving into what AVSs are and how you can design and build one, check out the [Intro to EigenLayer](https://docs.eigenlayer.xyz/eigenlayer/overview/) overview to quickly become familiar with what stakers and operators are.

Review the materials available under [EigenLayer Learning Resources](/docs/eigenlayer/resources/learning-resources.md), including:
- How EigenLayer works via [You Could've Invented EigenLayer](https://www.blog.eigenlayer.xyz/ycie/).
- Understand the type of trust you would need with [The Three Pillars of Programmable Trust: The EigenLayer End Game](https://www.blog.eigenlayer.xyz/the-three-dimensions-of-programmable-trust/).
        
      
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
Implement at least one on-chain provable event. The most common approach is to write a ECDSA or BLS aggregate signature (APK) on-chain.
Please see the example from incredible-squaring-avs [here](https://github.com/Layr-Labs/incredible-squaring-avs/blob/8bd0ac663dcc2289cad02af4a7f0002ea07bc1d8/contracts/src/IncredibleSquaringTaskManager.sol#L102) and from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L130).


### Contract Deployment Requirements

Implement deployment scripts for your contracts to deploy to your [local anvil node](https://book.getfoundry.sh/reference/anvil/).

**1: Deploy of EigenLayer Contracts and State**  
Please see the example from hello-world-avs[here](https://github.com/Layr-Labs/hello-world-avs/blob/master/utils/anvil/deploy-eigenlayer-save-anvil-state.sh).

**2: Deploy your AVS contracts**  
Please see the example forge deployment script from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/script/HelloWorldDeployer.s.sol) and bash deployment script [here](https://github.com/Layr-Labs/hello-world-avs/blob/master/utils/anvil/deploy-eigenlayer-save-anvil-state.sh).



### Operator (Off-Chain) Requirements

**1: Operator Registration to AVS**  
Provide a mechanism for the Operator register to the AVS.  

Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L41). 

**2: At least one event written to your AVSs on chain contracts**  
The Operator binary (or off chain aggregation service code) must write at least one event to the AVSs on chain contracts to be used for future on-chain verification, rewards, and slashing purposes.  

Please see the example from hello-world-avs [here](https://github.com/Layr-Labs/hello-world-avs/blob/84ae1974c212c193a3992467f7d431bad39f74a3/src/index.ts#L25).





## Step 3: Preparing and Deploying to Testnet

1. Package the Operator’s long running executable in a way that is easy for Operators to launch  (via binary, docker container, or similar).

2. Author Testnet user and Operator documentation, including:
   - Trust Modeling: clarify any trust assumptions in your architecture to your users. Identify the components that are trusted (centralized) and untrusted (decentralized, trustless).
   - Operator instructions to install, register, deregister.
   - End user (aka “Consumer”) instructions to utilize your AVS service.
   - Communication channels that will be utilized for AVS upgrades.
   - Describe Operator monitoring tooling available, such as GraFana dashboards, log files or similar.

3. Follow the [AVS Developer Security Best Practices](./avs-developer-best-practices.md).

4. Follow the guidance in [Key Manage Considerations for Developers](./key-management/developers.md).

5. Implement the [Node Specification](https://docs.eigenlayer.xyz/eigenlayer/avs-guides/spec/intro) for your Operator executable package.

6.  Follow the [Testnet Dashboard Onboarding instructions](https://docs.eigenlayer.xyz/eigenlayer/avs-guides/avs-dashboard-onboarding).

7. Implement Rewards payments per the instructions [here](./rewards.md).


## Step 4: Preparing and Deploying to Mainnet

1. Smart Contract Auditing: have your codebase audited with at least 2-3 reputable audit firms.
2. Finalize User and Operator documentation.
3. Follow the [Mainnet Dashboard Onboarding instructions](https://docs.eigenlayer.xyz/eigenlayer/avs-guides/avs-dashboard-onboarding).



## Get in Touch

Once you have an idea of what you want to build on EigenLayer, submit an [AVS Questionnaire](https://bit.ly/avsquestions) and get in touch with us.
