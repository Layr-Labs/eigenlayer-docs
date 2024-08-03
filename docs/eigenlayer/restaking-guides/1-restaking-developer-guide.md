
# Restaking Developer Guide

Smart Contract Restaking allows the user to interact directly with the EigenLayer core contracts. The following sections describe how to setup your Restaking integration with the EigenLayer contracts directly with no reliance on the EigenLayer Web App.

The Smart Contract Restaking user guides below serve as a high level overview of the most important steps for required for Restaking.

Please note the following resources are available for users that wish to take a deeper dive on the contracts:
* [EigenLayer Protocol Developer Docs](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/docs): detailed protocol specifications for restaking smart contract integration developers.
* [EigenLayer Protocol Contract Addresses](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments): deployed contract addresses for Mainnet and Testnet.
* [EigenLayer Protocol Integration Tests](https://github.com/Layr-Labs/eigenlayer-contracts/tree/dev/src/test/integration): tests that serve as examples on how to interact with the EigenLayer core contracts.





# Smart Contract Liquid Restaking User Guide

# Smart Contract Native Restaking User Guide

## PEPE Release

EigenLayer core contracts have had two previous major releases: M1 and M2. PEPE (Protocol: EigenPod Enhancement upgrade) is the current major release that focuses primarily on enhancements to Native Restaking and EigenPod design. The PEPE release will result in significantly lower gas fees and great compatibility with future scheduled Ethereum network upgrades.

Please see the [this document](https://hackmd.io/@-HV50kYcRqOjl_7du8m1AA/SkJPfqBeC) and [PR #515](https://github.com/Layr-Labs/eigenlayer-contracts/pull/515) for a design history and motivation for the PEPE Release.

## Steps to Deposit (Restake) Validator Native Beacon Chain ETH