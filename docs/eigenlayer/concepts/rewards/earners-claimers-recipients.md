---
sidebar_position: 2
title: Earners, Claimers, and Reward Recipients
---

Earners are addresses that accrue Rewards within the EigenLayer ecosystem and are Stakers, Operators, or in the case of refunds,
AVS addresses. Earners accrue rewards but claiming rewards is a separate step and can be assigned to a Claimer.

Claimers are addresses that are authorized to claim rewards on behalf of Earners. By default, an Earner is their own Claimer. 
Earners can assign a Claimer address to manage Rewards claims on their behalf. If an Earner sets a Claimer, the new Claimer 
gains the ability to claim all unclaimed past Rewards. Claimers can set a reward recipient address to receive the rewards. If 
using the EigenLayer CLI or app, the default reward recipient is the Earner.

In summary:

* Earners accrue rewards but do not necessarily claim them.
* Claimers claim rewards but do not necessarily receive them.
* Reward recipients receive the rewards (that is, the final destination for ERC20 token distributions).