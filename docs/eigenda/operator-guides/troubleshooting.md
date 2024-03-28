---
sidebar_position: 6
---

# Troubleshooting

### Errors while opting in into EigenDA

#### failed to request churn approval

```
Error: failed to opt-in EigenDA Node Network for operator ID: <OPERATOR_ID>, operator address: <OPERATOR_ADDRESS>, error: failed to request churn approval: rpc error: code = Unknown desc = failed to process churn request: registering operator must have 10.000000% more than the stake of the lowest-stake operator. Stake of registering operator: 0, stake of lowest-stake operator: 6301801525718228411481, quorum ID: 0
```

This is because your operator doesn't have enough stake to run EigenDA. Please
refer to [this][ref1] to learn more about this
error

#### failed to read or decrypt the BLS/ECDSA private key

Please make sure the operator keys [location in the .env
file][ref2]
is correctly populated. Make sure to put correct bls and ecdsa key location

[ref1]: ./overview.md#eigenda-churn-approver
[ref2]: https://github.com/Layr-Labs/eigenda-operator-setup/blob/19c386e38a838e28be27bd2737252d3fe2ce8a62/.env#L83