---
sidebar_position: 1
title: Overview
---

# Introduction

## What is a Node Operator within EigenLayer?

Operators, who can be either individuals or organizations, play an active role in the EigenLayer protocol. By registering within EigenLayer, they enable ETH stakers to delegate their staked assets, whether in the form of native ETH or LSTs. The Node Operators then opt-in to provide a range of services to AVSs, enhancing the overall security and functionality of their networks.


## Operator Eligibility and Restaking Criteria

Becoming an Operator in the EigenLayer ecosystem does not require a specific amount of delegated restaked TVL. Essentially, any Ethereum address can serve as an Operator. An address can function as both a Restaker, engaging in either liquid or native restaking, and as an Operator simultaneously. However, it is important to note that this dual role is not mandatory. An Operator can participate in the EigenLayer network without having any restaked tokens.

Most Operators will receive token delegations sourced from other Restakers within the network, otherwise Operators can choose to self-delegate by allocating their restaked token balance.


## Staker and Operator Roles Clarification

Operators are not required to be Restakers. An Ethereum address can be both a Restaker (via liquid or native restaking) and simultaneously an Operator, however this is not a requirement. An Operator can have zero restaked tokens in EigenLayer.

For Operators who self delegate as Restakers we recommend the Operator use **separate addresses** for Restaking and Operating activities. A single address that is used for both Restaking and Operators cannot undelegate from itself, it can only withdraw restaked funds. For this reason we recommend Operators use separate Restaking addresses if they wish avoid this limitation.

An Operator is required to have tokens delegated to their address. The delegation can come from other Restakers or they can self-delegate their restaked token balance.


## Rewards
Please see the [rewards claiming](../../eigenlayer/rewards-claiming/rewards-claiming-overview.md) documentation on how to claim rewards.



### Operator Set Allocation (Currently in Testnet)

The following is not a complete description of the Slashing and Operator Sets upgrade and is qualified in its entirety by reference to the [ELIP-002: Slashing via Unique Stake & Operator Sets](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md).

The Slashing & Operator Set release adds new protocol interfaces and primitives for Operator Sets, Unique Stake Allocations, and Slashing to provide:

* A new, iterative rewards mechanism for AVSs to reward Operators based on tasks tied to Operator Sets and slashable Unique Stake.  
* A mechanism for Operators to allocate and deallocate Unique Stake to and from Operator Sets.  
* A slasher function for AVSs to slash an Operator’s Unique Stake allocated to a single Operator Set.

An Operator Set is a logical and segmented set of Operators created by the AVS. These groups of Operators may be split up for whatever reason an AVS can think of. AVSs may assign arbitrary “tasks” to Operator Sets that can represent anything Operators may be asked to do.

[Unique Stake](https://www.blog.eigenlayer.xyz/introducing-the-eigenlayer-security-model/) is an accounting tool defined on the level of Operator Sets that ensures AVSs and Operators maintain key safety properties when handling staked security and slashing on EigenLayer. Unique Stake is allocated to different Operator Sets on an opt-in basis by Operators. Only Unique Stake is slashable by AVSs, and it represents proportions of the Operator’s delegated stake from Stakers.


