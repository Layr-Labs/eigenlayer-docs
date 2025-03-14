---
sidebar_position: 7
title: Add ERC-20 Tokens as Restakable Asset
---

# Permissionless Token Strategies

Permissionless Token Support enables any ERC-20 token to be permissionlessly added as a restakable asset, significantly broadening the scope of assets that can contribute to the security of decentralized networks, and unlocking the cryptoeconomic security of ERC-20 tokens on EigenLayer.


With this capability, AVSs can choose to accept any ERC-20 token as a restaked asset to provide cryptoeconomic security for their AVS. This allows AVSs to evaluate the supply and utility of all available tokens to create cross-ecosystem partnerships while ensuring the safety and security of their services. This increases alignment and connectivity across the ecosystem, moving us closer to the ultimate goal of open innovation.



# Adding a New Strategy

To add a new Strategy to the EigenLayer protocol:

* Invoke StrategyFactory.deployNewStrategy().
* Your Strategy is now available to associate with your AVS.

Please see the contract documentation [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/StrategyManager.md#strategyfactorydeploynewstrategy) for further detail.