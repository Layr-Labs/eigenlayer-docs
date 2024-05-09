---
sidebar_position: 2
---

# System Upgrades

Since system requirements scale dynamically in accordance with the amount of stake delegated to the operator, node operators may from time to time need to upgrade their system setups in order to continue meeting the [Protocol SLA](../requirements/protocol-SLA/)

When performing a system upgrade, operators should be mindful of the following considerations:
- Maintain custody of BLS signing keys.
- Ensure that the upgraded node remains reachable at the previously registered address.
- Maintain the integrity of all blob data stored by the node.

## Node migration

If you followed the setup steps in our guide to [running with docker](../run-a-node/run-with-docker/), then your node will store its data at the location specified by the `NODE_DB_PATH_HOST` in your `.env` file, which is bind-mounted to the EigenDA docker container.

Generally speaking, suppose you want to migrate node to a new machine, you should follow the following sequence in order to maintain data integrity and remain meeting the [Protocol SLA](../requirements/protocol-SLA/) during and after the migration:

**Old machine**:
1. Backup the keys stored at the machine as well as other configs you want to migrate
2. Opt-out of all the quorums
3. Keep the node running for >1h (note after this the node will stop receiving dispersal requests)
4. Continue to keep the node running (for retrieval traffic) while spinning up the new machine

**New machine**:
1. Copy over the files from old machine located at `NODE_DB_PATH_HOST`
2. Start the EigenDA Node (e.g. `docker-compose up -d`) with the files copied from the old machine (the file should be placed under the path per `NODE_DB_PATH_HOST`) and make sure node is reachable
3. Opt-in the quorums with a new IP address (so the old machine remains reachable with original IP while this is setting up). If you are registering with DNS, you need to repoint the DNS to the new IP and then opt-in the quorums.

Lastly, when the new node is working for both retrieval and dispersal, you can turn down the node at old machine (e.g. `docker-compose down`).
