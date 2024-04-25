---
sidebar_position: 1
---

# System Requirements

## General System Requirements

The EigenDA network design dictates that operators with greater stake will
be asked to store a larger number of blob chunks/shards. As a result, an operator's node requirements are a
function of the total amount of stake they wield across all quorums, which we
call 'Total Quorum Stake' (TQS). For example, if an operator Foobar has 3% stake
on the restaked ETH quorum, and 5% ETH on a staked WETH quorum, then operator
Foobar's TQS is 8%.

Operators should use the following table to determine which [EigenLayer node class](/eigenlayer/operator-guides/eigenlayer-node-classes#general-purpose-eigenlayer-node-classes)
is appropriate for their level of stake:

| Total Quorum Stake (TQS) | Max Allocated Throughput |  Node Class |
| ------------------------ | ----------------------- | -------------------- |
| Up to 0.03% (Solo staker)      | 80 Kbps    | General Purpose - large    |
| Up to 0.2%                     |  500 Kbps | General Purpose - xl        |
| Up to 20%                      |  50 Mbps  | General Purpose - 4xl      |

Here 'Max Allocated Throughput' refers to the maximum amount of blob shard traffic that 
will be sent to a node based on their total quorum stake. This measure does not translate
directly to the networking capacity required by the node; operators should use the network
capacity requirements of the associated node class. 

Professional operators with large or variable amounts of delegated stake should
select the `4xl` node class. The `large` class is intended to be used by solo
stakers with the minimal allowed quantity of stake.

We will update this specification to include new EigenLayer node classes as they
are introduced.

## Node Storage Requirements

EigenDA nodes **must** provision high-performance SSD storage in order to keep
up with network storage and retrieval tasks. Failure to maintain adequate
performance will result in unacceptable validation latency and [automatic ejection](./protocol-SLA/).

The following table summarizes required storage capacity based on TQS:

| Total Quorum Stake (TQS) | Max Allocated Throughout | Required Storage |
| ------------------------ | -------------------- | ---------------- |
| Up to 0.03%                    | 80 Kbps              | 20 GB            |
| Up to 0.2%                     | 500 Kbps             | 150 GB           |
| Up to 1%                       | 2.5 Mbps             | 750 GB           |
| Up to 10%                      | 25 Mbps              | 4 TB             |
| Up to 20%                      | 50 Mbps              | 8 TB             |


:::info
The rough size of the message sent from the EigenDA disperser to a DA node can be estimated using the following formula: 

```
<batch size (MB)>  = <throughput (MB/s)>  * <batch interval (s)>  * <coding rate> * <% stake>
```

Where `<coding rate> = 5` for all current EigenDA quorums. So if the network is operating at 1MB/s with a 10 minute batch interval, and a node has 5% of the stake, then that node will receive roughly 150MB per message from the disperser. 
:::

## System Upgrades

Since system requirements scale dynamically in accordance with the amount of stake delegated to the operator, node operators may from time to time need to upgrade their system setups in order to continue meeting the [Protocol SLA](./protocol-SLA/). Guidance for performing such upgrades is covered in [System Upgrades](../upgrades/software-upgrades/)

## IP Stability Requirements

Currently, the EigenDA protocol requires DA nodes to publish their IP address to the Ethereum L1 so providers and consumers of data can reach the node at this address. Consequently, node operators must be able to meet certain IP address stability and reachability requirements, as summarized in the table below. 

|                        | Shared IP                                                                                                                           | Dedicated IP                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stable IP              | ❌ Note: this will still work, if operators themselves figure out how to make the IP:Port reachable, e.g. configure port forwarding. | ✅ This is the ideal case for an EigenDA operator.                                                                                                                |
| Unstable (Changing) IP | ❌ Note: this will still work, if operators themselves figure out how to make the IP:Port reachable, e.g. configure port forwarding. | ✅ Although this will work, operators are encouraged to have a stable IP, because changing IP will incur an Eth transaction (to update IP on-chain) and cost gas. |


