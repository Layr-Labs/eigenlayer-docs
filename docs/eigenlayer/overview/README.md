---
title: Intro to EigenLayer
sidebar_position: 1
---

# Intro to EigenLayer

## What is EigenLayer?


Building a new Web3 service comes with significant challenges: bootstrapping crypto-economic security and assembling a reliable network of Operators. Meanwhile, the Web3 ecosystem is rich with opportunities, including a surplus of asset holders eager to earn rewards and skilled Operators seeking to expand into new, value-driven services. EigenLayer bridges this gap, aligning incentives and unlocking untapped potential for both builders and the broader community.

EigenLayer is a protocol built on Ethereum that introduces Restaking, a new primitive for Web3 builders that provides a "marketplace for trust" bringing together Restakers, Operators, and Services. It allows users to stake assets such as Native ETH, Liquid Staking Tokens (LSTs), the EIGEN token, or any ERC20 token into EigenLayer smart contracts, thereby extending Ethereum's cryptoeconomic security to additional applications on the network. It fosters innovation by enabling newer projects to benefit from Ethereum’s robust security guarantees without the need to replicate the costly process of securing their own network.


## Why Build with EigenLayer?

Ethereum is a secure foundation for decentralized applications and has established itself as the best in class infrastructure for smart contract apps. However, many Web3 builders wish to expand beyond Ethereum’s compute capability and offer secured offchain services for their communities. EigenLayer acts as an additional layer on top of Ethereum, allowing developers to build on this foundation without having to duplicate the cost, complexities, or resources needed to create their own blockchain network and services.

EigenLayer solves the bootstrapping problem for new Web3 services by aggregating a ready-to-deploy network of Operators and Restaked assets that are ready to operate and validate new Web3 services. Instead of requiring every Web3 builder to independently raise capital, establish cryptoeconomic security, and onboard Operators, EigenLayer offers Cryptoeconomic Security as a Service. This approach frees builders to focus on their core differentiators, accelerating innovation without the need to build security frameworks from scratch.


The key benefits of building an AVS on EigenLayer include:
- Security via Restaking: leverage Ethereum’s staking mechanism to secure your service.
- Focus on your project's unique value: spend less time and resources accumulating economic security from scratch.
- Bootstrap your Operator network: quickly access a large network of experienced Operators.
- Decentralization and Trust: build on trust minimized, decentralized infrastructure.
- Composability: seamlessly integrate with the broader Ethereum ecosystem.



## EigenLayer Architecture Overview
The core components of the EigenLayer protocol include:
- **Restaking** enables stakers to restake their Native ETH or Liquid Staking Tokens (LST) to provide security for services in the EigenLayer ecosystem, known as Actively Validated Services (AVSs).
- **Actively Validated Services (AVSs)** are services built on the EigenLayer protocol that leverage Ethereum's shared security. AVSs deliver services to users and the broader Web3 ecosystem. 
- **Operators** are entities that run AVS software and perform validation tasks for AVSs built on EigenLayer. They register in EigenLayer and allow stakers to delegate to them, then opt in to provide various services (AVSs) built on top of EigenLayer.
- **Delegation** is the process where stakers delegate their restaked ETH or LSTs to Operators or run validation services themselves, effectively becoming an Operator. This process involves a double opt-in between both parties, ensuring mutual agreement. Restakers retain agency over their stake and choose which AVSs they opt-in to validate for.
- EigenLayer **Rewards** enables AVSs to make rewards distributions to stakers and operators that opt-in to support the AVS. AVSs make RewardsSubmissions to the RewardsCoordinator, a core protocol contract.

<img src="/img/overview/eigenlayer-arch-v2.png" width="75%"
    style={{ margin: '50px'}}>
</img>

## Next Steps
To learn more about EigenLayer please read the [**Whitepaper**](/pdf/EigenLayer_WhitePaper.pdf) or visit the [**Learn**](https://www.eigenlayer.xyz/learn) section of the EigenLayer website.

Get started with EigenLayer:
- [Restake on EigenLayer](/eigenlayer/restaking-guides/overview).
- [Register as an Operator](/eigenlayer/operator-guides/operator-installation).
- [Build an AVS](/developers/avs-developer-guide).
- Join our Ecosystem: [Discord](https://discord.com/invite/eigenlayer), [Twitter](https://twitter.com/eigenlayer).
