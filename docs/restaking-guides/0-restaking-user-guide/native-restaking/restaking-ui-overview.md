# Restaking UI Overview

This overview explains the meaning behind each field in the [EigenLayer App](https://app.eigenlayer.xyz/).


<img src="/img/restake-guides/restaking-UI-fields.png" alt="EigenLayer App UI" width="400"/>

## Description of Fields

- **Validator Balance** is the total of all [Effective Balances](https://ethereum.org/en/developers/docs/data-and-analytics/block-explorers#validators) from your validators, indicating the amount of Ether that is actively being staked. Note that this balance does not include rewards since those are not used for staking and are represented as the EigenPod Balance.

- **EigenPod Balance** captures the rewards from the consensus layer that are sent to the EigenPod, which occurs when your withdrawal credentials are set to an EigenPod address. This balance exclusively reflects the rewards and not the staked amount.

- **Unstake Pending** displays the total Ether that is in the process of unstaking, indicating that an action to withdraw a partial or full amount has been initiated.

- **Available to Withdraw** shows the Ether that has completed the mandatory waiting period and is fully available for withdrawal from EigenLayer.