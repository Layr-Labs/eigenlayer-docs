---
sidebar_position: 3
title: Claim Rewards as a Smart Contract
---

To claim rewards when the [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md) is a smart contract, 
generate either:
* JSON object with the arguments to call [`RewardsCoorinator.processClaim`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#processclaim).
* Calldata that can be signed and broadcast.

:::note
To be eligible for a reward submission, an Operator must have been registered to the AVS for at least a portion
of the reward duration. If rewards submitted to them, the rewards are
refunded back to the AVS address. To claim rewards as an AVS, you must set a claimer for the AVS,
which can be done using [`setClaimerFor`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/5e2056601c69f39f29c3fe39edf9013852e83bf3/src/ServiceManagerBase.sol#L216) on the [`ServiceManagerBase`](https://github.com/Layr-Labs/eigenlayer-middleware/blob/2afed9dd5bdd874d8c41604453efceca93abbfbc/docs/ServiceManagerBase.md#L1) contract.
:::

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