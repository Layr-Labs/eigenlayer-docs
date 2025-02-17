---
sidebar_position: 4
title: Implement Slashing of Unique Stake
---

:::important
Before proceeding, review the [Slashing Concept](../../eigenlayer/concepts/slashing.md) content for information on how Operator Sets and Allocations work.
:::

##  Migrating to Operator Sets

Per the Slashing and Operator Set upgrade (currently in Testnet) existing AVSs are strongly recommended to migrate away from the AVSDirectory towards using the Operator Sets feature. This will be required to slash. In order to make this migration, we recommend that AVSs:

1. Upgrade their contracts to handle the callback from the AllocationManager via the ServiceManagerBase example [here](https://github.com/Layr-Labs/eigenlayer-middleware/blob/feat/slashing-release-branch/src/ServiceManagerBase.sol).  
2. Communicate to Operators regarding registering for Operator Sets via the new registration pathway.  
   1. For slashable Operator Sets, Operators should also allocate slashable stake.  
   2. AVSs should consider requirements for the AVSRegistrar contract.  
3. Migrate to distribution of tasks based on the delegated and slashable stake of Operators registered to the AVS’s Operator Sets.

This gives AVSs time to switch any existing quorums over to Operator Sets in the core protocol. After this migration has occurred, integrations with slashing can go live. M2 registration and Operator Set registration can live in parallel. The AVSDirectory method will be deprecated in a future upgrade.

AVS may integrate the AllocationManager via:

* Create new Operator Sets through the AllocationManager.  
* Add (or later remove) specific Strategies to that Operator Set that Operators will use to secure it.  
* Specify an additional AVSRegistrar contract that applies business logic to gate Operator registration to an Operator Set.

To ensure community and incentive alignment, it is generally expected that AVSs will conduct off-chain outreach to communicate the purpose and task/security makeup of their Operator Sets with their Operators and Stakers prior to beginning registration.  This likely would include any potential hardware, software, or stake requirements. It is up to the AVS to decide task distribution within an Operator Set.

##  Best Practices

### Operator Set Design

An Operator Set is a grouping of different types of work within a single AVS. Each AVS will have at least one Operator Set. The EigenLayer protocol does not enforce criteria for Operator Sets, however there are a few best practices to consider.

Plan to logically group your AVS tasks (and verification) into separate Operator Sets. First organize your Operator Sets according to which conditions you wish to distribute Rewards for. These conditions could include:
* Unique business logic.
* Unique Stake (cryptoeconomic security) amount and types of token required to be allocated from Operators.
* Slashing conditions.
* Ejection criteria.
* Quantity of Operators and criteria for operators allowed.
* Hardware profiles.
* Liveness guarantees.

More detail on Operator Sets are available [here](https://docs.eigenlayer.xyz/eigenlayer/operator-guides/operator-sets#operator-sets-currently-in-testnet) and implementation details are available [here](https://docs.eigenlayer.xyz/developers/avs-opset-slashing).



### Slashing Design and Veto Committees

The EigenLayer protocol allows each AVS builder to design their own slashing conditions. One popular design is to utilize a governance mechanism with slashing such that a committee can review a proposed (or queued) slashing request. That slashing request can then be either fulfilled or vetoed by a committee of domain experts, governance council or multisig address for the AVS. Please see the [vetoable slasher example implementation](https://github.com/Layr-Labs/eigenlayer-middleware/blob/feat/slashing-release-branch/src/slashers/VetoableSlasher.sol) for reference.

Please be sure that your slashing process can be resolved within the DEALLOCATION_DELAY time window. This is the amount of blocks between an Operator queuing a deallocation of stake from an Operator Set for a strategy and the deallocation taking effect. This will ensure that the slashing event is carried out for the Operator before their stake is deallocated.
