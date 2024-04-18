---
sidebar_position: 1
---
# Overview

This guide contains the steps needed to set up your node on the EigenDA testnet.
The testnet is used to test the operational and performance requirements for
running a node before deploying on mainnet. The testnet is under constant stress
tests and has frequent updates to the node software and other network
components. It’s important to check regularly for new updates to the software
and documentation.

Start by understanding the [Requirements](./requirements/) for being an EigenDA operator and running an EigenDA node. Be sure to fully understand the following aspects of node operation elligibility before determining to run your own EigenDA node: 
- [Delegation Requirements](./requirements/delegation-requirements/): EigenDA currently only allows a limited number of operators to join the protocol. This means that in order to run a node, you must satisfy a minimum stake requirement which adjust over time as new operators and new stake join the protocol.
- [System Requirements](./requirements/system-requirements/): Because EigenDA is a horizonally scaling architecture, operator node system requirements scale in accordance with the amount of stake delegated to the operator. Node operators must understand their requirements based on their amount of delegated stake, and be prepared to [upgrade their setups](./upgrades/system-upgrades/) as needed in response to changing stake distributions.
- [Protocol SLA](./requirements/protocol-SLA/): All operators are expected to satisfy a service level agreement, with violations having certain protocol level consequences. 

If you are able to satisfy all of the elligibility requirements for becoming a node operator, proceed onward to [run your node](./run-a-node/). It's important that you properly [set up your environment and configure your node](./run-a-node/setup/) and [start your node and validate your setup](./run-a-node/run/) all before [registering your operator with the network](./run-a-node/registration/) and becoming subject to the SLA. 

EigenDA is in a state of active development. Operators must make sure to listen for [node software updates](./upgrades/software-upgrades/) in the correct channels and to implement these upgrades promptly.

