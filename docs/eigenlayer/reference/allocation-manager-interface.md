---
sidebar_position: 4
title: Allocation Manager Interface
---

The `AllocationManager` interface handles all allocation and deallocation signals.

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