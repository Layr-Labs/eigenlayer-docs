---
sidebar_position: 3
title: Incredible Squaring
---

## What is Incredible Squaring?

[Incredible Squaring](https://github.com/Layr-Labs/incredible-squaring-avs) is a demo of a minimum viable AVS with full Eigenlayer integration. The purpose of this demo is to illustrate how a value computed off-chain (in this case, the square of a number) can be constructed as part of the work operators have signed up to perform as well as how this business logic relates to the AVS contracts. We take the offchain computation, have it signed by multiple Operators, then aggregate the Operators signatures, before finally validating and writing the value on-chain. For a video walkthrough please see:
Incredible Squaring [Overall 5 min Walk-Through](https://www.loom.com/share/50314b3ec0f34e2ba386d45724602d76?sid=cf176400-fdbb-4bdc-8563-22a68414985d)
Incredible Squaring [TaskManager 5 min Walk-Through](https://www.loom.com/share/5f3f2a447bc54ffa9d37d203c32088de?sid=0f5c2c07-82c5-4640-bc6f-6e4327bb3d81)


Prior to the AVS becoming available for use, the following prerequisite steps must occur:
1. Operators register with the EigenLayer [DelegationManager](https://github.com/Layr-Labs/eigenlayer-middleware/blob/6a7a38593f466b1fefd2b575fb0d4f96520a946d/src/ServiceManagerBase.sol#L24) contract.
2. Incredible Squaring AVS is deployed and registered to an implementation of the [AVSDirectory contract](https://github.com/Layr-Labs/eigenlayer-middleware/blob/6a7a38593f466b1fefd2b575fb0d4f96520a946d/src/ServiceManagerBase.sol#L24).
2. Operators register with the AVS through its RegistryCoordinator.



## Incredible Squaring AVS Lifecycle (Flow)

Each request for a number to be squared, goes through the following lifecycle (flow)
1. The Task Generator entity sends the number to be squared to the AVS contract (IncredibleSquaringTaskManager.sol).
1. AVS contract emits an event (NewTaskCreated) to represent the new number to be squared.
1. Operators listen to the AVS contract for the event, square the number, sign the result with a [BLS signature](https://eth2book.info/capella/part2/building_blocks/signatures/) and send their signature to the Aggregator entity.
1. The Aggregator combines each into a single aggregated signature using [BLS signature aggregation](https://eth2book.info/capella/part2/building_blocks/signatures/#aggregation). Once the quorum threshold is met the Aggregator sends the aggregated signature back to the AVS contract.
1. AVS contract verifies that the quorum thresholds were met and that the aggregated signature is valid. If so, the squared number is accepted.

Note the [Incredible Squaring repo](https://github.com/Layr-Labs/incredible-squaring-avs) includes specific links to source code files for additional information.


## Incredible Squaring Architecture Unique Characteristics

The Incredible Squaring architecture includes the following components that are unique to its architecture, but not required for all AVSs:
1. BLS signature aggregation is used for aggregation of the Operator response (signatures). An [ECDSA version](https://github.com/Layr-Labs/incredible-squaring-avs/pull/20) is also available for testing (beta).
1. Task Generator: on-chain task generation was used for Incredible Squaring, however other AVSs may choose to implement off-chain task generation. Please see [EigenDA repo](https://github.com/Layr-Labs/eigenda?tab=readme-ov-file#overview) as an example of an off-chain AVS.
1. Aggregator: an entity created to collect the signatures from the operators and aggregate them using BLS aggregation.
1. Centralized entities: the Aggregator, Task Generator entities are centralized in the Incredible Squaring demo. However, decentralizing each component of your architecture over time could be explored
1. RegistryCoordinator contract implementation: unique implementation of [BLSRegistryCoordinatorWithIndices](https://github.com/Layr-Labs/eigenlayer-middleware/blob/master/src/BLSRegistryCoordinatorWithIndices.sol) that allows any EigenLayer operator with at least 1 delegated mockerc20 token to opt-in.




## BLS vs ECDSA Use Cases within EigenLayer AVSs


[BLS (Boneh-Lynn-Shacham)](https://en.wikipedia.org/wiki/BLS_digital_signature) is the default signature scheme used and is considered the most secure option. It is used for potential AVS logic if the AVS design requires aggregating AVS tasks.
- Used for potential AVS logic if the AVS design requires aggregating AVS tasks.
- Optional for registration to AVSs.

[ECDSA (Elliptic Curve Digital Signature Algorithm)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) is an alternative signature scheme that AVS developers may choose to reduce on-chain verification costs, although it is less secure than BLS.
- Required for Operator registration to the EigenLayer core protocol.
- Optional for registration to AVSs.

Note: please do not share (reuse) BLS and ECDSA keys across different AVSs.



## Deploy the Incredible Squaring Demo Locally

Visit the [Incredible Squaring repo](https://github.com/Layr-Labs/incredible-squaring-avs?tab=readme-ov-file#incredible-squaring-avs) and run the local demo.