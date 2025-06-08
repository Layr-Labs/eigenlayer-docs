---
sidebar_position: 1
title: Onboard to AVS Dashboard
---

The AVS Dashboard (also known as AVS Marketplace) lists registered AVSs. 

<img src="/img/avs-marketplace.png" width="75%" style={{ margin: '50px'}}>
</img>

:::important
The AVS Marketplace is not yet available on Sepolia or Hoodi testnets. 
:::

## Adding a listing

To display an AVS on the [AVS Marketplace](https://app.eigenlayer.xyz/avs), invoke `updateAVSMetadataURI` on the [AllocationManager core contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md).

For information on the expected format and metadata requirements, refer to [Register AVS Metadata](../build/register-avs-metadata.md).

Once invoked, the data is indexed within about 20 minutes, and the metadata is displayed on the AVS Dashboard for Holesky.
[The EigenLayer Mainnet Dashboard Onboarding Form is required to display on the AVS Dashboard for mainnet](#mainnet-dashboard-onboarding). 

## Updating a listing 

If you deploy a new contract for your AVS, remove the previous listing by invoking `updateAVSMetadataURI` on the [AllocationManager core contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/core/AllocationManager.md)
value of null. For example, `updateAVSMetadataURI("")`.

The listing will be removed from the AVS Marketplace cache within one hour.

### getOperatorRestakedStrategies

To provide the list of Strategies that an Operator has restaked with a AVS, the [`getOperatorRestakedStrategies`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/testnet-sepolia/docs/core/RewardsCoordinator.md#createavsrewardssubmission) function must
be implemented. Implementing `getOperatorRestakedStrategies` enables the AVS to have its total restaked value displayed on the UI.
Given an operator, the function:
- Retrieve the Operator's quorum bitmap from the `RegistryCoordinator.sol` contract.
- Retrieve the addresses of the strategies for each quorum in the quorum bitmap

`getOperatorRestakedStrategies` makes no guarantee on whether the Operator has shares for a strategy in an Operator Set
or the uniqueness of each element in the returned array. The offchain service is responsible for that validation. 

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

To list all supported restakeable Strategies for the AVS on the UI, the [`getRestakeableStrategies`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/testnet-sepolia/docs/core/RewardsCoordinator.md#createavsrewardssubmission) function must be implemented.

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

For a reference implemetation, refer to [ServiceManagerBase.sol](https://github.com/Layr-Labs/eigenlayer-middleware/blob/mainnet/src/ServiceManagerBase.sol).

## Mainnet Dashboard onboarding
To complete the process of onboarding your AVS to mainnet AVS Marketplace Dashboard, submit the [EigenLayer Mainnet Dashboard Onboarding Form](https://forms.gle/8BJSntA3eYUnZZgs8).