---
sidebar_position: 1
title: Release AVS
---

To sign a release and update the AVS metadata to enable Operators to verify the container was signed by the specified public key
using the [Release Management Service (RMS)](../../Concepts/avs-release-management.md):

1. Add valid keys for container signatures to AVS metadata. The format is:

    ```
    {
       "name": "AVS Release Nofitication Demo",
       ...
       "releaseKeys": [
          "0xc877a87254ad39e717d2f322192f2b93e3aea5b651e13267901a4f6db507243e"
  	   ],
       ...
    }
   ```

2. Sign the container digest with a key included in the AVS metadata. Using the EigenLayer CLI: 

    `eigenlayer-cli container sign [options]` with
    * `container-digest` - Digest of the container
    * `repository-location` - GitHub Container Registry (GHCR) repository location with which to tag the signature artifact.

3. Update the AVS metadata to include the software section with the container name, description, and location.

    For AVSs using Operator Sets, the format is:

    ```
    {
      "name": "AVS Release Nofitication Demo",
      ...
      "releaseKeys": [
         "0xc877a87254ad39e717d2f322192f2b93e3aea5b651e13267901a4f6db507243e"
      ],
      "operatorSets": [
        {
          "name":"AVS Release Management Demo!!!",
          ...
          "software":[
            {
              "name": "AVS Application Container", 
              "description": "A container located in GHCR for node operators to run.",
              "location": "ghcr.io/bdchatham/avs-release-demo-v1"
            }
          ],
        ...
        }
      ]
    }
    ```

    For AVSs using AVSDirectory, the format is:

    ```
	{
      "name": "AVS Release Nofitication Demo",
      "avs_contract_address": "0x4c68f7bef3e14b47ba9af64acb3f0ea70c6535b1",
      ...
      "description": "An AVS using for demonstrating application release tracking & notifications.",
      "software": {
        "name": "AVS Application Container for M2 Quorum operators.",
        "description": "A container located in GHCR for node operators to run.",
        "location": "ghcr.io/bdchatham/avs-m2-release-demo"
      },
      ...
    }
   ```

## List Release Keys

To list AVS keys for signing releases included in the AVS metadata, use: 

`eigenlayer-cli service list-avs-release-keys –avs-address <address>`