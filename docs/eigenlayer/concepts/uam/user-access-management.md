---
sidebar_position: 1
title: User Access Management
---

:::note
UAM implements [ELIP-003: User Access Management (UAM)](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-003.md).
:::

User Access Management (UAM) is an EigenLayer protocol feature for Operators and AVS Developers that enables secure key rotation,
revocation, and recovery. UAM enables admin keys to:
* Delegate specific functions to new addresses (EOAs or smart contracts).
* Be assigned or rotated as needed.

The [PermissionController core contract](https://github.com/Layr-Labs/eigenlayer-contracts/blob/main/docs/permissions/PermissionController.md) implements UAM and defines three roles:
* [Accounts](uam-accounts.md)
* [Admins](uam-admins.md)
* [Appointees](uam-appointees.md)

:::note
UAM cannot be used by Stakers.
:::