---
sidebar_position: 4
title: Allocation and Deallocation
---

## Allocations

Allocations are made by magnitude and can only be made:
* To valid [Operator Sets](operator-sets-concept).
* From non-slashable [magnitude](strategies-and-magnitudes).

Allocations are not made until the Operator [`ALLOCATION_DELAY`](../../reference/safety-delays-reference.md) has passed (that is, the allocation is not pending). Allocations
cannot be made from an of:
* Existing queued allocations
* Magnitude already allocated to an Operator Set
* Pending deallocations.

## Deallocations

Deallocations are similar to allocations and are not made until the Operator [`DEALLOCATION_DELAY`](../../reference/safety-delays-reference.md) has passed (that is, the 
deallocation is not pending). After the delay, the stake is non-slashable. The delay:
* Enables AVSs to update their view of [Unique Stake](../slashing/unique-stake.md) to reflect the Operator’s reduced allocation.
* Guarantees appropriate delays for tasks to remain slashable.

Queued deallocations cannot be canceled. Deallocations happen immediately (that is, the `DELLOCATION_DELAY` does not apply) 
if the Operator is not registered to the AVS, or the strategy being deallocated is not part of the Operator Set.

If an Operator deregisters, the Operator remains slashable for the `DEALLOCATION_DELAY` period following the deregistration. 
After the deregistration, the allocations to that Operator Set still exist, and if the Operator re-registers, those Operator 
Set allocations immediately become slashable again. That is, a deregistration does not queue a deallocation.

Each Operator/ Strategy pair can have only one pending allocation or deallocation transaction per Operator Set at a time. 
A single transaction can modify multiple allocations.
