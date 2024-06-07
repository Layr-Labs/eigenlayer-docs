---
title: Public Deployment
sidebar_position: 2
---

# Public Deployment

This guide will show you how to deploy an OP Stack rollup on a public Ethereum
network, using an EigenDA proxy instance for secure communication with DA. 

## EigenDA Proxy
EigenDA proxy is a sidecar server which is compatible with the optimism plasma generic server [spec](https://specs.optimism.io/experimental/plasma.html). Instructions for spawning and running the service can be found [here](https://github.com/Layr-Labs/eigenda-proxy). There are two respective modes that can be leveraged when running the integration:
* default - this mode talks to a deployed EigenDA disperser and verifies commitments against blobs when reading/writing
* [memstore](https://github.com/Layr-Labs/eigenda-proxy?tab=readme-ov-file#in-memory-storage) - this mode is much faster for dispersal/retrieval but is not recommended for use in production or mainnet environments. 

Instructions for building and running the service can be found [here](https://github.com/Layr-Labs/eigenda-proxy?tab=readme-ov-file#running-locally).

## Deploying with OP Plasma
Since we don't actually fork Optimism for this integration, we recommend utilizing the existing deployment procedure as defined within OP's [tutorial](https://docs.optimism.io/builders/chain-operators/tutorials/create-l2-rollup).


### Configuration

#### OP Node Derivation
It is recommended to set the `DaChallengeWindow` and `DaResolveWindow` per OP Node in best accordance to the finality constraints of ephemeral EigenDA blobs (i.e, 14 days). We can define sync origin for where to start [deriving](https://specs.optimism.io/experimental/plasma.html#derivation) from Plasma DA via the following function:
```
starting_point = latest_l1_block - (challenge_window_size + resolve_window_size + sequencer_window_size)
```

Assuming `12 sec / block` for a 14 day window, we can compute the `eigenda_sync_start` as follows:
```
eigenda_sync_start = (60 sec/minute * 60 min/hour * 24 hour/day * 14 days) / 12
eigenda_sync_start = 100,800
```

To ensure adequate safety, we recommend setting the `DaChallengeWindow + DaResolveWindow` >100,800 blocks to account for the `sequencer_window_size` value and ensure resiliency in the presence of L1 failures like: 
* deviations in expected block production times
* chain halts or liveness failures

Since we don't actually support a challenge contract yet, the value expressions of `challenge_window_size` and `resolve_window_size` have inconsequential effects to finality; meaning that as long as `eigenda_sync_start = challenge_window_size + resolve_window_size` where `challenge_window_size > 0 && resolve_window_size > 0` then the chain should be able to successfully sync. 

These values can be manually set in the respective OP Node `rollup.json` configuration; e.g:
```json
{
  "plasma_config": {
    "da_challenge_contract_address": "0x0000000000000000000000000000000000000000",
    "da_commitment_type": "GenericCommitment",
    "da_challenge_window": 90000,
    "da_resolve_window": 1
  }
}
```

#### Proxy Communication

*OP Node*
The following env config values should be set to ensure proper OP Node <-> Proxy communication:
- `OP_NODE_PLASMA_ENABLED=true`
- `OP_NODE_PLASMA_DA_SERVICE=true`
- `OP_NODE_PLASMA_VERIFY_ON_READ=false`
- `OP_NODE_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`

*OP Batcher*
The following env config values should be set accordingly to ensure proper OP Batcher <-> Proxy communication:
- `OP_BATCHER_PLASMA_ENABLED=true`
- `OP_BATCHER_PLASMA_DA_SERVICE=true`
- `OP_BATCHER_PLASMA_VERIFY_ON_READ=false`
- `OP_BATCHER_PLASMA_DA_SERVER={EIGENDA_PROXY_URL}`


## Challenge Contract
One new component of OP Plasma is the addition of a challenge contract which allows altruistic actors to challenge commitments posted to the sequencer inbox. This functionality is currently unsupported for EigenDA. However the security model doesn't change since the OP Sequencer is a trusted entity that unilaterally controls the liveness and security of the L2 chain. In the case where the sequencer posts an invalid commitment that results then any verifier nodes syncing from EigenDA would halt given that it'd be incapable of reading a canonical 