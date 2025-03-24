---
sidebar_position: 3
title: Appointees
---

Appointees act as another account for a specific function for a specific contract, granting accounts granular access control.

Admins (or an account if no admins have been set) can grant an appointee access to specific functions on specified contracts. 
Appointees can be granted access to multiple functions or contracts. 

To perform key rotation, an admin creates a new appointee address with the same set of permissions and revokes access to the old appointee address.
The drawing below shows how appointee addresses can be rotated.

<img src="/img/uam/uam-rotate-appointees.svg" width="100%"
style={{ margin: '50px'}}>
</img>

Permissions for an appointee must be added and removed individually. There is no function to batch add permissions for a
given appointee, remove all permissions for a given appointee, batch add appointees to a given function, or remove all
appointees for a given function.

For information on how to add and remove appointees, refer to:
* [Add and Remove Appointees](../../../developers/HowTo/build/uam/dev-add-remove-appointees.md) for Developers 
* [Add and Remove Appointees](../../../operators/howto/uam/op-add-remove-appointees.md) for Operators


