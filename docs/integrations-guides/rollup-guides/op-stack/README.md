---
sidebar_position: 2
---

# OP Stack and EigenDA

[OP Stack](https://stack.optimism.io/) is the set of [software
components](https://github.com/ethereum-optimism/optimism) that run the [Optimism](https://www.optimism.io/) rollup and can be
deployed independently to power third-party rollups.

By default, OP Stack sequencers write batches to Ethereum in the form of calldata or 4844 blobs to commit to the transactions included in the canonical L2 chain. In Alt-DA mode, OP Stack sequencers and full nodes are configured talk to a third-party HTTP server for writing and reading tx batches to and from DA. Optimism's Alt-DA [spec](https://specs.optimism.io/experimental/alt-da.html) contains a more in-depth breakdown of how this works.

To implement this server spec, EigenDA provides the [EigenDA Proxy](../../dispersal/clients/eigenda-proxy.md) sidecar, which can be run alongside OP Stack sequencers and full nodes to securely communicate with the EigenDA disperser.

## Deploying

### Deploying EigenDA Proxy

First check out the version of the EigenDA proxy corresponding to the verison of OP Stack you are deploying, and follow there README in that version:

| OP Stack Version | Compatible EigenDA Proxy Version |
|------------------|-----------------------|
| [v1.7.6](https://github.com/ethereum-optimism/optimism/releases/tag/v1.7.6)           | [v1.0.0](https://github.com/Layr-Labs/eigenda-proxy/releases/tag/v1.0.0)                |
| [v1.7.7](https://github.com/ethereum-optimism/optimism/releases/tag/v1.7.7)           | [v1.2.0](https://github.com/Layr-Labs/eigenda-proxy/releases/tag/v1.2.0)                |

### Deploying OP Stack

Next deploy the OP Stack components according to the official OP Stack [deployment docs](https://docs.optimism.io/builders/chain-operators/tutorials/create-l2-rollup), but with the following modifications:

#### op-node rollup.json configuration

In the op-node `rollup.json` configuration the following should be set:

```json
{
  "plasma_config": {
    "da_challenge_contract_address": "0x0000000000000000000000000000000000000000",
    "da_commitment_type": "GenericCommitment",
    "da_challenge_window": 300,
    "da_resolve_window": 300
  }
}
```

#### op-node CLI configuration

The following env config values should be set to ensure proper communication between op-node and eigenda-proxy, replacing `{EIGENDA_PROXY_URL}` with the URL of your EigenDA Proxy server.

- `OP_NODE_PLASMA_ENABLED=true`
- `OP_NODE_PLASMA_DA_SERVICE=true`
- `OP_NODE_PLASMA_VERIFY_ON_READ=false`
- `OP_NODE_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`

#### op-batcher CLI configuration

The following env config values should be set accordingly to ensure proper communication between OP Batcher and EigenDA Proxy, replacing `{EIGENDA_PROXY_URL}` with the URL of your EigenDA Proxy server.

- `OP_BATCHER_PLASMA_ENABLED=true`
- `OP_BATCHER_PLASMA_DA_SERVICE=true`
- `OP_BATCHER_PLASMA_VERIFY_ON_READ=false`
- `OP_BATCHER_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`

### Mainnet Keypair Registration

When you are ready to onboard your rollup to mainnet you can fill out the following form to get your keypair whitelisted: [https://forms.gle/niMzQqj1JEzqHEny9](https://forms.gle/niMzQqj1JEzqHEny9).

## Security Guarrantees

This setup provides Stage 0 security guarrantees without adding an unnecessary trust assumption on the EigenDA disperser. The EigenDA Proxy [docs page](../../dispersal/clients/eigenda-proxy.md) and [repo readme](https://github.com/Layr-Labs/eigenda-proxy/blob/main/README.md) explain how this is achieved.

### OP Stack DA Challenge Contract

One new component of OP Alt-DA interface is the [DA challenge contract](https://specs.optimism.io/experimental/alt-da.html#data-availability-challenge-contract), which allows L2 assetholders to delay a data withholding attack executed by the sequencer or DA network. This integration does not implement a DA challenge contract, because it would not provide any additional security to OP Stack deployment without fault proofs enabled. This is because the OP Sequencer is a trusted entity that unilaterally controls the liveness and safety of the L2 chain.

The chain's liveness assumption on the sequencer is unchanged, because if the sequencer posts an invalid commitment then any verifier nodes syncing from EigenDA will halt, as they'd be incapable of inspecting the batch. This is equivalent to the same DoS vector where the sequencer arbitrarily stops producing batches.

The safety property is unchanged, because although the DA challenge contract could theoretically prevent a malicious sequencer from peforming a data withholding attack, in a stage 0 deployment such a sequencer would already have unilateral control of the bridge, and so would be able to steal all the funds in broad daylight, even with all the data available to prove that they violated the chain's safety.

The EigenDA protocol integrations team has roadmap plans to implement an DA challenge contract with along fault proof support in order to provide full safety guarrantees to OP Stack x EigenDA deployments.

## Roadmap

The EigenDA Rollup Integrations team is working to support OP Stack fault proofs by the end of summer 2024, and will post updates to [@eigen_da](https://x.com/eigen_da?lang=en).

## Contact

If you are a Rollup considering integrating with EigenDA and OP Stack - reach
out to our team to discuss how we can support and accelerate your onboarding:
[https://contact.eigenda.xyz/](https://contact.eigenda.xyz/)

If you are a Rollup developer and have questions on the integration - reach out
to our Support team via:
[https://support.eigenlayer.xyz/](https://support.eigenlayer.xyz/)
