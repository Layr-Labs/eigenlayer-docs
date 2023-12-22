# Withdraw from EigenLayer

Please refer to the Ethereum Foundation’s documentation on [how withdrawal payments work](https://ethereum.org/en/staking/withdrawals/#how-do-withdrawals-work).

There are two kinds of withdrawals from native restaking in EigenLayer:

- Partial withdrawals: Balances in excess of 32 Eth (earned rewards) are withdrawn to an Ethereum address and can be spent immediately. The validator will continue to be a part of the beacon chain and validate as expected.
- Full withdrawals: The validator will exit and stop being a part of the beacon chain. The entire balance (32 ETH principle and any rewards) of the validator is then unlocked and allowed to be spent after the exit and withdrawal mechanism is complete.
