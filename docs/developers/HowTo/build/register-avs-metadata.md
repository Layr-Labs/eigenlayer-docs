---
sidebar_position: 4
title: Register AVS Metadata
---

Registering metadata for an AVS is managed by the [AllocationManager core contract](../../Concepts/eigenlayer-contracts/core-contracts.md).  

Metadata must be registered:
* Before an AVS can create [Operator Sets](../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) or register Operators to Operator Sets. 
* To [onboard to the AVS Dashboard](../publish/onboard-avs-dashboard.md).

To register metadata, call the [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata) function. Invoking [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata)
establishes the AVS address in the core EigenLayer protocol.

Use the following format to initially register metadata. The format is not validated onchain. 

```
{
    "name": "AVS",
    "website": "https.avs.xyz/",
    "description": "Some description about",
    "logo": "http://github.com/logo.png",
    "twitter": "https://twitter.com/avs",
}
```