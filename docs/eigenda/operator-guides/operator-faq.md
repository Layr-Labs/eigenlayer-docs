---
title: FAQ
sidebar_position: 6
---

# EigenDA Operator FAQ

#### I have a static IP/DNS address. How do I register and fix this address for EigenDA?

If you have a static IP address or DNS address set up to receive the traffic 
(i.e. running on k8s or have a load balancer in front of your EigenDA node)
and you don't want EigenDA to automatically update IP which is sent to EigenDA
while registering, then follow the steps to make sure correct IP is registered:

* Update the [NODE_HOSTNAME](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L71) to the public IP where you will want to recieve traffic.
* Opt-in using the [provided steps](./run-a-node/registration/).
* In order to disable the node IP address from being automatically updated, set the value of [NODE_PUBLIC_IP_CHECK_INTERVAL](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L65) to `0`.

