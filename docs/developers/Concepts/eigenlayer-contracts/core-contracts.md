---
sidebar_position: 1
title: EigenLayer Core Contracts
---

The EigenLayer core contracts are the set of contracts that implement the EigenLayer protocol. The EigenLayer protocol includes
Staking, Operations, and AVS registration and allocation. The contracts for an AVS interact with the EigenLayer contracts. 

We recommend new AVS developers use the [EigenLayer middleware contracts](middleware-contracts.md) as the higher level interface
to the core contracts. 

The EigenLayer core contracts are documented in the [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts) repository. The core contracts include: 
* StrategyManager
* DelegationManager
* AVSDirectory
* Slasher
* RewardsCoordinator.