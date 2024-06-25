---
sidebar_position: 2
---

# Dispersal Rate Limits

## Encoded Blob Size

When a blob is dispersed to EigenDA, its encoded size is used to charge against any rate limits or other metering systems. The encoded blob size can be approximately derived from two security parameters, the Confirmation Threshold and Adversary Threshold, via the following equation

$$
(\text{Encoded Blob Size}) = (\text{Blob Size}) / (\text{Confirmation Threshold} - \text{Adversary Threshold}))
$$


1. **Confirmation Threshold** is the minimum percentage of stake that must attest in
order to consider the blob dispersal successful. As such, this
setting affects liveness tolerance. For example, a lower confirmation
threshold means that a smaller set of operators are required to meet a dispersal
request, whereas a high quorum threshold requires more operators to be available
to provide liveness.

1. **Adversary Threshold** is the maximum percentage of the stake which can be
held by adversarial nodes before the availability of a blob is affected.


## Rate Limits

Currently, the EigenDA disperser enforces two types of rate limits:

- Data rate limit: Limits the total amount of data posted within a fixed (e.g. 10 minute) interval.
- Blob rate limit: Limits the total number of blobs posted within a 10 minute interval.

If a client exceeds either of these rate limits, they will receive a rate limit error and the request will not be processed. Rate limits are determined by [network defaults](../../../networks/) or by reservation payments. 
