---
title: FAQ
sidebar_position: 7
---

# EigenDA Operator FAQ

#### Where do I check if my operator is a part of EigenDA set?

You can search using the below EigenLayer webapp links:

* [Holesky][ref1]

#### I opted in into running EigenDA but I am not in the operator set anymore. What happened?

Either you are [churned out][ref2] by an other
operator or you have been [ejected due to non-signing][ref3].
If neither of these reasons apply, please reach out to EigenLayer Support

#### How do I know if my node is signing EigenDA blobs correctly?

There are few ways you can confirm that your node is signing the blobs

* Ensure that you have monitoring setup according to the
 [guide][ref4]. Once you have added the provided
 EigenDA Grafana dashboards, take a look at the graph saying **EigenDA number
 of processed batches**. This graph should be increasing like below graph:

 ![EigenDA correct sign][ref5]

* If you have not setup metrics yet, you can still check the logs of your
  EigenDA Node. If your logs resemble like mentioned in step 5 of respective network in this
  section([holesky][ref6], [mainnet][ref7])
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
guide([holesky][ref8],
[mainnet][ref9]) to see if settings are
correct.

If you were previously opted-in and were signing, it's possible you were [churned
out][ref10] by an other operator or you have been
[ejected due to non-signing][ref11]. Please try opting-in
again.

#### I have a static load balancer in front of EigenDA node, how do I register and fix this IP for EigenDA?

If you are running on k8s or have a load balancer in front of your EigenDA node
and you don't want EigenDA to automatically update IP which is sent to EigenDA
while registering, then follow the steps to make sure correct IP is registered

* Update the [NODE_HOSTNAME][ref12] to the public IP where you will want to recieve traffic.
* Opt-in using the provided steps([holesky][ref13], [mainnet][ref14]).
* In order to disable the node IP address from being automatically updated, set the value of `NODE_PUBLIC_IP_CHECK_INTERVAL` to `0`.

[ref1]: https://holesky.eigenlayer.xyz/avs/eigenda
[ref2]: ./overview.md#eigenda-churn-approver
[ref3]: ./ejection-non-signing.md
[ref4]: ./eigenda-metrics-and-monitoring.md
[ref5]: /img/operator-guides/avs-installation-and-registration/eigenda-operator-guide/eigenda-correct-sign.png
[ref6]: ./networks/holesky.md
[ref7]: ./networks/mainnet.md
[ref8]: ./networks/holesky
[ref9]: ./networks/mainnet
[ref10]: ./overview#eigenda-churn-approver
[ref11]: ./ejection-non-signing.md
[ref12]: https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L63
[ref13]: ./networks/holesky
[ref14]: ./networks/mainnet