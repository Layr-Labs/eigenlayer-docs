---
sidebar_position: 1
title: Operator Sets Overview
---

:::note
[ELIP-006 Redistributable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced Redistributable Operator Sets. 
Redistributable Slashing is available in v1.5 on testnets and will be available on mainnet in Q3.

Before the Slashing and Operator Sets release, Operators registered to an AVS to earn rewards in the AVSDirectory. 
We recommend existing AVSs [migrate to Operator Sets on testnet](../../../developers/HowTo/build/slashing/migrate-to-operatorsets.md). 
:::

Operator Sets determine which Operators secure an AVS and earn rewards. Each AVS defines one or more Operator Sets that
Operators may opt into. The opted in Operators are the set of Operators that are responsible for securing that service.
By opting into the Operator Set for an AVS, Operators gain access to the AVS rewards, and the AVS slashing risks.

AVSs group Operators into Operator Sets based on unique business logic, hardware profiles, liveness guarantees, or composition 
of stake. Operators use Operator Sets to allocate and deallocate [Unique Stake](../slashing/unique-stake.md). AVSs use Operator Sets to assign tasks to Operator 
Sets to perform the service provided by the AVS, and for redistributable Operator Sets, specify the redistribution recipient.
The redistribution recipient is an AVS-controlled role and cannot be changed after an Operator Set has been created.

Operators are responsible for ensuring that they fully understand the slashing conditions and slashing risks of AVSs before 
opting into an Operator Set and allocating  stake to the Operator Set, as once allocated, those funds may be slashable 
according to any conditions set by that AVS. In general, there is a larger incentive to slash when redistribution is enabled. 
Redistributable Operator Sets may offer higher rewards, but these should be considered against the increased slashing risks.

## For AVS Developers

For information on designing Operator Sets, refer to [Design Operator Sets](../../../developers/HowTo/build/slashing/design-operator-set.md).

## For Operators

For information on allocating to Operator Sets, refer to [Allocate and Register to Operator Set](../../../operators/howto/operator-sets.md).
