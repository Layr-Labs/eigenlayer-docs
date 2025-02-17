---
sidebar_position: 1
title: Slashing
---

## Operator Sets (Currently in Testnet)

Operator Sets bring the guarantees of Unique Stake to the protocol and commitment-based slashing to AVSs. AVSs may use them to differentiate Operators based on unique business logic, hardware profiles, liveness guarantees, or composition of stake.

To ensure community and incentive alignment, it is generally expected that AVSs will conduct off-chain outreach to communicate the purpose and task/security makeup of their Operator Sets with their Operators and Stakers prior to beginning registration. This likely would include any potential hardware, software, or stake requirements. It is up to the AVS to decide task distribution within an Operator Set.

In order for Operators to join Operator Sets, there is a new registration process handled via the AllocationManager. Both AVSs and Operators will have control over who, how, and when Operators can register. After the instantiation of an Operator Set and its optional registrar contract by an AVS, Operators can begin the registration process. The AVS may use the registrar contract to apply additional business logic to joining Operators to Operator Sets. These may be conditions like amounts of allocated stake that ensure an Operator has adequate Unique Stake applied as security before being registered and assigned tasks.

##  Registration

The registration flow follows the pattern illustrated below and is completed in one or two transactions depending on the requirements set by the AVS:

![](/img/operator-guides/operator-registration-allocation.png)




##  Unique Stake Allocation & Deallocation

