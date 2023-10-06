# System Performance and Customization

## Latency

EigenDA end to end latency is measured between the following times:

* Store (Disperse) blob is written through the Disperser API.
* Blob availability proof (via aggregate BLS signatures) is available to be verified on chain.

For the Stage 2 Testnet launch the maximum end to end latency is approximately 60s.

## Encoded System Throughput

The total volume of raw data traffic that is distributed among the distributed set of EigenDA nodes is known as the Encoded System Throughput. Encoded system throughput is what puts burden on the system, so system performance limits are defined in terms of the encoded system throughput.

When a rollup sends a blob to the system, it specifies a Quorum Threshold and an Adversary Threshold. Together, these parameters determine how the data is encoded and in particular how much of the Encoded System Throughput the blob will consume.

* Adversary Threshold is the minimum percentage of stake that must attest in order to consider the blob dispersal successful. Clients use this to customize liveness requirements. The higher this number, the more operators may need to be up for attesting the blob
* Quorum Threshold is the percentage of the stake within a given quorum that must sign in order for the blob to be accepted.
* Based on chosen values for Adversary Threshold and Quorum Threshold, the Coding ratio is derived as follows:
  * Coding Ratio = 100 / (quorum threshold - adversary threshold)

For testing purposes you can start with an Adversary Threshold of 33% and Quorum Threshold of 80%.

Additional performance characteristics for the Disperser:

* The maximum blob size per DisperseBlob invocation is 512KiB.
* The maximum throughput supported by the Disperser is approximately 1 MiB/s.
* The maximum throughput (aka Rate Limit) for an individual Rollup user (e.g., sequencer) is approximately 3KiB/s encoded.
* By default each blob remains stored in the network for 14 days.

## Rate Limiting

The user's request sent to the Disperser may be rate limited if their total throughput exceeds the rate limit. The user's request to DisperseBlob will return a rate limit error.
