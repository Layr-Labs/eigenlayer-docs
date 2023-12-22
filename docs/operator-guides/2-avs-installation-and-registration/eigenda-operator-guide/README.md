# EigenDA Operator Guide

## Introduction

This guide contains the steps needed to get your node set up on the EigenDA testnet. The testnet is used to test the operational and performance requirements for running a node before deploying on mainnet. The testnet is under constant stress tests and has frequent updates to the node software and other network components. It’s important to check regularly for new updates to the software and documentation.

## Operator System Requirements

For the initial release of the EigenDA testnet, we suggest following the Large node system requirements. While smaller systems could function well under many network conditions, they may fail under certain situations such as if a large amount of stake is delegated to your nodes. As we learn about the network performance and release future planned optimizations that improve efficiency, these minimum suggested system requirements will change.

### Large Testnet Node

Supports up to 10% of the total delegated stake in the EigenDA quorum.

- vCPUs: 16
- Memory: 32GB
- Storage: 3.6T (High performance SSD volumes)
- EC2 Equivalent: m5.4xlarge
- Expected Network Utilization:
  - Total download bandwidth usage: 24 Mbps
  - Upload bandwidth usage: 120 Mbps
- Peak Network Bandwidth (Upload/Download): 1 Gbps

### Medium Testnet Node

Coming soon

### Small Testnet Node

Coming soon

## EigenDA Churn Approver

The Churn Approver is responsible for managing the active set of Operator nodes in the EigenDA network. EigenDA uses an operator cap that limits the maximum number of active Operator nodes in the network in order to maintain the desired network performance and limit the L1 gas cost for aggregating signatures.

:::info
Active Operator Set Cap: for the testnet launch as of November 28, 2023, the active operator set cap is limited to 60 operators. We will review this operator cap on an ongoing basis, and explicitly communicate future changes.
:::

In order to determine the current TVL of the top 60 operators, please visit [goerli.eigenlayer.xyz/avs/eigenda](https://goerli.eigenlayer.xyz/avs/eigenda) and sort by TVL Ascending. Observe the first 60 operators listed and the amount of ETH TVL delegated to them.

When a new operator wants to register but EigenDA has reached its operator cap, the newly-registering operator can request a signature from the Churn Approver. The Churn Approver will check that the newly-registering operator meets stake requirements, and provide a signature that approves removing the current lowest-stake existing operator. The newly-registering operator will then register with EigenDA, providing the churner’s signature and information on the lowest-stake existing operator as additional inputs to EigenDA’s smart contract. Finally, the smart contract will:

1. Check the Churn Approver’s signature
2. Perform checks against the stake of the newly-registering and (to-be-ejected) current lowest-stake operator
3. Eject the current lowest-stake operator
4. Proceed with registering the new operator, as normal

The parameters for the checks in governance-configurable parameters. At the time of writing, these are:

- The new operator needs at least 1.1x the kicked operator’s stake\
  and
- The kicked operator must constitute less than 3.33% of the total stake

### **Operator Ejection Confirmation**

Operators that have been ejected can verify the change in two ways:

1. Visit the EigenDA AVS application to observe whether your Operator is present in the active operator set: [https://goerli.eigenlayer.xyz/avs/eigenda](https://goerli.eigenlayer.xyz/avs/eigenda)
2. Observe your EigenDA Operator logs for the following logs if you see this consistently then your operator is not receiving any disperser traffic and you might have been ejected out:

```bash
INFO [11-20|18:01:45.600|github.com/Layr-Labs/eigenda/node/node.go:210]             GC cycle deleted                         "num batches"=0 caller=node.go:210
```

\
\
