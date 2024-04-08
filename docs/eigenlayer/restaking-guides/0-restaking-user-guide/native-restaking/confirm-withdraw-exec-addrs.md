---
sidebar_position: 7
---

# Confirm Validator Withdrawal and Execution Addresses (Optional)

Verifying your Validator’s Withdrawal and Execution addresses can help ensure you have configured your Native Restaking with EigenLayer safely. The instructions below will help you ensure that your Withdrawal address is set to your EigenPod and that your Execution address (aka “Fee Recipient”) is not set to your EigenPod.


Please note in the documentation and API below, the following terms will be used:
- Consensus Client will also be referred to as Beacon Node client.
- Execution client will also be referred to as Validator client.


## Confirming Withdrawal Address

Find your withdrawal credentials (which should match your EigenPod), via the following URL:

https://beaconcha.in/validator/[validator_pubkey]#deposits

## Confirming Execution Address

To list your validator's Execution address (aka “Fee Recipient”), please refer to your Consensus Client specific documentation. For example:
- [Lighthouse: Querying the fee recipient](https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html#querying-the-fee-recipient)
- [Prysm: Configure fee recipient](https://docs.prylabs.network/docs/execution-node/fee-recipient#configure-fee-recipient)
- [Teku: Proposer configuration file attributes: fee_recipient](https://docs.teku.consensys.io/how-to/configure/use-proposer-config-file)






