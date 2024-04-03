---
sidebar_position: 6
title: AVS Dashboard Onboarding
---


This document defines interfaces that AVSs must implement to index their data for the V1 AVS Marketplace


## Interface

```javascript
interface IServiceManager {
// These 3 functions are just proxies to the same-named functions in the AVSDirectory
function registerOperatorToAVS(address operator, Signature memory signature);

function deregisterOperatorFromAVS(address operator);

function updateAVSMetadataURI(string calldata metadataURI);
	
	// Implement in ServiceManager
	function getOperatorRestakedStrategies(address operator) returns (address[] memory)

	function getRestakeableStrategies() returns (address[] memory);
}
```

In order to have its name, information, and logo indexed, an AVS MUST invoke `updateAVSMetadataURI()` on the [AVSDirectory contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/src/contracts/core/AVSDirectory.sol).

In order to have its list of operators displayed on the UI, an AVS MUST handle operator registration/deregistration by calling `registerOperatorToAVS()` and `deregisterOperatorFromAVS()` on EigenLayer’s AVSDirectory.

In order to have its restakeable strategies displayed on the UI, an AVS MUST implement `getRestakeableStrategies()`.

In order to have its Total Restaked Value displayed on the UI, an AVS MUST implement `getOperatorRestakedStrategies()`.

Proxy and Implementation addresses for AVSDirectory contract are available at EigenLayer Contracts -> [Deployments](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).

## MetadataURI Format

The metadataURI should follow the format outlined in this [example](https://holesky-operator-metadata.s3.amazonaws.com/avs_1.json). The logo MUST be in PNG format. 

```json
{
    "name": "EigenLabs AVS 1",
    "website": "https://www.eigenlayer.xyz/",
    "description": "This is my 1st AVS",
    "logo": "https://holesky-operator-metadata.s3.amazonaws.com/eigenlayer.png",
    "twitter": "https://twitter.com/eigenlayer"
}
```

## Quorums
The design for a V2 marketplace that supports more expressive views of stake (quorums, insurance, payments, etc) has not been finalized. Recommendation to AVS teams is to upgrade their contracts for V2 marketplace to meet interface requirements for indexing.

## Frontend Onboarding - Whitelist
We currently have a whitelist on the testnet version of the frontend, so once you have done the above, reach out to Nima and provide your service manager address to be added to the whitelist.
