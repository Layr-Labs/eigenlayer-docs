---
sidebar_position: 1
---

# AVS Developer Guide

EigenLayer is a protocol built on Ethereum that introduces restaking, a new primitive in cryptoeconomic security. Restaking is the process of staking consensus layer ETH to extend security to additional infrastructure services and earn additional rewards.

### What is an AVS?

In the EigenLayer context, these infrastructure services are referred to as **Actively Validated Services (AVSs)**. AVS developers build the infrastructure logic and software, stakers provide stake to secure the infrastructure, and operators run the AVS software.

The stake serves as a commitment to the users of the infrastructure when Restakers delegate their stake to Operators. The Operators earn incentives for proper verifiable operation of the AVS software and are subject to slashing in cases where they provably operate the AVS software maliciously.

- **AVS Developers** are responsible for constructing the underlying infrastructure logic and software.

- **Operators** are responsible for the correct operation of AVS software. They utilize the ETH delegated to them by restakers as a form of commitment to the users of the infrastructure. Operators earn incentives for proper verifiable operation of the AVS software and are subject to slashing in cases where they provably operate the AVS software maliciously.

### What can be built?

Any system that requires its own distributed validation semantics for verification, such as sidechains, data availability layers, new virtual machines, keeper networks, oracle networks, bridges, threshold cryptography schemes, and trusted execution environments. Please see page 2 of the EigenLayer Whitepaper [here](/eigenlayer/overview/whitepaper) for the original definition and context of an AVS.

Check out the existing AVS ecosystem page [here](https://www.eigenlayer.xyz/ecosystem?category=AVS) for an idea of what people are already building.

### Getting started

For more information on building AVSs on EigenLayer, please see the following resources:

- [Evolution of the EigenLayer Protocol](https://www.blog.eigenlayer.xyz/ycie/).
- [How to Build an AVS](./how-to-build-an-avs.md).
- [Node Specification](./spec/intro.md).
- To get in touch with our team and discuss onboarding your project, please contact us via [this AVS Questionnaire](https://forms.gle/9tGCWXTp2AsR9hSZ8).
- Stay up to date with our [AVS Research blog](https://www.blog.eigenlayer.xyz/tag/avs-research/).
