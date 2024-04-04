---
sidebar_position: 5
---

# Ejection Due to Non-Signing

EigenDA Operators are responsible for receiving data blobs, securely storing
them, and providing digital signatures for these blobs as requested by the
Disperser. The system has specific consequences if Operators fail to sign the
requested blobs:

1. **Increased Gas Costs:** In the EigenDA network, the gas costs to the
protocol escalate proportionally with the number of Operators who do not sign
the blobs. This means that as more Operators refrain from signing and the longer
they remain non-responsive, the higher the Ethereum (ETH) gas costs become for
the entire network.
2. **Impact on Quorum Liveness:** The reliability of the
quorum is compromised if a significant number of Operators cease signing
operations. This can lead to a failure in processing requests that require a
higher quorum threshold, as there won't be enough signatures to meet the
necessary criteria.

## Manual and Automated Ejection of Non-Compliant Operators

Operators who consistently fail to return signatures to the Disperser will be
subject to removal by the EigenDA team. Initially, this ejection process will be
conducted manually. Over time, however, it will transition to an automated
system, with the protocol itself handling the ejection of Operators who do not
adhere to the required standards of operation.

# Ejection Criteria for EigenDA Operators

Operators with **less than 4% stake**

* Warning Issued: If an operator drops more than 10% of requests within a
  48-hour period.  Ejection Policy: Operators will be ejected if they fail to
  address the issue within 48 hours following the warning.

Operators with a **stake of 4% or more**  

* When _Network Attestation_ Rate is Above 80%\*
  * Warning Issued: If an operator drops more than 10% of requests within a 48-hour period.
  * Ejection Policy: Operators will be ejected if they fail to address the issue within 48 hours following the warning.
* When _Network Attestation_ Rate is Below 80%\*
  * Warning Issued: If an operator drops more than 10% of requests within a 6-hour period.
  * Ejection Policy: Operators will be ejected if they fail to address the issue within 6 hours following the warning.

This structured approach ensures a fair and responsive mechanism for maintaining
network integrity, with different thresholds based on the operator's stake and
the overall network performance. Please note the criteria may change over time.

_\*Percentage of active stake vs. total stake. This will be monitored by how
much stake has signed the last batch._
