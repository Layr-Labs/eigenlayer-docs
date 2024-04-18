---
title: Setup and Configuration
sidebar_position: 1
---

# Setup your environment and configure your node

## EigenDA Node Configuration

We provide an Oprator Setup Repo which contains various templates that make it easy to run an EigenDA node using docker and docker compose. Operators wishing to make use of other setups can use the docker-compose-based setup as a template for constructing their own custom setups. 

#### Clone the Oprator Setup Repo and populate the environment variables

Run the following commands to clone the Oprator Setup Repo and create a new environment file from the provided template. 

```
git clone https://github.com/Layr-Labs/eigenda-operator-setup.git
cd eigenda-operator-setup/mainnet
cp .env.example .env
```

The provided `.env` contains many default configuration settings for the node. All sections marked with `TODO` must be updated to match your environment. We recommend that operators follow the steps in the next section to configure their node to run without access to their ECDSA private key. 

> **_WARNING:_** Do not modify the docker-compose.yml file. If you choose to modify this file, unexpected behaviors can result.

#### Configure local storage locations

Check that the $USER_HOME, $EIGENLAYER_HOME, $EIGENDA_HOME are properly set within your environment file and that all the folders exist as expected.
```
source .env
ls $USER_HOME $EIGENLAYER_HOME $EIGENDA_HOME
```

By default, the EigenDA node will use the following locations for log storage and blob shard storage, respectively. 

```
NODE_LOG_PATH_HOST=${EIGENDA_HOME}/logs
NODE_DB_PATH_HOST=${EIGENDA_HOME}/db
```

Ensure that these locations correspond to high performance SSD storage with sufficient capaicity, as indicated in the [System Requirements](../requirements/system-requirements/#node-storage-requirements). Also ensure that the specific folders exist that the docker user has the correct write permissions:

```
mkdir -p ${NODE_LOG_PATH_HOST}
mkdir -p ${NODE_DB_PATH_HOST}
```

Note: The default environment setup assumes that you have cloned the `eigend-operator-setup` repo to the $USER_HOME directory, and the node will look in this location for several files necessary for operation: 

```
NODE_G1_PATH_HOST=${USER_HOME}/eigenda-operator-setup/resources/g1.point
NODE_G2_PATH_HOST=${USER_HOME}/eigenda-operator-setup/resources/g2.point.powerOf2
NODE_CACHE_PATH_HOST=${USER_HOME}/eigenda-operator-setup/resources/cache
```


#### (Recommended) Set up your your node to run without access to operator ECDSA keys

In [EigenDA v0.6.1](https://github.com/Layr-Labs/eigenda-operator-setup/releases/tag/v0.6.1), we added a feature where you can configure your node so that it doesn't need operator's ECDSA keys to run. 
Your node still need access to BLS keys for attestation purposes.
>**_NOTE:_** You still need ECDSA and BLS keys to opt-in to EigenDA. 

To enable this feature by using our setup, follow the below commands:
* Remove the `"${NODE_ECDSA_KEY_FILE_HOST}:/app/operator_keys/ecdsa_key.json:readonly"` mount from `docker-compose.yml` file.
* Update the `NODE_ECDSA_KEY_FILE` in your `.env` file to be empty.
* Update the `NODE_ECDSA_KEY_PASSWORD` in your `.env` file to be empty.
* Update the `NODE_PUBLIC_IP_CHECK_INTERVAL` in your `.env` file to be `0` (This flag was used to check and update your IP onchain if your IP changes, so if your IP changes it's your responsibility to update).

## Network Configuration

The EigenDA node must be properly reachable by various parties in order to fulfill its responsibilities to store and serve data. 

### Retrieval Setup

In order for users to retrieve data from your node, you will need to open access to retrieval ports.

Ensure the port specified as `NODE_RETRIEVAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L20) has open access to the public internet.

Note that in the default setup this port is served by an NGINX reverse proxy that implements basic rate limitting to provide a level of protection against DoS attacks. If you decide to run a custom setup, you should replicate these protections using your own infrastructure. 

### Dispersal Setup

:::info 
It is important to follow the instructions in this setup to keep your node from being vulnerable to DOS attacks. 
:::

The port specified as `NODE_DISPERSAL_PORT` in the [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L13) should only be reachable by the EigenLabs hosted disperser. 

Please configure the firewall, security groups, or other network settings so that this port can only be reached from the following IP addresses: 

- `3.216.127.6/32`
- `3.225.189.232/32`
- `52.202.222.39/32`

<!-- ### Node API Port Setup:

In order to consolidate operator metrics to measure the health of the network, please also open NODE_API_PORT in .env to the internet if possible. Please see Node API Spec for more detail on the data made available via this port. -->




