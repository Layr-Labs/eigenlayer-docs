---
sidebar_position: 2
title: Redistribution
---

:::note
[ELIP-006 Redistibutable Slashing](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-006.md) introduced Redistributable Operator Sets.
Redistibutable Slashing is available in v1.5 on testnets and will be available on mainnet in Q3.
:::

Redistribution enables AVSs to repurpose slashed funds instead of burning them. In use cases such as lending and insurance protocols, 
redistribution plays a key role. It enables the reallocation of funds when commitments are broken or conditions change. For example, 
in the event of a liquidation or user reimbursement. Redistribution may be particularly beneficial for AVS use-cases that involve 
lending, insurance, risk hedging, or, broadly, commitments with a need to compensate harmed parties or amortize risk.

Redistribution extends slashing, allowing AVSs to not only penalize Operators for missed commitments but also strategically 
redirect those funds to harmed parties. Using redistribution, AVSs can also design systems that potentially reward reliable Operators using funds 
from those who underperform.

Redistribution is opt-in only for AVSs, Operators, and Stakers. AVSs choose whether to enable redistribution by creating
redistributable Operator Sets, Operators choose whether to accept the redistribution conditions, and Stakers decide whether 
to delegate to Operators running redistribution.

In general, there is a larger incentive to slash user funds when redistribution is enabled. Redistributable Operator Sets 
may offer higher rewards, but these should be considered against the increased slashing risks.

:::note
All ERC-20 assets other than ETH, including Liquid Staking Tokens (LSTs), EIGEN, and AVS tokens, can be redistributed. Native ETH is not 
yet eligible for redistribution.
:::

For information on: 
* Implementing redistributable slashing, refer to Create Operator Sets in the Developer section.
* Opting into redistributable Operator Sets, refer to Allocate and Register to Operator Set in the Operator section.