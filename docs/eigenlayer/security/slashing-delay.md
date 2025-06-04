---
sidebar_position: 6
title: Slashing Delay
---

:::note
[ELIP-006 Redistributable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced the Slash Escrow. Redistributable Slashing is available in v1.5 on testnets and will be
available on mainnet in Q3.
::: 

EigenLayer has a slashing delay, known as Slash Escrow, which is a critical security measure to bring guarantees to protocol outflows. 
All slashed funds (burnt or redistributed) go through a 4-day escrow period. The intention of the protocol design is to permit
[Eigen Foundation governance](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) to interface with the slash escrow contracts in the case of a catastrophic slashing bug. An example of a
catastrophic slashing bug is an implementation bug in the protocol where an AVS could slash beyond its allocated unique stake (for example, a total protocol TVL drain).

As at the testnet release for Redistribution, the [Protocol Council](https://github.com/eigenfoundation/ELIPs/blob/main/protocol-council-charter.md) are currently considering the
slashing governance design and definition of catastrophic bugs where [Governance](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) will interface with the slash escrow contracts.

:::note
In the protocol, the Slash Escrow exists per Strategy, and EIGEN will have a larger delay. Per-Strategy configuration of the Slash Escrow 
delay is reserved for future protocol use, need, and compatibility.
:::

