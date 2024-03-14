---
sidebar_position: 3
---

# First Steps Towards Designing an AVS

Suppose, as a builder, you have thought about a primitive or a feature such as decentralized sequencing, Data availability, or something else cool that you want to see be built as an AVS on EigenLayer. Now, the immediate question is how to start thinking about building that AVS on EigenLayer. As a first step, the first four questions that you should try to answer are:

1. What defines a Task in your AVS? An AVSs operation on EigenLayer can be broken down into units called “Task.” Informally, each “Task” describes the smallest unit of work that is to be done by the currently opted-in operators as per the AVSs distributed validation semantics. Defining the task would get you to think about what is the work that needs to be done by any operator who is opting into your AVS.
2. What kind of trust does your AVS want to inherit? Answering this question would push you to think about what kind of operators you would want to permit to opt in to participate in your AVS. For example, if your AVS only wants decentralized trust, then you can specify that only geographically diverse home stakers (certified by subjective oracles) can opt into your AVS. You can also read this [blog](https://www.blog.eigenlayer.xyz/the-three-dimensions-of-programmable-trust/) to determine the type of trust you want to inherit.
3. Is the work to be done by the operator lightweight or heavyweight? If the trust or the combination of trust that your AVS wants to programmatically inherit from Ethereum via EigenLayer includes a decentralized trust or Ethereum validator trust, then you might want to ensure that the work that any operator must do is lightweight. This is necessary for your AVS to be able to recruit as big of a decentralized operator set as possible or to not impose centralization risk on Ethereum validator set.
4. What are the slashing conditions? If your AVS features slashing, clearly stating the task responses that would make an operator be considered in violation of AVSs validation semantics is essential.

Once you have a good understanding of how EigenLayer works and where your protocol comes in please, please fill in our [AVS Questionnaire](https://bit.ly/avsquestions) and get in touch with us for any further questions.
