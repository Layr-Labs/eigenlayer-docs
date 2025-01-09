---
sidebar_position: 4
title: AVS Operator Set and Slashing of Unique Stake
---


## Slashing of Unique Stake (Currently in Testnet)

Please review the entire [Unique Stake Allocation & Deallocation ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md) in detail before proceeding with Testnet. 

With Unique Stake allocated to Operator Sets, AVSs can begin assigning slashable tasks with economic commitments from their Operators. It is key to AVS designs to consider what is a slashable offense and to effectively communicate these conditions with Operators and Stakers. 

**The protocol provides a slashing function that is maximally flexible; an AVSs may slash any Operator within any of their Operator Sets for any reason.**  Slashing does not have to be objectively attributable (i.e., provable on-chain), but AVSs are encouraged to create robust legibility and process around individual slashings. It is expected that governance, fraud proofs, decentralization, and more shall be considered in AVS slashing designs. Other delays and veto periods may be included in AVS designs to avoid or cancel slashing in cases of AVS implementation bugs, improper slashing, or fraud, but **no vetoes** are provided by the EigenLayer protocol.

The `AllocationManager` provides the interface for the slashing function: 

```solidity
    /**
     * @notice Called by an AVS to slash an operator in a given operator set
     */

    function slashOperator(
        address avs,
        SlashingParams calldata params
    ) external;

    /**
     * @notice Struct containing parameters to slashing
     * @param operator the address to slash
     * @param operatorSetId the ID of the operatorSet the operator is being slashed on behalf of
     * @param strategies the set of strategies to slash
     * @param wadsToSlash the parts in 1e18 to slash, this will be proportional to the operator's
     * slashable stake allocation for the operatorSet
     * @param description the description of the slashing provided by the AVS for legibility
     */
    struct SlashingParams {
        address operator;
        uint32 operatorSetId;
        IStrategy[] strategies;
        uint256[] wadsToSlash;
        string description;
    }
```

To slash, AVSs specify the individual Operator that will be slashed, the Operator Set, the list of Strategies that will be slashed, the list of proportions to slash (as `wads` or “parts per `1e18`”), and a description for legibility. For example, an 8% slash would be represented as `8e16`, or `80000000000000000` as expected in the `wadsToSlash` parameter. A 25% slash, or `2.5e17`, the contract will expect `250000000000000000` as `wadsToSlash`. The indexes in the two arrays should match across `strategies` and `wadsToSlash`. 

All Strategies supplied must be configured as part of the Operator Set. For all Strategies specified, the Operator’s allocations to that Operator Set will be slashed by the corresponding proportion while maintaining their nominal allocations to all other Operator Sets. Under the hood this is accomplished by subtracting allocated magnitude from both the specified Operator Set, and the Operator’s Total Magnitude. This is illustrated in the example below.

Slashing proportionally reduces funds of all Stakers of the given Strategies that are delegated to the Operator, including funds in queued deallocations and withdrawals (that haven’t passed `WITHDRAWAL_DELAY`). Operator delegation is decreased directly in the `DelegationManager` in each Strategy. Changes are propagated to Staker withdrawals and view functions by referring to their delegated Operator’s Total Magnitude.

When a slashing occurs, an event is emitted onchain, one for each slashing. Details are emitted identifying the Operator slashed, in what Operator Set, and across which Strategies, with fields for the proportion slashed and meta-data:
```
/// @notice Emitted when an operator is slashed by an operator set for a strategy
/// `wadSlashed` is the proportion of the operator's total delegated stake that was slashed
event OperatorSlashed(
    address operator, OperatorSet operatorSet, IStrategy[] strategies, uint256[] wadSlashed, string description
);
```

Returning to our example from above, let’s assume that `AVS_1_Eigen` Operator Set slashes the Operator in question by 50%. Recall the final allocated magnitudes were the following:

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 40 |
| `AVS_2_EIGEN` | 2,500 | 25% | 50 |
| `EigenDA_EIGEN` | 2,000 | 20% | 40 |
| `Non-slashable` | 3,500 | 35% | 70 |
| `Total`  | 10,000 | 100% | 200 |

Now, `AVS_1` slashes the Operator for a 50% reduction (`5e17` in `wads`) in the Operator Set `AVS_1_EIGEN`:

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 1,000 | 11% | 20 |
| `AVS_2_EIGEN` | 2,500 | 28% | 50 |
| `EigenDA_EIGEN` | 2,000 | 22% | 40 |
| `Non-slashable` | 3,500 | 39% | 70 |
| `Total` | 9000 | 100% | 180 |

Note, slashing by one Operator Set does not affect the magnitudes of EIGEN allocated to other Operator Sets. The interactions between Staker, Operator, AVS, and core contracts are represented visually in the sequence diagram below:

![Sequence Representation of a Slashing](/img/operator-guides/operator-sets-figure-5.png)  
***Figure: Sequence Representation of a Slashing***

### Burning of Slashed Funds

In this release, when funds are slashed by an AVS, the EigenLayer core contracts will make slashed funds permanently inaccessible (“burned”). ERC-20s have this done by sending them to the dead `0x00...00e16e4` address. This is done to ensure proper accounting with various LRT protocols. Natively Restaked ETH will be locked in EigenPod contracts, permanently inaccessible. The Ethereum Pectra upgrade is anticipated to unblock development of an EigenLayer upgrade which would burn Natively Restaked ETH by sending it to a dead address, instead of permanently locking it within EigenPod contracts as planned in this release.


##  Migrating to Operator Sets

Per the Slashing and Operator Set upgrade (currently in Testnet) existing AVSs are strongly recommended to migrate away from the AVSDirectory towards using the Operator Sets feature. This will be required to slash. In order to make this migration, we recommend that AVSs:

1. Upgrade their contracts to handle the callback from the AllocationManager via the ServiceManagerBase example [here](https://github.com/Layr-Labs/eigenlayer-middleware/blob/feat/slashing-release-branch/src/ServiceManagerBase.sol).  
2. Communicate to Operators regarding registering for Operator Sets via the new registration pathway.  
   1. For slashable Operator Sets, Operators should also allocate slashable stake.  
   2. AVSs should consider requirements for the AVSRegistrar contract.  
3. Migrate to distribution of tasks based on the delegated and slashable stake of Operators registered to the AVS’s Operator Sets.

This gives AVSs time to switch any existing quorums over to Operator Sets in the core protocol. After this migration has occurred, integrations with slashing can go live. M2 registration and Operator Set registration can live in parallel. The AVSDirectory method will be deprecated in a future upgrade.

AVS may integrate the AllocationManager via:

* Create new Operator Sets through the AllocationManager.  
* Add (or later remove) specific Strategies to that Operator Set that Operators will use to secure it.  
* Specify an additional AVSRegistrar contract that applies business logic to gate Operator registration to an Operator Set.

To ensure community and incentive alignment, it is generally expected that AVSs will conduct off-chain outreach to communicate the purpose and task/security makeup of their Operator Sets with their Operators and Stakers prior to beginning registration.  This likely would include any potential hardware, software, or stake requirements. It is up to the AVS to decide task distribution within an Operator Set.
