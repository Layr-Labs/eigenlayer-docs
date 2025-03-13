---
sidebar_position: 1
title: Operator Sets Overview
---

:::note
Operator Sets are currently available on the Holesky testnet. [ELIP-002 Slashing via Unique Stake & Operator Sets](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md)
introduced Operator Sets.

Currently, Operators register to an AVS to earn rewards in the AVSDirectory. We recommend existing AVSs [migrate to Operator Sets on testnet](../../../developers/HowTo/slashing/migrate-to-operatorsets.md). 
:::

Operator Sets determine which Operators secure an AVS and earn rewards. Each AVS defines one or more Operator Sets that
Operators may opt into. The opted in Operators are the set of Operators that are responsible for securing that service.
By opting into the Operator Set for an AVS, Operators gain access to the AVS rewards, and the AVS slashing risks.

AVSs group Operators into Operator Sets based on unique business logic, hardware profiles, liveness guarantees, or composition 
of stake. Operators use Operator Sets to allocate and deallocate [Unique Stake](../slashing/unique-stake.md). AVSs use Operator Sets to assign tasks to Operator 
Sets to perform the service provided by the AVS.

Operators are responsible for ensuring that they fully understand the slashing conditions and slashing risks of AVSs before 
opting into an Operator Set and allocating  stake to the Operator Set, as once allocated, those funds may be slashable 
according to any conditions set by that AVS. 

## For AVS Developers

For information on designing Operator Sets, refer to [Design Operator Sets](../../../developers/HowTo/slashing/design-operator-set.md).

## For Operators

For information on allocating to Operator Sets, refer to [Allocate and Register to Operator Set](../../../operators/howto/operator-sets.md).
