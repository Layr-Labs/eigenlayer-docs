---
sidebar_position: 6
title: AVS Operator Known Risks, Mitigations, and Best Practices
---

# Known AVS Operator Risks
## Malicious AVS 

- Guest container breaking  into host machine:
    - Kernel Exploits: Containers share the same kernel as the host. If there are vulnerabilities in the kernel, a container might exploit them to gain elevated privileges on the host.
    - Escape to Host: There have been vulnerabilities in the past that allowed processes within a container to escape and get access to the host. This is especially dangerous if containers are run with elevated privileges.
    - Inter-container Attacks: If one container is compromised, an attacker might try to move laterally to other containers on the same host.

- Access to host’s network. Because containers run in a home stakers environment, they have access to a home network or a k8s environment.
- Malware in the container or via a supply chain attack or AVS is malicious.



## AVS Implementation and Deployment Bugs

- Running outdated software.
- Misconfigured ports and services open to the internet.
- Running containers with elevated privileges.


