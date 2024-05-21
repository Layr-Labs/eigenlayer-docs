---
title: Registration Protocol
sidebar_position: 6
---

# Registration Protocol Details

This page contains further background information about the registration process for EigenDA operators. The steps described in this section are performed automatically by the scripts referenced in the [registration instructions](./run-a-node/registration/).


## Registration Controls

The EigenDA network is designed to include the top N=200 operators by quorum weight within each quorum. This design aims to maximize the total amount of securing stake, thereby enhancing the overall performance and security of the network.

Maintaining the information about the smallest operator by quorum weight on the smart contract is not feasible due to the high computational cost and complexity involved in sorting or maintaining a priority queue on chain. To manage this, the network employs the combination of an authorized off-chain churn approver and a set of on-chain checks. 

### The EigenDA Churn Approver

The churn approver perform a trusted service of supplying the smallest operator by quorum weight to the registration contracts. 

When the network has reached its operator cap and a new operator wishes to join, the new operator can request a signature from the Churn Approver. The Churn Approver checks that the new operator meets stake requirements and provides a signature that approves the removal of the current lowest-stake operator. The new operator then opts-in to EigenDA, providing the Churn Approver’s signature and information on the lowest-stake existing operator as additional inputs to EigenDA’s smart contract. 

### Smart Contract Checks

The smart contract performs a series of checks to ensure the integrity of the operator replacement process:

1. It verifies the Churn Approver’s signature.
2. It performs checks against the stake of the newly-joining and (to-be-ejected) current lowest-stake operator:
    - The new operator needs at least 1.1x the ejected operator’s stake.
    - The ejected operator must constitute less than 10.01% of the total stake.

The parameters of checks performed in step 2 are configurable by the contract
governance.

If these validation steps succeed, the contract will ejects the lowest-stake operator identified by the churner and proceeds with opting-in the new operator, as normal.


## Support for smart-contract-based operators

While the opt-in scripts provided in [registration instructions](./run-a-node/registration/) assume that the EigenDA operator will provision an ECDSA private key for signing transactions, it is possible in principle for EigenDA operators to register from a smart contract. Please contact us if you are in need of detailed guidance for performing this integration. 