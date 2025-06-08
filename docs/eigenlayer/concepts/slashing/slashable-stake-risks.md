---
sidebar_position: 4
title: Slashable Stake Risks
---

:::important
Stake delegated to an Operator can become slashable, and when redistributable slashing is live on mainnet, previously delegated
stake can become redistributable. Stakers are responsible for ensuring that they fully understand and confirm
their risk tolerances for existing and future delegations to Operators and the Operator’s slashable allocations. Additionally,
Stakers are responsible for continuing to monitor the allocations of their chosen Operators as they update allocations across
various Operator Sets.
:::

:::note
[ELIP-006 Redistributable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced Redistributable Operator Sets.
Redistributable Slashing is available in v1.5 on testnets and will be available on mainnet in Q3.
:::

AVSs create [Operator Sets](../operator-sets/operator-sets-concept.md) that may include slashable
[Unique Stake](unique-stake.md), or be Redistributable Operator Sets, and Operators can
allocate their delegated stake to Operator Sets. If a Staker has previously delegated stake to an Operator, the delegated stake
becomes slashable when the Operator opts into an Operator Set and allocates Unique Stake. Slashed funds can be burned or
redistributed.

For more information on the safety delays for Stakers, refer to the [Safety Delays reference](../../reference/safety-delays-reference.md)
