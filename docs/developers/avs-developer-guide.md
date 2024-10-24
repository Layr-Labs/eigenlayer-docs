---
sidebar_position: 1
title: AVS Overview
---


## What is an Actively Validated Service (AVS)?


An Actively Validated Service (AVS) on EigenLayer is a decentralized service built on Ethereum that provides its own custom validation mechanisms of offchain operations. Please see the [Intro to EigenLayer](https://docs.eigenlayer.xyz/eigenlayer/overview/) for background context on the broader EigenLayer ecosystem.

An AVS is composed of both onchain contracts for validation and an offchain network of Operators that execute its service. Operators that have opted in to the AVS execute tasks on behalf of the AVS and then post evidence of their execution onchain to the AVS contracts. The design of the offchain execution and onchain validation is entirely flexible based on the needs of the AVS developer. If the Operators perform the tasks properly, the AVS will distribute rewards. If the Operators perform the tasks maliciously, their delegate stake can be slashed by the AVS. Please see the original EigenLayer whitepaper [EigenLayer: The Restaking Collective](/docs/eigenlayer/overview/whitepaper.md) for further background on AVS design.

Examples of these services may include sidechains, data availability layers, new virtual machines, keeper networks, oracle networks, bridges, threshold cryptography schemes, and trusted execution environments (TEEs).

![AVS Architecture](/img/avs/avs-architecture-v2.png)


## Why Build an AVS?

Launching new Web3 projects requires substantial time and effort to bootstrap capital and operators. Builders should focus on their key product differentiators, rather than bootstrapping economic security. Building an Actively Validated Service (AVS) on EigenLayer offers enhanced security, decentralization, and cost efficiency by leveraging Ethereum’s staking mechanism through restaking. This allows developers to focus more on their product’s core value and innovation, without the significant overhead of setting up a new consensus mechanism or validator networks from scratch.

The key benefits of building an AVS on EigenLayer include:
- Security via Restaking: Leverage Ethereum’s staking mechanism to secure your service.
- Focus on your project's unique value: Spend less time and resources accumulating economic security from scratch.
- Bootstrap Operator network: Quickly access a large network of experienced Operators.
- Decentralization and Trust: Build on a trust-minimized, decentralized infrastructure.
- Composability: Seamlessly integrate with the broader Ethereum ecosystem.

** internal TODO: request legal review of the wording on this page before merging **





## Get in Touch

If you would like to discuss your ideas to build an AVS on EigenLayer, submit your contact information via [this form](https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l) and we'll be in touch shortly.
