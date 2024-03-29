---
sidebar_position: 2
id: metrics-examples
---

# Implementation reference

This guide is intended to showcase the practical application of the Prometheus metrics using authentic examples. Examples used are:

- EigenDA

Some metrics and endpoints are very straightforward, but having a reference for the responses and labels can be helpful.

## EigenDA Example

## Prometheus Metrics

### Economics metrics
* `eigen_registered_stakes{quorum_number=1, quorum_name="beaconChainEth"}`

### Perfomance metrics
* `eigen_performance_score`

### RPC metrics
* `eigen_rpc_request_duration_seconds{method="eth_getBlockByNumber", client_version="nethermind/v1.17.2"}`
* `eigen_rpc_request_total{method="eth_estimateGas", client_version="nethermind/v1.17.2"}` 
