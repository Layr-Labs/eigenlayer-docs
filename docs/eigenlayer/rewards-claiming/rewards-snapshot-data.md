---
sidebar_position: 3

---

# Rewards Distribution Data

Rewards snapshot distribution data is available via a public S3 bucket. Users may access this data for their own analytics purposes. Follow these steps in order access the data:


1) Get a list of snapshot dates from RewardsCoordinator contract.

* Find the RewardsCoordinator Proxy address for Testnet or Mainnet [here](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).
* Get the DistributionRoot(s) needed for the rewards time ranges desired. 
  * Call `getCurrentDistributionRoot` which will give you the most recent root posted. `getCurrentClaimableDistributionRoot` will give you the most recent claimable root since there is an activation delay.
  * Find the rewardsCalculationEndTimestamp value as the second value in the [DistributionRoot struct](https://github.com/Layr-Labs/eigenlayer-contracts/blob/b4fa900a11df04f3b0034e225deb1eb42b39f8bc/src/contracts/interfaces/IRewardsCoordinator.sol#L72) resulting tuple.
  * Or Index on the event `DistributionRootSubmitted` which is emitted when a [root is created](https://etherscan.io/tx/0x2aff6f7b0132092c05c8f6f41a5e5eeeb208aa0d95ebcc9022d7823e343dd012#eventlog).
  * Note: the current snapshot cadence is at most once per day for Testnet, weekly for Mainnet if there are new rewards to publish ([more detail here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#off-chain-calculation)).
* Convert this rewardsCalculationEndTimestamp value from unix time stamp integer format to the date format YYYY-MM-DD using a conversion tool ([example here](https://www.unixtimestamp.com/)).

2) Construct the URL to return the claim-amounts.json file for the desired snapshot date in the following format:

`<bucket url>/<environment>/<network>/<snapshot date>/claim-amounts.json`

* bucket_url: 
  * [https://eigenlabs-rewards-testnet-sepolia.s3.amazonaws.com](https://eigenlabs-rewards-testnet-sepolia.s3.amazonaws.com)
  * [https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com](https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com)
* environment: testnet or mainnet
* network: sepolia or ethereum

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
