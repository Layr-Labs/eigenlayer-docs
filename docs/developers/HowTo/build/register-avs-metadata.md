---
sidebar_position: 1
title: Register AVS Metadata
---

Metadata must be registered:
* Before an AVS can create [Operator Sets](../../../eigenlayer/concepts/operator-sets/operator-sets-concept.md) or register Operators to Operator Sets.
* To [onboard to the AVS Dashboard](../publish/onboard-avs-dashboard.md).

Registering metadata for an AVS is managed by the [AllocationManager core contract](../../Concepts/eigenlayer-contracts/core-contracts.md).  

To register metadata, call the [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata) function on the AllocationManager. Invoking [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata)
on the AllocationManager establishes the AVS address in the core EigenLayer protocol. 

## Format

To register metadata, the AVS must provide a URL to the JSON data in the following format. The format is not validated onchain. 

The metadata must be consistently available, and the URL provided to [`updateAVSMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/9a19503e2a4467f0be938f72e80b11768b2e47f9/docs/core/AllocationManager.md#avs-metadata) must not cause redirects.

```
{
    "name": "AVS",
    "website": "https.avs.xyz/",
    "description": "Some description about",
    "logo": "http://github.com/logo.png",
    "twitter": "https://twitter.com/avs",
}
```

## Logo

The logo linked to in the metadata must: 
* Be consistently available.
* Be hosted somewhere retrievable publicly.
* Not cause redirects.
* Be under 1MB.
* Return a png image, and not html with an image embedded or any other format.

If you need a repository for your logo to be hosted publicly, make a PR to the [`eigendata`](https://github.com/Layr-Labs/eigendata)
repository to add your logo.