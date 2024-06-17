---
title: Deployment Guide
sidebar_position: 2
---

# Deploy Guide

This guide will show you how to deploy an OP Stack rollup integrated with EigenDA via OP Stack's official Alt-DA interface. The setup is very similar to a vanilla OP Stack deployment, but with an added component of the EigenDA Proxy sidecar, which serves as a secure communication with the EigenDA network.

## EigenDA Proxy

[EigenDA Proxy](https://github.com/Layr-Labs/eigenda-proxy) is a service which implements the optimism Alt-DA server [spec](https://specs.optimism.io/experimental/alt-da.html). Instructions for building and running the service can be found [here](https://github.com/Layr-Labs/eigenda-proxy).

### Security

This OP Stack deployment with EigenDA provides Stage 0 security guarrantees, nearly identical to those of OP Stack using Ethereum DA, where there is no trust assumption on the EigenDA disperser.

When writing to EigenDA, the proxy verifies that the BN254 KZG commitment of the data matches the commitment that the EigenDA Disperser dispersed, ensuring that the Disperser hasn't tampered with the data during dispersal. The proxy also verifies the DA certificate returned by the disperser upon successful dispersal. It does this by checking that the batch was successfully dispersed, i.e. that the aggregated batch signature was written to the EigenDAServiceManager contract on Ethereum, that the signature was valid, and that the blob appears within the batch merkle tree.

When reading from EigenDA, the proxy does something similar. After retrieving a blob from the disperser, it recomputes the blob's KZG commitment and verifies that it matches the expected commitment in the DA certificate. This ensures that the sequencer could never read incorrect data from EigenDA, and avoids a trust assumption on the EigenDA disperser.

## Deploying with OP Alt-DA

**compatible version:** [v1.7.6](https://github.com/ethereum-optimism/optimism/releases/tag/v1.7.6)

Since we don't fork Optimism for this integration, we recommend consulting the official OP [deployment docs](https://docs.optimism.io/builders/chain-operators/tutorials/create-l2-rollup).

### Configuration

#### OP Node Derivation

It is recommended to set the `DaChallengeWindow` and `DaResolveWindow` per OP Node in best accordance to the finality constraints of ephemeral EigenDA blobs (i.e, 14 days). We can define sync origin for where to start [deriving](https://specs.optimism.io/experimental/alt-da.html#derivation) from Alt-DA DA via the following function:

```
starting_point = latest_l1_block - (challenge_window_size + resolve_window_size + sequencer_window_size)
```

Assuming `12 sec / block` for a 14 day window, we can compute the `eigenda_sync_start` as follows:

```
max_eigenda_sync_start = (60 sec/minute * 60 min/hour * 24 hour/day * 14 days) / 12
max_eigenda_sync_start = 100,800 blocks
```

To ensure adequate safety and faster [finality](https://specs.optimism.io/experimental/alt-da.html#safety-and-finality), we recommend setting the `DaChallengeWindow + DaResolveWindow < 100,800`. Since this value affects `Final` head, setting this sum to a lower value (e.g, 1000 blocks) is most ideal for efficient operation.

These values can be manually set in the respective OP Node `rollup.json` configuration; e.g:

```json
{
  "alt-da_config": {
    "da_challenge_contract_address": "0x0000000000000000000000000000000000000000",
    "da_commitment_type": "GenericCommitment",
    "da_challenge_window": 400,
    "da_resolve_window": 300
  }
}
```

#### Configuring OP Stack Components to Use the EigenDA Proxy

*OP Node*

The following env config values should be set to ensure proper communication between OP Node and EigenDA Proxy:

- `OP_NODE_PLASMA_ENABLED=true`
- `OP_NODE_PLASMA_DA_SERVICE=true`
- `OP_NODE_PLASMA_VERIFY_ON_READ=false`
- `OP_NODE_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`

*OP Batcher*

The following env config values should be set accordingly to ensure proper communication between OP Batcher and EigenDA Proxy:

- `OP_BATCHER_PLASMA_ENABLED=true`
- `OP_BATCHER_PLASMA_DA_SERVICE=true`
- `OP_BATCHER_PLASMA_VERIFY_ON_READ=false`
- `OP_BATCHER_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`

## Challenge Contract

One new component of OP Alt-DA interface is the [DA challenge contract](https://specs.optimism.io/experimental/alt-da.html#data-availability-challenge-contract), which allows L2 assetholders to delay a data withholding attack executed by the sequencer or DA network. This integration does not implement a DA challenge contract, because it would not provide any additional security to OP Stack deployment without fault proofs enabled. This is because the OP Sequencer is a trusted entity that unilaterally controls the liveness and safety of the L2 chain.

The chain's liveness assumption on the sequencer is unchanged, because if the sequencer posts an invalid commitment then any verifier nodes syncing from EigenDA will halt, as they'd be incapable of inspecting the batch. This is equivalent to the same DoS vector where the sequencer arbitrarily stops producing batches.

The safety property is unchanged, because although the DA challenge contract could theoretically prevent a malicious sequencer from peforming a data withholding attack, in a stage 0 deployment such a sequencer would already have unilateral control of the bridge, and so would be able to steal all the funds in broad daylight, even with all the data available to prove that they violated the chain's safety.

The EigenDA protocol integrations team has roadmap plans to implement an DA challenge contract with along fault proof support in order to provide full safety guarrantees to OP Stack x EigenDA deployments.
