---
sidebar_position: 2
title: Migrate to Operator Sets
---

**We strongly recommend existing AVSs migrate to using [Operator Sets](../../../eigenlayer/concepts/operator-sets/operator-sets-concept) on Testnet. The AVSDirectory method will be deprecated in a future upgrade.**

Operator Sets are required to [slash](../../../eigenlayer/concepts/slashing/slashing-concept.md). To migrate to, and start using, Operator Sets: 
1. [Upgrade middleware contracts](#upgrade-middleware-contracts) 
2. [Integrate the AllocationManager](#upgrade-middleware-contracts)
3. [Communicate to Operators](#communicate-to-operators)

Migrating now gives time to switch existing quorums over to Operator Sets. After the migration has occurred,
integrations with slashing can go live on Testnet. M2 registration and Operator Set registration can operate in parallel.

## Upgrade middleware contracts

To migrate to Operator Sets:

1. Upgrade middleware contracts to handle the callback from the AllocationManager. The upgrade provides the RegistryCoordinator
the hooks to handle the callback from the AllocationManager. 
2. From the ServiceManager call, add an account to update the AVSRegistrar:
      * With setAppointee where the target is the AllocationManager.
      * The selector is the setAVSRegistrar selector.
3. Call setAVSRegistrar on the AllocationManager from the appointee account and set the RegistryCoordinator as your AVSRegistrar
so that it becomes the destination for registration and deregistration hooks

See example [RegistryCoordinator implementation with the new hooks](https://github.com/Layr-Labs/eigenlayer-middleware/blob/dev/src/SlashingRegistryCoordinator.sol).

## Integrate the AllocationManager

Integrate the AllocationManager by:

1. Creating Operator Sets through the AllocationManager.
2. Adding (or later removing) specific Strategies to that Operator Set to enable Operators to secure the AVS.
3. Specifying an additional AVSRegistrar contract that applies business logic to gate Operator registration to an Operator Set.

## Communicate to Operators

1. Communicate to Operators how to:
   1. Register for Operator Sets using the new registration pathway. 
   2. Allocate slashable stake for slashable Operator Sets.
2. Migrate to distribution of tasks based on the delegated and slashable stake of Operators registered to the AVS’s Operator Sets.

To ensure community and incentive alignment, AVSs need to conduct offchain outreach to communicate
the purpose and task/security makeup of their Operator Sets with their Operators and Stakers before beginning registration.
Include any potential hardware, software, or stake requirements in the communication. The AVS decides task distribution
within an Operator Set.
