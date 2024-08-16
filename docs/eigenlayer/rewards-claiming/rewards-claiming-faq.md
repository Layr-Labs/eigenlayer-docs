---
sidebar_position: 2
title: Rewards Claiming FAQ
---



### When can I claim my rewards?

After a root is posted, rewards are claimable after an activation delay. On mainnet this delay is 1 week and on testnet it is 2 hours.

### What portion of rewards goes to my operator?

Operators get a fixed 10% portion rewards, though this is subject to change in a future release to be variable.

### How can I receive rewards on testnet?

To accumulate rewards on testnet for testing purposes you must be an operator (or delegate to one) who has opted into an AVS with active rewards. EigenDA is one such AVS.

### Are reward distributions based on the amount of work performed by an operator, the Operator's total delegated stake or both?

The current rewards calculation assumes that work done is directly proportional to stake; therefore, rewards are distributed proportional to stake. If an operator does not perform the tasks expected of it, the AVS should eject or "churn" the operator (which we have examples for in our middleware contracts).