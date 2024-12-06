---
title: Intro to EigenLayer
sidebar_position: 1
---

Just a test text change

# Intro to EigenLayer

## What is EigenLayer?


EigenLayer is a protocol built on Ethereum that introduces restaking, a new primitive in cryptoeconomic security. It allows users to stake assets such as Native ETH, Liquid Staking Tokens (LSTs), EIGEN token or any ERC20 token into EigenLayer smart contracts, thereby extending Ethereum's cryptoeconomic security to additional applications on the network.

EigenLayer establishes a shared security infrastructure where decentralized services and protocols can be built. This approach improves both scalability and composability in the blockchain ecosystem. It fosters innovation by enabling newer projects to benefit from Ethereum’s robust security guarantees without the need to replicate the costly process of securing their own network.

## Why Build with EigenLayer?

With EigenLayer, Ethereum stakers can help secure many services by restaking their staked ETH and opting-in to many services simultaneously, providing [**pooled security**](/eigenlayer/overview/key-terms)**.** Reusing ETH to provide security across many services reduces capital costs for a staker to participate and significantly increases the trust guarantees to individual services.

Anyone building a new decentralized service for Ethereum must bootstrap a new trust network to secure their system, fragmenting security. EigenLayer solves this problem by enabling any service, regardless of its composition (e.g. EVM-compatibility), to tap into the pooled security of Ethereum's stakers, creating an environment for permissionless innovation and free-market governance.


## EigenLayer Architecture Overview

- **Restaking** enables stakers to restake their Native ETH or Liquid Staking Tokens (LST) to provide greater security for services in the EigenLayer ecosystem, known as Actively Validated Services (AVSs).
- **Operators** are entities that help run AVS software built on EigenLayer. They register in EigenLayer and allow stakers to delegate to them, then opt in to provide various services (AVSs) built on top of EigenLayer.
- **Delegation** is the process where stakers delegate their staked ETH to operators or run validation services themselves, effectively becoming an operator. This process involves a double opt-in between both parties, ensuring mutual agreement. Restakers retain agency over their stake and choose which AVSs they opt-in to validate for.
- **Actively Validated Services (AVSs)** are services built on the EigenLayer protocol that leverage Ethereum's shared security.
    - Operators perform validation tasks for AVSs, contributing to the security and integrity of the network.
    - AVSs deliver services to users (**AVS Consumers**) and the broader Web3 ecosystem.

<img src="/img/overview/eigenlayer-arch-v2.png" width="75%"
    style={{ margin: '50px'}}>
</img>


To learn more about EigenLayer please read the [**Whitepaper**](/pdf/EigenLayer_WhitePaper.pdf) or visit the [**Learn**](https://www.eigenlayer.xyz/learn) section of the EigenLayer website.
