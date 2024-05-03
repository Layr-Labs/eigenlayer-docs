---
sidebar_position: 1
id: intro
---

# Introduction

This section presents key management suggestions for operators. Within the context of EigenLayer, operators ought to be acquainted with proper practices concerning key loading, particularly signing keys.

## Keys

Central to every Proof of Stake mechanism lies a signature scheme. Signatures serve to authenticate the identity of every validator, enabling the attribution of their actions, whether positive or negative, to them. A validator's honesty can be confirmed by examining their signed messages, while malicious behavior can be demonstrated through messages that contravene consensus rules.

### Ethereum

Focusing on Ethereum validator keys exemplifies keys necessitating optimal security and accessibility measures, as they may maintain a robust connection with Nodes, further underlining their importance. Indeed, in Ethereum, a validator's identity is synonymous with their public key. To be precise, each validator possesses two sets: a signing and withdrawal keys.

#### Signing keys

A *signing key* is the key a validator needs to sign attestations and propose blocks. Because a validator needs to sign a message at least once per epoch, the client software must have custody of the key.

#### Withdrawal keys

Because the client software is always connected to the internet, there is a chance that one’s signing key is compromised. To reduce the impact of such a breach, the actions a validator can perform are split between two keys.

The signing key, as explained above, is used for the validator to perform their duties. On the other hand, the *withdrawal key* has the power to control a validator's funds (transferring and withdrawing ETH).

A validator should only need to use their withdrawal keys a few times over the lifetime of being a validator. This means they can be put into cold storage and stored with high security (offline).

### EigenLayer

EigenLayer works differently from Ethereum due to it being natively a delegated PoS system. This means operators don't need to custody a separate key for each 32 Eth; they only need a single key per EigenLayer operator. This does imply that proper key management tools are even more important.

Contrary to Ethereum, where an operator controls a bunch of (signing, withdrawal) key pairs, an EigenLayer operator controls a single operator key, as well as a separate key (or a small number of keys) for each AVS they are registered in.

#### Operator keys

An operator's operator key is the ecdsa key that is used to authenticate any interaction with the EigenLayer core contracts, and hence control an operator's actions such as registering to an operator, changing its operator parameters, force undelegating a staker, etc.

The operator key should NEVER be used as an AVS key. They should also only be used to interact with the EigenLayer core contracts via the [eigenlayer-cli](https://github.com/Layr-Labs/eigenlayer-cli) or other operator-built tools, and should NOT be loaded into any node software. Any action that needs to be programatically triggered on the AVS contracts should be authorized via an AVS key, not the operator key.

#### AVS signing keys

AVS keys are actively used by node software to sign messages for AVSs. AVSs that use the [eigenlayer-middleware](https://github.com/Layr-Labs/eigenlayer-middleware) contracts would typically use a bn254 key as the AVS signing key, but other AVSs might require an ecdsa, ed25519, or any other key type.

> [!WARNING] We strongly advise operators to use a different key for every AVS, and NEVER to reuse their operator key as an AVS signing key. 