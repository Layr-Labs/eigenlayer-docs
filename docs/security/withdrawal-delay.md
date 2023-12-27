---
sidebar_position: 5
---

# Withdrawal Delay

EigenLayer contracts feature a **7-day** withdrawal delay, a critical security measure for instances of vulnerability disclosure or when anomalous behavior is detected by monitoring systems. This delay not only serves as a preventive mechanism but also allows, in certain cases, for the reversion of malicious pending withdrawals. When contracts are paused and withdrawals disabled, the system enables arbitrary state or code changes to the contracts through upgrades. While technically feasible, such interventions are not a routine practice and should be approached with caution.

There are two main caveats to this system. The first is the potential for a vulnerability that can bypass the withdrawal delay. The second is the risk of a flaw in the code managing requests after they have undergone the delay period.

To mitigate these risks, the approach involves optimizing complex code processes before the delay, while ensuring simpler code operations post-delay. This is coupled with the aim of developing a robust and foolproof delay framework, thereby enhancing the overall security and resilience of the system.
