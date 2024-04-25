---
title: Protocol SLA
sidebar_position: 3
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

Operators are required to carry out both attestation and serving (retrieval) functions as part of their role within the EigenDA protocol. The assessment of their performance in these areas is conducted using the service level indicators (SLI) specified here.

| Responsibility | Rolling Daily SLI (measure) |
| --- | --- |
| Attesting | Signing rate: num-batches-signed / num-batches-responsible-to-sign |
| Serving | Serving availability: num-requests-success / num-total-requests |

Note that the SLI is evaluated over a rolling 24 hour interval. 

**SLA**

Operators are required to maintain high availability of both attesting and serving (retrieval) in accordance with the amount of stake delegated to the operator, as indicated by the service level agreement (SLA) table below. Since the impact of an operator's failure to perform its responsibilities scales with the amount of stake delegated to the operator, operators holding a larger percentage of delegated stake are held to higher standards of availability.

| Share of Quorum Stake | Rolling Daily SLA (policy) | Nominal Maximum Daily Downtime |
| --- | --- | --- |
| Baseline | 90 % | 2.4 hours |
| > 5%  | 95% | 1.2 hours | 
| > 10% | 98% | 29 minutes |
| > 15% | 99.5% | 7 minutes |

Operators who hold delegated stake in multiple quorums must satisfy the SLA associated with each of their registered quorums. For instance, an operator holding 1% of stake in 'quorum 0' and 7% of stake in 'quorum 1' must keep its signing rate and serving availability above 90% for 'quorum 0' and 95% for 'quorum 1'. 



**Enforcement Actions**

Operators can be subject to forced ejection from the protocol if they fail to meet their Rolling Daily SLA. This action can occur with or without prior notice and may follow initial soft enforcement steps, including the disclosure of the operator's SLI and overall ranking. Ejection is performed on a per quorum basis.  An operator holding a 10% stake in 'quorum 0' who does not attest to blobs for 45 minutes may face immediate ejection from that quorum, particularly if their performance compromises the network's liveness.