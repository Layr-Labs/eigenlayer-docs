---
sidebar_position: 2
title: Quick Start Example
---

## Hello World AVS: Local Deployment
The [Hello World AVS](https://github.com/Layr-Labs/hello-world-avs) is a simple implementation designed to demonstrate the core mechanics of how AVSs work within the EigenLayer framework. This example walks you through the process of:
- Spinning up a local chain with EigenLayer contracts and AVS contracts preconfigured.
- Registering an Operator with both EigenLayer and the AVS.
- Consumer client requesting work to be done by the AVS.
- Operator listening picking up this request, performing it, and signing off on it.
- The AVS contract verifying the operator's work.

![Hello World Diagram](/img/avs/hello-world-diagram-v2.png)

## Key Components of Hello World AVS
- AVS Consumer: Requests a "Hello, ___" message to be generated and signed.
- AVS: Takes the request and emits an event for operators to handle.
- Operators: Picks up the request, generates the message, signs it, and submits it back to the AVS.
- Validation: Ensures the operator is registered and has the necessary stake, then accepts the submission.


## Code Walkthrough

*Question to Nader - can we simply embed this video here as a Youtube video? If so, here is an example of how it could look:*
<iframe width="560" height="315" src="https://www.youtube.com/embed/2-maLV1O2lU?si=85qZl4xmsL0nBKPq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>




## Local Deployment Test

Please follow the steps under [Local Devnet Deployment](https://github.com/Layr-Labs/hello-world-avs?tab=readme-ov-file#local-devnet-deployment) to deploy an instance of Hello World locally on your machine.

* Question to Nader: can we avoid creating a copy of the Hello World AVS walkthrough content in these docs, if it is duplicative of the information in the repo Readme here?