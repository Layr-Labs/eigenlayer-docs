# Risk FAQ

## Is EigenLayer ...?


**Is EigenLayer a DeFi protocol?**

No, EigenLayer is not a DeFi protocol. EigenLayer is a platform to bootstrap new proof of stake (PoS) decentralized systems. Through the EigenLayer protocol, users cannot engage in any financial activities such as swapping and lending. However, for the services built on top of EigenLayer (we call them AVSs, Actively Validated Services), these services could be DeFi applications themselves or support key functionalities in other DeFi protocols. These AVSs are external to the EigenLayer contracts.

**Is EigenLayer involved in rehypothecation?**

No, EigenLayer is not rehypothecation and does not engage in rehypothecation. 

Rehypothecation is the practice that allows collateral posted by, say, a hedge fund to its prime broker to be used again as collateral by that *prime broker* for its own funding.

We can clearly see the difference between the difference. Where as in EigenLayer:
1) Stakers retain full control over their staked tokens.
2) Stakers decide which services they wish to validate.
3) Stakers are not exposed to counterparty liquidity risks.

In contrast, rehypothecation in traditional finance implies:
1) Depositor no longer have direct control of their assets.
2) Depositors have little say in the financial activities conducted by the intermediary.
3) Depositors are subject to substantial liquidity and counterparty risks.

# Staker related
**If the operator I delegate to is honest, will I be slashed?**

No, the operator will not be slashed if it honestly carries out its validation services, even if other operators are dishonest and malicious.

**If the AVS offchain software bug caused a slashing event, would the operator or staker be slashed?**

No, software bugs in AVS will not cause stakers to lose money. In the protocol's early stages, we implemented guardrails to avoid such scenarios. We have a veto committee in place to overturn any slashing incidents caused by software bugs in the offchain node.

**If everyone else conducted malicious activties, will I be slashed?**

No, you won't be slashed if your operator is not malicious. As a staker, even if the AVS you stake in is malicious (meaning the other operators are all malicious), as long as your operator is not involved in malicious activity, you are safe from being slashed.


## LRT related

**What roles does LRTs serve?**

First, LRTs allow EigenLayer to not fiancialize. and opportunity cost and defi.

LRTs safeguard EigenLayer and AVSs from external financial risks tied to staked positions. In EigenLayer, stakers don't receive a transferable receipt post-staking. Despite this, we expect some stakers to try and financialize their positions. 

In the absence of LRTs, if a financialized staker's position gets liquidated, the staked tokens must be withdrawn from EigenLayer. This is the case because staked position cannot be transferred, negatively affecting AVS's economic security. However, with LRTs, withdrawals become unnecessary. The liquidator can simply assume the staker's position.

This feature is especially crucial during substantial market downturns. As the price of ETH falls, so does the system's total economic security. If liquidation leads to more ETH leaving EigenLayer, it would worsen the downward spiral. LRTs can significantly mitigate this risk, thereby protecting both AVS and EigenLayer from potential financial risks related to staker positions.


**Is there an LRT looping risk that would potentially cause potential liquidation cascade?**

No, looping LRTs in EigenLayer is not possible because depositing LRTs into EigenLayer is currently not allowed.

However, in lending markets, looping LRTs may occur based on the risk analysis of individual LRTs. We advise caution when taking this step as it involves financial leverage and exposes LRT holders to significant risks.

Looping LRTs in lending markets can lead to a cascade of liquidations. This risk is limited to individual lending markets and does not affect the security of EigenLayer. This is similar to the stETH depeg incident in 2022. During the event, the price risk of stETH is contained within the lending market, and Ethereum consensus remains unaffected.

## Ethereum related
**Does EigenLayer rely on Ethereum social consensus?**

No, EigenLayer does not depend on Ethereum's social consensus. It aims for responsible decentralization. Instead of shifting unwarranted slashing risks to Ethereum or external protocols, EigenLayer includes a slashing veto committee. This internalizes social consensus and safeguards against slashing risks.

The veto committee functions similarly to the relay in MEV-Boost. MEV-Boost relies on a double-trusted party, known as a relay, who is trusted by both proposers and builders. Any individual trusted by both parties can serve as a relay, effectively removing any entrenched actor.

In Eigenlayer, a veto committee serves as a doubly-trusted intermediary between AVS and staker. The solution is the same as the relay, but instead of having a specific veto committee, anyone can establish a veto committee. As long as both parties trust the committee, the staker and AVS can interact through it.

