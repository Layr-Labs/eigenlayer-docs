---
description: >-
  Process: It takes approximately 6-8 months from having an idea to launching
  mainnet on EigenLayer
---

# AVS Onboarding Lifecycle

**Month 1: deciding whether to build on EigenLayer**

- Basic Understanding
  - 3 - 5 days: Understand the basics of EigenLayer.
    - Understand [how EigenLayer works](https://www.blog.eigenlayer.xyz/ycie/).
    - Read our [GitHub](https://github.com/Layr-Labs/eigenlayer-contracts/tree/master#introduction) on how EigenLayer contract architecture works.
    - Understand the type of trust you would need with [programmable trust](https://www.blog.eigenlayer.xyz/the-three-dimensions-of-programmable-trust/)
    - Play with our [Incredible Squaring AVS demo](https://github.com/Layr-Labs/incredible-squaring-avs) - a dummy AVS we built to showcase the on-chain contracts and off-chain node software components of an AVS.
      - Incredible Squaring [Overall 5 min Walk-Through](https://www.loom.com/share/50314b3ec0f34e2ba386d45724602d76?sid=cf176400-fdbb-4bdc-8563-22a68414985d)
      - Incredible Squaring [TaskManager 5 min Walk-Through](https://www.loom.com/share/5f3f2a447bc54ffa9d37d203c32088de?sid=0f5c2c07-82c5-4640-bc6f-6e4327bb3d81)
  - 20 min: Once you have an idea of what you want to build on EigenLayer, submit an [AVS Questionnaire](https://bit.ly/avsquestions) and get in touch with us.
- Assessing
  - 30 min: Once we review your AVS Questionnaire response, we will reach out and hop on a customer discovery call with you to address any questions you have about the technical architecture of your system, the process to become an AVS, and EigenLayer’s value proposition.
  - 1 - 4 weeks: look into our docs more and spend some time to determine whether building on EigenLayer makes sense and is feasible. You can ask any questions in our Telegram group, and our researchers and engineers will answer questions promptly.

**Months 2-5: from idea to testnet**

- Engineering
  - AVS must write on-chain contracts, which contain the AVS registry contract and slashing contract, and test out the integration to EigenLayer by studying our Incredible Squaring demo.
    - AVS can use Incredible Squaring for writing on-chain code.
      The Incredible Squaring contracts consists of shadow deployment of Eigenlayer core contracts in goerli that AVSs can use for understanding how off-chain and on-chain code for any AVS can interact with Eigenlayer contracts. It contains the Strategy Manager (used to deposit and withdraw stake and stake accounting), Delegation Manager (used for operator registration and stakers delegating to operators), and experimental_slasher.sol (used for AVS syncing with Eigenlayer state) contracts.
      - We are providing a set of registry contracts that AVS teams can use as their own registry contracts which will help them in saving development effort. Of course, AVS teams are free to write their own registry contracts instead.
  - AVSs must write their off-chain node software for operators to run.
    - AVS can use our [EigenSDK](https://github.com/Layr-Labs/eigensdk-go) for writing off-chain code; the EigenSDK is being openly developed and is a work in progress.
      - The EigenSDK has libraries and templates to help you write your off-chain node software code. It consists of modules for signature aggregation, interacting with EigenLayer contracts, networking, cryptography, and clients for events monitoring. Currently, many of these libraries are still work in progress.
- Risk Analysis
  - AVS must generate a framework for risk parameters: a checklist of potential risk factors and guidelines the node operators must be aware and cautious of.

**Months 6-8: from testnet to mainnet**

- Testing
  - We can invite our partners to test out your AVS test network
- Economics
  - Determine your fee emission structure for stakers and operators
- Auditing
  - Audit with at least 2-3 reputable audit firms
  - Complete risk parameters/evaluation & slashing conditions assessment
- Go live with us and launch on mainnet after having a sufficient period of risk assessment, testing, and simulation!
