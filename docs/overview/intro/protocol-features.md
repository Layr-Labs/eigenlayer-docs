# Protocol Features

## Custom Decentralization&#x20;

The number of native ETH restakers is expected to grow exponentially over time. With EigenLayer, native stakers can opt in to securing services that specifically want high decentralization, such as by specifying that only native stakers can participate. Examples of services that may optimize for decentralization are those that enable censorship resistance via multilateral ordering and secret sharing, and MPC over several nodes.

To maximize opt in from native Ethereum stakers, it is important that services that significantly value decentralization keep their off-chain software container requirements light. This will ensure that stakers can participate with minimal required increase in their infrastructure capabilities.

## Custom Slashing

EigenLayer provisions cryptoeconomic security through various slashing mechanisms, which levy a high cost of corruption. The terms and conditions of slashing are all specified in the slashing contract deployed by each service. By opting to restake with a particular service, stakers accept the risk of being subjected to slashing according to the rules in the slashing contract. Restakers who opt in to EigenLayer earn additional rewards on their staked ETH, while validators who participate gain additional revenue from the services that benefit from their validation operations. Whenever a dispute arises, EigenLayer uses the service’s slashing contract to verify whether the staker behaved maliciously, and then slashes the staker.&#x20;

## Operator Delegation

Stakers may be interested in participating in EigenLayer, but may not want to run software containers of services themselves. EigenLayer provides an avenue for these stakers to delegate EigenLayer operations to operators, who offer to run actively validated services software modules on their behalf.

Stakers would choose to delegate to operators based on multiple criteria:

1. **Trust of operator.** A staker must do due diligence on operators before delegating its stake to an operator, because if their delegated operator doesn't fulfill its obligations in the services it participates in, then staker assets will be subject to slashing.
2. **Rewards.** Stakers might delegate to operators that offer maximum rewards on delegated stake.
3. **Preference for services.** Stakers may prefer services based on their personal interests, due diligence on slashing risks, or rewards, and hence they may delegate their stake to only operators who are opted in to those particular services.

Those stakers who want to take a trust-minimized approach will always have the flexibility to be their own operator.
