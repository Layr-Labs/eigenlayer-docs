---
sidebar_position: 2
title: Native ETH Restaking Withdrawal Delays
---

Withdrawing funds from BeaconChain to an EigenPod and ultimately to a user’s wallet involves multiple sequential steps with
varying delays. The standard withdrawal flow and possible optimizations to the standard flow are described. 

## Standard withdrawal flow 

<img src="/img/restake-guides/withdrawal-flow.png" width="75%" style={{ margin: '50px'}}>
</img>

To move funds from a validator on BeaconChain to an EigenPod, the following steps occur:
1. Request Voluntary Exit
   * Broadcast a request to exit the validator on BeaconChain (usually very fast).

2. Exit Queue
   * Validators enter the exit queue.
   * The exit queue has never exceeded 7 days.
   * Typically \<1 day, but technically unbounded during extremely high congestion.

3. Withdrawal Delay
   * After reaching the end of the exit queue, a validator can be turned off, but there is an enforced delay before the ETH becomes withdrawable.
   * Fixed at 256 epochs (~27 hours).

4. Sequential Validator Sweep
   * Validators are checked sequentially 16/block to see if they have rewards to send to the execution layer.
   * Currently 0-9.1 days (randomized based on validator index in the sweep order).
     Maximum length depends on the number of active validators in the network.

5. Funds Enter EigenPod
   * Once swept, funds arrive in the EigenPod on the Execution Layer.

6. EigenLayer Withdrawal Escrow
   * 7-day* mandatory waiting period before final withdrawal can be executed.
   * The Escrow increases to 14 days post [Slashing upgrade](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md#why-is-withdrawal_delay-set-to-14-days-worth-of-blocks).

7. Complete Withdrawal
   * Once the escrow period ends, funds can be withdrawn from EigenLayer to the user’s wallet.

**Estimated Timeframe:** 8-17 days depending on how quickly the user initiates the withdrawal from the EigenPod after funds arrive.

## Optimized approach 

<img src="/img/restake-guides/optimized-withdrawal-flow.png" width="75%" style={{ margin: '50px'}}>
</img>

For users comfortable with smart contract interactions, it is possible to reduce the total withdrawal time by overlapping certain steps:
* The BeaconChain withdrawal process (1-10 days) can overlap with the EigenLayer escrow period (7* days) by proactively 
queuing withdrawals on-chain in advance.
  * Escrow increases to 14 days post [Slashing upgrade](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md#why-is-withdrawal_delay-set-to-14-days-worth-of-blocks).
* Overlapping these steps requires knowing the exact amount to withdraw ahead of time to prevent issues with overestimating (which leads to delays) or underestimating (which leaves residual funds in the EigenPod).

**Minimum Theoretical Withdrawal Time:** 1-10 days instead of 8-17 days.

## Key Considerations for Operators & Restaking Integrators
* Validator Sweep Randomness: The 0-9 day delay is unpredictable for a given validator due to the sequential sweep mechanism.
  * Potentially can be optimized by an operator with a large number of validators pointed to the same EigenPod by 
  selecting validators that are closer to the current index of the sweep.
  * This optimization is especially viable for custodial restaking operations.
* Risks of the Optimized Approach:
  * If a user underestimates the withdrawal amount, residual ETH remains in the EigenPod.
  * If a user overestimates, they must wait for the escrow to complete before adjusting.
  * Slashing events or penalties can disrupt planned withdrawals.