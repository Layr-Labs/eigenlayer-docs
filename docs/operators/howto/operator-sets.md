---
sidebar_position: 2
title: Allocate and Register to Operator Set
---

:::important
Before proceeding, review the [Slashing Concept](../../eigenlayer/archived/arhived-slashing.md) content for information on how Operator Sets and Allocations work.
:::

Set Allocation Delay:

```
eigenlayer operator allocations set-delay <flags> <allocation-delay>
```

Before allocating for their first Operator Set, an Operator is required to set an `ALLOCATION_DELAY` in the `AllocationManager`. If an Operator is registering with EigenLayer for the first time, they will be required to provide an `ALLOCATION_DELAY` during registration. It takes the amount of time specified in the `ALLOCATION_CONFIGURATION_DELAY` for the Operator's `ALLOCATION_DELAY` to be set initially or updated. This delay is to ensure Stakers have time to adjust to changes in their delegated Operator’s stake allocations. Stakers can withdraw their funds if an allocation is viewed as undesirable, subject to the `WITHDRAWAL_DELAY`

Set Allocations per Operator Set and Strategy

```
eigenlayer operator allocations update 
	--network holesky 
	--operator-address <operator-address> 
	--csv-file updates.csv 
	--caller-address <address-of-caller>
```

Use the csv in the below format to set multiple allocations in one transaction, where update.csv will look like:

```
avs_address,operator_set_id,strategy_address,bips
0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f,2,0x4936BA8f0a04CcC2e49b8C9E42448c5cD04bF3f5,1200
0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f,1,0x4936BA8f0a04CcC2e49b8C9E42448c5cD04bF3f5,165
```

The bips you provide here will be the final bips of your total stake.

* If the bips is more than what is currently slashable, it will take effect after allocation delay time which you have set in Step 1  
* If the bips is less than what is currently slashable, it will take effect after a deallocation delay which is set by protocol and can’t be changed per operator.  
  * Mainnet \- 14 days in blocks.  
  * Testnet \- 10 min in blocks.

There can only be one allocation or deallocation per (operator, strategy, operator set) at a time. Once the pending allocations/deallocation completes then you can start another if you would like. 

View all your allocations with show command as below

```
eigenlayer operator allocations show 
	--network holesky 
	--operator-address <operator-address> 
	--strategy-addresses <comma-separated-strategy-addresses>

```

Register to Operator Set

```
eigenlayer operator register-operator-sets 
	--operator-address <operator-address> 
	--avs-address <avs-service-manager-address> 
	--operator-set-ids <comma-separated-list-of-operator-set-ids>
	--caller-address <address-of-caller>
```

De-register from Operator Sets
```
eigenlayer operator deregister-operator-sets 
	--operator-address <operator-address> 
	--avs-address <avs-address> 
	--operator-set-ids <comma-separated-list-of-operator-set-ids>
	--caller-address <address-of-caller>
```

Note: If you are deregistering from an operator set which has some active allocation bips, you will have to explicitly deallocate from that operator set using the \`eigenlayer operator allocations update\` command specified above. If you don’t do this, that amount of stake would be unavailable until it is deallocated. Once you deallocate then after deallocation delay it will be available.
