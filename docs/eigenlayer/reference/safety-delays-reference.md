---
sidebar_position: 4
title: Safety Delays
---

:::note
[ELIP-006 Redistibutable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced Redistributable Operator Sets.
Redistibutable Slashing is available in v1.5 on testnets and will be available on mainnet in Q3.
:::

EigenLayer Safety Delays are included in the following table.

| Parameter                        | Description                                                                                                                                                                                                                                                                                                                                           | Value | Setter & Configuration |
|:---------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| :---- | :---- |
| `ALLOCATION_CONFIGURATION_DELAY` | Amount of blocks between an Operator queuing an `ALLOCATION_DELAY` change and the change taking effect.                                                                                                                                                                                                                                               | 126000 blocks (~17.5 days) | Core Protocol: Set via governance |
| `ALLOCATION_DELAY`               | Amount of blocks it takes for an Operator’s allocation to be live in an Operator Set for a given Strategy. Must be set by the Operator before any allocations and applies globally to all Operator Sets and Strategies.  The protocol provides no constraints on this value. It can be any unsigned integer value and can be changed by the Operator. | Unsigned integer value representing a number of blocks  | Operator: Set via `AllocationManager` Must be set in order to allocate |
| `DEALLOCATION_DELAY`             | Amount of blocks between an Operator queuing a deallocation of stake from an Operator Set for a strategy and the deallocation taking effect. This delay also applies to an Operator *deregistering* from an Operator Set, either by their own action or that of the AVS.                                                                              | 100800 blocks (~14 days) | Core Protocol: Set via governance |
| `INITIAL_TOTAL_MAGNITUDE`        | Initial value of the monotonically decreasing total magnitude for every Operator for every strategy. Initially set high enough to start out with a large level of precision in magnitude allocations and slashings.                                                                                                                                   | 1e18 | Core Protocol: Constant, unlikely to change |
| `WITHDRAWAL_DELAY`               | Amount of blocks between a Staker queueing a withdrawal and the withdrawal becoming non-slashable and completable.                                                                                                                                                                                                                                    | 100800 blocks (~14 days) | Core Protocol: Set via governance |
| `SLASH_ESCROW_DELAY`             | Amount of blocks between a slashing event and the slashing becoming non-pausable and the slashed funds being burnable or redistributable.                                                                                                                                                                                                             | ~4 days | Core Protocol: Set via governance

:::note 
On EigenLayer testnet deployments, the `ALLOCATION_CONFIGURATION_DELAY` is set to 75 blocks (~15 mins), and the `DEALLOCATION_DELAY` and `WITHDRAWAL_DELAY` is set to 25 blocks (~5 mins) for ease of use.
:::