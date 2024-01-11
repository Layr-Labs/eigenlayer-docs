---
sidebar_position: 4
---

# Frequently Asked Questions

#### Where do I check if my operator is a part of EigenDA set?
You can search using the below EigenLayer webapp links:
* [Goerli](https://goerli.eigenlayer.xyz/avs/eigenda)

#### I opted in into running EigenDA but I am not in the operator set anymore. What happened?
Either you are [churned out](README.md#eigenda-churn-approver) by an other operator or you have been [ejected due to non-signing](ejection-non-signing.md). If none of this reason applies, please reach out to EigenLayer Support

#### How do I know if my node is signing EigenDA blobs correctly?
There are few ways you can confirm that your node is signing the blobs

* Ensure that you have monitoring setup according to the [guide](./eigenda-metrics-and-monitoring.md). Once you have added the provided EigenDA Grafana dashboards, take a look at the graph saying **EigenDA number of processed batches**. This graph should be increasing like below graph:
![EigenDA correct sign](/img/operator-guides/avs-installation-and-registration/eigenda-operator-guide/eigenda-correct-sign.png)

* If you have not setup metrics yet, you can still check the logs of your EigenDA Node. If your logs resemble like mentioned in [this section](eigenda-avs-installation-registration-and-upgrade.md#step-5-run-eigenda) then you are signing correctly.

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
This means you node software is running but you are not opted-in into EigenDA. If you opted in into EigenDA successfully and still not receiving dispersal traffic, make sure [your network settings allows](eigenda-avs-installation-registration-and-upgrade.md#step-3-operator-networking-security-setup) EigenDA's disperser to reach your node.


If you were previously opted-in and was signing, it's possible you are [churned out](README.md#eigenda-churn-approver) by an other operator or you have been [ejected due to non-signing](ejection-non-signing.md). Please try opting-in again. 