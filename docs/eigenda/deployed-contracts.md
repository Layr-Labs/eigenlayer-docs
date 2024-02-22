---
sidebar_position: 8
title: Contracts
---

## EigenDA Contracts

For more information on the contracts and their technical specifications, please see:
[EigenLayer Middleware Docs](https://github.com/Layr-Labs/eigenlayer-middleware/tree/dev/docs).

### Current Mainnet Deployment

No contracts have been deployed to mainnet yet.

### Current Testnet Deployment

The current testnet deployment of EigenDA is
[`v0.3.0`](https://github.com/Layr-Labs/eigenda/releases/tag/v0.3.0) part of
which includes EigenLayer middleware contracts from the
[`v0.1.1-goerli-m2`](https://github.com/Layr-Labs/eigenlayer-middleware/tree/testnet)
release. Below are the deployed contract addresses and links to source.

| Name                           | Solidity                                                                                                   | Proxy                                                          | Implementation                                                | Notes                                                                                                            |
|--------------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| RegistryCoordinator            | [`RegistryCoordinator.sol`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/testnet/src/RegistryCoordinator.sol) | [`0x7661...3eC6`](https://goerli.etherscan.io/address/0x7661dA87296c0A245d11ADeD7f48265463bc3eC6) | [`0x7dfE...82B5`](https://goerli.etherscan.io/address/0x7dfE0C25483E420eccD04eab8Be44c75a0CE82B5) | Proxy: [OpenZeppelin TUP@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) |
| StakeRegistry                  | [`StakeRegistry.sol`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/testnet/src/StakeRegistry.sol)                         | [`0x9949...CfCF`](https://goerli.etherscan.io/address/0x9949f23AD76A8B6E9E090621B10D7d5fC93eCfCF) | [`0xFf76...9536`](https://goerli.etherscan.io/address/0xFf76a8549A56F880EdCD5b911F87389b03aF9536) | Proxy: [OpenZeppelin TUP@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) |
| IndexRegistry                  | [`IndexRegistry.sol`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/testnet/src/IndexRegistry.sol)                         | [`0x36AA...FE3F`](https://goerli.etherscan.io/address/0x36AA7406E4a724e5ba3e58C9C2703B4Bf532FE3F) | [`0x3176...8Beb`](https://goerli.etherscan.io/address/0x317654870F914473642838ACA30f7ddc64f68Beb) | Proxy: [OpenZeppelin TUP@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) |
| BLSApkRegistry                 | [`BLSApkRegistry.sol`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/testnet/src/BLSApkRegistry.sol)                   | [`0xb406...1F5F`](https://goerli.etherscan.io/address/0xb406d8e5F4BA1430D57c8231cc872C2c369E1F5F) | [`0x7f57...2063`](https://goerli.etherscan.io/address/0x7f57f298b7270B1D4C8964E33eB6eEfF31aD2063) | Proxy: [OpenZeppelin TUP@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) |
| OperatorStateRetriever         | [`OperatorStateRetriever.sol`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/testnet/src/OperatorStateRetriever.sol)   | -                                                             | [`0x357a...EaF8`](https://goerli.etherscan.io/address/0x357a99ccF04fC68Bd8d220263F9182506CBFEaF8) |                                                                                                                    |
| ProxyAdmin (eigenDAProxyAdmin) | [OpenZeppelin ProxyAdmin@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/ProxyAdmin.sol) | -                                                             | [`0x9caE...bd08`](https://goerli.etherscan.io/address/0x9caE885aA6192f50593062CB926AcFc7Ddebbd08) |                                                                                                                    |
| EigenDAServiceManager          | [`EigenDAServiceManager.sol`](https://github.com/Layr-Labs/eigenda/blob/v0.3.0/contracts/src/core/EigenDAServiceManager.sol)                   | [`0xa3b1...4Ee5`](https://goerli.etherscan.io/address/0xa3b1689Ab85409B15e07d2ED50A6EA9905074Ee5) | [`0x1eEa...9491`](https://goerli.etherscan.io/address/0x1eEa1C6b573f192F33BE6AA56dC9080314a89491) | Proxy: [OpenZeppelin TUP@4.7.1](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.1/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) |
