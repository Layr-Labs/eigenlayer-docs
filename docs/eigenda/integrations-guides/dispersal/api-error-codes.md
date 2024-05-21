---
title: API Error Codes
sidebar_position: 4
---

# EigenDA API Error Codes

There are three categories of response status codes that the EigenDA GRPC API
may return to a requesting client:

1. Success
2. Client Error
3. Server Error

The _Client Error_ category breaks down into 3 subcategories:

1. Invalid Request
2. Rate Limited
3. Not Found

This table summarizes all the current status codes and their mappings to HTTP codes.

| Status      | gRPC Error Code               | HTTP Error Code            | Use cases                                             |
|-------------|----------------------|--------------------|-------------------------------------------------------|
| OK          | `OK`                   | `200` OK             | Applicable to all                                    |
| Invalid Request | `InvalidArgument` | `400` Bad Request    | Applicable to all                                    |  
| Too Many Requests | `ResourceExhausted` | `429` Too Many Requests | For Disperser and Churner rate limiting          |
| Not Found   | `NotFound`            | `404` Not Found      | For GetBlobStatus and RetrieveBlob                   |
| Internal Error | `Internal`          | `500` Internal Server Error | Applicable to all                            |

## API endpoints error reference

#### Disperser.DisperseBlobAuthenticated() and Disperser.DisperseBlob()

| Error String                                                                                          | Status Code            | Description                                                                                                                 |
|-------------------------------------------------------------------------------------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| "error receiving next message: %v"                                                                   | InvalidArgument (400)  | This error occurs when there is an issue receiving the next message from the gRPC stream.                                   |
| "missing DisperseBlobRequest"                                                                        | InvalidArgument (400)  | This error occurs when the `DisperseRequest` field is missing from the `AuthenticatedRequest` message.                      |
| "failed to decode public key (%v): %v"                                                               | InvalidArgument (400)  | This error occurs when there is an issue decoding the public key from the `AccountID` field of the `BlobAuthHeader`.        |
| "context deadline exceeded"                                                                          | InvalidArgument (400)  | This error occurs when the context deadline is exceeded while waiting for the next message from the gRPC stream.            |
| "expected AuthenticationData"                                                                        | InvalidArgument (400)  | This error occurs when the `AuthenticationData` field is missing from the `AuthenticatedRequest` message.                  |
| "failed to authenticate blob request: %v"                                                            | InvalidArgument (400)  | This error occurs when there is an issue authenticating the blob request using the provided authentication data.            |
| "blob size cannot exceed 2 MiB"                                                                      | InvalidArgument (400)  | This error occurs when the size of the blob data exceeds the maximum allowed size of 2 MiB.                                 |
| "blob size must be greater than 0"                                                                   | InvalidArgument (400)  | This error occurs when the size of the blob data is zero.                                                                   |
| "number of custom_quorum_numbers must not exceed 256"                                                | InvalidArgument (400)  | This error occurs when the number of custom quorum numbers provided in the request exceeds 256.                             |
| "number of custom_quorum_numbers must not exceed number of quorums"                                  | InvalidArgument (400)  | This error occurs when the number of custom quorum numbers provided in the request exceeds the total number of quorums.     |
| "custom_quorum_numbers must be in range [0, 254], but found %d"                                      | InvalidArgument (400)  | This error occurs when a custom quorum number is outside the valid range of [0, 254].                                       |
| "custom_quorum_numbers must be in range [0, \<quorum count>], but found %d"                          | InvalidArgument (400)  | This error occurs when a custom quorum number is outside the valid range of [0, QuorumCount-1].                             |
| "custom_quorum_numbers must not contain duplicates"                                                  | InvalidArgument (400)  | This error occurs when the custom quorum numbers contain duplicate values.                                                  |
| "custom_quorum_numbers should not include the required quorums %v, but required quorum %d was found" | InvalidArgument (400)  | This error occurs when a custom quorum number includes a required quorum number.                                            |
| "the blob must be sent to at least one quorum"                                                       | InvalidArgument (400)  | This error occurs when no quorums are specified for the blob dispersal.                                                     |
| "invalid request: %w"                                                                                | InvalidArgument (400)  | This error occurs when the request contains invalid parameters, such as invalid security parameters.                        |
| "encountered an error to convert a 32-bytes into a valid field element, please use the correct format where every 32bytes(big-endian) is less than 21888242871839275222246405745257275088548364400416034343698204186575808495617" | InvalidArgument (400) | This error occurs when the blob has not been encoded correctly. See [blob encoding](../dispersal/blob-serialization-requirements.md). |
| "request ratelimited: \<rate type> for quorum %d"                                                    | ResourceExhausted (429)| This error occurs when the request is rate limited for the specified quorum based on the configured rate limits.            |

#### Disperser.GetBlobStatus()

