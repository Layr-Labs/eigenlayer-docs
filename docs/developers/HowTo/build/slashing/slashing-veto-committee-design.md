---
sidebar_position: 1
title: Design Slashing
---

## Slashing Vetoes

EigenLayer provides a maximally flexible slashing function. AVSs may slash any Operator in any of their Operator Sets for
any reason. Slashing does not have to be objectively attributable (that is, provable on-chain). We encourage AVSs to create
robust legibility and process around individual slashings. Governance, fraud proofs, and decentralization
must be considered in AVS slashing designs. Include delays and veto periods in AVS designs to avoid or cancel slashing
in cases of AVS implementation bugs, improper slashing, or fraud.

**No vetoes are provided by the EigenLayer protocol.**

## Veto Committee Design

One popular AVS design is to utilize a governance mechanism with slashing such that a committee can review a proposed (or queued) 
slashing request. That slashing request can then be either fulfilled or vetoed by a committee of domain experts, governance 
council or multisig address for the AVS. Please see the [vetoable slasher example implementation](https://github.com/Layr-Labs/eigenlayer-middleware/blob/dev/src/slashers/VetoableSlasher.sol) for reference.

Ensure that your slashing process can be resolved within the `DEALLOCATION_DELAY` time window. This is the amount of blocks
between an Operator queuing a deallocation of stake from an Operator Set for a strategy and the deallocation taking effect. 
This will ensure that the slashing event is carried out for the Operator before their stake is deallocated.

## Redistribution

Redistribution may enable AVSs to benefit from a theft related to slashing so additional design care must be taken to consider
the incentives of all parties interacting with the redistribution. Redistribution enables more use-case opportunities 
but the higher risk and slash incentive must be considered for the participants running the AVS code.