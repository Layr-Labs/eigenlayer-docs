---
sidebar_position: 3
title: Batch Claim Rewards
---

Batch rewards claiming for Stakers and Operators using the EigenLayer CLI is a gas efficient way to claim on behalf 
of multiple Earners in a single transaction.

To batch claim rewards, use the `-–batch-claim-file` option:

`eigenlayer rewards claim --earner-address 0x025246421e7247a729bbcff652c5cc1815ac6373 --eth-rpc-url http://rpc-url --network hoodi --batch-claim-file samples/batch-claim.yaml`

The batch claim yaml file includes the Earner addresses, and token addresses for which to claim. For example:

```yaml
- earner_address: "0x025246421e7247a729bbcff652c5cc1815ac6373"
  token_addresses:
    - "0x3B78576F7D6837500bA3De27A60c7f594934027E"
- earner_address: "0x025246421e7247a729bbcff652c5cc1815ac6373"
  token_addresses:
    - "0x3B78576F7D6837500bA3De27A60c7f594934027E"
```