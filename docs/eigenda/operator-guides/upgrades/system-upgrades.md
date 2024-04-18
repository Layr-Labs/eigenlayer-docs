---
sidebar_position: 2
---

# System Upgrades

Since system requirements scale dynamically in accordance with the amount of stake delegated to the operator, node operators may from time to time need to upgrade their system setups in order to continue meeting the [Protocol SLA](./protocol-SLA/)

When performing a system upgrade, operators should be mindful of the following considerations: 
- Maintain custody of BLS signing keys.
- Ensure that the upgraded node remains reachable at the previously registered address. 
- Maintain the integrity of all blob data stored by the node. 

## Maintaining Data Integrity

If you followed the setup steps in our guide to [running with docker](../run-a-node/run-with-docker/), then your node will store its data at the location specified by the `NODE_DB_PATH_HOST` in your `.env` file, which is bind-mounted to the EigenDA docker container. 

If your system upgrade requires you to change this storage location, ensure that all of the original data stored by the DA node survives in the new location. 

Generally speaking, you should follow the following sequence in order to maintain data integrity: 
1. Provision the new storage location. Suppose that the variable `$NODE_DB_PATH_HOST_NEW` points to your new storage location.
2. Stop the DA node (e.g. `docker-compose down`)
3. Copy the the contents of the old storage location to the new storage location (e.g. `cp -r $NODE_DB_PATH_HOST $NODE_DB_PATH_HOST_NEW`)
4. Update the DA node configuration (e.g. set the `NODE_DB_PATH_HOST` variable in your `.env` file to the value of `$NODE_DB_PATH_HOST_NEW`).
5. Restart the DA node (e.g. `docker-compose up -d`)