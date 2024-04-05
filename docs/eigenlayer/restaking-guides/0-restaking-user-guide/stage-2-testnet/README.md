---
sidebar_position: 4
title: Testnet Restaking
---

## Testing Restaking on the Holesky Testnet

Users are encouraged to first test their staking approach on the Holesky Testnet prior to restaking on ETH Mainnet.

* Follow the instructions in [obtaining-testnet-eth-and-liquid-staking-tokens-lsts.md](obtaining-testnet-eth-and-liquid-staking-tokens-lsts.md "mention") to fund your Testnet wallet.
* Visit [**holesky.eigenlayer.xyz**](https://holesky.eigenlayer.xyz/) for the most recent EigenLayer Testnet app.
* Users should only use the native restaking path if they already have their own validators on Holesky or know how to set one up. Otherwise, please go down the Liquid Restaking path.



## Testnet vs Mainnet Differences

- Withdraw (Escrow) Period:
    - All funds unstaked from _EigenLayer Testnet_ go through a delay (escrow period) of 10 blocks (roughly 2 minutes) before being able to be withdrawn.
    - All funds unstaked from _EigenLayer Mainnet_ will go through a 7-day escrow period before being able to be withdrawn.
- Holesky Testnet will not include Restaked Points calculations.
