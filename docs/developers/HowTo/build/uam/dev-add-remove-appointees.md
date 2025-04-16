---
sidebar_position: 2
title: Add and Remove Appointees
---

Only admins (or the account if no admin has been set) can add appointees. Unlike adding an admin, there is no requirement
for an appointee to accept the appointment.

For the list of contracts and functions that can have appointees set, refer to:
* [User Account Management](../../../Concepts/uam-for-avs.md) for AVS
* [User Account Management](../../../../operators/concepts/uam-for-operators.md) for Operators

## Add an Admin using Core Contracts 

To add an appointee, call the [PermissionController.setAppointee](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/permissions/PermissionController.md#setappointee) function.

To remove an appointee, call the [PermissionController.removeAppointee](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/permissions/PermissionController.md#removeappointee) function.