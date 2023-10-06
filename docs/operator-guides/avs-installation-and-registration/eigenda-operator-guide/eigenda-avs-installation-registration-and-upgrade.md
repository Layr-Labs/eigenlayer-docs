# EigenDA AVS Installation, Registration, and Upgrade

:::info
Please ensure you have reviewed the [current Active Operator Set cap](https://docs.eigenlayer.xyz/operator-guides/avs-installation-and-registration/eigenda-operator-guide#eigenda-churn-approver) and ensure you have sufficient delegated restaked ETH TVL before proceeding.
:::

**Step 1:** Install Prerequisites

- Complete the EigenLayer CLI installation and registration [here](https://docs.eigenlayer.xyz/operator-guides/operator-installation).
- Install [Docker Engine on Linux](https://docs.docker.com/engine/install/ubuntu/).

**Step 2:** Prepare Local EigenDA files

Clone this repo and execute the following commands:

```
git clone https://github.com/Layr-Labs/eigenda-operator-setup.git
cd eigenda-operator-setup
```

Manually update the `.env` file downloaded in the steps above. Modify the sections marked with `TODO` to match your environment.

Create local folders which are required by EigenDA:

```
mkdir -p $HOME/.eigenlayer/eigenda/logs
mkdir -p $HOME/.eigenlayer/eigenda/db
```

**Step 3:** Operator Networking Security Setup

Retrieval Setup:

In order for users to retrieve data from your node, you will need to open access to retrieval ports.

Ensure the port specified as `NODE_RETRIEVAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/master/.env#L17) has open access to the public internet.

Dispersal Setup:

In order to limit traffic from the EigenLabs hosted Disperser, please restrict your node's ingress traffic to be allowed by the the list provided below and port number set as `NODE_DISPERSAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/master/.env#L14) in the below setup.

- `3.221.120.68/32`
- `52.2.226.152/32`
- `18.214.113.214/32`

**Step 4:** Opt-in into EigenDA

In order to opt-in into EigenDA as an Operator, you must meet the following delegated TVL requirements:

- Have a minimum of 32 ETH delegated.
- Have more than 1.1x current lowest-stake Operator in the active Operator set. Please see [EigenDA Churn Approver](https://docs.eigenlayer.xyz/operator-guides/avs-installation-and-registration/eigenda-operator-guide#eigenda-churn-approver) for more detail.
- The operator to churn out has less than 10.01% of the total stake

Execute the following command to opt-in to EigenDA AVS:

```
./run.sh opt-in
```

Note: the script will use the `NODE_HOSTNAME` from [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/d677db9636edd0c1f83f642aba0a9d12bb95763e/.env#L59) as your current IP.

If your operator fails to opt-in to EigenDA or is ejected by the Churn Approver then you may run the opt-in command again after the rate limiting threshold has passed. The current rate limiting threshold is 5 minutes.

If you receive the error “error: failed to request churn approval .. Rate Limit Exceeded” you may retry after the threshold has passed. If you receive the error “insufficient funds”, you may increase your Operator’s delegated TVL to the required minimum and retry after the threshold has passed.

**Step 5:** Run EigenDA

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

<figure><img src="https://lh7-us.googleusercontent.com/ChHGDKp5snAoYL8tDoK7Ass_5z8eimOnJm92ozW3HgoWNKstMUHl5Gpu9qc4Vki1szN_C5i4nMbhP08EbhFeS5-dQHb3F1Id4y1hRFbfn_UChMCFBFlK0M0INjfkqzphgfxswHBraDksxHzsvbxphQ0" alt=""/><figcaption></figcaption></figure>

The following example log messages confirm that your EigenDA node software is up and running:

```
2023/11/16 22:21:04 maxprocs: Leaving GOMAXPROCS=16: CPU quota undefined
2023/11/16 22:21:04 Initializing Node
2023/11/16 22:21:07     Reading G1 points (33554432 bytes) takes 14.636544ms
2023/11/16 22:21:10     Parsing takes 3.173737274s
2023/11/16 22:21:10     Reading G2 points (67108864 bytes) takes 29.762221ms
2023/11/16 22:22:04     Parsing takes 53.962254668s
numthread 16
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigenda/common/logging/logging.go:65] Starting metrics server at port :9092    caller=logging.go:65
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigenda/node/node.go:155]             Enabled metrics                          socket=:9092 caller=node.go:155
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigenda/common/logging/logging.go:65] Starting node api server at address localhost:9091 caller=logging.go:65
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigenda/node/node.go:159]             Enabled node api                         port=9091 caller=node.go:159
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigenda/node/node.go:166]             Registering node with socket             socket=3.144.180.69:32005;32004 caller=node.go:166
INFO [11-16|22:22:04.447|github.com/Layr-Labs/eigensdk-go/nodeapi/nodeapi.go:240]   node api server running                  addr=localhost:9091 caller=nodeapi.go:240
INFO [11-16|22:22:04.448|github.com/Layr-Labs/eigenda/node/grpc/server.go:119]      port                                     32004=address [::]:32004="GRPC Listening" caller=server.go:119
INFO [11-16|22:22:04.448|github.com/Layr-Labs/eigenda/node/grpc/server.go:95]       port                                     32005=address [::]:32005="GRPC Listening" caller=server.go:95

```

The following example log messages confirm that your node is receiving traffic from the Disperser. If you do not see these log messages then either you have not successfully opted-in to EigenDA (per Step 4) or your network security group might not be setup correctly (per Step 3).

```
DEBUG[11-16|22:22:29.588|github.com/Layr-Labs/eigenda/node/node.go:275]             Store batch took                         duration:=84.214213ms caller=node.go:275
DEBUG[11-16|22:22:30.016|github.com/Layr-Labs/eigenda/node/node.go:295]             Validate batch took                      duration:=511.828024ms caller=node.go:295
TRACE[11-16|22:22:30.016|github.com/Layr-Labs/eigenda/node/node.go:306]             Signed batch header hash                 pubkey=0x13899af0fedf3378e90f6f377fe70edb9da35b43df5d94a770726fb4c2579df1112ed18cfd4390acc718aae6a60610e3313737f5e2e3403723f84a1752e47d731812c7c36b95c3e206fb44460e8470cc5ef274cbaae5d837d7d032bfb10c34a90d33dad25a1a1f19f453b2b6f0cef854fd381d9b876bcaf4a9562459b23c212d caller=node.go:306
DEBUG[11-16|22:22:30.016|github.com/Layr-Labs/eigenda/node/node.go:309]             Sign batch took                          duration="372.962µs" caller=node.go:309
INFO [11-16|22:22:30.016|github.com/Layr-Labs/eigenda/node/node.go:311]             StoreChunks succeeded                    caller=node.go:311
DEBUG[11-16|22:22:30.016|github.com/Layr-Labs/eigenda/node/node.go:313]             Exiting process batch                    duration=512.422513ms caller=node.go:313
```

**Step 6:** To bring the containers down, run the following command:

```
docker compose down
```

Optional: Opt-Out of EigenDA

The following command will unregister you from the EigenDA AVS:

```
./run.sh opt-out
```

## Upgrade your node

Upgrade the AVS software for your EigenDA service setup by following the steps below:

**Step 1:** Pull the latest repo

```
cd eigenda-operator-setup
git pull
```

**Step 2:** Pull the latest docker images

```
docker compose pull
```

**Step 3:** Stop the existing services

```
docker compose down
```

**Step 4:** Start your services again

Make sure your `.env` file still has correct values in the [TODO](https://github.com/Layr-Labs/eigenda-operator-setup/blob/master/.env#L60) sections before you restart your node.

If there are any specific instructions that needs to be followed for any upgrade, those instructions will be given with the release notes of the specific release. Please check the latest [release notes](https://github.com/Layr-Labs/eigenda-operator-setup/releases) on Github and follow the instructions before starting the services again.

```
docker compose up -d
```
