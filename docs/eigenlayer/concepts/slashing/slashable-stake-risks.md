---
sidebar_position: 4
title: Slashable Stake Risks
---

:::important
When the Slashing and Operator Set upgrade is live on mainnet, stake can become slashable for a Staker that has previously 
delegated stake to an Operator. Stakers are responsible for ensuring that they fully understand and confirm their risk tolerances 
for existing and future delegations to Operators and the Operator’s slashable allocations. Additionally, stakers are responsible 
for continuing to monitor the allocations of their chosen Operators as they update allocations across various Operator Sets.
:::

When the Slashing and Operator Sets upgrade is live on mainnet, AVSs can create [Operator Sets](../operator-sets/operator-sets-concept) that may include slashable 
[Unique Stake](unique-stake.md), and Operators can allocate their delegated stake to Operator Sets. If a Staker has previously delegated stake 
to an Operator, the delegated stake becomes slashable when the Operator opts into an Operator Set and allocates Unique Stake.

Stakers are responsible for understanding the increased risk posed by allocation of their delegated stake as slashable 
Unique Stake to an AVS. While the allocation of delegated stake to an Operator Set may be subject to the [Allocation Config 
Delay and Allocation Delay](../../reference/safety-delays-reference.md), it is important to understand the increased risk.

For more information on the safety delays for Stakers, refer to the :
* [Safety Delays reference](../../reference/safety-delays-reference.md)
* [Allocating and Deallocating to Operator Sets section of ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md#unique-stake-allocation--deallocation).
