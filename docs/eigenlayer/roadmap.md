---
sidebar_position: 2
title: EigenLayer Roadmap
---
# EigenLayer Roadmap

EigenLayer is a protocol and developer platform for building, operating, and securing verifiable applications and services 
using Ethereum’s cryptoeconomic security. Developers can create scalable services that verify off-chain actions and enforce 
trust-based commitments. Stakers can restake ETH, liquid staking tokens (LSTs), and ERC-20 assets to secure these services, 
nominate Operators, and access performance data to make informed decisions. Institutional Stakers can participate through 
custodians or liquid restaking tokens integrated with DeFi.

Operators can secure AVSs (Autonomous Verifiable Services), earn rewards, and manage slashing risks with tools for key management,
role delegation, and secure protocol interactions. AVS builders can deploy services, attract Operators, and use EigenLayer’s SDKs,
middleware, and templates to create scalable, composable solutions. Applications built on EigenLayer benefit from seamless AVS 
integration, EigenDA for high-performance data availability, and tools for bootstrapping adoption.

This roadmap outlines **our key development priorities to make EigenLayer’s marketplace even more transparent, rewarding, 
and accessible** for Stakers, Operators, Developers, and Users alike:


<img src="/img/roadmap.png" width="75%" style={{ margin: '50px'}}>
</img>

## Universal Commitments: EigenLayer is the universal commitment marketplace

EigenLayer is pioneering a Commitment Economy offering cryptoeconomic mechanisms with intuitive user experiences to enable
a secure, functional marketplace for trust. Our roadmap for this marketplace centers on:

1. **Security and Flexibility:** EigenLayer will equip AVS builders with adaptable security models, allowing stakers to delegate
stake to operators across multiple AVS ("pooled security"). Stakers should be able to allocate natively-restaked ETH, any ERC-20
token, or assets from L2s and even non-Ethereum chains. They will be able to redelegate stakes, manage slashing risks, and
commit security long-term for added rewards. AVSs should be able to launch across chains and enforce guarantees via operator 
penalties, fund redistribution, and other offchain mechanisms.

2. **Transparency and Accessibility:** EigenLayer will offer transparency to the ecosystem through a unified dashboard displaying
metrics, monitoring and a simple Marketplace UI for restaking. Stakers and Operators will be able to access verified metadata, 
performance history, and accounting tools. Insights into live AVS activity and restaking opportunities will strengthen coordination
and inform decision making.

3. **Expressive:** EigenLayer will enable programmable incentives, allowing AVSs to distribute rewards and Operators to set reward
splits. Rewards should be flexible and expressive, aligning with AVS goals and utility. These systems will create a competitive
marketplace for high-quality Operators while aligning security and participation goals.

### In Progress Features

* **Slashing:** A key deterrent in EigenLayer, penalizing broken commitments between AVSs, Operators, and users. Unique Stake
ensures slashing mitigates risk without systemic impact.

* **Operator Sets:** Segmented Operator groups created by AVSs for business logic, rewards distribution, slashing, and architectural
organization.

* **Rewards Boost:** Enabling EIGEN to be distributed weekly to stakers and operators, proportional to AVS reward distributions.

## Trusted Primitives: EigenLayer has high-quality primitives with full-stack trust

EigenLayer will enable developers to create high-performance, trusted services and applications, by delivering:

1. **EIGEN token forking for full-stack trust:** Existing tokens like ETH and ERC20 tokens, require staking for validation
and can be penalized (slashed) for rule violations, but they are usually special-purpose (tied to a specific task) and objective
(enforceable only when violations have on-chain proofs). We proposed a novel token design for EIGEN, which expands the utility
of the staking token to be both universal (can be used for arbitrary tasks) and intersubjective (slashing enforceable as long
as the violations have offchain observability).

