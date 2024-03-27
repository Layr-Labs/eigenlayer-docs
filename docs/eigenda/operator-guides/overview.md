---
sidebar_position: 1
---
# EigenDA Operator Guide

## Introduction

This guide contains the steps needed to set up your node on the EigenDA testnet.
The testnet is used to test the operational and performance requirements for
running a node before deploying on mainnet. The testnet is under constant stress
tests and has frequent updates to the node software and other network
components. It’s important to check regularly for new updates to the software
and documentation.

## Operator System Requirements

### Node Classes

Operators can determine their required [EigenLayer node class][ref1] by referencing their share of the total EigenDA quorum against the following
table.

|                         | Supported Throughput | Max % of Stake      |
| ----------------------- | -------------------- | ------------------- |
| General Purpose - large | 80 Kbps              | 0.03% (Solo staker) |
| General Purpose - xl    | 500 Kbps             | 0.2%                |
| General Purpose - 4xl   | 50 Mbps              | 20%                 |

Professional operators with large or variable amounts of delegated stake should
select the `4xl` node class. The `large` class is intended to be used by solo
stakers with the minimal allowed quantity of stake.

We will update this specification to include new EigenLayer node classes as they
are introduced.

### Node Storage Requirements

EigenDA nodes must provision storage capacity (high performance SSD volumes) in
order to store and serve all data passed to the node over a 2-week period.

The following table summarizes the amount of storage that is required for a node
based on the amount of stake delegated to the operator.

| % of stake | Allocated Throughout | Required Storage |
| ---------- | -------------------- | ---------------- |
| 0.03%      | 80 Kbps              | 20 GB            |
| 0.2%       | 500 Kbps             | 150 GB           |
| 1%         | 2.5 Mbps             | 750 GB           |
| 10%        | 25 Mbps              | 4 TB             |

## EigenDA Churn Approver

The Churn Approver is responsible for managing the active set of Operator nodes
in the EigenDA network. EigenDA uses an operator cap that limits the maximum
number of active Operator nodes in the network in order to maintain the desired
network performance and limit the L1 gas cost for aggregating signatures.

:::info Active Operator Set Cap: the active operator set cap is currently
limited to 200 operators. We will review this operator cap on an ongoing basis,
and explicitly communicate future changes.  :::

In order to determine the current TVL of the top 200 operators, please visit our
[AVS page][ref2] and sort by `TVL
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
3. Eject the current lowest-stake operator.
4. Proceed with opting-in the new operator, as normal.

The parameters of checks performed in step 2 are configurable by the contract
governance.

### **Operator Ejection Confirmation**

Operators that have been ejected can verify the change in two ways:

1. Visit the EigenDA AVS application to observe whether your Operator is present
in the active operator set on the [AVS page][ref3].
2. Observe your EigenDA Operator log for the following logs. If you see this
consistently, then your operator is not receiving any disperser traffic and you
may have been ejected.  This is not an error but if you only see this log line
repeatedly then it means you may not be receiving any disperser traffic.

```
INFO [12-21|18:53:46.673|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=3  caller=node.go:233
```

[ref1]: ../../eigenlayer/operator-guides/avs-installation-and-registration/eigenlayer-node-classes
[ref2]: https://holesky.eigenlayer.xyz/avs/eigenda
[ref3]: https://holesky.eigenlayer.xyz/avs/eigenda