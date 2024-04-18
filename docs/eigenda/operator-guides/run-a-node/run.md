---
sidebar_position: 2
---

# Run Your Node

The page contains instructions for running the EigenDA node using docker compose. Ensure that you have completed all [setup and configuration steps](./setup/) before following the instructions on this page. 

You must also ensure that the following dependencies are installed on your system:
- [Docker Engine on Linux](https://docs.docker.com/engine/install/ubuntu/).

## Start and Stop the EigenDA using Docker Compose

Execute the following command to start the docker containers:

```
docker compose up -d
```

The command will start the node and nginx containers and if you do `docker ps` you should see an output indicating all containers have status of “Up” with ports assigned.

To stop the node, run the following command. 

```
docker compose down
```

:::info 
Once you have [registered for a quorum](./registration/), you must keep your node running until you have deregistered and satisfied all requirements of the [protocol SLA](../requirements/protocol-SLA/)
:::

## View the EigenDA Logs

You may view the container logs using and of the following commands

```
docker compose logs -f
docker compose logs -f <container_name>
docker logs -f <container_id>
```

If you have successfully opted in to EigenDA and correctly running your EigenDA software, you should see the following logs for your EigenDA container:

<!-- TODO: Change to logs when the DA node is NOT registered -->

```
2024/03/22 19:33:28 maxprocs: Leaving GOMAXPROCS=16: CPU quota undefined
2024/03/22 19:33:30 Initializing Node
time=2024-03-22T19:33:34.503Z level=DEBUG source=/app/core/eth/tx.go:791 msg=Addresses blsOperatorStateRetrieverAddr=0xB4baAfee917fb4449f5ec64804217bccE9f46C67 eigenDAServiceManagerAddr=0xD4A7E1Bd8015057293f0D0A557088c286942e84b registryCoordinatorAddr=0x53012C69A189cfA2D9d29eb6F19B32e0A2EA3490 blsPubkeyRegistryAddr=0x066cF95c1bf0927124DFB8B02B401bc23A79730D
2024/03/22 19:33:34     Reading G1 points (4194304 bytes) takes 5.981866ms
2024/03/22 19:33:37     Parsing takes 3.144064399s
numthread 8
time=2024-03-22T19:33:38.141Z level=INFO source=/go/pkg/mod/github.com/!layr-!labs/eigensdk-go@v0.1.3-0.20240318050546-8d038f135826/metrics/eigenmetrics.go:81 msg="Starting metrics server at port :9092"
time=2024-03-22T19:33:38.141Z level=INFO source=/app/node/node.go:174 msg="Enabled metrics" socket=:9092
time=2024-03-22T19:33:38.141Z level=INFO source=/go/pkg/mod/github.com/!layr-!labs/eigensdk-go@v0.1.3-0.20240318050546-8d038f135826/nodeapi/nodeapi.go:104 msg="Starting node api server at address :9091"
time=2024-03-22T19:33:38.141Z level=INFO source=/app/node/node.go:178 msg="Enabled node api" port=9091
time=2024-03-22T19:33:38.141Z level=INFO source=/app/node/node.go:211 msg="The node has successfully started. Note: if it's not opted in on https://app.eigenlayer.xyz/avs/eigenda, then please follow the EigenDA operator guide section in docs.eigenlayer.xyz to register"
time=2024-03-22T19:33:38.141Z level=INFO source=/go/pkg/mod/github.com/!layr-!labs/eigensdk-go@v0.1.3-0.20240318050546-8d038f135826/nodeapi/nodeapi.go:238 msg="node api server running" addr=:9091
time=2024-03-22T19:33:38.141Z level=INFO source=/app/node/node.go:385 msg="Start checkRegisteredNodeIpOnChain goroutine in background to subscribe the operator socket change events onchain"
time=2024-03-22T19:33:38.142Z level=INFO source=/app/node/node.go:231 msg="Start expireLoop goroutine in background to periodically remove expired batches on the node"
time=2024-03-22T19:33:38.142Z level=INFO source=/app/node/node.go:408 msg="Start checkCurrentNodeIp goroutine in background to detect the current public IP of the operator node"
time=2024-03-22T19:33:38.142Z level=INFO source=/app/node/grpc/server.go:123 msg=port 32004=address [::]:32004="GRPC Listening"
time=2024-03-22T19:33:38.142Z level=INFO source=/app/node/grpc/server.go:99 msg=port 32005=address [::]:32005="GRPC Listening"
Batch verify 1 frames of 256 symbols out of 1 blobs
time=2024-03-22T19:34:39.858Z level=DEBUG source=/app/node/node.go:330 msg="Validate batch took" duration:=96.155565ms
time=2024-03-22T19:34:39.858Z level=DEBUG source=/app/node/node.go:340 msg="Store batch took" duration:=0s
time=2024-03-22T19:34:39.859Z level=DEBUG source=/app/node/node.go:346 msg="Signed batch header hash" pubkey=0x00cea342f086977a33b3f1bba57d09c6cdf8eaf20b9dec856dc874ab65414b6e2377a91ab3bc2360224f3ba071eb4753da650e957d9c0535b14922609a9ff052150595f3a89c06e87a78d3e3ebad09771f181b632bd971c1d58deb3e1fde9397087c1cc1097c48b1e900d418ef43538a8abdccde72921c3148ae4de5e0f39ef3
time=2024-03-22T19:34:39.859Z level=DEBUG source=/app/node/node.go:349 msg="Sign batch took" duration=1.32679ms
time=2024-03-22T19:34:39.860Z level=INFO source=/app/node/node.go:351 msg="StoreChunks succeeded"
time=2024-03-22T19:34:39.860Z level=DEBUG source=/app/node/node.go:353 msg="Exiting process batch" duration=97.815499ms
Batch verify 1 frames of 256 symbols out of 1 blobs
time=2024-03-22T19:35:30.062Z level=DEBUG source=/app/node/node.go:330 msg="Validate batch took" duration:=83.890892ms
time=2024-03-22T19:35:30.062Z level=DEBUG source=/app/node/node.go:340 msg="Store batch took" duration:=0s
time=2024-03-22T19:35:30.063Z level=DEBUG source=/app/node/node.go:346 msg="Signed batch header hash" pubkey=0x00cea342f086977a33b3f1bba57d09c6cdf8eaf20b9dec856dc874ab65414b6e2377a91ab3bc2360224f3ba071eb4753da650e957d9c0535b14922609a9ff052150595f3a89c06e87a78d3e3ebad09771f181b632bd971c1d58deb3e1fde9397087c1cc1097c48b1e900d418ef43538a8abdccde72921c3148ae4de5e0f39ef3
time=2024-03-22T19:35:30.063Z level=DEBUG source=/app/node/node.go:349 msg="Sign batch took" duration=1.201012ms
time=2024-03-22T19:35:30.063Z level=INFO source=/app/node/node.go:351 msg="StoreChunks succeeded"
time=2024-03-22T19:35:30.063Z level=DEBUG source=/app/node/node.go:353 msg="Exiting process batch" 
```