The plan is to upgrade to a version of EigenLayer without a canonical veto committee. Instead, there will be a marketplace of veto committees. Operators can define their own veto committee, which can veto slashing from any AVS it has chosen. AVSs can specify a preference for veto committee(s) that operators must have in order to opt in. This promotes inter-subjectivity, as operators and AVSs coordinate their choices based on their subjective views of safety.

**Does EigenLayer increase centralization pressure on the validator set?**

If EigenLayer imposes additional computational demands on Ethereum validators, it unavoidably becomes a centralization vector for Ethereum. With this principle in mind, EigenLayer discourages the increase in node requirements for Ethereum validators and promotes the use of lightweight AVSs, such as [EigenDA](https://twitter.com/eigen_da).

For more computationally demanding AVSs, EigenLayer's delegation features allow Home stakers to secure Ethereum while delegating the operation of other AVSs to a different operator.

We are also exploring mechanisms such as the [Optimistic Delegation Framework](https://research.eigenlayer.xyz/t/optimistic-delegation-framework-idea-to-allow-for-native-restaking-without-delegation/39) and [AVS for PBS](https://www.youtube.com/watch?v=7xCqa_Ufv0A) to reduce the computational load on Ethereum validators in a trust-minimized manner.

From an economic standpoint, we are exploring the possibility of directly incentivizing individual stakers through a rewards sharing scheme. Consider, for instance, allocating a certain percentage (x%) of all rewards processed through EigenLayer to solo validators.

If you are interested in discussing these mechanisms and incentive issues further, please share your thoughts on [research.eigenlayer.xyz](research.eigenlayer.xyz)

**Does EigenLayer need to self-limit like other liquid staking protocols?**

No, EigenLayer doesn't require self-limiting.

The danger of a liquid staking protocol owning a substantial portion of the network is the potential imposition of a specific validator set on the Ethereum network. This risk doesn't apply to EigenLayer. Even if all staked ETH is restaked through EigenLayer, it doesn't control Ethereum's validator set. That control remains solely with Ethereum's stakers and validators.

If EigenLayer self-limits, the surplus restaking demand will likely revert to liquid staking protocols, increasing centralization pressure at the protocol's base layer. If EigenLayer didn't exist, dominant LST protocols would likely offer restaking services only to their internal stakers. These centralized restaking services could considerably strengthen the dominant LST's central position. More restaking services mean additional yield, leading to further consolidation of the LST. This scenario resembles the situation with Miner Extractable Value (MEV), where large stakers, including professional operators and LSTs, can negotiate MEV order flow guarantees that smaller stakers can't participate in.

In contrast to the centralized restaking mechanisms mentioned above, EigenLayer is developing a credibly neutral, decentralized restaking platform. All participants, whether small or large LSTs, small or large node operators, or institutional and home stakers, can all participate in additional validation opportunities. This approach helps prevent a monopoly in LST or Liquid Restaking Tokens (LRT), fostering decentralization and neutrality among node operators.

Unlike LST or LRT, EigenLayer doesn't define an operator set, so it doesn't threaten Ethereum's censorship resistance or operator decentralization. 

Self-limiting EigenLayer offers no significant benefit. Instead, if EigenLayer proves successful in the market, it could even be integrated into the Ethereum protocol as a native service.

**Does EigenLayer experience the principal-agent problem between stakers and operators?**

EigenLayer, as with other PoS protocols, does experience the principal-agent problem. However, our goal is to minimize this issue as much as possible.

It's important to highlight that EigenLayer operators never retain custody of the staker's tokens, which limits the potential for malicious activities to only slashing events.

We have established several strategies to further limit the operator's capacity for harmful actions:
1. Technical Trust: EigenLayer operators can utilize an anti-slasher within a Trusted Execution Environment (TEE) to verify its response to any validation task. The operator then sends the associated TEE certificate with its response for the task, confirming that the anti-slasher was utilized. Another technical solution to address the principal-agent problem is to structure the EigenLayer operator with decentralized DVT nodes.
2. Economic Trust: Similar to Rocketpool, a specific LRT protocol might require operators to stake proportionally to the delegation they receive. This approach assumes a certain amount that can be slashed and a probability for that occurrence. By encouraging the operator nodes to behave correctly, the principal-agent problem can be mitigated.
3. Social Trust: A staker always has the option to self-delegate and operate the nodes for AVSs or delegate it to a trusted operator. In this scenario, the staker trusts the operator to perform only the stipulated operations and not engage in any malicious activities. This practice is common in the real world, where service providers like AWS offer services.