---
sidebar_position: 1
title: Overview
---

**Slashing is currently available on Holesky testnet.**

Slashing is a penalty for improperly or inaccurately completing tasks assigned in Operator Sets by an AVS. A slashing results
in burned (that is, lost) funds. AVSs assign slashable tasks with economic commitments from their Operators. AVSs must
consider what is a slashable offense and effectively communicate these conditions to Operators and Stakers.

## Unique Stake

Operators allocate specific portions of their staked security as Unique Stake. Unique Stake ensures only one AVS can slash 
that stake. Unique Stake isolates slashing risks and strengthens security guarantees for AVSs without exposing
Operators to unnecessary risks from unrelated tasks.

## Operator Sets

Operator Sets enable AVSs to organize Operators into groups. For each Operator Set, AVSs define slashing conditions,
assign tasks, and manage slashable security. Operators must opt in to Operator Sets. Operators need to consider the AVS design
and rewards compared with the Operator risk tolerance and competencies.

## Slashing vetoes

EigenLayer provides a maximally flexible slashing function. AVSs may slash any Operator in any of their Operator Sets for
any reason. Slashing does not have to be objectively attributable (that is, provable on-chain). We encourage AVSs to create
robust legibility and process around individual slashings. Governance, fraud proofs, and decentralization
must be considered in AVS slashing designs. Include delays and veto periods in AVS designs to avoid or cancel slashing
in cases of AVS implementation bugs, improper slashing, or fraud. 

**No vetoes are provided by the EigenLayer protocol.**

## Burning of Slashed Funds

When funds are slashed by an AVS, the EigenLayer core contracts make slashed funds permanently inaccessible (that is, burned). 
ERC-20s slashed funds are sent to the dead `0x00...00e16e4` address. Sending slashed funds to the dead address ensures proper
accounting with various LRT protocols. 

Natively Restaked ETH is locked in EigenPod contracts and is permanently inaccessible. The Ethereum Pectra upgrade is anticipated
to unblock development of an EigenLayer upgrade that burns Natively Restaked ETH by sending it to a dead address,
instead of permanently locking it in EigenPod contracts.