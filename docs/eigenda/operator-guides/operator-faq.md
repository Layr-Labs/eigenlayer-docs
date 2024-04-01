---
title: FAQ
sidebar_position: 7
---

# EigenDA Operator FAQ

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
  section([holesky](./networks/holesky.md), [mainnet](./networks/mainnet.md))
  then you are signing correctly.

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
guide([holesky](./networks/holesky),
[mainnet](./networks/mainnet)) to see if settings are
correct.

If you were previously opted-in and were signing, it's possible you were [churned
out](./overview#eigenda-churn-approver) by another operator or you have been
[ejected due to non-signing](./ejection-non-signing.md). Please try opting-in
again.

#### I have a static load balancer in front of EigenDA node, how do I register and fix this IP for EigenDA?

If you are running on k8s or have a load balancer in front of your EigenDA node
and you don't want EigenDA to automatically update IP which is sent to EigenDA
while registering, then follow the steps to make sure correct IP is registered

* Update the [NODE_HOSTNAME](https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L63) to the public IP where you will want to recieve traffic.
* Opt-in using the provided steps([holesky](./networks/holesky), [mainnet](./networks/mainnet)).
* In order to disable the node IP address from being automatically updated, set the value of `NODE_PUBLIC_IP_CHECK_INTERVAL` to `0`.
