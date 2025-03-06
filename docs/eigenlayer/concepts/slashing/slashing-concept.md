---
sidebar_position: 1
title: Slashing Overview
---

:::note
Slashing is currently available on the Holesky testnet. The Slashing release implements [ELIP-002: Slashing via Unique Stake & Operator Sets](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md).
:::

Slashing is a type of penalty determined by an AVS as a deterrent for broken commitments by Operators. Broken commitments
may include improperly or inaccurately completing tasks assigned in [Operator Sets](../operator-sets/operator-sets-concept) by an AVS. 
Slashing results in a burning/loss of funds. AVSs can only slash an Operator’s [Unique Stake](unique-stake.md) allocated to a single Operator Set.

An AVS may slash an Operator up to the total allocated amount of Unique Stake per [Strategy](../operator-sets/strategies-and-magnitudes) under the following conditions:
* The Operator is registered to the Operator Set the AVS wishes to slash.
* The Operator Set is configured to include the allocated strategy.
* All applicable safety and time delays have passed.

:::important
The EigenLayer protocol provides a slashing function that is maximally flexible. That is, AVSs may slash any Operator that
has delegated stake to that AVS within any of their Operator Sets. AVSs have flexibility to design their protocols to slash
for any reason. Slashing does not have to be objectively attributable (that is, provable onchain), but AVSs are encouraged to
create robust legibility and process around how their slashing is designed and individual slashing events. Operators are responsible
for ensuring that they fully understand the slashing conditions and slashing risks of AVSs before delegating stake to them, as once
delegated, those funds may be slashable according to the conditions set by that AVS.
:::

## Slashing sequence

The interactions between Staker, Operator, AVS, and core contracts during a slashing are represented in the sequence diagram.

![Sequence Representation of a Slashing](/img/operator-guides/operator-sets-figure-5.png)

## Burning slashed funds

When funds are slashed by an AVS, the EigenLayer core contracts make slashed funds permanently inaccessible (burned).
ERC-20s have this done by sending them to the dead 0x00...00e16e4 address. The dead address is used to ensure proper
accounting with various LRT protocols.

Natively Restaked ETH will be locked in EigenPod contracts, permanently inaccessible. The Ethereum Pectra upgrade is anticipated
to unblock development of an EigenLayer upgrade which would burn Natively Restaked ETH by sending it to a dead address, instead
of permanently locking it within EigenPod contracts as planned in this release.
