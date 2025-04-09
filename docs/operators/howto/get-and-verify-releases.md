---
sidebar_position: 7
title: Get and Verify AVS Releases
---

If an AVS is using the [Release Management Service (RMS)](../../developers/Concepts/avs-release-management.md), Operators can list and verify the releases they are registered to run.

## List AVS Releases

To list the AVS releases a specified Operator is registered to run, use the EigenLayer CLI:

`eigenlayer-cli service list-operator-releases –operater-address <address>`

## Verify AVS Releases

To verify the container was signed by a public key specified in the AVS metadata, use the EigenLayer CLI:

`eigenlayer-cli container verify [options]` with
* `container-digest` - Digest of the container
* `repository-location` - Github Container Registry (GHCR) repository location from which the release container was obtained.