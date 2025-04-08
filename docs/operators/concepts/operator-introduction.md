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

Operators are not required to be Restakers. An Ethereum address can be both a Restaker (via liquid or native restaking) and 
simultaneously an Operator, however this is not a requirement. An Operator can have zero restaked tokens in EigenLayer.

An Operator is required to have tokens delegated to their address. The delegation can come from other Restakers or they 
can self-delegate their restaked token balance.

:::important
If a single address is used for Restaking and Operating activities when an Operator self delegates as a Restaker, the Operator
cannot undelegate from itself, and the Operator can only withdraw restaked funds. To avoid this limitation, use separate addresses
for Restaking and Operating activities when self delegating as a Restaker.
:::

## Rewards
Please see the [rewards claiming](../howto/claimrewards/claim-rewards-cli.mdx) documentation on how to claim rewards.


### Operator Sets

For information on Operator Sets, refer to [Operator Sets concept](../../eigenlayer/concepts/operator-sets/operator-sets-concept.md).


