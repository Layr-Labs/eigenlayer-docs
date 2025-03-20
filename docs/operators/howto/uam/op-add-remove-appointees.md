---
sidebar_position: 1
title: Add and Remove Appointees
---

Only admins (or the account if no admin has been set) can add appointees. Unlike adding an admin, there is no requirement
for an appointee to accept the appointment.

For the list of contracts and functions that can have appointees set, refer to:
* [User Account Management](../../../developers/Concepts/uam-for-avs.md) for AVS
* [User Account Management](../../concepts/uam-for-operators.md) for Operators

## Add an Appointee Using EigenLayer CLI 

To add an appointee:

`eigenlayer user appointee set [options]` with:
    * `account-address` - Operator address for admin
    * `appointee-address` - Appointee address to have ability to call specified function granted
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.
    * `selector` - Function for which to grant appointee ability to call. Use Etherscan to obtain the selector.
    * `target-address` - Contract address containing function for which appointee is being granted permission to call 
      (for example, `AllocationManager`). The contract addresses are published in the [core contracts](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments) repository.

## Remove an Appointee Using EigenLayer CLI

To remove an appointee: 

` eigenlayer user appointee remove [options]`

With the same options as adding an appointee but the permission is being removed instead of granted.
