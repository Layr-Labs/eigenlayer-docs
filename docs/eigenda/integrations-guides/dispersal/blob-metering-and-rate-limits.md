---
sidebar_position: 2
---

# Blob Metering and Rate Limits

Various behaviors of the EigenDA networks can be described along the following
performance metrics.

## Blob Confirmation Latency

The end-to-end latency of EigenDA is measured as the time between the following
two events:

- When a client disperses a blob via the `DisperseBlob()` endpoint on the
EigenDA Disperser API.
- When the blob has been dispersed to operators within a batch, such that a DA
batch certificate containing aggregated BLS signatures has been posted to the
[EigenDAServiceManager][1] contract.

Blob confirmation latency is configurable within the EigenDA Disperser by controlling
how often the disperser aggregates blobs into a batch. The exact setting depends on the
network and can be found on the network's description.

## Encoded System Throughput

The total volume of data per unit of time written to EigenDA operator set is known
as the Encoded System Throughput (ECS). The "encoded" part denotes that this
data is not the raw input data that was sent to the disperser by the client.
Rather the encoded data is an extended version of the input data which is
constructed using Reed-Solomon erasure coding techniques. Erasure coding the
input data introduces redundancy to the data such that some of it can be lost to
offline or dishonest operators without the raw input data becoming unavailable.

When a client dispersers a blob, two configuration parameters in the disperser
determine how the data is encoded and how much of the ECS the blob will consume.

1. **Quorum Threshold** is the minimum percentage of stake that must attest in
order to consider the blob dispersal successful. As such, clients can use this
setting to customize liveness requirements. For example, a lower quorum
threshold means that a smaller set of operators are required to meet a dispersal
request, whereas a high quorum threshold requires more operators to be available
to provide liveness.

2. **Adversary Threshold** is the maximum percentage of the stake which can be
held by adversarial nodes before the availability of a blob is affected.

Based on chosen Adversary Threshold and Quorum Threshold, the **Coding Ratio** is
derived as follows:

    Coding Ratio = 100 / (Quorum Threshold - Adversary Threshold)

More operational figures for the disperser:

- The maximum blob size per DisperseBlob invocation is 4 MiB.
- The maximum throughput supported by the Disperser is approximately 10 MiB/s.
- Blobs are stored for 14 days.

## Rate Limits

The EigenDA system will rate limit any client can post data. In the future,
these rates will be determined via a system of reservation and on-demand
payment. However, at the current testnet stage, the system enforces the
following uniform rate limits for all users, as identified by the IP address of
their request:

- The maximum throughput for an individual Rollup user is approximately 3 KiB/s
encoded.
- For a constant amount of data, the Disperser's KZG proving system
more efficiently processes a small number of large blobs compared to a large
number of small blobs. Thus, we also enforce a limit on the rate at which each
rollup posts blobs to the system. Currently, rollups are limited to
approximately one blob per batching interval (~100 seconds).

Both of these rate limits are enforced over an interval of about 10 minutes. The
user's request sent to the Disperser will be rate limited if their total
throughput exceeds the above rate limits, and the user's request to DisperseBlob
will return a rate limit error.

[1]: https://github.com/Layr-Labs/eigenda/blob/master/contracts/src/core/EigenDAServiceManager.sol#L23
