# EigenDA Overview

## What is EigenDA

EigenDA is a secure, high throughput, and decentralized data availability (DA) service built on top of Ethereum using the [EigenLayer](https://www.blog.eigenlayer.xyz/intro-to-eigenda-hyperscale-data-availability-for-rollups/eigenlayer.xyz) restaking primitive. Developed by EigenLabs, EigenDA will be the [first actively validated service (AVS)](https://www.blog.eigenlayer.xyz/twelve-early-projects-building-on-eigenlayer/) to launch on EigenLayer. Restakers will be able to delegate stake to node operators performing validation tasks for EigenDA in exchange for service payments, and rollups will be able to post data to EigenDA in order to access lower transaction costs, higher transaction throughput, and secure composability across the EigenLayer ecosystem, with security and throughput designed to horizontally scale with the amount of restake and operators opted into servicing the protocol.

Data Availability is a requirement for both for ZK and Optimistic rollups ([source](http://datalayr-docs.s3-website-us-east-1.amazonaws.com/build/rollups/)):

- In both optimistic rollups and ZK-rollups, if transaction data is not available, then participants in the rollup will be unable to reconstruct the rollup state so as to bridge out their assets if desired.
- In optimistic rollups, if transaction data is not available, challengers are unable to check the sequencer’s state commitment and create fraud proofs when applicable.

## EigenDA Architecture

![EigenDA Arhitecture](/img/eigen-da-diagram.png)

The diagram above shows the basic flow of data through EigenDA:

1. The rollup Sequencer creates a block with transactions, and sends a request to disperse the data blob.
2. The Disperser is responsible for erasure encoding data blobs into chunks, generating a KZG commitment and KZG multi-reveal proofs, and sending the commitment, chunks, and proofs to the operator nodes of the EigenDA network.
3. Rollups will be able to run their own disperser, or use a dispersal service that a third party (for example, EigenLabs) operates for convenience and amortization of signature verification costs. It is possible for a rollup to use a dispersal service optimistically, such that in the case the service is non-responsive or censoring, the rollup can use its own disperser as a backstop, thus getting amortization benefits in the optimistic mode without sacrificing censorship resistance.
4. The EigenDA nodes verify the chunks they receive against the KZG commitment using the multi reveal proofs, persist the data, then generate and return a signature back to the Disperser for aggregation.
