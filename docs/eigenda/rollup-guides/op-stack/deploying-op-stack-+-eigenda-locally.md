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

1. Install [foundry][ref1]
(general version)
2. Install [gvm][ref2]
3. Install [localstack][ref3]
4. Install [protobuf
compiler][ref4]
5. Install [graph-cli][ref5]

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

gvm intall $(cat .go-version) gvm use $(cat .go-version)

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

[ref1]: https://book.getfoundry.sh/getting-started/installation
[ref2]: https://github.com/moovweb/gvm
[ref3]: https://localstack.cloud/
[ref4]: https://grpc.io/docs/protoc-installation/
[ref5]: https://www.npmjs.com/package/@graphprotocol/graph-cli