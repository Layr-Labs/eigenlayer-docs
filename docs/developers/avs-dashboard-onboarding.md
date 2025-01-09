---
sidebar_position: 7
title: AVS Dashboard Onboarding
---


This document defines interfaces that AVSs must implement for us to be able to index their data for the V1 [AVS Marketplace](https://app.eigenlayer.xyz/avs).

New AVS Listings: in order for an AVS to have its name, information, and logo indexed, it must invoke `updateAVSMetadataURI()` on the [AVSDirectory contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/src/contracts/core/AVSDirectory.sol).
It currently takes about 10 minutes for it to be indexed and the metadata to be updated on the dashboard.

Updating AVS Listings:  if you deploy a new contract for a new version of your AVS, please be sure to remove the previous listing. Invoke the update metadata function with value of null, such as `updateAVSMetadataURI("")` to remove the previous listing. Your listing will then be removed from the application cache within one hour.

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

### registerOperatorToAVS and deregisterOperatorFromAVS
In order to have its list of operators displayed on the UI, an AVS MUST handle operator registration/deregistration by calling `registerOperatorToAVS()` and `deregisterOperatorFromAVS()` on EigenLayer’s AVSDirectory.  Primarily, these functions serve to forward calls to the `AVSDirectory.sol` contract to confirm an operator's registration with the AVS.
```solidity
function registerOperatorToAVS(
        address operator,
        ISignatureUtils.SignatureWithSaltAndExpiry memory operatorSignature
    ) public virtual onlyRegistryCoordinator {
        avsDirectory.registerOperatorToAVS(operator, operatorSignature);
    }

function deregisterOperatorFromAVS(address operator) public virtual onlyRegistryCoordinator {
        avsDirectory.deregisterOperatorFromAVS(operator);
    }
```

### getOperatorRestakedStrategies
This function must be implemented in order to provide the list of strategies that an operator has restaked with the AVS. This allows the AVS to have its total restaked value displayed on the UI.  Given an operator, this function should:
- Retrieve the operator's quorum bitmap from the `RegistryCoordinator.sol` contract.
- Retrieve the addresses of the strategies for each quorum in the quorum bitmap

Note that there is no guarantee is made on whether the operator has shares for a strategy in a quorum or uniqueness of each element in the returned array. The off-chain service should do that validation separately

```solidity
function getOperatorRestakedStrategies(address operator) external view returns (address[] memory) {
        bytes32 operatorId = registryCoordinator.getOperatorId(operator);
        uint192 operatorBitmap = registryCoordinator.getCurrentQuorumBitmap(operatorId);

        if (operatorBitmap == 0 || registryCoordinator.quorumCount() == 0) {
            return new address[](0);
        }

        // Get number of strategies for each quorum in operator bitmap
        bytes memory operatorRestakedQuorums = BitmapUtils.bitmapToBytesArray(operatorBitmap);
        uint256 strategyCount;
        for(uint256 i = 0; i < operatorRestakedQuorums.length; i++) {
            strategyCount += stakeRegistry.strategyParamsLength(uint8(operatorRestakedQuorums[i]));
        }

        // Get strategies for each quorum in operator bitmap
        address[] memory restakedStrategies = new address[](strategyCount);
        uint256 index = 0;
        for(uint256 i = 0; i < operatorRestakedQuorums.length; i++) {
            uint8 quorum = uint8(operatorRestakedQuorums[i]);
            uint256 strategyParamsLength = stakeRegistry.strategyParamsLength(quorum);
            for (uint256 j = 0; j < strategyParamsLength; j++) {
                restakedStrategies[index] = address(stakeRegistry.strategyParamsByIndex(quorum, j).strategy);
                index++;
            }
        }
        return restakedStrategies;        
    }
```
### getRestakeableStrategies
This function must be implemented in order to have all possible restakeable strategies for that AVS displayed on the UI correctly.  These are the strategies that the AVS supports for restaking.  

```solidity
function getRestakeableStrategies() external view returns (address[] memory) {
        uint256 quorumCount = registryCoordinator.quorumCount();

        if (quorumCount == 0) {
            return new address[](0);
        }
        
        uint256 strategyCount;
        for(uint256 i = 0; i < quorumCount; i++) {
            strategyCount += stakeRegistry.strategyParamsLength(uint8(i));
        }

        address[] memory restakedStrategies = new address[](strategyCount);
        uint256 index = 0;
        for(uint256 i = 0; i < _registryCoordinator.quorumCount(); i++) {
            uint256 strategyParamsLength = _stakeRegistry.strategyParamsLength(uint8(i));
            for (uint256 j = 0; j < strategyParamsLength; j++) {
                restakedStrategies[index] = address(_stakeRegistry.strategyParamsByIndex(uint8(i), j).strategy);
                index++;
            }
        }
        return restakedStrategies;
    }

```


Refer to [ServiceManagerBase.sol](https://github.com/Layr-Labs/eigenlayer-middleware/blob/mainnet/src/ServiceManagerBase.sol) for a reference implementation of the interface.

Proxy and Implementation addresses for AVSDirectory contract are available at EigenLayer Contracts -> [Deployments](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).

To look at EigenDA's AVS-specific deployment -> [Deployments](https://github.com/Layr-Labs/eigenlayer-middleware/tree/dev?tab=readme-ov-file#deployments)

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
To complete the process of onboarding your AVS on to the mainnet marketplace dashboard, please submit this form: [EigenLayer Mainnet Dashboard Onboarding Form](https://forms.gle/8BJSntA3eYUnZZgs8).

