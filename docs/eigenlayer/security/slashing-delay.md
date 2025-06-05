---
sidebar_position: 6
title: Slashing Delay
---

:::note
[ELIP-006 Redistributable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced the `SlashEscrowFactory` core contract. Redistributable Slashing is available in v1.5 on testnets and will be
available on mainnet in Q3.
::: 

The `SlashEscrowFactory` core contract creates child contracts that hold and apply a delay on all slashed funds exiting the protocol 
(whether burnable or redistributable). This design is intended to permit [EigenLayer governance](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) to interface with the slash 
escrow contracts in the case of an EigenLayer protocol implementation bug. During the period between slash initiation and the
end of the delay, the [Pauser multisig](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) may implement a pause per slash preventing the slashed funds from being released from a 
child `SlashEscrow` contract. Prior to the release of slashed funds from a child `SlashEscrow` contract, the [Community multisig](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) may 
upgrade the `SlashEscrowFactory` to return funds to the protocol. As of the date of the v1.5 release which includes Redistribution on testnet, the 
[Protocol Council](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) is considering this security and governance design and what recommendations to make to the Community multisig.
For more information, refer to Slash Escrow in the Security section.


As at the testnet release for Redistribution, the [Protocol Council](https://github.com/eigenfoundation/ELIPs/blob/main/protocol-council-charter.md) are currently considering the
slashing governance design and definition of catastrophic bugs where [Governance](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) will interface with the slash escrow contracts.

:::note
In the protocol, the Slash Escrow exists per Strategy, and EIGEN will have a larger delay. Per-Strategy configuration of the Slash Escrow 
delay is reserved for future protocol use, need, and compatibility.
:::