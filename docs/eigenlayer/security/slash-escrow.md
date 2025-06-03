---
sidebar_position: 6
title: Slash Escrow
---

:::note
[ELIP-006 Redistibutable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced the Slash Escrow. Redistibutable Slashing is available in v1.5 on testnets and will be
available on mainnet in Q3.
::: 

EigenLayer has a slashing delay, Slash Escrow, which is a critical security measure to bring guarantees to protocol outflows. All slashed funds 
(burnt or redistributed) go through a 4-day escrow period. In the case of an implementation bug where an AVS could 
slash beyond its allocated unique stake (for example, a total protocol TVL drain), the Slash Escrow enables a governance 
pause and intervention.

:::note
In the protocol, the Slash Escrow Delay exists per Strategy, and EIGEN will have a larger delay. Per-Strategy configuration of the Slash Escrow 
delay is reserved for future protocol use, need, and compatibility.
:::

Pausing for catastrophic slashing bugs is gated to the Pauser multisig, as outlined in [Eigen Foundation governance](https://docs.eigenfoundation.org/protocol-governance/technical-architecture).
The Pauser multisig can only pause (or later unpause) outflows if there are still pending blocks (time) between slash initiation and the end of the Slash Escrow period. 
During a pause, governance and social consensus are the adjudication mechanism to determine if a rescue is needed 
for funds due to a catastrophic bug. If funds are to be rescued, the [Community multisig](https://docs.eigenfoundation.org/protocol-governance/technical-architecture) has the authority to upgrade the contract 
and return the funds to the protocol. 

Governance will only interface with the Slash Escrow in the case of a catastrophic bug. A catastrophic bug is defined
as a bug where an AVS (or malicious party) can: 

* Slash more stake than is allocated to a specific Operator in an Operator Set (or more than the sum of the set, up to the entire protocol TVL).
* Slash the unique stake of an Operator that is not registered to an AVS's Operator Set.
* Trigger a slash without being a registered AVS.

Governance will not intervene in individual AVS slashings when they are the product of faulty implementations, bugs, or lost keys.
