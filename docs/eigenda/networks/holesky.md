---
sidebar_position: 2
---

# Holesky

The EigenDA Holesky testnet is the current EigenDA testnet. The EigenDA Holesky testnet was preceded by the now-sunset [EigenDA Goerli testnet](./goerli.md).

## Quick Links

* [AVS Page][2]
* [Blob Explorer][1]
* [Deployed Contract Addresses][3]

## Specs

| Property | Value |
| --- | --- |
| Disperser Address | `disperser-holesky.eigenda.xyz:443` |
| Churner Address | `churner-holesky.eigenda.xyz:443` |
| Batch Confirmation Interval | Every 10 minutes (may vary based on network health) |
| Max Blob Size | 2 MB |
| Default Blob Dispersal Rate limit | No more than 1 blob every 100 seconds |
| Default Blob Size Rate Limit | No more than 1.8 MB every 10 minutes |
| Stake Sync (AVS-Sync) Interval | Every 24 hours |

## Quorums

| Quorum Number | Token |
| --- | --- |
| 0 | ETH, LSTs |
| 1 | [WETH](https://holesky.etherscan.io/address/0x94373a4919B3240D86eA41593D5eBa789FEF3848) |
| 2 | [reALT](https://holesky.etherscan.io/address/0x2ff89Aa21D2FB7B00F28A3d224ECf5854ea162f4) |

[1]: https://blobs-holesky.eigenda.xyz/
[2]: https://holesky.eigenlayer.xyz/avs/eigenda
[3]: https://github.com/Layr-Labs/eigenlayer-middleware/?tab=readme-ov-file#current-testnet-deployment
