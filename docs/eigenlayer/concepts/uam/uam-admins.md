---
sidebar_position: 3
title: Admins
---

Admins can take any action on behalf of the original account that appointed them including adding or removing admins. Creating 
additional admins enables key rotation for Operators, or creating a backup admin which is stored on a cold key. The drawing
below shows how admin addresses can be rotated while retaining appointee access permissions.

<img src="/img/uam/admin-key-rotation.svg" width="100%"
style={{ margin: '50px'}}>
</img>

There must always be at least one admin for the account. If no admins have ever been set, the initial account address acts as the admin.

Admins cannot be given access to a subset of functions or contracts. Admins always have full access unless removed as an admin.
Specific function or contract access cannot be removed for a given admin.

For information on how to add and remove admins, refer to:
* [Add and Remove Admins](../../../operators/howto/uam/op-add-remove-admins.md) for Operators
* [Add and Remove Admins](../../../developers/HowTo/build/uam/dev-add-remove-admins.md) for Developers
