---
title: "[Goerli Testnet] Incident Update: \n EigenDA Blobs Not Retrieving"
slug: goerli-eigenda-retrieving-outatge-feb-2024
tags: [goerli,eigenda]
---

### Investigating [Feb 16, 2024 - 15:00 PT]

- **Incident Context:** We became aware that the Goerli EigenDA network was reporting blobs as confirmed and then later failing to retrieve these blobs. The error messages on retrieval include the string "there is no metadata for batch".
- **Impact:** Testnet rollup sequencers and nodes experience chain halts and are unable to recover without DA backup.
- **Actions:** Our team has declared this as an operational incident internally, and is initiating a thorough investigation to understand the cause of this issue.
