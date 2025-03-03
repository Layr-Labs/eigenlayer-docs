---
sidebar_position: 3
title: Keys
---

In the EigenLayer ecosystem, signatures play a crucial role in ensuring the integrity and authenticity of operations. 
Signatures cryptographically confirm that a specific address has signed a given message (for example, a string value)
with its private key. 

:::warning
Poor key management can lead to compromized operators, network disruptions, or financial losses. Key Management Best 
Practices are outlined for [Institutional Operators](../../operators/howto/managekeys/institutional-operators.md) and
[Solo Stakers](../../operators/howto/managekeys/solo-operators.md).
:::

## EigenLayer keys

An EigenLayer Operator has two types of keys: 
* A single Operator key used to authenticate to the EigenLayer core contracts.  
* Multiple AVS keys used to sign messages for AVSs. 

:::warning
We strongly recommend Operators:
* Do not reuse their Operator key as an AVS signing key.
* That are also Ethereum stakers, do not reuse their Ethereum key for EigenLayer operations.
* Use a different key for every AVS.
:::

### Operator keys

The Operator key must be an ECDSA key and is used for actions including registering to EigenLayer, changing Operator parameters,
and force undelagating a staker. 

Always interact with with the EigenLayer core contracts using the [eigenlayer-cli](https://github.com/Layr-Labs/eigenlayer-cli) or other operator-built tools. 

Do not load a Operator key into any AVS software. If authorizing any action programmatically triggered on the AVS contracts 
use an AVS key, not the Operator key.

For information on key management best practices, refer to [Key Management Best Practices for Node Operators](../../operators/howto/managekeys/institutional-operators.md).

### AVS signing keys

AVS keys are used by AVS software run by Operators to sign messages for AVSs. The required AVS key type is specified by the AVS, and is most
commonly BN254. 

### BLS and ECDSA Signature Types

The primary signatures types used in EigenLayer are BLS12-381 (Boneh-Lynn-Shacham), BN254 (Barreto-Naehrig), and ECDSA (Elliptic Curve Digital Signature Algorithm).

| Feature                   | BLS12-381                                                              | BN254                                                                 | ECDSA                                                                 |
|:--------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------------------|:----------------------------------------------------------------------|
| **Signature Size**        | 48 bytes (BLS12-381 curve)                                             | 32 bytes (BN254 curve)                                                | ~64 bytes (secp256k1)                                                 |
| **Key Size**              | 32 bytes                                                               | 32 bytes                                                              | 32 bytes                                                              |
| **Signature Aggregation** | Supports native aggregation.  Single operation for multiple signatures | Supports native aggregation. Single operation for multiple signatures | Not natively aggregatable. Each signature must be verified separately |
| **Gas Cost in Ethereum**  | Higher for single signatures, lower for aggregated                     | Lower than BLS12-381                                                  | Lower initially but increases with more signatures                    |


Until the Pectra upgrade occurs, BN254 is cheaper.  Post Pectra upgrade, the cost of the more secure BLS12-381 signature will
reduce, enabling migration to a cheaper and more secure signature type. 

The native aggregation offered by BLS, combining multiple operator signatures into one, reduces onchain storage needs, 
verification time, and gas costs. BLS signatures require a slightly more complex implementation that includes an aggregator entity.
Given the reduction in storage, verification time, and gas costs, we recommend the of BLS signatures for production systems.

**Note:** As of [eigenlayer-middleware v0.2.1](https://github.com/Layr-Labs/eigenlayer-middleware/releases/tag/v0.2.1-mainnet-rewards), the [ECDSAServiceManagerBase contract](https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.1-mainnet-rewards/src/unaudited/ECDSAServiceManagerBase.sol) was not yet fully audited. Please check the most recent release as this is expected to change.