---
title: API Status Codes
---

# Status Codes for EigenDA API Endpoints

There are three categories of response status codes that the EigenDA Disperser GRPC API
may return to a requesting client:

1. **Success**
2. **Client Error**
3. **Server Error**

## Client Errors

The _Client Error_ category captures three important cases:

1. `INVALID_REQUEST`
2. `RATE_LIMITED`  
3. Result not found

The reason is because they (rate limiting and result not found) tie to and are
key parts of the dispersal and retrieval, which are the core UX of EigenDA.

This results in the following status codes:

| Status      | gRPC                 | HTTP               | Use cases                                             |
|-------------|----------------------|--------------------|-------------------------------------------------------|
| OK          | `OK`                   | `200` OK             | Applicable to all                                    |
| `INVALID_REQUEST` | `INVALID_ARGUMENT` | `400` Bad Request    | Applicable to all                                    |  
| Too Many Requests | `RESOURCE_EXHAUSTED` | `429` Too Many Requests | For Disperser and Churner rate limiting          |
| Not Found   | `NOT_FOUND`            | `404` Not Found      | For GetBlobStatus and RetrieveBlob                   |
| `INTERNAL_ERROR` | `INTERNAL`          | `500` Internal Server Error | Applicable to all                            |

## API endpoint availability

We already have agreement in [EigenDA Availability: Definitions and Goals](link) to define
availability on request success rate. Here we are basically further nailing down:

```
API availability
= 1 - ServerError / TotalRequests  
= 1 - ServerError / (OK + ClientError + ServerError)
= (OK + ClientError) / (OK + ClientError + ServerError)
```

Which means:

```
API availability
= 1 - INTERNAL / (OK + INVALID_ARGUMENT + RESOURCE_EXHAUSTED + NOT_FOUND + INTERNAL)
= (OK + INVALID_ARGUMENT + RESOURCE_EXHAUSTED + NOT_FOUND) / (OK + INVALID_ARGUMENT + RESOURCE_EXHAUSTED + NOT_FOUND + INTERNAL)
```

This matches industry practices like how AWS accounts its availability (e.g. [https://aws.amazon.com/s3/sla/](https://aws.amazon.com/s3/sla/)).

Note:

- This will produce a higher availability number than option 1 for the same
server.
- This will count the requests with client-side error as "success": this means
invalid requests or bogus requests may "inflate" the availability number.

## Implementation Note

<!-- In either case, we need to make the metrics at each endpoint to track each
distinct error code in the responses and attach one of the category labels:
SUCCESS, CLIENT_ERROR (4xx), `INTERNAL_ERROR` (5xx) , so we can create monitoring
and alerts on Grafana. -->

## Applying to API endpoints

### Disperser.DisperseBlob

- `INVALID_REQUEST`
  - Invalid len of security params  
  - Invalid quorumID
  - Invalid len of blob size
  - Invalid RequestHeader (the values of security/quorum threshold)
  - Invalid IP header
  - Issue: may have `INTERNAL_ERROR` while validating request
    - It queries ethnode for onchain information (quorum count) when validating
    the requests, so it can fail because it cannot fetch onchain info
- `RATE_LIMITED`  
- `INTERNAL_ERROR`
  - Failed to store blob

### Disperser.GetBlobStatus

- `INVALID_REQUEST`
  - Missing requestID
  - Cannot parse requestID
- `INTERNAL_ERROR`  
  - Failed to get blob metadata
  - The blob is confirmed but missing confirmation info (internal invariant
  violation)

### Disperser.RetrieveBlob

- `INVALID_REQUEST`
- Not found
  - The requested blob not found from system
- `INTERNAL_ERROR`
  - Failed to get blob metadata
    - Issues: this can be NOT FOUND (which isn't `INTERNAL_ERROR`), or it actually
    fails internally
  - Failed to get blob content

### Churner.Churn

- `INVALID_REQUEST`
- `RATE_LIMITED`
  - Global
  - Per operator
- `AUTH_FAILED` (Invalid signature)
  - Accounted as `INVALID_ARGUMENT`
- `PRECONDITION_FAILED`
  - QuorumID already registered
    - `INVALID_ARGUMENT`
- `INTERNAL_ERROR`
  - Failed to get quorum bitmap
  - Failed to get current block number  
  - Failed to get operator stakes
  - Failed to sign
