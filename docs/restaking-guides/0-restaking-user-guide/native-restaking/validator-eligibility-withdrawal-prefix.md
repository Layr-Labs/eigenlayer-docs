---
description: Need to clarify your withdrawal prefix?
sidebar_position: 4
---

# Verify Validator Withdrawal Prefix (Optional)

Beacon chain validators contain a field known as **withdrawal credentials,** that may be used later to withdraw funds from the validator's balance on the beacon chain. The first two bytes of these credentials are known as the [**withdrawal prefix**](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-are-0x00-and-0x01-withdrawal-credentials-prefixes).

The prefix can either be `0x00` or `0x01`:

- Validators with `0x00` prefix: These are specific to BLS-style withdrawal credentials, common to early ETH stakers. Validators with this prefix can easily restake on EigenLayer, by [repointing](repointing-a-validators-withdrawal-credentials.md) their withdrawal credentials.
- Validators with `0x01` prefix: This newer method is derived from Ethereum addresses. In order for `0x01` validators to restake, they have to completely exit from the beacon chain, re-enter on the beacon chain as a new validator and set the withdrawal credentials to their EigenPod.

## **New Validators**

ETH stakers planning to create new validators can set their withdrawal credential directly to their EigenPod or deploy with 0x00 prefixed withdrawal credentials for an easier transition to EigenLayer later. In order to use the 0x00 prefix, do not set _--execution_address_ or _--eth1_withdrawal_address_ flags [when setting up new validators.](https://github.com/ethereum/staking-deposit-cli#commands)

## **Existing Validators**

### **How do I check if I have a `0x00` or an `0x01` address?**

There are multiple methods to do this; the easiest is using [`ethdo`](https://github.com/wealdtech/ethdo).

```bash
ethdo validator info --validator=<yourvalidatorIndex> --verbose
```

This outputs a **withdrawal credentials** field which either begins with `0x00` or `0x01`.

Additionally, you can check [beaconcha.in](http://beaconcha.in/), navigate to your validator page, and check the **Beaconchain Deposits** field under the Deposits tab.

### **Prefix Migration from 0x00 to 0x01**

If you have 0x00-prefixed credentials, you can only [migrate once](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-Once-I-have-changed-my-credential-to-0x01-can-I-change-it-to-an-alternative-withdrawal-address) to a 0x01-prefixed credential per the Ethereum protocol rules. You may choose to either:

- Migrate your withdrawal credential to your EigenPod address.
- Migrate (convert) your withdrawal credential from a [BLS address (0x00) to an execution address (0x01)](https://notes.ethereum.org/@launchpad/withdrawals-guide#BLS-to-execution-with-ethdo).

If you update your credentials **before** restaking on EigenLayer, you will have to go through the withdrawal queue and then restart the ETH validator staking process.

:::danger
This migration is a **one-time** process, so please proceed cautiously.
:::

### Existing Validators with 0x01 Prefixes

If you have validators with 0x01 prefixes that are not pointed to an EigenPod, you will need to exit and create new Ethereum validators with the withdrawn ETH, setting the withdrawal credentials to an EigenPod to restake on EigenLayer.
