---
title: Local Deployment
---

# Deploying EigenDA OP Stack Locally

This guide will show you how to deploy an OP Stack rollup on a local Ethereum
instance, using a local EigenDA instance for DA.

## Preparations

### Prerequisites

Hardware:

* 16GB memory

Software:

* Docker runtime Unix OS: Linux or MacOS

### Installing Dependencies

1. Install [foundry](https://book.getfoundry.sh/getting-started/installation)
(general version)
2. Install [gvm](https://github.com/moovweb/gvm)
3. Install [localstack](https://localstack.cloud/)
4. Install [protobuf
compiler](https://grpc.io/docs/protoc-installation/)
5. Install [graph-cli](https://www.npmjs.com/package/@graphprotocol/graph-cli)

## Running EigenDA Locally

```
# clone and init this branch runs EigenDA against an L1 instance on port 8547
# instead of 8545, so as not to conflict with Optimism's local L1 instance.
git clone -b opstack-poc git@github.com:Layr-Labs/eigenda.git cd eigenda git
submodule update --init --recursive

# install and use correct golang version
gvm install $(cat .go-version) gvm use $(cat .go-version)

# build
make build

# start local environment
cd inabox make clean new-anvil deploy-all ./bin.sh start

# Congrats! EigenDA is running

# To clean up Ctrl+C to quit EigenDA

# then to stop anvil, the graph and localstack
make stop-infra
```

## Running OpStack Locally

```

# clone

git clone -b eigenda-develop <git@github.com>:Layr-Labs/optimism.git cd optimism
git submodule update --init --recursive

# install and use correct golang version

gvm install $(cat .go-version) gvm use $(cat .go-version)

# build correct foundry version from source (may take a few minutes)

foundryup -C $(cat .foundryrc)

# start OP Stack devnet

make devnet-up

# Congrats, you're running OpStack against EigenDA

# I like to use Docker Desktop for looking at container logs. You can click into

# the OpStack "batcher" and "node" containers to see the logs, and then ctrl+F

# for "EigenDA" to see relevant events

# to clean up (also useful to try in the case of unexpected errors)

make devnet-down devnet-clean
```
