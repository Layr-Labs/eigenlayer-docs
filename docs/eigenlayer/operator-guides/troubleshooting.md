---
sidebar_position: 8
---

# Troubleshooting

Before creating an issue with EigenLayer support please check this page to see if you can resolve your issues. If you are still stuck, please create a support ticket.

#### `invalid yaml file: with error invalid image format. only png is supported`

This error indicates that your operator image is not accessible at the URL provided in your `metadata.json` file or uses the wrong file type.

To troubleshoot, try these steps:

* Ensure your `operator.yaml` points to a publicy accessible `metadata.json` file hosted online
* Ensure the `logo` value in your `metadata.json` file points to a publicly accessible PNG image hosted online
* Switch your `logo` out for a different PNG from the web

If you are using GitHub to host your `metadata.json` and/or `logo`, ensure the repository is public and that you have provided [raw URLs](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-a-file#viewing-or-copying-the-raw-file-content).

#### Getting "no contract code at given address"

If you are getting this issue then either you are using a wrong rpc in your [operator.yaml](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L32) file or you have wrong smart contract address in your [config](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L25).

* Please make sure you have correct rpc node chosen for your network and that it is also reachable via your machine.

* Please find the correct smart contract addresses listed in the [Operator Installation](./operator-installation.md) section.

#### How to resolve the error "No contract code at given address" imply?

Ensure that your operator is pointing to the correct RPC service and that it is accessible from your operator ([example](https://chainlist.org/)).

#### My operator's metadata (name, description, logo) is not showing up in the webapp
Please make sure to comply with our metadata [guidelines](./operator-installation.md#operator-configuration-and-registration)