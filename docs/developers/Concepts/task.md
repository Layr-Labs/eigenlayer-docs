---
sidebar_position: 4
title: Tasks
---

Tasks are a common design model used for AVS operations. The task design model is not required by the EigenLayer protocol but
is a common mechanism used by AVSs. Use tasks to organize discrete units of work performed by Operators offchain that
are later validated onchain. A Task can be any unit of work written in any language as needed by the AVS.

Tasks can be submitted either:
1) Onchain by the Consumer (end user) to the AVS contracts.
2) Offchain by the Consumer directly to the Operators.