2. **Scalability via EigenDA:** EigenDA provides mechanisms for chains, services and apps to scale via a highly scalable 
data availability layer. EigenDA is live on mainnet, utilizes EIGEN staking and is able to run at 15 MB/s. EigenDA will 
offer integrations with OP Stack, Arbitrum Orbit, and zkSync and offer robust DA guarantees, slashing functionality through 
intersubjective forking, and flexible bandwidth options. EigenLayer Rollapps will have access to restaked services like DA, 
sequencing, and finality gadgets for optimal performance. 

### In Progress Features

* **DA Performance and Robustness:**  A network upgrade with architectural updates and efficient bridging strategies for
improved performance and robustness is being built.

* **Intersubjective Forking:** The first version of the token is live in production for EigenDA and the extension of the 
intersubjective forking to arbitrary tasks built by AVS developers is currently in development.

* **Liquidity incentivization for multiple chains:** Grow EigenDA Total Value Secured & LRT TVL by shipping our liquidity 
incentive program to multiple new partner chains.

## Verifiable Services: EigenLayer is the leading platform for building cloud services that make verifiable commitments

EigenLayer will deliver a stable, intuitive platform, enabling AVS builders to deploy verifiable cloud services efficiently
and enabling operators to manage them securely and reliably. Our roadmap for this developer platform centers on:

1. **Simplified AVS Development:** Clear documentation, templates, and tools for developers, with standardized contracts, 
pre-built integrations, and built-for-purpose services like EigenDA. Plug-and-play templates will handle business logic, 
operator penalties, and workload liveness. An intuitive UI will help developers manage AVS lifecycles with minimal overhead. 
Operators will have tools for onboarding to AVSs, including role-based access controls (RBAC), automated workflows, and a 
self-service portal for AVS evaluation. As our AVS ecosystem grows, EigenLayer will allow developers to integrate and bundle
multiple services easily, enabling faster development.

2. **Management and Monitoring:** Secure, flexible environment to support both AVS builders and Operators. Developers can 
delegate management roles, while Operators will be able to configure and maintain AVS infrastructure with key management, 
service discovery, and risk monitoring tools. The platform will include lifecycle management tooling for AVS services upgrades, 
versioning, and performance monitoring ensuring seamless operations across multiple AVSs.

3. **Cross-Service Coordination:** Modular middleware, task orchestration, and service coordination to support cross-chain
interoperability for AVS builders. Operators will gain visibility into cross-service interactions and dependencies, allowing
them to manage AVSs effectively across multiple networks. As the ecosystem expands, operators will play a crucial role in 
ensuring cross-chain compatibility and service synchronization.

4. **Expressive Incentives and Monitoring:** AVS builders will be able to distribute rewards programmatically, while operators
can monitor rewards, penalties, and staking opportunities. Customizable dashboards, alerts, and notifications will be available
for critical events. Lifecycle tools will help operators manage role delegation and fulfill AVS commitments efficiently.

### In Progress Features
   
* **AVS Lifecycle Management:** Tools to manage AVS registration, upgrades, and version control, to ensure smooth operations 
and easy governance for both builders and operators.

* **Dev Environments:** Mainnet equivalent testnet and developer sandbox environments for AVS builders and operators to 
safely test and debug services.

* **AVS Templates:** Pre-built templates for business logic integration, operator penalties and rewards.

## Get Involved

Eigen Labs is committed to building the EigenLayer protocol and expanding its services. The purpose of this roadmap is to
drive legibility for all of our users into our priorities and goals. We are committing to updating this view regularly to 
provide awareness of our progress.

While some of this work is already in flight, we are looking for feedback and welcome teams who want to contribute to the 
core protocol. To join the conversation about the future of EigenLayer, visit our [Forum](https://forum.eigenlayer.xyz/t/merged-elip-001-rewards-v2/14196).
You can also [check out our GitHub](https://github.com/eigenfoundation/ELIPs) with historical EigenLayer Improvement Proposals (ELIPs). 
