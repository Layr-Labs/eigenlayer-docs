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

The following sections highlight a few crucial components of the Hello World example that implement core AVS functionality. 

### AVS Contract

**[HelloWorldServiceManager.sol](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/src/HelloWorldServiceManager.sol)**

The contract definition declares that it implements `ECDSAServiceManagerBase`, which allows it to inherit the core required functionality of `IServiceManager`
```sol
contract HelloWorldServiceManager is ECDSAServiceManagerBase, IHelloWorldServiceManager {
    using ECDSAUpgradeable for bytes32;
```

The following functions are responsible for the "business logic" of the AVS. In the case of hello world the business logic includes managing the lifecycle of a "task" (creation and response) with a simple `name` string value.
```sol
function createNewTask(
    string memory name
) external returns (Task memory) {
    // create a new task struct
    Task memory newTask;
    newTask.name = name;
    newTask.taskCreatedBlock = uint32(block.number);

    // store hash of task onchain, emit event, and increase taskNum
    allTaskHashes[latestTaskNum] = keccak256(abi.encode(newTask));
    emit NewTaskCreated(latestTaskNum, newTask);
    latestTaskNum = latestTaskNum + 1;

    return newTask;
}

function respondToTask(
    Task calldata task,
    uint32 referenceTaskIndex,
    bytes memory signature
) external {
    // check that the task is valid, hasn't been responsed yet, and is being responded in time
    require(
        keccak256(abi.encode(task)) == allTaskHashes[referenceTaskIndex],
        "supplied task does not match the one recorded in the contract"
    );
    require(
        allTaskResponses[msg.sender][referenceTaskIndex].length == 0,
        "Operator has already responded to the task"
    );

    // The message that was signed
    bytes32 messageHash = keccak256(abi.encodePacked("Hello, ", task.name));
    bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
    bytes4 magicValue = IERC1271Upgradeable.isValidSignature.selector;
    if (!(magicValue == ECDSAStakeRegistry(stakeRegistry).isValidSignature(ethSignedMessageHash,signature))){
        revert();
    }

    // updating the storage with task responses
    allTaskResponses[msg.sender][referenceTaskIndex] = signature;

    // emitting event
    emit TaskResponded(referenceTaskIndex, task, msg.sender);
}
```

Please find a complete list of the requirements to implement an AVS at [Build Your Own AVS: Step 2 Idea to Code](/docs/developers/how-to-build-an-avs.md#step-2-idea-to-code-building-and-deploying-your-avs-locally).

### Contract Deployment Scripts

**[HelloWorldDeployer.s.sol](https://github.com/Layr-Labs/hello-world-avs/blob/master/contracts/script/HelloWorldDeployer.s.sol)**

The deployment of the HelloWorld contracts associates the quorums and their asset strategies to the AVS.

```sol
token = new ERC20Mock();
helloWorldStrategy = IStrategy(StrategyFactory(coreDeployment.strategyFactory).deployNewStrategy(token));

quorum.strategies.push(
    StrategyParams({strategy: helloWorldStrategy, multiplier: 10_000})
);
```

### Offchain Operator Code


***[index.ts](https://github.com/Layr-Labs/hello-world-avs/blob/master/operator/index.ts)**

The following snippets of Operator code manage Operator registration to core EigenLayer protocol, registration to the Hello World AVS, listening and responding to tasks.

```sol


const registerOperator = async () => {
    
    // Registers as an Operator in EigenLayer.
    try {
        const tx1 = await delegationManager.registerAsOperator({
            __deprecated_earningsReceiver: await wallet.address,
            delegationApprover: "0x0000000000000000000000000000000000000000",
            stakerOptOutWindowBlocks: 0
        }, "");
        await tx1.wait();
        console.log("Operator registered to Core EigenLayer contracts");
    }
    
    ...
    
    
    const tx2 = await ecdsaRegistryContract.registerOperatorWithSignature(
        operatorSignatureWithSaltAndExpiry,
        wallet.address
    );
    await tx2.wait();
    console.log("Operator registered on AVS successfully");
};


const monitorNewTasks = async () => {

    helloWorldServiceManager.on("NewTaskCreated", async (taskIndex: number, task: any) => {
        console.log(`New task detected: Hello, ${task.name}`);
        await signAndRespondToTask(taskIndex, task.taskCreatedBlock, task.name);
    });
    console.log("Monitoring for new tasks...");
};




const signAndRespondToTask = async (taskIndex: number, taskCreatedBlock: number, taskName: string) => {
    const message = `Hello, ${taskName}`;
    const messageHash = ethers.solidityPackedKeccak256(["string"], [message]);
    const messageBytes = ethers.getBytes(messageHash);
    const signature = await wallet.signMessage(messageBytes);

    console.log(`Signing and responding to task ${taskIndex}`);

    const operators = [await wallet.getAddress()];
    const signatures = [signature];
    const signedTask = ethers.AbiCoder.defaultAbiCoder().encode(
        ["address[]", "bytes[]", "uint32"],
        [operators, signatures, ethers.toBigInt(await provider.getBlockNumber()-1)]
    );

    const tx = await helloWorldServiceManager.respondToTask(
        { name: taskName, taskCreatedBlock: taskCreatedBlock },
        taskIndex,
        signedTask
    );
    await tx.wait();
    console.log(`Responded to task.`);
};


```


### Offchain Task Generator

**[createNewTasks.ts](https://github.com/Layr-Labs/hello-world-avs/blob/master/operator/createNewTasks.ts)**

The following Typescript code generates new tasks at a random interval. This entity that generates tasks for the AVS is also referred to as the "AVS Consumer".

```sol

async function createNewTask(taskName: string) {
  try {
    // Send a transaction to the createNewTask function
    const tx = await helloWorldServiceManager.createNewTask(taskName);
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    
    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

```



## Local Deployment Test

Please follow the steps under [Local Devnet Deployment](https://github.com/Layr-Labs/hello-world-avs?tab=readme-ov-file#local-devnet-deployment) to deploy an instance of Hello World locally on your machine.

