---
title: Key Terms
sidebar_position: 2
---



- **Autonomous Verifiable Services (AVS):**  a service built externally to EigenLayer that requires active verification by a set of Operators. An AVS deploys its service manager to interact with EigenLayer core contracts that allow for Operator registration to Operator Sets, slashing, and rewards distribution. Once registered, an Operator agrees to run the AVS’s off-chain code.

- **Allocation / Deallocation:** an in-protocol commitment of security to an AVS’s Operator Set by an Operator. The act of allocating demarcates portions of an Operator’s delegated stake as Unique Stake, making it slashable by a single AVS. Deallocation is the same process in reverse, subject to additional time delays that ensure AVSs can appropriately slash for tasks that have occurred in the past.

- **AVS Developer**: development team that builds an AVS service.
- **Cryptoeconomic security:** security model that uses economic incentives and cryptography to ensure the proper functioning and security of a network.
- **Delegation:** the process by which a Staker assigns their staked tokens to a chosen Operator, granting the Operator the authority to use the value of those tokens for validating AVSs. The Operator cannot directly access the delegated tokens, but can subject any delegated tokens to slashing by an AVS. Delegations themselves are the sum of a given Operator’s delegated stake from Stakers.
- **EigenPod:** contract that is deployed on a per-user basis that facilitates native restaking.
- **Free-market governance:** EigenLayer provides an open market mechanism that allows stakers to choose which services to opt into, based on their own risk and reward analysis.
- **Liquid Staking:** a service that enables users to deposit their ETH into a staking pool and receive a liquid staking token. This token represents a claim on their ETH and its staking yield. Liquid staking tokens can be traded in the DeFi ecosystem and redeemed for their underlying ETH value after a waiting period.
- **LST Restaking:** a method where LST holders restake their Liquid Staking Tokens (LSTs) by transferring them into the EigenLayer smart contracts.
- **Magnitude**: The accounting tool used to track Operator allocations to Operator Sets. Represented as \`wads\` in the AllocationManager and \`bips\` in the CLI. Magnitudes represent proportions of an Operator’s delegations for a specific Strategy. The sum of all of an Operator’s Magnitudes cannot exceed the INITIAL\_TOTAL\_MAGNITUDE.
- **Native Restaking:** a method where Ethereum stakers restake their staked ETH natively by pointing their withdrawal credentials to the EigenLayer contracts.
- **On-chain slashing contract:** a smart contract deployed by service modules on EigenLayer that enforces slashing, specifying and penalizing any misbehavior.
- **Operator:** An entity that registers an Operator address on Eigenlayer to receive delegations from Stakers and run AVS infrastructure. Operators allocate their delegated stake to Operator Sets created by an AVS.
- **Operator Set:** a segmentation of Operators created by an AVS that secures a specific set of tasks for the AVS with staked assets that may be reserved for securing that set.
- **Pooled security via restaking:** when multiple parties combine their resources to provide greater security for a system. In EigenLayer, Ethereum stakers can “restake” their ETH or Liquid Staking Tokens (LST) by opting into new services built on EigenLayer.
- **Programmatic Incentives** are EIGEN tokens minted by the EigenLayer protocol to Stakers and Operators.
- **Restaker**: a person who restakes Native or LST ETH to the EigenLayer protocol.
- **Rewards**: Tokens sent by AVSs to Stakers and/or Operators to compensate participation.
- **Slashing:** A penalty for improperly or inaccurately completing tasks assigned in Operator Sets by an AVS. A slashing results in a burning/loss of funds.
- **Staker:** An individual address that directly supplies assets to Eigenlayer. Such an address could be an EOA wallet or a smart contract controlled by an individual or institution.
- **Strategies**: assets that are restaked into the platform.
- **Unique Stake:** Assets made slashable exclusively by one Operator Set. Unique Stake is an accounting tool defined on the level of Operator Sets that ensures AVSs and Operators maintain key safety properties when handling staked security and slashing on EigenLayer. Unique Stake is allocated to different Operator Sets on an opt-in basis by Operators. Unique Stake represents the proportion of an Operator’s delegated stake from Stakers that an AVS can slash.
- **Withdrawal:** The process through which assets are moved out of the EigenLayer protocol after safety delays and with applied slashings to the nominal amounts. 