---
sidebar_position: 3
title: Implement Security Best Practices
---

# Operator Security Risks

## Malicious AVS 

- Guest container breaking  into host machine:
    - Kernel Exploits: Containers share the same kernel as the host. If there are vulnerabilities in the kernel, a container might exploit them to gain elevated privileges on the host.
    - Escape to Host: There have been vulnerabilities in the past that allowed processes within a container to escape and get access to the host. This is especially dangerous if containers are run with elevated privileges.
    - Inter-container Attacks: If one container is compromised, an attacker might try to move laterally to other containers on the same host.

- Access to the host’s network. Because containers run in a home stakers environment, they have access to a home network or a k8s environment.
- Malware in the container or via a supply chain attack or AVS is malicious.



## AVS Implementation and Deployment Bugs

- Running outdated software.
- Misconfigured ports and services open to the internet.
- Running containers with elevated privileges.


# What can operators do to mitigate malicious AVS risks?
## Operator Best Practices

- Regularly update and patch containers and the host system.
- Don't share your keys between AVSs / ETH validator. Refer to key management section.
- Monitor container runtime (logs) behavior for any suspicious activities and setup alerts as relevant.
- Do not run containers with privileged flag.It can give them almost unrestricted access to the host.
- Limit Resources to a container so it doesn’t take down the cluster / node
- Data Theft: Do not mount entire volumes into containers to prevent data leak, container escapes etc.
- Follow Network Access / Least privilege principles in your organization to reduce attack surface

## Infrastructure

General
- Only allow Network traffic to ports / from whitelisted ip's required by the AVS.
- Do not expose critical services like ssh to the internet.
- Configure your firewall with a DENY ALL approach and explicitly allow traffic that is required.
  
Docker Infra
- Network Segmentation: Use Docker's network policies to segment containers  and limit inter-container communication.
- Regular Audits: audit and monitor container activities using tools like - Docker Bench for Security or Clair.
- Isolation
    - Through VMs: lightweight VMs (like Kata Containers or gVisor) combine container - flexibility with VM isolation.
    - User namespaces, seccomp, AppArmor, and SELinux etc can help further restrict the container.

K8’s Infra
- Network Segmentation: Limit the services your AVSs can talk to. Follow least privilege principles via [Kubernetes Documentation Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

Incident Response Plan: 
- Have a plan in place for how to respond if a container is compromised. This includes isolating affected containers, analyzing, and restoring services.
- Regular Backups: Regularly backup your data and configurations to recover from any malicious changes.
- Stay Updated: Always keep an eye on Docker's official documentation, security advisories, and community forums for the latest best practices and updates.







