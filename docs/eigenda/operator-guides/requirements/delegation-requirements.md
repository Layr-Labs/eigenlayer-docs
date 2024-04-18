---
sidebar_position: 1
---

# Delegation Requirements

:::info 
Active Operator Set Cap: the active operator set cap is currently
limited to 200 operators. We will review this operator cap on an ongoing basis,
and explicitly communicate future changes.
:::

EigenDA currently only allows a limited number of operators to join the protocol. This restriction relates directly to the cost of bridging EigenDA availability attestations to the Ethereum L1 and will be relaxed as this cost is alleviated via various technological improvements. 

The EigenDA operator cap means that in order to be an operator for EigenDA, you must first register as an EigenLayer operator and meet certain stake requirements. These requirements are evaluated on a per-quorum basis, relative to the weighting for each quorum: 
- Minimum stake floor: Each operator must have a threshold quantity of stake. 
- Congested operator set stake floor: When the global operator cap (N) is reached, operators must be within the top N operators by quorum weight in order to join the quorum. In order to limit excessive churn of the operator set, certain additional requirements are also enforced, as described in the next section.

## EigenDA Churn Management Information

### Churn Approver

The Churn Approver is responsible for managing the active set of Operator nodes
in the EigenDA network. 

In order to determine the current TVL of the top 200 operators, please visit our
[AVS page](https://holesky.eigenlayer.xyz/avs/eigenda) and sort by `TVL
Ascending.`Observe the first 200 operators listed and the amount of ETH TVL
delegated to them. Please keep in mind that the AVS Page reflects real-time
operator stake on EigenLayer, which is used to update the EigenDA operator set
stake weights on a weekly basis (Wednesdays at 17:00 UTC), so the EigenDA stake
may lag the real-time EigenLayer stake by at most 7 days.

When a new operator wants to opt-in but EigenDA has reached its operator cap,
the newly-registering operator can request a signature from the Churn Approver.
The Churn Approver will check that the newly-joining operator meets stake
requirements, and provide a signature that approves removing the current
lowest-stake existing operator. The operator will then opt-in to EigenDA,
providing the churner’s signature and information on the lowest-stake existing
operator as additional inputs to EigenDA’s smart contract. Finally, the smart
contract will:

1. Check the Churn Approver’s signature.
2. Perform checks against the stake of the newly-joining and (to-be-ejected)
current lowest-stake operator:
    - The new operator needs at least 1.1x the ejected operator’s stake.
    - The ejected operator must constitute less than 3.33% of the total stake.
1. Eject the current lowest-stake operator.
2. Proceed with opting-in the new operator, as normal.

The parameters of checks performed in step 2 are configurable by the contract
governance.

### Operator Ejection Confirmation

Operators that have been ejected can verify the change in two ways:

1. Visit the EigenDA AVS application to observe whether your Operator is present
in the active operator set on the [AVS page](https://holesky.eigenlayer.xyz/avs/eigenda).
2. Observe your EigenDA Operator log for the following logs. If you see this
consistently, then your operator is not receiving any disperser traffic and you
may have been ejected.  This is not an error but if you only see this log line
repeatedly then it means you may not be receiving any disperser traffic.

```
INFO [12-21|18:53:46.673|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=3  caller=node.go:233
```
