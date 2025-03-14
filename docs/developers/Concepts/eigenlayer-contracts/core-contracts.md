---
sidebar_position: 1
title: EigenLayer Core Contracts
---

The EigenLayer core contracts are the set of contracts that implement the EigenLayer protocol. The EigenLayer protocol includes
Staking, Operations, and AVS registration and allocation. The contracts for an AVS interact with the EigenLayer contracts. 

The [EigenLayer middleware contracts](middleware-contracts.md) are the higher level interface to the core contracts for new AVS developers. 

The EigenLayer core contracts are documented in the [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts) repository. The core contracts include: 

| Core contract            | Description                                                                                                                                                                                                                                  | 
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [StrategyManager](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#strategymanager)      | Responsible for handling the accounting for Restakers as they deposit and withdraw ERC20 tokens from their corresponding strategies. The StrategyManager tracks the amount of restaked assets each Restaker has within Eigenlayer.           |
| [DelegationManager](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#delegationmanager)    | Responsible for enabling Restakers to delegate assets to Operators, and withdraw assets. The DelegationManager tracks the amount of assets from each Strategy that have been delegated to each Operator, and tracks accounting for slashing. | 
| [EigenPodManager](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#eigenpodmanager)      | Enables native ETH restaking                                                                                                                                                                                                                 | 
| [AllocationManager](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#allocationmanager)    | Responsible for creating Operator Sets, and Operator registrations to Operator Sets. The Allocation Manager also tracks allocation of stake to a Operator Set, and enables AVSs to slash that stake.                                         
| [RewardsCoordinator](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#allocationmanager)   | Enables AVSs to distribute ERC20 tokens to Operators and Restakers who delegated assets to Operators. The RewardsCoordinator tracks the rewards and enables Operators and Restakers to claim them.
| [PermissionController](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#permissioncontroller) |Enables AVSs and operators to delegate the ability to call certain core contract functions to other addresses.|
| [AVSDirectory](https://github.com/Layr-Labs/eigenlayer-contracts/tree/testnet-holesky/docs#avsdirectory)         | Has been replaced by AllocationManager and will be deprecated in a future release. | 

This documentation matches the functionality available on the Holesky testnet. For mainnet
specific documentation, refer to the `/docs` repository on the `mainnet` branch in the [eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts)
repository.

:::important
AVSDirectory will be deprecated in a future release. We strongly recommend existing AVSs [migrate to using Operator Sets](../../HowTo/build/slashing/migrate-to-operatorsets.md)
on Testnet.
:::