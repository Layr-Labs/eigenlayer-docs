---
sidebar_position: 4
---

# Troubleshooting
Before creating an issue with EigenLayer support please check this page to see if you can resolve your issues. If you are still stuck, please create a support ticket

#### Getting "no contract code at given address"
If you are getting this issue then either you are using a wrong rpc in your [operator.yaml](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L32) file or you have wrong smart contract address in your [config](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L25).

* Please make sure you have correct rpc (goerli rpc for goerli nodes, mainnet rpc for mainnet) and is also accessible via your machine

* Please find the correct smart contract addresses [here](https://docs.eigenlayer.xyz/operator-guides/operator-installation#goerli-smart-contract-addresses)