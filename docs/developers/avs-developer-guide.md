---
sidebar_position: 1
title: AVS Overview
---


## What is an Actively Validated Service (AVS)?

An AVS is a service build on EigenLayer that requires its own distributed validation semantics for verification. Each AVS has its own set of contracts that hold state relevant to the service’s functionality, such as what operators are running the service and how much stake is securing the service. Examples of these services may include sidechains, data availability layers, new virtual machines, keeper networks, oracle networks, bridges, threshold cryptography schemes, trusted execution environments (TEEs).




- The stakers interact with EigenLayer by depositing assets into the `StrategyManager`. To learn more about exactly how this works, [this doc](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/StrategyManager.md) provides a deep dive on the `StrategyManager`.
- The stakers also interact with EigenLayer by choosing operators to delegate to. This delegation is handled by the `DelegationManager` and you can find a deep dive explanation on that [here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/docs/core/DelegationManager.md).
- The operators are actors who run offchain client software that are specific to the AVSs they’ve opted into serving. This client software is independent of the core EigenLayer protocol. There’s a registration/deregistration process operators have to go through with EigenLayer’s `DelegationManager` contract to become EigenLayer operators. Operator registration is a requirement for these operators to opt into AVSs and serve them. Refer to [this doc](https://docs.eigenlayer.xyz/eigenlayer/operator-guides/operator-introduction) for how registration works.
- The dotted lines for the boxes represent components that are optional depending on the interface design.
- Each AVS developer can design and implement its own contracts as they see fit as long as their entry point (canonically called the `ServiceManager`) implements the interface expected by the EigenLayer protocol. Specific details expanding on this will be coming soon.


Before diving into what AVSs are and how you can design and build one, check out the


Pleasee see the [Intro to EigenLayer](https://docs.eigenlayer.xyz/eigenlayer/overview/) overview to quickly become familiar with what stakers and operators are.



## Get in Touch

If you would like to discuss your ideas to build an AVS on EigenLayer, submit your contact information via [this form](https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l) and we'll be in touch shortly.
