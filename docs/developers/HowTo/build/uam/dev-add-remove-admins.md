---
sidebar_position: 1
title: Add and Remove Admins
---

:::caution
Security of admin keys is critical. UAM enables appointees with lessened permissions, and use of keys that can be rotated or 
destroyed. For more information on key management best practices, refer to [AVS Developer Security Best Practices](../../../Reference/avs-developer-best-practices.md).

After an account has added an admin and the pending admin has accepted, the account address no 
longer has default admin privileges. That is, the original account key of the Operator or AVS cannot be
used for write operations to the protocol, unless previously added as an admin, or is added back as admin in the future.
There is no superadmin role.

The removal of default admin privileges upon adding additional admins enables accounts 
to perform a key rotation to remove permissions from a potentially compromised original key. 

For an account to retain admin 
privileges for its own address, add the account first as an admin. After the account is added as an admin, add other admins as needed.
:::

## Add an Admin Using the Core Contracts

Admins are added via a 2-step handshake. To add an admin:
1. As the account or admin adding the admin, call the [`PermissionController.addPendingAdmin`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/permissions/PermissionController.md#addpendingadmin) function to set the pending admin.
2. As the pending admin, call the [`PermissionController.acceptAdmin`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/permissions/PermissionController.md#acceptadmin) function. Once accepted, the added admin has full admin authority.

## Remove an Admin Using the Core Contracts

The caller must be an admin. Once an account has added an admin, there must always be at least one admin for the account. 

To remove a pending admin before they have called acceptAdmin, call the [`PermissionController.removePendingAdmin`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/permissions/PermissionController.md#removependingadmin) function.

To remove an admin, call the [`PermissionController.removeAdmin`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/permissions/PermissionController.md#removeadmin) function.
