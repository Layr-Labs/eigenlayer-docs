---
sidebar_position: 5
---

# Troubleshooting

Before creating an issue with EigenLayer support please check this page to see if you can resolve your issues. If you are still stuck, please create a support ticket

#### Getting "no contract code at given address"

If you are getting this issue then either you are using a wrong rpc in your [operator.yaml](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L32) file or you have wrong smart contract address in your [config](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L25).

* Please make sure you have correct rpc node chosen for your network and that it is also reachable via your machine.

* Please find the correct smart contract addresses listed in the [Operator Installation](./operator-installation.md) section.

#### How to resolve the error "No contract code at given address" imply?

Ensure that your operator is pointing to the correct RPC service and that it is accessible from your operator ([example](https://chainlist.org/)).

#### My operator's metadata (name, description, logo) is not showing up in the webapp
Please make sure to comply with our metadata [guidelines](./operator-installation.md#operator-configuration-and-registration)