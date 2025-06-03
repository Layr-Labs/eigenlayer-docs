---
sidebar_position: 4
title: Safety Delays
---

:::important
Stake delegated to an Operator can become slashable, and when redistributable slashing is live on mainnet, previously delegated
stake can become redistributable. Stakers are responsible for ensuring that they fully understand and confirm
their risk tolerances for existing and future delegations to Operators and the Operator’s slashable allocations. Additionally,
Stakers are responsible for continuing to monitor the allocations of their chosen Operators as they update allocations across
various Operator Sets.

AVSs using redistribution, and Operators running those AVSs, will be marked with appropriate metadata onchain and in the EigenLayer app.
:::

Safety delays are applied when allocating or deallocating to prevent rapid stake movements. Safety delays:
* Ensure stability. Delays ensure gradual transitions when stake is being allocated or dellocated enabling AVSs to adjust to changes in Operator security.
* Reduce risks from slashing. Delays ensure that staked assets remain at risk for a period after deallocation preventing the withdrawal of stake immediately before a slashing event to avoid slashing penalties.
* Preventing stake cycling to collect rewards. Delays ensure commitment periods to securing an AVS.

:::note
[ELIP-006 Redistibutable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced the Slash Escrow. Redistibutable Slashing is available in v1.5 on testnets and will be
available on mainnet in Q3.
:::

A safety delay is applied when slashing to bring guarantees to protocol outflows. All slashed funds
(burnt or redistributed) go through a 4-day escrow period. In the case of an implementation bug where an AVS could
slash beyond its allocated unique stake (for example, a total protocol TVL drain), the Slash Escrow enables a governance
pause and intervention. For more information, refer to Slash Escrow in the Security section. 

For more information on provided safety delays, refer to the [Safety Delays reference](../../reference/safety-delays-reference).
