---
sidebar_position: 6
---

# Troubleshooting


#### Where do I check if my operator is a part of EigenDA set?

You can search using the below EigenLayer webapp links:

* [Holesky](https://holesky.eigenlayer.xyz/avs/eigenda)

#### I opted in into running EigenDA but I am not in the operator set anymore. What happened?

Either you are [churned out](./overview.md#eigenda-churn-approver) by an other
operator or you have been [ejected due to non-signing](./ejection-non-signing.md).
If neither of these reasons apply, please reach out to EigenLayer Support

#### How do I know if my node is signing EigenDA blobs correctly?

There are few ways you can confirm that your node is signing the blobs

* Ensure that you have monitoring setup according to the
 [guide](./eigenda-metrics-and-monitoring.md). Once you have added the provided
 EigenDA Grafana dashboards, take a look at the graph saying **EigenDA number
 of processed batches**. This graph should be increasing like below graph:

 ![EigenDA correct sign](/img/operator-guides/avs-installation-and-registration/eigenda-operator-guide/eigenda-correct-sign.png)

* If you have not setup metrics yet, you can still check the logs of your
  EigenDA Node. If your logs resemble like mentioned in step 5 of respective network in this
  section([holesky](./networks/holesky.mdx), [mainnet](./networks/mainnet.mdx))
  then you are signing correctly.


#### Errors while opting in into EigenDA

##### failed to request churn approval

```
Error: failed to opt-in EigenDA Node Network for operator ID: <OPERATOR_ID>, operator address: <OPERATOR_ADDRESS>, error: failed to request churn approval: rpc error: code = Unknown desc = failed to process churn request: registering operator must have 10.000000% more than the stake of the lowest-stake operator. Stake of registering operator: 0, stake of lowest-stake operator: 6301801525718228411481, quorum ID: 0
```

This is because your operator doesn't have enough stake to run EigenDA. Please
refer to [this](./overview.md#eigenda-churn-approver) to learn more about this
error

##### failed to read or decrypt the BLS/ECDSA private key

Please make sure the operator keys [location in the .env
file](https://github.com/Layr-Labs/eigenda-operator-setup/blob/19c386e38a838e28be27bd2737252d3fe2ce8a62/.env#L83)
is correctly populated. Make sure to put correct bls and ecdsa key location


#### My EigenDA node's logs look like these. What does it mean?

```
INFO [01-10|20:49:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|20:52:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|20:55:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|20:58:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:01:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:04:53.437|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:07:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:10:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:13:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
INFO [01-10|21:16:53.436|github.com/Layr-Labs/eigenda/node/node.go:233]             Complete an expiration cycle to remove expired batches "num expired batches found and removed"=0 caller=node.go:233
```

This means you node software is running but you are not opted-in into EigenDA.
If you opted in into EigenDA successfully and still not receiving dispersal
traffic, make sure your network settings allow EigenDA's disperser to reach your
node. Please check the step 3 of respective network
guide([holesky](./networks/holesky.mdx),
[mainnet](./networks/mainnet.mdx)) to see if settings are
correct.

If you were previously opted-in and were signing, it's possible you were [churned
out](./overview#eigenda-churn-approver) by another operator or you have been
[ejected due to non-signing](./ejection-non-signing.md). Please try opting-in
again.


#### What does the error "EIP1271 .. signature not from signer" mean?

This indicates you have not imported your BLS key correctly. Please reconfirm the keys you imported to ensure there were no typos or mistakes.