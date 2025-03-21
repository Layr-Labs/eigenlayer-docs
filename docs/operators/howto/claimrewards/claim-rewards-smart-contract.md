---
sidebar_position: 3
title: Claim Rewards as a Smart Contract
---

To claim rewards when the [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md) is a smart contract, 
generate either:
* JSON object with the arguments to call [`RewardsCoorinator.processClaim`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#processclaim).
* Calldata that can be signed and broadcast.

## JSON Object

To generate the JSON object, use:
```bash
    ./bin/eigenlayer rewards claim \
      --network mainnet \
      --eth-rpc-url <mainnet-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --output-type json
```

## Calldata

To generate the calldata, use:

```bash
    ./bin/eigenlayer rewards claim \
      --network mainnet \
      --eth-rpc-url <mainnet-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --output-type calldata
```