---
sidebar_position: 1
title: EigenLayer Middleware Contracts
---

The EigenLayer middleware contracts are reference implementations of the contracts an AVS uses to interact with the [EigenLayer contracts](core-contracts.md).
The middleware contracts can be: 
* Deployed as is. The exception is the ServiceManager contract used to register and deregister an AVS with EigenLayer.
* Modified to implement logic specific to the AVS before deploying 
* Not used. In this case, the interfaces present in the middleware contracts must be implemented in the AVS contracts.

The middleware contracts are documented in the [eigenlayer-middleware](https://github.com/Layr-Labs/eigenlayer-middleware) repository.
The ServiceManagerBase contract is the reference implementation for the onchain registration and deregistration that each AVS must have.   

