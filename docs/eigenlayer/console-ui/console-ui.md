---
sidebar_position: 1
title: Console UI
---


# Console UI Guide

The [Console UI App](https://holesky.console.eigenlayer.xyz/operator) is built to provide a consolidated user experience for Operators and AVSs to manage their metadata and view general information about their contracts without requiring the use of a CLI. 

The Console UI will eventually provide the following capabilities:

* Operators: 
  * Register as a new Operator
  * Manage Operator metadata (name, website, description, etc.)
* AVSs: 
  * Manage configuration including: metadata (name, website, description, etc.), AVS [owner](https://github.com/Layr-Labs/eigenlayer-middleware/blob/7d49b5181b09198ed275783453aa082bb3766990/src/RegistryCoordinator.sol#L83) address, Operator allowlist
  * Manage quorum details including: number of quorums, stake parameters, minimum stake amounts
  * Eject non-performing Operators
  * Strategy management: create a new Strategy, add/remove support for a new strategy to my AVS, 
  * Submit a `RewardsSubmission`

The Console UI currently supports Holesky Testnet only.