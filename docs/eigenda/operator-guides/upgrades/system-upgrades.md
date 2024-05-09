---
sidebar_position: 2
---

# System Upgrades

Since system requirements scale dynamically in accordance with the amount of stake delegated to the operator, node operators may from time to time need to upgrade their system setups in order to continue meeting the [Protocol SLA](../requirements/protocol-SLA/)

When performing a system upgrade, operators should be mindful of the following considerations:
- Maintain custody of BLS signing keys.
- Ensure that the upgraded node remains reachable at the previously registered address.
- Maintain the integrity of all blob data stored by the node.

## Maintaining Data Integrity

If you followed the setup steps in our guide to [running with docker](../run-a-node/run-with-docker/), then your node will store its data at the location specified by the `NODE_DB_PATH_HOST` in your `.env` file, which is bind-mounted to the EigenDA docker container.

If your system upgrade requires you to change this storage location, ensure that all of the original data stored by the DA node survives in the new location.

Generally speaking, suppose you want to migrate node to a new machine, you should follow the following sequence in order to maintain data integrity and meet the protocol SLA:

**Old machine**:
1. Opt-out of all the quorums
2. Keep the node running for >1h
3. Continue to keep the node running while spinning up the new machine

**New machine**:
1. Copy over the files from old machine located at `NODE_DB_PATH`
2. Start the EigenDA Node with the files copied from the old machine (e.g. `docker-compose up -d`) and make sure node is reachable
3. Opt-in the quorums

Lastly, when new machine is working for both retrieval and dispersal, you can turn down the old machine (e.g. `docker-compose down`).
