---
title: "Introduction"
sidebar_position: 1
---
 
This is a specification for running AVS Nodes.The current version of the specification is `v0.0.1`.

:::caution
The current version of the AVS Node specification should be considered a public alpha version. Therefore, it may undergo rapid changes and experience incompatibility issues until the first stable version is released.
:::

The description of the Specification is divided into the following sections:

- [AVS Node API](./api/api.mdx): HTTP RESTful API for AVS Nodes.
- [Metrics](./metrics/metrics-prom.md): Prometheus standard metrics for AVS implementations.
- [Plugin](./plugin/intro.mdx): How developers can provide an interface to execute on-time features.



## Definitions

### MUST

When the term "**MUST**" is used in this documentation, it denotes an absolute requirement. Failing to follow a "**MUST**" directive may result in the AVS  not functioning as intended or could lead to undesirable outcomes. It is imperative that operators and AVS developers adhere to any instruction or guideline marked with "**MUST**" to ensure the correct and optimal operation of the AVS.

Example Usage:

- "Operators **MUST** safeguard their keys."
- "The AVS **MUST** be updated to the latest version to access new features."

### SHOULD

The term "**SHOULD**" in this documentation indicates a strong recommendation. While not an absolute requirement like "**MUST**", following a "**SHOULD**" directive is highly advised to achieve the best possible experience or outcome. Ignoring a "**SHOULD**" guideline might not break the AVS, but it could lead to suboptimal results or missed opportunities for enhanced functionality.

Example Usage:

- "Operators **SHOULD** regularly back up their data to prevent potential loss."
- "For optimal performance, you **SHOULD** stick to the AVS hardware requirements."