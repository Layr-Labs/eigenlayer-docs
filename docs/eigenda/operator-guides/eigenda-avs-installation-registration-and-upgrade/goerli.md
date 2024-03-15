---
sidebar_position: 1
---

# Goerli

:::info
Please ensure you have reviewed the [current Active Operator Set cap](https://docs.eigenlayer.xyz/operator-guides/avs-installation-and-registration/eigenda-operator-guide#eigenda-churn-approver) and ensure you have sufficient delegated restaked ETH TVL before proceeding.
:::

#### Step 1: Install Prerequisites

- Complete the EigenLayer CLI installation and registration [here](https://docs.eigenlayer.xyz/operator-guides/operator-installation).
- Install [Docker Engine on Linux](https://docs.docker.com/engine/install/ubuntu/).

#### Step 2: Prepare Local EigenDA files

Clone this repo and execute the following commands:

```
git clone https://github.com/Layr-Labs/eigenda-operator-setup.git
cd eigenda-operator-setup/goerli
cp .env.example .env
```

Manually update the `.env` file downloaded in the steps above. Modify the sections marked with `TODO` to match your environment.

Create local folders which are required by EigenDA:

```
mkdir -p $HOME/.eigenlayer/eigenda/goerli/logs
mkdir -p $HOME/.eigenlayer/eigenda/goerli/db
```

#### Step 3: Operator Networking Security Setup

Retrieval Setup:

In order for users to retrieve data from your node, you will need to open access to retrieval ports.

Ensure the port specified as `NODE_RETRIEVAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L17) has open access to the public internet.

Dispersal Setup:

In order to limit traffic from the EigenLabs hosted Disperser, please restrict your node's ingress traffic to be allowed by the the list provided below and port number set as `NODE_DISPERSAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L14) in the below setup.

- `3.221.120.68/32`
- `52.2.226.152/32`
- `18.214.113.214/32`

#### Step 4: Opt-in into EigenDA

In order to opt-in into EigenDA as an Operator, you must meet the following delegated TVL requirements:

- Have a minimum of 32 ETH delegated.
- Have more than 1.1x current lowest-stake Operator in the active Operator set. Please see [EigenDA Churn Approver](https://docs.eigenlayer.xyz/operator-guides/avs-installation-and-registration/eigenda-operator-guide#eigenda-churn-approver) for more detail.
- The operator to churn out has less than 10.01% of the total stake

Execute the following command to opt-in to EigenDA AVS: 
This command also downloads the latest SRS points if they don't exist on the node. The file is approximately 8GB in size and the opt-in process can some time to complete depending on the network bandwidth.

```
./run.sh opt-in
```

Note: the script will use the `NODE_HOSTNAME` from [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L63) as your current IP.

If your operator fails to opt-in to EigenDA or is ejected by the Churn Approver then you may run the opt-in command again after the rate limiting threshold has passed. The current rate limiting threshold is 5 minutes.

If you receive the error “error: failed to request churn approval .. Rate Limit Exceeded” you may retry after the threshold has passed. If you receive the error “insufficient funds”, you may increase your Operator’s delegated TVL to the required minimum and retry after the threshold has passed.

#### Step 5: Run EigenDA

Execute the following command to start the docker containers:

```
docker compose up -d
```

The command will start the node and nginx containers and if you do `docker ps` you should see an output indicating all containers have status of “Up” with ports assigned.

You may view the container logs using:

```
docker logs -f <container_id>
```

If you have successfully opted in to EigenDA and correctly running your EigenDA software, you should see the following logs for your EigenDA container:

![EigenDA Logs](/img/operator-guides/eigenda-logs.png)

The following example log messages confirm that your EigenDA node software is up and running:

```
2024/01/09 23:42:28 maxprocs: Leaving GOMAXPROCS=16: CPU quota undefined
2024/01/09 23:42:28 Initializing Node
2024/01/09 23:42:32     Reading G1 points (33554432 bytes) takes 13.362879ms
2024/01/09 23:42:36     Parsing takes 3.60454026s
2024/01/09 23:42:36     Reading G2 points (67108864 bytes) takes 28.110653ms
2024/01/09 23:43:37     Parsing takes 1m1.676967232s
numthread 16
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/common/logging/logging.go:65] Starting metrics server at port :9092    caller=logging.go:65
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/node.go:170]             Enabled metrics                          socket=:9092 caller=node.go:170
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/common/logging/logging.go:65] Starting node api server at address localhost:9091 caller=logging.go:65
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/node.go:174]             Enabled node api                         port=9091 caller=node.go:174
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/common/logging/logging.go:65] The node has successfully started. Note: if it's not opted in on https://goerli.eigenlayer.xyz/avs/eigenda, then please follow the EigenDA operator guide section in docs.eigenlayer.xyz to register caller=logging.go:65
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigensdk-go/nodeapi/nodeapi.go:240]   node api server running                  addr=localhost:9091 caller=nodeapi.go:240
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/node.go:391]             Start checkCurrentNodeIp goroutine in background to detect the current public IP of the operator node caller=node.go:391
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/grpc/server.go:95]       port                                     32005=address [::]:32005="GRPC Listening" caller=server.go:95
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/node.go:220]             Start expireLoop goroutine in background to periodically remove expired batches on the node caller=node.go:220
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/node.go:368]             Start checkRegisteredNodeIpOnChain goroutine in background to subscribe the operator socket change events onchain caller=node.go:368
INFO [01-09|23:43:38.284|github.com/Layr-Labs/eigenda/node/grpc/server.go:119]      port                                     32004=address [::]:32004="GRPC Listening" caller=server.go:119

```

The following example log messages confirm that your node is receiving traffic from the Disperser. If you do not see these log messages then either you have not successfully opted-in to EigenDA (per Step 4) or your network security group might not be setup correctly (per Step 3).

```
DEBUG[01-09|23:44:10.078|github.com/Layr-Labs/eigenda/node/node.go:298]             Store batch took                         duration:=5.831581ms caller=node.go:298
Batch verify 13 frames of 512 symbols out of 1 blobs
Batch verify 450 frames of 2 symbols out of 50 blobs
DEBUG[01-09|23:44:10.153|github.com/Layr-Labs/eigenda/node/node.go:318]             Validate batch took                      duration:=80.907297ms caller=node.go:318
TRACE[01-09|23:44:10.153|github.com/Layr-Labs/eigenda/node/node.go:329]             Signed batch header hash                 pubkey=0x2543eddc5dd2d29190be84f323e17cef8f795970d71cc14db635a613b86ae3942bb9f8787d7197b230d450210c694361a2100531d150f5a94c2905a224c4ee390beba2c7e3166506359b7ac43fe9603e7bd981b28447c3ed6b28a7d263274cc717263cb88a192ccaaa76bb68308beaa01ef93b862b98c86ba48b69f8c153ad27 caller=node.go:329
DEBUG[01-09|23:44:10.153|github.com/Layr-Labs/eigenda/node/node.go:332]             Sign batch took                          duration="365.481µs" caller=node.go:332
INFO [01-09|23:44:10.153|github.com/Layr-Labs/eigenda/node/node.go:334]             StoreChunks succeeded                    caller=node.go:334
DEBUG[01-09|23:44:10.153|github.com/Layr-Labs/eigenda/node/node.go:336]             Exiting process batch                    duration=81.474727ms caller=node.go:336
DEBUG[01-09|23:44:59.727|github.com/Layr-Labs/eigenda/node/node.go:298]             Store batch took                         duration:=3.972838ms  caller=node.go:298
Batch verify 8 frames of 4 symbols out of 1 blobs
Batch verify 432 frames of 2 symbols out of 48 blobs
DEBUG[01-09|23:44:59.805|github.com/Layr-Labs/eigenda/node/node.go:318]             Validate batch took                      duration:=82.711666ms caller=node.go:318
TRACE[01-09|23:44:59.806|github.com/Layr-Labs/eigenda/node/node.go:329]             Signed batch header hash                 pubkey=0x2543eddc5dd2d29190be84f323e17cef8f795970d71cc14db635a613b86ae3942bb9f8787d7197b230d450210c694361a2100531d150f5a94c2905a224c4ee390beba2c7e3166506359b7ac43fe9603e7bd981b28447c3ed6b28a7d263274cc717263cb88a192ccaaa76bb68308beaa01ef93b862b98c86ba48b69f8c153ad27 caller=node.go:329
DEBUG[01-09|23:44:59.806|github.com/Layr-Labs/eigenda/node/node.go:332]             Sign batch took                          duration="370.048µs" caller=node.go:332
INFO [01-09|23:44:59.806|github.com/Layr-Labs/eigenda/node/node.go:334]             StoreChunks succeeded                    caller=node.go:334
DEBUG[01-09|23:44:59.806|github.com/Layr-Labs/eigenda/node/node.go:336]             Exiting process batch                    duration=83.241162ms caller=node.go:336
DEBUG[01-09|23:45:49.698|github.com/Layr-Labs/eigenda/node/node.go:298]             Store batch took                         duration:=4.118867ms  caller=node.go:298
Batch verify 477 frames of 2 symbols out of 53 blobs
DEBUG[01-09|23:45:49.771|github.com/Layr-Labs/eigenda/node/node.go:318]             Validate batch took                      duration:=77.685497ms caller=node.go:318
TRACE[01-09|23:45:49.771|github.com/Layr-Labs/eigenda/node/node.go:329]             Signed batch header hash                 pubkey=0x2543eddc5dd2d29190be84f323e17cef8f795970d71cc14db635a613b86ae3942bb9f8787d7197b230d450210c694361a2100531d150f5a94c2905a224c4ee390beba2c7e3166506359b7ac43fe9603e7bd981b28447c3ed6b28a7d263274cc717263cb88a192ccaaa76bb68308beaa01ef93b862b98c86ba48b69f8c153ad27 caller=node.go:329
DEBUG[01-09|23:45:49.771|github.com/Layr-Labs/eigenda/node/node.go:332]             Sign batch took                          duration="345.3µs"   caller=node.go:332
INFO [01-09|23:45:49.772|github.com/Layr-Labs/eigenda/node/node.go:334]             StoreChunks succeeded                    caller=node.go:334
DEBUG[01-09|23:45:49.772|github.com/Layr-Labs/eigenda/node/node.go:336]             Exiting process batch                    duration=78.216395ms caller=node.go:336
```

#### Step 6 (optional): To bring the containers down, run the following command

```
docker compose down
```

Opt-Out of EigenDA

The following command will unregister you from the EigenDA AVS:

```
./run.sh opt-out
```

## Upgrade your node

Upgrade the AVS software for your EigenDA service setup by following the steps below:

#### Step 1: Pull the latest repo

```
cd eigenda-operator-setup/goerli
git pull
```

Update the `MAIN_SERVICE_IMAGE` in your `.env` file with the latest EigenDA version as per the release notes.

> **_NOTE:_** If there are any specific instructions that needs to be followed for any upgrade, those instructions will be given with the release notes of the specific release. Please check the latest [release notes](https://github.com/Layr-Labs/eigenda-operator-setup/releases) on GitHub and follow the instructions before starting the services again.

#### Step 2: Pull the latest docker images

```
docker compose pull
```

#### Step 3: Stop the existing services

```
docker compose down
```

#### Step 4: Start your services again

Make sure your `.env` file still has correct values in the [TODO](https://github.com/Layr-Labs/eigenda-operator-setup/blob/2872d76b5e0b127400eb7e6dd16da362c7c142ba/.env.example#L60) sections before you restart your node.

```
docker compose up -d
```
