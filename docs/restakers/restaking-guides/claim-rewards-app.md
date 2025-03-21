---
sidebar_position: 2
title: Claim Rewards using EigenLayer App
---

For information on Rewards concepts, refer to [Rewards Overview](../../eigenlayer/concepts/rewards/rewards-concept.md).

When claiming Rewards using the [EigenLayer app](https://app.eigenlayer.xyz/):
* The [rewards recipient](../../eigenlayer/concepts/rewards/earners-claimers-recipients.md) cannot be specified and is always the [Earner](../../eigenlayer/concepts/rewards/earners-claimers-recipients.md).
* Batch claiming cannot be used.

To specify the [rewards recipient](../../operators/howto/claimrewards/claim-rewards-cli.mdx) or [batch claim](../../operators/howto/claimrewards/batch-claim-rewards.md), claim using the EigenLayer CLI.

## Earner

To claim rewards using the EigenLayer app as an [Earner](../../eigenlayer/concepts/rewards/earners-claimers-recipients.md):

1. Navigate to the _Dashboard_ tab. Claimable rewards are displayed for AVS Rewards and Programmatic Incentives. 
2. Click the *Claim Rewards* button.
3. Select tokens individually you wish to claim rewards for or click *Select All* to claim all token rewards at once.
4. Click the *Claim Tokens* button. A transaction is initiated in your Web3 wallet to include claim proof.
5. Sign the transaction. The summary of rewards claimed is displayed. 

## Claimer

A Claimer address has permission for one or more Earner profiles. Each profile represents an Earner address for which the 
Claimer has claim privileges.

To claim rewards using the EigenLayer app as a Claimer:
1. Log in to the EigenLayer app with Claimer address. A list of Earner profiles associated with the Claimer address are displayed.
2. Select an Earner profile. The claimable rewards for the Earner are displayed.
3. Follow steps 2 to 5 as for claiming as an Earner.

When logged in as a Claimer, the only option visible is the Claim Rewards option.

:::note
If a Claimer address is associated with more than 100 Earner profiles, delays of up to 10 seconds may be experienced while loading. 
We are working to optimize this behavior. If you experience delays, allow sufficient time to load all profiles.
:::