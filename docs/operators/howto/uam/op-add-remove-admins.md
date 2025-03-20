---
sidebar_position: 1
title: Add and remove admins
---

:::caution
Security of admin keys is critical. UAM enables appointees with lessened permissions, and use of keys that can be rotated or
destroyed. For more information on key management best practices, refer to [AVS Developer Security Best Practices](../../../developers/Reference/avs-developer-best-practices.md).

After an account has added an admin and the pending admin has accepted, the account address no
longer has default admin privileges. That is, the original account key of the Operator or AVS cannot be
used for write operations to the protocol, unless previously added as an admin, or is added back as admin in the future.

The removal of default admin privileges upon adding additional admins enables accounts
to perform a key rotation to remove permissions from a potentially compromised original key.

For an account to retain admin
privileges for its own address, add the account first as an admin. After the account is added as an admin, add other admins as needed.
:::

## Add an Admin Using EigenLayer CLI 

Admins are added via a 2-step process. To add an admin:
1. As the current admin (or account if no admin has been set), add the pending admin:

    `eigenlayer user admin add-pending-admin [options]` with:
    * `account-address` - Operator address for which admin is being added
    * `admin-address` - Admin address to be added
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.

2. As the pending admin, accept the admin:

    `eigenlayer user admin accept-admin [command options]` with: 
    * `account-address` - Operator address for which admin is being added
    * `accepter-address` - Address of admin accepting the pending invite 

## Remove an Admin Using EigenLayer CLI

The caller must be an admin. Once an account has added an admin, there must always be at least one admin for the account. 

To remove a pending admin before they have accepted:
 
`eigenlayer user admin remove-pending-admin [options]` with:
    * `account-address` - Operator address for pending admin
    * `admin-address` - Pending admin address to be removed
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.

To remove an admin:

`eigenlayer user admin remove-admin [options]` with:
    * `account-address` - Operator address for admin
    * `admin-address` - Admin address to be removed  
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
       Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
       Set to the address of the admin using the CLI.


