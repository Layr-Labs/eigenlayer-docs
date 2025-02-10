---
sidebar_position: 4
title: Design Slashing Conditions
---

The EigenLayer protocol allows each AVS builder to design their own slashing conditions. One popular design is to utilize a governance mechanism with slashing such that a committee can review a proposed (or queued) slashing request. That slashing request can then be either fulfilled or vetoed by a committee of domain experts, governance council or multisig address for the AVS. Please see the [vetoable slasher example implementation](https://github.com/Layr-Labs/eigenlayer-middleware/blob/feat/slashing-release-branch/src/slashers/VetoableSlasher.sol) for reference.

Please be sure that your slashing process can be resolved within the DEALLOCATION_DELAY time window. This is the amount of blocks between an Operator queuing a deallocation of stake from an Operator Set for a strategy and the deallocation taking effect. This will ensure that the slashing event is carried out for the Operator before their stake is deallocated.
