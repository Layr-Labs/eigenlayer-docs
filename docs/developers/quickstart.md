---
sidebar_position: 2
title: Quick Start Example
---

## Hello World AVS: Local Deployment
The [Hello World AVS](https://github.com/Layr-Labs/hello-world-avs) is a simple implementation designed to demonstrate the core mechanics of how AVSs work within the EigenLayer framework. This example walks you through the process of:
- Spinning up a local chain with EigenLayer contracts and AVS contracts preconfigured.
- Registering an Operator with both EigenLayer and the AVS.
- Consumer client requesting work to be done by the AVS.
- Operator listening picking up this request, performing it, and signing off on it.
- The AVS contract verifying the operator's work.

![Hello World Diagram](/img/avs/hello-world-diagram-v2.png)

## Key Components of Hello World AVS
- AVS Consumer: Requests a "Hello, ___" message to be generated and signed.
- AVS: Takes the request and emits an event for operators to handle.
- Operators: Picks up the request, generates the message, signs it, and submits it back to the AVS.
- Validation: Ensures the operator is registered and has the necessary stake, then accepts the submission.


## Code Walkthrough

### Onchain Smart Contracts

The following sections highlight a few crucial components of the Hello World example that implement core AVS functionality. 

**[HelloWorldServiceManager.sol](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/src/HelloWorldServiceManager.sol)**

The contract definition declares that it implements `ECDSAServiceManagerBase`, which allows it to inherit the core required functionality of `IServiceManager`
```solidity
contract HelloWorldServiceManager is ECDSAServiceManagerBase, IHelloWorldServiceManager {
    using ECDSAUpgradeable for bytes32;
```

The following functions are responsible for the "business logic" of the AVS. In the case of hello world the business logic includes managing the lifecycle of a "task" (creation and response) with a simple `name` string value.
```solidity
function createNewTask(string memory name) external returns (Task memory) { ...}

function respondToTask(Task calldata task, uint32 referenceTaskIndex, bytes memory signature) external {
```

**[HelloWorldDeployer.s.sol](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/script/HelloWorldDeployer.s.sol)**

The deployment of the HelloWorld contracts associates the quorums and their asset strategies to the AVS.

```solidity
    token = new ERC20Mock();
    helloWorldStrategy = IStrategy(StrategyFactory(coreDeployment.strategyFactory).deployNewStrategy(token));

    quorum.strategies.push(
        StrategyParams({strategy: helloWorldStrategy, multiplier: 10_000})
    );
```


**[HelloWorldDeploymentLib.sol](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/script/utils/HelloWorldDeploymentLib.sol)**



Please find a complete list of the requirements to implement an AVS at [Build Your Own AVS: Step 2 Idea to Code](/docs/developers/how-to-build-an-avs.md#step-2-idea-to-code-building-and-deploying-your-avs-locally).

### Offchain Operator Code

**** todo
Operator code, focus on registering operator, registering and respond to task






### 




## Local Deployment Test

Please follow the steps under [Local Devnet Deployment](https://github.com/Layr-Labs/hello-world-avs?tab=readme-ov-file#local-devnet-deployment) to deploy an instance of Hello World locally on your machine.

