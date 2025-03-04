---
sidebar_position: 3
title: AVS Security Models
---

The security model of an AVS defines who or what is trusted in an AVS, and under what conditions that trust holds. AVSs may 
have different levels of decentralization, slashing risks, and trust assumptions.

Security models available to AVSs in order of decentralization include:
* Proof of Authority. An AVS maintains a whitelist of trusted Operators.
* Permissionless Trusted Operation. An AVS trusts the top N Operators by delegated stake to run the service.
  The Permissionless Operator set can be managed by Operator ejection if SLAs are not met.
* Unique Stake allocation. An AVS requires Operators to have a certain amount of Unique Stake (that is, Slashable Stake) allocated.
  Slashing conditions can be: 
  * Objective. Attributable onchain faults. For example, rollup execution validity. 
  * Subjective. Governance based. For example, token holders in a DAO vote to slash, or vote to veto slashing.
  * Intersubjective Slashing Conditions. Broad-based agreement among all reasonable active observers. For example, data
    withholding.

:::note 
The list of security models is not exhaustive. The EigenLayer protocol provides a slashing function that is maximally flexible.
AVSs have flexibility to design their protocols to slash for any reason. AVSs are encouraged to create robust legibility 
and process around how their slashing is designed and individual slashing events.
:::