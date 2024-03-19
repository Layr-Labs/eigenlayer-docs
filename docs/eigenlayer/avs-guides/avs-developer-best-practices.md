---
sidebar_position: 6
title: AVS Developer Best Practices
---

## AVS Developer Best Practices

Note that these best practices should be considered by operators when they’re considering running the AVS software. EigenLabs will not do any checking or scanning of on chain or off chain software.

- Containers should be able to run with least privilege. Least privilege is AVS-dependent. AVS team should outline these privileges as part of the operator onboarding docs. In the case these privileges are not specified, it’s recommended the operators ask the AVS team directly.
- Emit runtime (logs) including security events
- Use Minimal Base Images
    - Use [ko Go containers](https://ko.build/) or similar to build distroless minimal images. This reduces the attack surface significantly!
- Release updated images with security patches  (for base OS etc ).
- Do not store key material on the container (refer to key management docs).
- Your default user id should start with AVS-NAME-randomness to ensure there are no conflicts with the host.
- Ensure ECDSA keys utilized by AVS are solely for updates, such as modifying IP and port details within a smart contract. These keys should not hold funds. A role-based approach in smart contract design can address this issue effectively.
- AVS team should [sign their images](https://docs.docker.com/engine/security/trust/) for any releases, including upgrades
    - If they publish to Docker, Docker will show the verified badge next to the image.
    - Tag new releases via updated images.
- Establish comms channels (Discord, TG)  with operators. This ensures coordinating upgrades occurs with minimal friction.
- Operators should be in control of upgrades to their AVS software. Avoid software upgrade patterns where an agent checks for updated software and automatically upgrades the software. 
- Release Notes should explain new features including breaking changes / new hardware requirements etc.



## Suggested Key Management for AVSs
For key management, refer to the new location for the docs on [Key Security Considerations for Developers](todo insert link).