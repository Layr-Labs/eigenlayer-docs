---
sidebar_position: 2
---

# ECDSA Keypair Authentication Flow

This document provides an low-level description of the authentication protocol for the DisperBlobAuthenticated endpoint on EigenDA Disperser services. An introduction and high-level description of this authentication protocol can be found in [Disperser API Overview](./overview.md). To skip forward to an implementation example, see [server_test.go](https://github.com/Layr-Labs/eigenda/blob/8ec570b8c2b266fad20ea0af14f0f5d84906c39c/disperser/apiserver/server_test.go#L75) from the EigenDA repo.

<!-- TODO update the above link so that it point to the specific relevant heading in overview.md -->

<!-- TODO: Insert request diagram -->

Let's dive into this flow in more detail. First, let's look at the DisperseBlobAuthenticated() endpoint schema, which supports streaming requests and responses:

```proto
service Disperser {
 rpc DisperseBlobAuthenticated(stream AuthenticatedRequest) returns (stream AuthenticatedReply);
    ...
}

message AuthenticatedRequest {
    oneof payload {
        DisperseBlobRequest disperse_request = 1;
        AuthenticationData authentication_data = 2;
    }
}

message AuthenticatedReply {
    oneof payload {
        BlobAuthHeader blob_auth_header = 1;
        DisperseBlobReply disperse_reply = 2;
    }
}

```

1. The client opens a connection to DisperseBlobAuthenticated() endpoint, sending a DisperseBlobRequest message with the Ethereum address they wish to authenticate with as account_id:

```proto
message DisperseBlobRequest {
    bytes data = 1;
    repeated uint32 custom_quorum_numbers = 2;

    // The account ID of the client. This should be a hex-encoded string of the ECSDA public key
    // corresponding to the key used by the client to sign the BlobAuthHeader.
    string account_id = 3;
}
```

2. The server validates this request, sending back a challenge string in the form of a BlobAuthHeader:

```proto
message BlobAuthHeader {
    uint32 challenge_parameter = 1;
}
```

3. The client ECDSA signs the challenge parameter bytes with the private key associated with the Ethereum address they sent in step 1, returning this to the server in an AuthenticationData message:

```proto
message AuthenticationData {
    bytes authentication_data = 1;
}
```

4. The server validates the returned challenge. If the signature of the challenge verifies against the public key of the Ethereum address that was specified in step 1, then the request is granted, and the blob is dispersed. The server returns a DisperseBlobReply conforming to the following schema:

```proto
message DisperseBlobReply {
    BlobStatus result = 1;
    bytes request_id = 2;
}
```
