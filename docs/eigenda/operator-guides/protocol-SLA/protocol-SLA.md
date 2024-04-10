---
title: Protocol SLA
---

# Operator Protocol SLA

When operators opt-in to EigenDA, they assume responsibilities imposed by the protocol to provide the EigenDA node service honestly and with at least a certain level of availability and performance. Operators are held accountable for these responsibilities by the network and may face penalties such ejection for unavailability faults.

## Responsibilities

The operator's responsibilities are the sum of the responsibilities it holds to all the quorums that it's registered in. Quorums are separate and independent from each other for attestation, so the exact entity to account for is each \<operator, quorum> pair.

The following is the lifecycle of an \<operator, quorum>, with responsibilities at different stages from when the operator opted-in the quorum to opt-out and beyond:

<img src="/img/eigenda/eigenda-sla-diagram.png" alt="EigenDA SLA Responsibilities" 
  width="90%">
  </img>


### Operator Responsibilities
Operators have three primitive responsibilities:

1. **Verify, store and attest the blobs dispersed to it**
   1. An \<operator, quorum> pair is responsible for a blob, if this quorum is requested by the blob in dispersal request
   2. The \<operator, quorum> is responsible for a batch, if it's responsible for at least one of the blobs in the batch. When \<operator, quorum> is responsible for a batch, it has to:
      1. Receive the batch header, all the blobs' headers, and the blobs in the batch that it's responsible for.
      2. Validate the batch as well as blobs received.
      3. Store the data if they are valid.
      4. Sign the batch: the signature signifies the operator's promise of having performed the attestation (validating and storing data) and will hold the future responsibility to serve the data.
2. **Store the blobs it attested (until the blobs' end of life)**
    1. The blob reaches the end of life `100,800 blocks` after onchain confirmation (roughly `14 days`).
3. **Serve the blobs it stored**
   1. Note: strictly, it's just attesting (dispersal) and serving (retrieval), as storing the data is implied by serving (the serving needs to be backed by data stored); separating storing out is to make it more clear here.

Note: When the operator opts in multiple quorums, the above will apply to each quorum.

### Responsibility Lifecycle

These responsibilities are mapped into following stages of \<operator, quorum>'s lifecycle:

- **Live:** from \<operator, quorum>'s registration to deregistration (from block `A` to `B-1`)
  - Note: the \<operator, quorum> will not be requested for dispersal with block `B` as reference block, because the \<operator, quorum> won't be in the state produced by that block.
- **Full responsibility:** `attest+store+serve` (until block C)
  - Note: after \<operator, quorum> opted out, it's still responsible for dispersal for `BLOCK_STALE_MEASURE` blocks. This is because the dispersal can use a reference block that is in the past (but within a `BLOCK_STALE_MEASURE` window).
- **Partial responsibility (lame duck period):** `store+serve` (until block D)
  - The operator will continue to be responsible for storing and serving the data it signed until all the data is expired.
- **Free:** The operator becomes free of responsibilities starting block `D+1`.

Note: if the operator re-opts in the quorum at any point from `B` to `D`, the above lifecycle will be restarted.

## Accountability Measurements, Policies, and Actions

**Responsibilities**

Operators are responsible to perform both attestion and serving within the EigenDA protocol. We track performance of these responsibilities using the following service level indidactors (SLIs).

| Responsibility | Daily SLI (measure) |
| --- | --- |
| Attesting | Signing rate: num-batches-signed / num-batches-responsible-to-sign |
| Serving | Serving availability: num-requests-success / num-total-requests |

Note that the SLI is evaluated over a 24 hour interval. 

**SLA**

When an operator is unavailable to perform its responsibilities, the damage to the network scales with the amount of take held by the operator. We ask operators to maintain high availability of both attesting and serving in accordance with the amount of stake delegated to the operator, as indicated by the following service level agreement (SLA) table. 

| Share of Quorum Stake | Daily SLA (policy) | Nominal Maximum Daily Downtime |
| --- | --- | --- |
| Baseline | 90 % | 2.4 hours |
| > 5%  | 95% | 1.2 hours | 
| > 10% | 97.5% | 36 minutes |

Operators with delegated stake in multiple quorums must satisfy the SLA associated with the highest percentage of delegated stake across all registered quorums. For instance, an operator with 1% of stake in quorum 0 and 7% of stake in quorum 1 should keep its signing rate and serving availability of 95% for both quorums. 

**Enforcement Actions**

Operators can be ejected from the protocol at any time if they are in violation of their Daily SLA.  Such ejection may or may not be preceded by warnings or soft enforcement measures in the form of the publication of operators' SLI and overall rank. For instance, an operator with 10% of stake which fails to attest to blobs for 45 minutes can be ejected without warning; this is more likely to occur if the performance of the operator is affecting the network liveness. 