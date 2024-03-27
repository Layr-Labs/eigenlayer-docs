---
title: "[Goerli Testnet] Incident Update: \n EigenDA Operator Opt-In Churner function impacted on Goerli testnet"
slug: goerli-eigenda-churner-outage-feb-2024
tags: [goerli,eigenda]
---

### Resolved [Feb 16, 2024 - 18:15 PT]

- This incident has been resolved.

- Additional Support: If you are still encountering issues with opting-in into EigenDA, please share via the [EigenLayer Discord][ref1] #support-operators channel.


### Monitoring [Feb 16, 2024 - 15:30 PT]

- **Actions:** We identified the root cause that resulted in this incident with the Churner service. We have successfully deployed the fixes, and are continuing to monitor the service. We don’t expect operators to face any further issues related to opting-in of EigenDA, and can resume normal operations on Goerli testnet.

- **Additional Support:** If you (EigenLayer operators) are still encountering issues with the EigenDA opt-in functionality, please raise your issue via the [EigenLayer Discord][ref2] #support-operators channel.

### Investigating [Feb 15, 2024 - 15:00 PT]

- **Incident Context:** We became aware of an issue on the Goerli testnet related to the EigenDA Churner that is not available. This incident is confined to the Goerli testnet.
- **Impact:** EigenLayer operators are unable to opt-in to EigenDA on Goerli testnet. Request to the Churner service are failing with a 404 error response. Existing nodes are not impacted.
- **Actions:** Our team declared this as an operational incident internally, and initiated a thorough investigation to understand the cause and impact of the issue.

[ref1]: https://discord.gg/eigenlayer
[ref2]: https://discord.gg/eigenlayer