| Error String                                   | Status Code            | Description                                                                                                      |
|------------------------------------------------|------------------------|------------------------------------------------------------------------------------------------------------------|
| "request_id must not be empty"                 | InvalidArgument (400)  | This error occurs when the `request_id` field is empty in the `BlobStatusRequest` message.                       |
| "failed to parse the requestID: %s"            | InvalidArgument (400)  | This error occurs when there is an issue parsing the `request_id` field into a valid `BlobKey`.                  |
| "failed to get blob metadata, blobkey: %s"     | Internal (500)         | This error occurs when there is an issue retrieving the blob metadata for the specified `BlobKey`.               |
| "missing confirmation information: %s"         | Internal (500)         | This error occurs when the confirmation information is missing from the blob metadata.                           |

#### Disperser.RetrieveBlob()

| Error String                                  | Status Code                | Description                                                                                                                |
|-----------------------------------------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------- |
| "ratelimiter error: %v"                       | Internal (500)             | This error occurs when there is an issue with the rate limiter, such as an internal error.                                 |
| "request ratelimited"                         | ResourceExhausted (429)    | This error occurs when the request is rate limited based on the configured rate limits.                                    |
| "Failed to retrieve blob metadata"            | Internal (500)             | This error occurs when there is an issue retrieving the blob metadata for the specified batch header hash and blob index.  |
| "failed to get blob data, please retry"       | Internal (500)             | This error occurs when there is an issue retrieving the blob data from the blob store.                                     |

#### Churner.Churn()

| Error String                                                                                                                                                                                          | Status Code            | Description                                                                                                                                                 |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| "invalid request: %s"                                                                                                                                                                                 | InvalidArgument (400)  | This error occurs when the churn request is invalid due to various reasons such as invalid signature length, invalid pubkey lengths, or invalid salt length. |
| "previous approval not expired, retry in %d"                                                                                                                                                          | ResourceExhausted (429)| This error occurs when the previous churn approval has not expired yet and the retry time is provided.                                                       |
| "failed to verify request signature: %s"                                                                                                                                                              | InvalidArgument (400)  | This error occurs when the request signature verification fails.                                                                                            |
| "rate limiter error: %s"                                                                                                                                                                              | ResourceExhausted (429)| This error occurs when the rate limit for the operator is exceeded.                                                                                         |
| "invalid signature length"                                                                                                                                                                            | InvalidArgument (400)  | This error occurs when the signature length in the request is invalid.                                                                                      |
| "invalid operatorToRegisterPubkeyG1 length"                                                                                                                                                           | InvalidArgument (400)  | This error occurs when the operatorToRegisterPubkeyG1 length in the request is invalid.                                                                     |
| "invalid operatorToRegisterPubkeyG2 length"                                                                                                                                                           | InvalidArgument (400)  | This error occurs when the operatorToRegisterPubkeyG2 length in the request is invalid.                                                                     |
| "invalid salt length"                                                                                                                                                                                 | InvalidArgument (400)  | This error occurs when the salt length in the request is invalid.                                                                                           |
| "invalid quorumIds length %d"                                                                                                                                                                         | InvalidArgument (400)  | This error occurs when the quorumIds length in the request is invalid.                                                                                      |
| "invalid request: security_params must not contain duplicate quorum_id"                                                                                                                               | InvalidArgument (400)  | This error occurs when the quorumIds in the request contain duplicate values.                                                                               |
| "invalid request: the quorum_id must be in range [0, %d], but found %d"                                                                                                                               | InvalidArgument (400)  | This error occurs when the quorumId in the request is outside the valid range.                                                                              |
| "operatorToRegisterPubkeyG1 and operatorToRegisterPubkeyG2 are not equivalent"                                                                                                                         | InvalidArgument (400)  | This error occurs when the operatorToRegisterPubkeyG1 and operatorToRegisterPubkeyG2 are not equivalent during signature verification.                      |
| "operatorRequestSignature is invalid"                                                                                                                                                                 | InvalidArgument (400)  | This error occurs when the operatorRequestSignature is invalid during signature verification.                                                               |
| "operator is already registered in quorum"                                                                                                                                                            | InvalidArgument (400)  | This error occurs when the operator is already registered in the specified quorum.                                                                          |
| "registering operator must have %f%% more than the stake of the lowest-stake operator. Block number used for this decision: %d, registering operator address: %s, registering operator stake: %d, stake of lowest-stake operator: %d, operatorId of lowest-stake operator: %x, quorum ID: %d" | InvalidArgument (400)  | This error occurs when the registering operator does not have sufficient stake compared to the lowest-stake operator to churn it out.                        |
| "operator to churn out must have less than %f%% of the total stake. Block number used for this decision: %d, operatorId of the operator to churn: %x, stake of the operator to churn: %d, total stake in quorum: %d, quorum ID: %d" | InvalidArgument (400)  | This error occurs when the operator to be churned out has more than the allowed percentage of the total stake in the quorum.                                |
| "operatorID Rate Limit Exceeded: %d"                                                                                                                                                                   | ResourceExhausted (429)| This error occurs when the rate limit for a specific operatorID is exceeded.                                                                                |
