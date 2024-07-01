---
title: "Goerli Testnet Retrieval Incident"
slug: goerli-eigenda-retrieving-outatge-feb-2024
tags: [goerli,eigenda]
---

### Resolved [Feb 19, 2024 - 15:00 PT]

- This incident has been resolved.

- Additional Support: If you are still encountering issues relating to EigenDA blob retrieval, please share via the [EigenLayer Discord](https://discord.gg/eigenlayer) #support-eigenda channel.

### Monitoring [Feb 19, 2024 - 15:00 PT]

- **Actions:** We identified the root cause of the issue as a race condition in the disperser that caused blobs to be encoded twice, resulting in the blob's dispersal metadata changing between one call to GetBlobStatus() and the next. We have successfully deployed [a fix](https://github.com/Layr-Labs/eigenda/pull/262) to testnet, and we are continuing to monitor the service. We don’t expect rollup operators to face any further issues relating to this, but testnet rollup operators may need to redeploy their Goerli chains with a new genesis in order to continue producing blocks.

### Investigating [Feb 16, 2024 - 15:00 PT]

- **Incident Context:** We became aware that the Goerli EigenDA network was reporting blobs as confirmed and then later failing to retrieve these blobs. The error messages on retrieval include the string "there is no metadata for batch".
- **Impact:** Testnet rollup sequencers and nodes experience chain halts and are unable to recover without DA backup.
- **Actions:** Our team has declared this as an operational incident internally, and is initiating a thorough investigation to understand the cause of this issue.
