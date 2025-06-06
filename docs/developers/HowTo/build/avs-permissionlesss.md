---
sidebar_position: 7
title: Add ERC-20 Tokens as Restakable Asset
---

# Permissionless Token Strategies

Permissionless token support enables any ERC-20 token to be permissionlessly added as a restakable asset, significantly broadening
the scope of assets that can contribute to the security of decentralized networks, and unlocking the cryptoeconomic security of 
ERC-20 tokens on EigenLayer.

With permissionless token support, AVSs can choose to accept any ERC-20 token as a restaked asset to provide cryptoeconomic security for 
their AVS. This allows AVSs to evaluate the supply and utility of all available tokens to create cross-ecosystem partnerships 
while ensuring the safety and security of their services. This increases alignment and connectivity across the ecosystem.

# Adding a New Strategy

To add a new Strategy to the EigenLayer protocol:

* Invoke `StrategyFactory.deployNewStrategy()`.
* Your Strategy is now available to associate with your AVS.

Please see the contract documentation [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/StrategyManager.md#strategyfactorydeploynewstrategy) for further detail.

:::note
Custom Strategies are strategies that are not deployed via `StrategyFactory.deployNewStrategy()` and require whitelisting via 
`StrategyFactory.whitelistStrategies` (see [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/StrategyManager.md#strategyfactorywhiteliststrategies)). Custom Strategies have custom bytecode and do not implement `StrategyBase`. 

Custom Strategies are not yet supported because the Strategies specification is still evolving alongside the EigenLayer
protocol. AVS developers should build their AVS using the `StrategyBase` interface and functionality, which provides a
stable and supported foundation for integration.
:::