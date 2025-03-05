---
sidebar_position: 3
title: AVS Contracts
---

The AVS contracts are the contracts that call the [EigenLayer contacts](eigenlayer-contracts/core-contracts.md). An AVS can split onchain components across
multiple contracts to enable a modular design.

:::note
Before the Slashing release introduced [User Access Management (UAM)](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-003.md), AVS contract calls to EigenLayer were routed through a
single ServiceManager contract. With UAM, a modular approach to AVS contracts is possible. 

The [Hello World](https://github.com/Layr-Labs/hello-world-avs) and [Incredible Squaring](https://github.com/Layr-Labs/incredible-squaring-avs) examples are in the process of being updated to use UAM.
:::
