---
sidebar_position: 2
title: Migrate to Operator Sets
---

**We strongly recommend existing AVSs migrate to using Operator Sets on Testnet. The AVSDirectory method will be deprecated in a future upgrade.**

Operator Sets are required to slash.
To migrate to Operator Sets, we recommend AVSs:

1. Upgrade AVS contracts to handle the callback from the AllocationManager via the ServiceManagerBase ([example](https://github.com/Layr-Labs/eigenlayer-middleware/blob/feat/slashing-release-branch/src/ServiceManagerBase.sol)).
2. Communicate to Operators how to:
   1. Register for Operator Sets using the new registration pathway. 
   2. Allocate slashable stake for slashable Operator Sets.
3. Consider requirements for the AVSRegistrar contract.
4. Migrate to distribution of tasks based on the delegated and slashable stake of Operators registered to the AVS’s Operator Sets.

Migrating now gives time to switch existing quorums over to Operator Sets in the core protocol. After the migration has occurred,
integrations with slashing can go live on Testnet. M2 registration and Operator Set registration can operate in parallel.



Integrate the AllocationManager by:

* Creating Operator Sets through the AllocationManager.
* Adding (or later removing) specific Strategies to that Operator Set to enable Operators to secure the AVS.
* Specifying an additional AVSRegistrar contract that applies business logic to gate Operator registration to an Operator Set.

To ensure community and incentive alignment, it is expected that AVSs conduct off-chain outreach to communicate
the purpose and task/security makeup of their Operator Sets with their Operators and Stakers before beginning registration. The
communication would include any potential hardware, software, or stake requirements. The AVS decides task distribution
within an Operator Set.
