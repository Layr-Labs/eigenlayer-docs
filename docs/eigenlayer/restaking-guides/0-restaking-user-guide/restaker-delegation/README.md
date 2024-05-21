---
sidebar_position: 3
title: Delegation
---

# Delegation

Delegation is the process of assigning Restaked balance to an Operator. The Restaker will receive fees according to the AVSs that the Operator chooses to run. Restakers can undelegate their balance to end their assignment to the Operator and later redelegate the balance to a new Operator.

Caveats:

- Stakers can only delegate to a single Operator at a time.
- Delegation is an "all or nothing" operation. You must delegate all of your available Restaked balance to a single Operator.
- Delegation is not possible for Native Restakers while their validators are in the activation (aka entry) queue. Native Restaked tokens must be fully Restaked and proven on-chain before they can be delegated.
- If you have already delegated your stake to an operator in any quorum, all new stakes will be delegated to the same operator automatically.
- If the delegated Operator is no longer in the active set of an AVS (such as due to [Churning in EigenDA](/docs/eigenda/operator-guides/requirements/delegation-requirements.mdx) for example), the Restaker has the option to Redelegate their TVL balance to another Operator. Please see the [Undelegate from an Operator and Initiate Withdrawal](./undelegate-from-an-operator-and-initiate-withdrawal.md) page for specific instructions.

## **Staker and Operator Roles Clarification**

Operators are not required to be Restakers. An Ethereum address can be both a Restaker (via liquid or native restaking) and simultaneously an Operator, however this is not a requirement. An Operator can have zero restaked tokens in EigenLayer.

For Operators who self delegate as Restakers we recommend the Operator use **separate addresses** for Restaking and Operating activities. A single address that is used for both Restaking and Operators cannot undelegate from itself, it can only withdraw restaked funds. For this reason we recommend Operators use separate Restaking addresses if they wish avoid this limitation.

An Operator is required to have tokens delegated to their address. The delegation can come from other Restakers or they can self-delegate their restaked token balance.
