---
sidebar_position: 2
title: Node and Smart Contract Operators
---

# Key Management Best Practices for Node Operators

- Secure keys, including secrets such as passphrases or mnemonics, using services like AWS Secrets Manager or Hashicorp Vault. These services can be seamlessly integrated with automated mechanisms that safely retrieve secrets or keys (e.g., remote signers). If resources permit, consider running your own Hashicorp Vault instance, which grants full custody of keys and secrets while sacrificing the service provider's availability and security guarantees.
- Avoid generating all keys with the same mnemonic. Minimize the attack surface by employing a new mnemonic for every 200 or 1000 validator keys, depending on your preference. This approach also reduces the risk of losing key generation capabilities if a single mnemonic is lost, and limits the impact if an attacker gains access to a few mnemonics.
- Given that AVS keys are likely to be much fewer, not using the same seed to generate the keys is probably safer; generate each AVS key independently if possible.
- Use a remote signer like **[Web3signer](https://github.com/ConsenSys/web3signer)** or, better yet, distributed signers to eliminate single points of failure.
- Develop a custom solution involving tailor-made tools. For instance, use Web3signer for remote signing and store keys on AWS Secrets Manager. A custom tool can manage automatic key storage in Secrets Manager and facilitate interactions with Web3signer.

# Smart Contract Operators

We encourage institutional operators to register with EigenLayer using an [erc-1271](https://eips.ethereum.org/EIPS/eip-1271) smart contract wallet. This allows a lot more fine-grained control, such as multisig authorization and key rotation, which is currently not possible for EOA operators.

# Redistributable Operator Sets

When running Redistributable Operator Sets, Operators must ensure sufficient focus is given to key management and opsec.
A compromise in an Operator key could enable a malicious actor to register for a malicious AVS, and slash and redistribute
allocated Staker funds to a specified address.

Redistributable Operators Sets are identifiable by onchain metadata ([`AllcationManager.isRedistributingOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v1.5.0-rc.0/src/contracts/interfaces/IAllocationManager.sol)). 