---
sidebar_position: 3
title: Update AVS Metadata
---

:::tip
The AVS metadata is used to provide information on the [EigenLayer App](https://app.eigenlayer.xyz/) for Stakers and Operators.
:::

Once Operator Sets have been created, the AVS metadata can be updated to include the Operator Sets.

To update metadata, call the [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata) function. Use the following format.

```
{
    "name": "AVS",
    "website": "https.avs.xyz/",
    "description": "Some description about",
    "logo": "http://github.com/logo.png",
    "twitter": "https://twitter.com/avs",
    "operatorSets": [
        {
            "name": "ETH Set",
            "id": "1", 
            "description": "The ETH operatorSet for AVS",
            "software": [
                {
                    "name": "NetworkMonitor",
                    "description": "",
                    "url": "https://link-to-binary-or-github.com"
                },
                {
                    "name": "ValidatorClient",
                    "description": "",
                    "url": "https://link-to-binary-or-github.com"
                }
            ],
            "slashingConditions": ["Condition A", "Condition B"]
        },
        {
            "name": "EIGEN Set",
            "id": "2", 
            "description": "The EIGEN operatorSet for AVS",
            "software": [
                {
                    "name": "NetworkMonitor",
                    "description": "",
                    "url": "https://link-to-binary-or-github.com"
                },
                {
                    "name": "ValidatorClient",
                    "description": "",
                    "url": "https://link-to-binary-or-github.com"
                }
            ],
            "slashingConditions": ["Condition A", "Condition B"]
        }
    ]
}
```