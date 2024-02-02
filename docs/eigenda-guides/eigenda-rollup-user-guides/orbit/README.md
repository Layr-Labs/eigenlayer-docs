# Arbitrum Orbit User Guide

[Arbitrum Orbit](https://docs.arbitrum.io/launch-orbit-chain/orbit-gentle-introduction) is a Rollup Development Kit (RDK) developed by [Offchain Labs](https://www.offchainlabs.com/) to enable rollup developers to build rollups using the same software that powers *Arbitrum One* and *Arbitrum Nova*. In partnership with AltLayer, we have forked the core component of Orbit, [Nitro](https://github.com/alt-research/nitro-eigenda/tree/eigenda), to add [M0](../../integrations-overview.md#M0) support for EigenDA. The M0 status of this integration means that it is only designed for testnet.

## How to deploy an Orbit chain

A short guide on launching an Orbit L3 against the EigenDA testnet:

1. Follow the [Orbit Quickstart](https://docs.arbitrum.io/launch-orbit-chain/orbit-quickstart) documentation until step 9, skipping step 7. When prompted to use the official [Arbitrum Nitro repo](https://github.com/OffchainLabs/nitro), use the [forked repo](https://github.com/alt-research/nitro-eigenda/tree/eigenda) instead. At the end of step 8 you should have your `chainConfig.json` and `orbitSetupScriptConfig.json` saved locally.
2. Update your `chainConfig.json` with the following commands:

        ```
        jq '.node."eigen-da" = {"enable": true, "rpc": "disperser-goerli.eigenda.xyz:443"}' chainConfig.json > temp.json 
        mv temp.json chainConfig.json
        ```
3. Continue with step 9 using your updated `chainConfig.json`.
4. Congratulations! You are now running a Orbit rollup with the hyperscale throughput provided by EigenDA.
