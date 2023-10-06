---
sidebar_position: 1
---

# EigenLayer Node Classes

EigenLayer is introducing a standardized set of node classes for AVS developers and node operators to use as a coordination tool that will aid in the emergence of an efficient marketplace.

EigenLayer's standardized node classes enable AVS developers to clearly communicate system requirements, reducing complexity in development processes. These classes categorize nodes based on their capabilities, performance characteristics, and other relevant attributes. This standardization means developers can choose a node class that aligns with their application's specific needs without having to delve into the technicalities of each individual node

For node operators, this standardization means supporting fewer system types, streamlining their operations and focusing their resources more effectively. This can be achieved by applying the following strategies:

1. **Adoption of Standardized Node Classes**: By adopting the standardized node classes defined by EigenLayer, node operators can categorize their nodes into these predefined classes. This categorization means they no longer need to support a wide range of custom configurations or unique system types tailored to individual developers' specifications. Instead, they can align their nodes with these standard classes.
2. **Infrastructure Optimization**: Node operators can optimize their infrastructure to efficiently support these standardized classes. This might involve upgrading hardware, tuning software, or adjusting network capacities to align with the specific requirements of each class. By focusing on a limited number of optimized configurations, operators can reduce the complexity and diversity of their systems.
3. **Resource Allocation and Management**: With fewer system types to support, node operators can more effectively allocate and manage their resources. This includes better utilization of computational power, storage, and network bandwidth, as well as more efficient deployment of human resources for maintenance and support tasks.
4. **Training and Skill Development**: Training technical staff to specialize in the standardized node classes can lead to more expert knowledge in specific areas rather than a broader, more general skill set. This specialized knowledge enhances the quality of service and support provided by the operators

Node class specifications encompass the following attributes:

- Number and generation of virtual CPUs
- Quantity of Memory
- Networking Capacity (up/down)
- Specialization (e.g., general purpose, compute-optimized, memory-optimized, etc.)

The storage requirements for each AVS are unbundled from the EigenLayer node classes and must be specified separately by the AVS.

## General Purpose EigenLayer Node classes

| Class                   | vCPUs (10th gen+) | Memory | Networking Capacity |
| ----------------------- | ----------------- | ------ | ------------------- |
| General Purpose - large | 2                 | 8 GB   | 5 Mbps              |
| General Purpose - xl    | 4                 | 16 GB  | 25 Mbps             |
| General Purpose - 4xl   | 16                | 64 GB  | 5 Gbps              |

NOTE: The EigenLayer node class specification will expand over time as we collect more data from AVS developers and operators.