Note: Please review the entire [Unique Stake Allocation & Deallocation ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md) in detail. The following is not a complete description of the Slashing and Operator Sets upgrade and is qualified in its entirety by reference to the [Unique Stake Allocation & Deallocation ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md#unique-stake-allocation--deallocation).



Unique Stake is a mechanism to guarantee slashable stake can only be allocated to one Operator Set at a time. Unique Stake benefits both Operators and AVSs with certain properties when reasoning about EigenLayer slashing:

* **Greater control over slashing risk:** With Unique Stake, the risk of slashing is isolated to the individual AVS and Operator Set, and Operators can control how much of their stake any AVS can slash. AVSs are not exposed to risk from any other AVS or their slashings.
* **Guaranteed slashable stake:** AVSs have the tools they need to understand the amount of Unique Stake that can be slashed at a given time across their Operator Sets.
* **Permissionless onboarding of AVSs:** Since slashing is localized to individual AVSs, there is no need for a common veto committee which means launching an AVS on EigenLayer remains permissionless.

When Stakers deposit assets on EigenLayer, they are stored in accounting contracts known as Strategies. Strategies are different expressions of security on EigenLayer. Today, they represent different types of restaked assets (e.g., tokens) delegated to Operators that AVSs can leverage for securing their services and upholding cryptoeconomic guarantees. In order to make delegations slashable, Operators must allocate individual proportions of them as Unique Stake to Operator Sets. Allocations are exclusively slashable by the AVS that created that Operator Set.

In figure 1, Operator 1 has a delegation of 100 staked ETH for the ETH Strategy. Operator 1 then allocates proportions of that ETH as Unique Stake in Operator Sets across several AVSs.



![Operator Allocations to Operator Sets](/img/operator-guides/operator-sets-figure-3.png)  
***Figure 1: Operator Allocations to Operator Sets***

The 85 allocated ETH is slashable exclusively by the AVS originating each Operator Set. In this case, AVS 2, 3, and 4 can slash their associated Operator Sets 2, 3, and 4, respectively.

Let’s consider another example with three Operators. Figure 2 illustrates two Operator Sets instantiated by AVS 1. AVS 1 has created two Operator Sets for different tasks. For example, this AVS may use Operator Set 1 for assigning generation of ZK proofs to Operators, an expensive computation, and Operator Set 2 for verification of those proofs, a cheaper computation.

![Example of an AVS's Unique Stake](/img/operator-guides/operator-sets-figure-4.png)  
***Figure 2: Example of an AVS’s Unique Stake***

Operator 1 is registered to Operator Set 1 but has not yet allocated any Unique Stake. Operator 2 has allocated 10% of its ETH delegation to Operator Set 1 (amounting to a nominal allocation of 10 ETH). This is exclusively slashable by AVS 1 in Operator Set 1. Operator 2 has also allocated 5% (5 ETH) to Operator Set 2, which is exclusively slashable by AVS 1 in Operator Set 2.

Along with Operator 3’s 20% allocation (20 ETH), Operator Set 1 has a total Unique Stake of 30 ETH available to slash, with the certainty it cannot be slashed elsewhere. Operator Set 2 has allocations totalling 15 ETH of Unique Stake. AVS 1 may distribute more valuable tasks against which to slash and reward to Operator Set 1 in order to take advantage of the greater amount of Unique Stake.

### Allocating and Deallocating to Operator Sets

Unique Stake is allocated to Operator Sets in the protocol via a function provided in the `AllocationManger`. In the `AllocationManager`, these allocations are tracked using an accounting tool known as magnitudes.

For each Strategy, an Operator starts with a protocol-defined Total Magnitude of 1x10^18 (`INITIAL_TOTAL_MAGNITUDE`). This Total Magnitude can never increase; to account for slashing events originated by an AVS, the protocol *monotonically decreases* the Strategy’s total magnitude for the slashed Operator. Operators can allocate magnitudes to Operator Sets using the `modifyAllocations` function. The proportion of an Operator’s delegation assigned as Unique Stake to an Operator Set is equal to the magnitude allocated to that Operator Set divided by the Operator’s Total Magnitude. For a given strategy, the sum of all magnitude allocations can never be greater than the Total Magnitude (the sum of the proportions cannot exceed 100%), ensuring the property of Unique Stake that no two Operator Sets can slash the same stake.

Below is an example of an Operator Magnitude allocation for the EIGEN Strategy. This will be expanded upon in the next section.

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 3,000 | 30% | 30 |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 2,500 | 25% | 25 |
| `Total` | 10,000 | 100% | 100 |

In this example, the Operator submitted one transaction to allocate to three Operator Sets simultaneously for the Eigen strategy using the `modifyAllocations` function. It allocated various magnitudes across AVSs in the Operator’s EIGEN Strategy and uses a total magnitude of 10,000 as opposed to 1x1018 for legibility.

Allocations and deallocations are subject to some safety delays in the protocol. The delays vary from protocol-configured constants to custom constraints that Operators can add for additional safety. They are instantiated in the `AllocationManager` alongside the other constants:

| Parameter | Description | Value | Setter & Configuration |
| :---- | :---- | :---- | :---- |
| `ALLOCATION_CONFIG_DELAY` | The amount of blocks between an Operator queuing an `ALLOCATION_DELAY` change and the change taking effect. | 126000 blocks (~17.5 days) | Core Protocol: Set via governance |
| `ALLOCATION_DELAY` | The amount of blocks it takes for an Operator’s allocation to be live in an Operator Set for a given Strategy. It must be set by the Operator prior to any allocations and applies globally to all Operator Sets and Strategies.  The protocol provides no constraints on this value. It can be any unsigned integer value and can be changed by the Operator.  | Unsigned integer value representing a number of blocks  | Operator: Set via `AllocationManager` Must be set in order to allocate |
| `DEALLOCATION_DELAY` | The amount of blocks between an Operator queuing a deallocation of stake from an Operator Set for a strategy and the deallocation taking effect. This delay also applies to an Operator *deregistering* from an Operator Set, either by their own action or that of the AVS. | 100800 blocks (~14 days) | Core Protocol: Set via governance |
| `INITIAL_TOTAL_MAGNITUDE` | The initial value of the monotonically decreasing total magnitude for every Operator for every strategy. This is set high enough to start out with a large level of precision in magnitude allocations and slashings. | 1e18 | Core Protocol: Constant, unlikely to change |
| `WITHDRAWAL_DELAY` | The amount of blocks between a Staker queueing a withdrawal and the withdrawal becoming non-slashable and completable. | 100800 blocks (~14 days) | Core Protocol: Set via governance |

Before allocating for their first Operator Set, an Operator is required to set an `ALLOCATION_DELAY` in the `AllocationManager`. If an Operator is registering with EigenLayer for the first time, they will be required to provide an `ALLOCATION_DELAY` during registration. It takes the amount of time specified in the `ALLOCATION_CONFIG_DELAY` for the Operator's `ALLOCATION_DELAY` to be set initially or updated. This delay is to ensure Stakers have time to adjust to changes in their delegated Operator’s stake allocations. Stakers can withdraw their funds if an allocation is viewed as undesirable, subject to the `WITHDRAWAL_DELAY`.

The `AllocationManager` interface handles all allocation and deallocation signals:

```solidity
interface IAllocationManager {

   /**
    * @notice struct used to modify the allocation of slashable magnitude to an operator set
    * @param operatorSet the operator set to modify the allocation for
    * @param strategies the strategies to modify allocations for
    * @param newMagnitudes the new magnitude to allocate for each strategy to this operator set
    */
   struct AllocateParams {
       OperatorSet operatorSet;
       IStrategy[] strategies;
       uint64[] newMagnitudes;
   }

   /**
     * @notice Called by the delegation manager OR an operator to set an operator's allocation delay.
     * This is set when the operator first registers, and is the number of blocks between an operator
     * allocating magnitude to an operator set, and the magnitude becoming slashable.
     * @param operator The operator to set the delay on behalf of.
     * @param delay the allocation delay in blocks
     */
    function setAllocationDelay(
	address operator, 
	uint32 delay
    ) external;

    /**
     * @notice Modifies the proportions of slashable stake allocated to an operator set  from a list of strategies
     * Note that deallocations remain slashable for DEALLOCATION_DELAY blocks therefore when they are cleared they may
     * free up less allocatable magnitude than initially deallocated.
     * @param operator the operator to modify allocations for
     * @param params array of magnitude adjustments for one or more operator sets
     * @dev Updates encumberedMagnitude for the updated strategies
     * @dev msg.sender is used as operator
     */
    function modifyAllocations(
	address operator, 
	AllocateParams[] calldata params
    ) external;

    /**
     * @notice struct used to modify the allocation of slashable magnitude to an operator set
     * @param operatorSet the operator set to modify the allocation for
     * @param strategies the strategies to modify allocations for
     * @param newMagnitudes the new magnitude to allocate for each strategy to this operator set
     */
    struct AllocateParams {
        OperatorSet operatorSet;
        IStrategy[] strategies;
        uint64[] newMagnitudes;
    }

    /**
     * @notice This function takes a list of strategies and for each strategy, removes from the deallocationQueue
     * all clearable deallocations up to max `numToClear` number of deallocations, updating the encumberedMagnitude
     * of the operator as needed.
     *
     * @param operator address to clear deallocations for
     * @param strategies a list of strategies to clear deallocations for
     * @param numToClear a list of number of pending deallocations to clear for each strategy
     *
     * @dev can be called permissionlessly by anyone
     */
    function clearDeallocationQueue(
        address operator,
        IStrategy[] calldata strategies,
        uint16[] calldata numToClear
    ) external;
}
```

Magnitude allocations can only be made to valid Operator Sets and only from non-slashable magnitude. Allocations are queued in the `AllocationManager` and become active automatically after the `ALLOCATION_DELAY`. Magnitude is not allocated until the Operator’s `ALLOCATION_DELAY` has passed, i.e. the allocation is not pending. Additional magnitude allocations cannot be made from existing queued allocations, magnitude already allocated to an Operator Set, or pending deallocations.

***An AVS may slash an Operator up to the total allocated amount of Unique Stake per Strategy under the following conditions:***

* ***The Operator is registered to the Operator Set the AVS wishes to slash.***
* ***The Operator Set is configured to include the allocated strategy.***

***Deallocations are the primary means of making Unique Stake non-slashable.*** ***Operators should handle allocations to registered Operator Sets as if they can be slashed at any time.*** For example, AVSs may add or remove Strategies to Operator Sets at will, which may instantly make any allocated strategy slashable. Deregistration from an Operator Set is another such case. An Operator is slashable by that Operator Set for the duration of the `DEALLOCATION_DELAY` after a deregistration, but the allocations to that Operator Set _will still exist._ If the Operator re-registers after the delays have elapsed, those Operator Set allocations immediately become slashable again.

Deallocations act similarly to allocations and are queued in the `AllocationManager` and take effect automatically after the `DEALLOCATION_DELAY`. This is a globally set constant across all Operators and Operator Sets. This delay allows AVSs to update their view of Unique Stake to reflect the Operator’s reduced allocation and guarantees appropriate delays for tasks to remain slashable. Queued deallocations *cannot* be canceled. After the delay, this stake is considered non-slashable.

Some notes and caveats impacting UX:

* If an allocation to an Operator Set is made non-slashable by no longer meeting the criteria above, a deallocation does not go through the 14 day `DEALLOCATION_DELAY` and instead takes effect immediately.
* A given (Operator, Strategy) pair can only have one pending allocation *OR* deallocation transaction per Operator Set at a given time.
* A single transaction can modify multiple allocations.
* An Operator Set deregistration ***does not*** also queue a deallocation. They have to be queued separately, as a deregistration may be used to signal other states, like a period of Operator inactivity. Previously allocated magnitude that has not been deallocated becomes instantly slashable upon re-registration.

### Magnitude Allocation Flow

An illustrative example of these magnitudes is useful in showing the allocation flow. Suppose, after initial delays, the Operator’s queued allocations are applied for delegated tokens in the EIGEN strategy according to the following magnitudes:

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 3,000 | 30% | 30 |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 2,500 | 25% | 25 |
| `Total`  | 10,000 | 100% | 100 |

The above represents non-slashable and slashable stake, by Operator Set (in this case one per AVS, but this may be multiple sets). Now presume a deallocation is queued by the Operator signaling a reduction in the allocation to Operator Set AVS_1_EIGEN. The number of delegated tokens does not change, but their proportions do.

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` (*pending deallocation*) | 3,000 -> *2,000* | 30% -> *20%* | 30 -> *20* |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 2,500 | 25% | 25 |
| `Total`  | 10,000 | 100% | 100 |

The 10 EIGEN in reduced magnitude is still considered slashable until the deallocation is complete. The below is the result following the deallocation and its associated delays. Note the non-slashable stake increase.

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 20 |
| `AVS_2_EIGEN` | 2,500 | 25% | 25 |
| `EigenDA_EIGEN` | 2,000 | 20% | 20 |
| `Non-slashable` | 3,500 | 35% | 35 |
| `Total`  | 10,000 | 100% | 100 |

Now, a deposit occurs for an additional 100 EIGEN by a Staker who has delegated to the Operator. Instantly, that deposit is applied, following the proportions laid out in the allocation magnitudes.

|  | Magnitude | Proportion | EIGEN |
| :---- | :---- | :---- | :---- |
| `AVS_1_EIGEN` | 2,000 | 20% | 40 |
| `AVS_2_EIGEN` | 2,500 | 25% | 50 |
| `EigenDA_EIGEN` | 2,000 | 20% | 40 |
| `Non-slashable` | 3,500 | 35% | 70 |
| `Total`  | 10,000 | 100% | 200 |

Each Operator Set’s slashable stake and the overall non-slashable stake increase commensurately. This example is expanded in [this forum post](https://forum.eigenlayer.xyz/t/the-mechanics-of-allocating-and-slashing-unique-stake/13870#p-143651-allocation-3) with more details. We will reference this example again later in the context of slashing.

### Deposits, Delegations, & Withdrawals

Magnitude allocations make a proportion of an Operator’s delegated stake slashable by an AVS. As a result, new delegations and deposits are immediately slashable by the same proportion. There is no "activation delay". There is no change in the deposit and delegation interface.

Withdrawals and undelegation, like deallocations and deregistrations, are slashable for the `WITHDRAWAL_DELAY` after they are queued and automatically become unslashable after the delay has passed. The escrow process remains unchanged: withdrawals must be queued and completed in separate transactions. When the withdrawal is completed, slashings are applied to the stake received.



## Slashing of Unique Stake

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
***Figure 5: Sequence Representation of a Slashing***

### Burning of Slashed Funds

In this release, when funds are slashed by an AVS, the EigenLayer core contracts will make slashed funds permanently inaccessible (“burned”). ERC-20s have this done by sending them to the dead `0x00...00e16e4` address. This is done to ensure proper accounting with various LRT protocols. Natively Restaked ETH will be locked in EigenPod contracts, permanently inaccessible. The Ethereum Pectra upgrade is anticipated to unblock development of an EigenLayer upgrade which would burn Natively Restaked ETH by sending it to a dead address, instead of permanently locking it within EigenPod contracts as planned in this release.