---
sidebar_position: 4
title: Safety Delays
---

:::important
Stake delegated to an Operator can become slashable, and when redistributable slashing is live on mainnet, previously delegated
stake can become redistributable if an Operator allocates to a redistributable Operator Set. Stakers are responsible for 
ensuring that they fully understand and confirm their risk tolerances for existing and future delegations to Operators and the 
Operator’s slashable allocations. Additionally, Stakers are responsible for continuing to monitor the allocations of their 
chosen Operators as they update allocations across various Operator Sets.

AVSs using redistribution, and Operators running those AVSs, will be marked with appropriate metadata onchain and in the EigenLayer app.
:::

Safety delays are applied when allocating or deallocating to prevent rapid stake movements. Safety delays:
* Ensure stability. Delays ensure gradual transitions when stake is being allocated or dellocated enabling AVSs to adjust to changes in Operator security.
* Reduce risks from slashing. Delays ensure that staked assets remain at risk for a period after deallocation preventing the withdrawal of stake immediately before a slashing event to avoid slashing penalties.
* Preventing stake cycling to collect rewards. Delays ensure commitment periods to securing an AVS.

:::note
[ELIP-006 Redistributable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduces a new core contract, the `SlashEscrowFactory`. Redistributable Slashing is 
available in v1.5 on testnets and will be available on mainnet in Q3.
:::

The `SlashEscrowFactory` creates child contracts that hold and apply a delay on all slashed funds exiting the protocol 
(whether burnable or redistributable). This design is intended to permit EigenLayer governance to interface with the slash 
escrow contracts in the case of an EigenLayer protocol implementation bug. During the period between slash initiation and the 
end of the delay, the [Pauser multisig](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) may 
implement a pause per slash preventing the slashed funds from being released from a 
child `SlashEscrow` contract. Prior to the release of slashed funds from a child SlashEscrow contract, the [Community multisig](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) may upgrade 
the `SlashEscrowFactory` to return funds to the protocol. As of the date of release of v1.5 which includes Redistribution on testnet, the [Protocol Council](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) 
is considering this security and governance design and what recommendations to make to the Community multisig. For more information, 
refer to Slash Escrow in the Security section.

For more information on provided safety delays, refer to the [Safety Delays reference](../../reference/safety-delays-reference).
