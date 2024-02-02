# Withdraw from EigenLayer

Please refer to the Ethereum Foundation’s documentation on [how withdrawal payments work](https://ethereum.org/en/staking/withdrawals/#how-do-withdrawals-work).

There are two kinds of withdrawals from native restaking in EigenLayer:

* **Partial** withdrawals: balances in excess of 32 ETH (earned rewards) are withdrawn to an Ethereum address. The validator will continue to be a part of the beacon chain and validate as expected.
* **Full** withdrawals: users have the ability to cease their staking activities entirely. By choosing this option, they initiate the process of unlocking the entire balance held by their validator, including both the initial stake and any accumulated rewards. This action effectively ends their validator's participation in the network.