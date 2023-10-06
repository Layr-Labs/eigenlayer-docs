---
sidebar_position: 1
---

# Multisig Governance

EigenLayer is designed with upgradeable smart contracts, the ability to pause functionality, and various adjustable parameters. The ability and responsibility to make decisions regarding contract upgrades, pausing functionality, and adjusting parameters initially have been delegated to three main governance multisigs.

**The Operations Multisig**

The Operations Multisig is a 3-of-5 and can execute routine upgrades and maintenance through a timelock that enforces a minimum 10-day delay on all safety-critical actions. It can also pause EigenLayer functionality in emergency situations.

**The Pauser Multisig**

The Pauser Multisig is a 1-of-9 multisig that can also pause EigenLayer functionality in emergency situations, but holds no other powers.

**The Community Multisig**

The Community Multisig is a 9-of-13 multisig composed of members of the Ethereum community. In normal circumstances, the signers of the Community Multisig will simply act as observers, receiving regular updates on the Operations Multisig’s transactions, including notifications of the Operations Multisig queuing new time-locked actions. In extraordinary circumstances, the Community Multisig can perform emergency actions, including immediately executing time-critical upgrades or replacing the Operations Multisig in the event of private key compromise.

The contract address for the Community Multisig is 0xFEA47018D632A77bA579846c840d5706705Dc598 and its members include:

- Tim Beiko - Ethereum Foundation
- Viktor Bunin - Coinbase
- Uma Roy - Succinct
- Brian Retford - RISC Zero
- Pramod Viswanath - Witness Chain
- Swapnil Raj - Nethermind
- Dimitry Ukhanov - P2P
- Tarun Chitra - Robot Ventures
- Anna Rose - ZK Validator
- Curtis Spencer - Electric Capital
- Yuan Han Li - Blockchain Capital
- Ben Rodriguez - Coinbase Cloud
- Rob Pellecchia - Figment Capital

Finally, there is an _Executor Multisig_ which only has the (automated) role of executing functionality passed to it by either the Operations or Community Multisig.

On a technical level, the governance architecture looks like the following:

<figure><img src="https://lh5.googleusercontent.com/tdLYguBq5wyfQbJRkyVo7pqT1tBasCLxXP-aA60GZGXlqKDkLtQIN9guogHXdSRObApuLHT3LpPfIxZWJruxaAJBH5skfRY3EQAPya0sxxUnj1EoDgkUCxItwETv-dpaVVAV86JCzpYduZcpLQlH9-0" alt="" height="379" width="672"/><figcaption></figcaption></figure>

These multisigs represent a rudimentary but working system of transparent initial governance, with appropriate checks and balances. As the protocol continues to evolve, so will its governance, and we are continuously evaluating our options for potential future governance mechanics.

Decentralized governance practices are rapidly evolving, continuously pushing boundaries and exploring innovative approaches. In addition to the above, EigenLayer anticipates the emergence of novel mechanisms that have yet to be designed and is excited to research them and facilitate implementation.
