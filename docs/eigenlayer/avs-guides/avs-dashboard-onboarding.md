---
sidebar_position: 7
title: AVS Dashboard Onboarding
---


This document defines interfaces that AVSs must implement for us to be able to index their data for the V1 [AVS Marketplace](https://app.eigenlayer.xyz/avs).

## Interface

```javascript
interface IServiceManager {
// Below 3 functions are just proxies to the same-named functions in the AVSDirectory
function registerOperatorToAVS(address operator, Signature memory signature);

function deregisterOperatorFromAVS(address operator);

function updateAVSMetadataURI(string calldata metadataURI);
	
// Below 2 functions are needed for your AVS to appear correctly on the UI
function getOperatorRestakedStrategies(address operator) returns (address[] memory)

function getRestakeableStrategies() returns (address[] memory);
}
```

New AVS Listings: in order for an AVS to have its name, information, and logo indexed, it must invoke `updateAVSMetadataURI()` on the [AVSDirectory contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/src/contracts/core/AVSDirectory.sol).
It currently takes about 10 minutes for it to be indexed and the metadata to be updated on the dashboard.

Updating AVS Listings:  if you deploy a new contract for a new version of your AVS, please be sure to remove the previous listing. Invoke the update metadata function with value of null, such as `updateAVSMetadataURI("")` to remove the previous listing. Your listing will then be removed from the application cache within one hour.


In order to have its list of operators displayed on the UI, an AVS MUST handle operator registration/deregistration by calling `registerOperatorToAVS()` and `deregisterOperatorFromAVS()` on EigenLayer’s AVSDirectory.

In order to have its restakeable strategies displayed on the UI, an AVS MUST implement `getRestakeableStrategies()`.

In order to have its Total Restaked Value displayed on the UI, an AVS MUST implement `getOperatorRestakedStrategies()`.

Refer to [ServiceManagerBase.sol](https://github.com/Layr-Labs/eigenlayer-middleware/blob/mainnet/src/ServiceManagerBase.sol) for a reference implementation of the interface.

Proxy and Implementation addresses for AVSDirectory contract are available at EigenLayer Contracts -> [Deployments](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).

## MetadataURI Format

The metadataURI should follow the format outlined in this [example](https://holesky-operator-metadata.s3.amazonaws.com/avs_1.json). The logo MUST be in PNG format. 

```json
{
    "name": "EigenLabs AVS 1",
    "website": "https://www.eigenlayer.xyz/",
    "description": "This is my 1st AVS",
    "logo": "https://raw.githubusercontent.com/layr-labs/eigendata/master/avs/eigenlabs/logo.png",
    "twitter": "https://twitter.com/eigenlayer"
}
```

Note that for proper rendering of your logo on the UI, the logo _must_ be hosted on GitHub and its reference must point to the raw file as the example above shows. If you need a repo for your logo to be hosted publicly, you can make a PR to the `eigendata` repo and have your logo added: https://github.com/Layr-Labs/eigendata.

## Holesky Dashboard onboarding
Once you've gone through the above steps and you've called the `updateAVSMetadataURI` function, your AVS will be reflected on the Holesky dashboard in about 10 minutes.

## Mainnet Dashboard onboarding
Prior to planning your Mainnet onboarding, please test first on testnet. If not already connected to the Eigen Labs team regarding any onboarding questions, you can get in touch with the team by filling out [this form](https://forms.gle/8BJSntA3eYUnZZgs8).
