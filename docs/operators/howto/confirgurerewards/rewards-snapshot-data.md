---
sidebar_position: 4
title: Rewards Distribution Data
---

:::important
After July 16, Rewards snapshot distribution data will no longer be updated in the [public S3 bucket](#via-s3-bucket). To continue getting updated rewards data,
users of the S3 bucket must migrate to the EigenLayer Sidecar by July 16.
:::

Rewards snapshot distribution data is available:
* From an [EigenLayer Sidecar](#using-eigenlayer-sidecar).
* Via a [public S3 bucket](#via-s3-bucket). Users may access this data for their own analytics purposes.

## Using EigenLayer Sidecar

The [EigenLayer Sidecar](https://sidecar-docs.eigenlayer.xyz/docs/sidecar/running/getting-started) is an open source, permissionless, verified indexer enabling anyone (for example AVS, Operator) to access 
EigenLayer’s protocol rewards in real-time.

For information on how to install and launch a Sidecar, refer to the [Sidecar documentation](https://sidecar-docs.eigenlayer.xyz/docs/sidecar/running/getting-started).

There are two methods to access the rewards data from a Sidecar:
* Terminal or a bash script with `curl` and `grpcurl`.
* Using the gRPC or HTTP clients published in the [protocol-apis](https://github.com/Layr-Labs/protocol-apis) Go package.

Refer to the [sidecar](https://github.com/Layr-Labs/sidecar) repository for [examples](https://github.com/Layr-Labs/sidecar/blob/master/examples/rewardsData/main.go).

To obtain rewards snapshot distribution data using a EigenLayer Sidecar:

1. List distribution roots. 
   ``` 
   # grpcurl
   grpcurl -plaintext -d '{ }' localhost:7100 eigenlayer.sidecar.v1.rewards.Rewards/ListDistributionRoots | jq '.distributionRoots[0]'

   # curl
   curl -s http://localhost:7101/rewards/v1/distribution-roots

   {
     "root": "0x2888a89a97b1d022688ef24bc2dd731ff5871465339a067874143629d92c9e49",
     "rootIndex": "217",
     "rewardsCalculationEnd": "2025-02-22T00:00:00Z",
     "rewardsCalculationEndUnit": "snapshot",
     "activatedAt": "2025-02-24T19:00:48Z",
     "activatedAtUnit": "timestamp",
     "createdAtBlockNumber": "3418350",
     "transactionHash": "0x769b4efbefb99c6c80738405ae5d082829d8e2e6f97ee20da615fa7073c16d90",
     "blockHeight": "3418350",
     "logIndex": "544"
   }
   ```
2. Use the `rootIndex` to fetch the rewards data.
   ```
   # grpcurl
   grpcurl -plaintext --max-msg-sz 2147483647 -d '{ "rootIndex": 217 }' localhost:7100 eigenlayer.sidecar.v1.rewards.Rewards/GetRewardsForDistributionRoot > rewardsData.json

   # curl
   curl -s http://localhost:7101/rewards/v1/distribution-roots/217/rewards > rewardsData.json

   {
    "rewards": [
     {
      "earner": "0xe44ce641a7cf6d52c06c278694313b08c2b181c0",
      "token": "0x3b78576f7d6837500ba3de27a60c7f594934027e",
      "amount": "130212752259281570",
      "snapshot": "2025-02-22T00:00:00Z"
     },
    // ...
    ]
   }
   ```

## Via S3 Bucket

:::important
After July 16, Rewards snapshot distribution data will no longer be updated in the [public S3 bucket](#via-s3-bucket). To continue getting updated rewards data,
users of the S3 bucket must migrate to the EigenLayer Sidecar by July 16.
:::

To obtain rewards snapshot distribution data from the S3 bucket: 

To get a list of snapshot dates from RewardsCoordinator contract:

1. Find the RewardsCoordinator Proxy address for Testnet or Mainnet [here](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).
    1. Get the DistributionRoot(s) needed for the rewards time ranges desired.
       * Call `getCurrentDistributionRoot` to get the most recent root posted. `getCurrentClaimableDistributionRoot` returns the most recent claimable root since there is an activation delay.
       * Find the rewardsCalculationEndTimestamp value as the second value in the [DistributionRoot struct](https://github.com/Layr-Labs/eigenlayer-contracts/blob/b4fa900a11df04f3b0034e225deb1eb42b39f8bc/src/contracts/interfaces/IRewardsCoordinator.sol#L72) resulting tuple.
       * Or Index on the event `DistributionRootSubmitted` which is emitted when a [root is created](https://etherscan.io/tx/0x2aff6f7b0132092c05c8f6f41a5e5eeeb208aa0d95ebcc9022d7823e343dd012#eventlog).
       * Note: the current snapshot cadence is at most once per day for Testnet, weekly for Mainnet if there are new rewards to publish ([more detail here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/RewardsCoordinator.md#off-chain-calculation)).
   2. Convert this rewardsCalculationEndTimestamp value from unix time stamp integer format to the date format YYYY-MM-DD using a conversion tool ([example here](https://www.unixtimestamp.com/)).

2. Construct the URL to return the claim-amounts.json file for the desired snapshot date in the following format:

`<bucket url>/<environment>/<network>/<snapshot date>/claim-amounts.json`

* bucket_url: 
  * [https://eigenlabs-rewards-testnet-holesky.s3.amazonaws.com](https://eigenlabs-rewards-testnet-holesky.s3.amazonaws.com)
  * [https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com](https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com)
* environment: testnet or mainnet
* network: holesky or ethereum

Example:

`https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com/mainnet/ethereum/2024-08-11/claim-amounts.json`

Extract data from the claim-amounts.json file as needed. Please find the schema here:

```

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EigenLayer rewards cumulative earnings",
  "type": "object",
  "properties": {
    "earner": {
      "type": "string",
      "description": "Ethereum address"
    },
    "token": {
      "type": "string",
      "Ethereum address"
    },
    "snapshot": {
      "type": "number",
      "Unix timestamp of the snapshot date in UTC"
    },
    "cumulative_amount": {
      "type": "string",
      "Cumulative amount of tokens earned over time (includes both claimed and unclaimed rewards)"
    }
  },
  "required": [
    "earner",
    "token",
    "snapshot",
    "cumulative_amount"
  ]
}
```

Note: claim-amounts.json file is not a json file, but a json line file where each line is a valid json object.
