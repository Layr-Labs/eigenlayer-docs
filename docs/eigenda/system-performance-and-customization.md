---
sidebar_position: 2
---

# System Performance and Customization

## Latency

EigenDA end to end latency is measured between the following times:

- Store (Disperse) blob is written through the Disperser API.
- Blob availability proof (via aggregate BLS signatures) is available to be
verified on chain.

For the Stage 2 Testnet launch the maximum end to end latency is approximately
60 seconds.

## Encoded System Throughput

The total volume of raw data traffic that is distributed among the distributed
set of EigenDA nodes is known as the Encoded System Throughput. Encoded system
throughput is what puts burden on the system, so system performance limits are
defined in terms of the encoded system throughput.

When a rollup sends a blob to the system, it specifies a Quorum Threshold and an
Adversary Threshold. Together, these parameters determine how the data is
encoded and in particular how much of the Encoded System Throughput the blob
will consume.

- Quorum Threshold is the minimum percentage of stake that must attest in order
to consider the blob dispersal successful. As such, clients can use this setting
to customize liveness requirements (a low Quorum Threshold means that a smaller
set of operators can support a dispersal request, whereas a high Quorum
Threshold quires more operators to be available to provide liveness).
- Adversary Threshold is the maximum percentage of the stake which can be held by
nodes acting in an adversarial manner before the availability of a blob is
affected.
- Based on chosen values for Adversary Threshold and Quorum
Threshold, the Coding ratio is derived as follows:
  - Coding Ratio = 100 / (Quorum Threshold - Adversary Threshold)

For testing purposes you can start with an Adversary Threshold of 33% and Quorum
Threshold of 80%.

Additional performance characteristics for the Disperser:

- The maximum blob size per DisperseBlob invocation is 2MiB.
- The maximum throughput supported by the Disperser is approximately 10 MiB/s.
- By default each blob remains stored in the network for 14 days.

## Rate Limiting

The EigenDA system will limit the rate that any individual Rollup user (e.g.,
sequencer) can post data. In the future, these rates will be determined via a
system of reservation and on-demand payment. However, at the current testnet
stage, the system enforces the following uniform rate limits for all users, as
identified by the IP address of their request:

- The maximum throughput for an individual Rollup user is approximately 3KiB/s
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
