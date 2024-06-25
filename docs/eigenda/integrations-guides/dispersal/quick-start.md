---
sidebar_position: 1
title: Quick Start
---

# Quick Start: Dispersing Your First Blob to Testnet

## Disperse and Retrieve Blob Examples

**Prerequisites:**

- Open a linux terminal.
- [Install grpccurl for your environment](https://github.com/fullstorydev/grpcurl#installation).
- Download the eigenda repository and change your current working directory. The
included Protobuf definitions will be required:

```
gh repo clone Layr-Labs/eigenda
cd eigenda 
```

**Step 1: Build EigenDA Utils**

The next step requires the `kzgpad` utility, which you can build with the following:

```
make build
```

**Step 2: Store (Disperse) a blob**

Invoke the Disperser/DisperseBlob endpoint.

Example request:

```
# Download the EigenDA repo via gh client or wget
$ gh repo clone Layr-Labs/eigenda
# Change your working directory to the eigenda folder in order to point to the
# protobuf defintions correctly
$ cd eigenda

$ grpcurl \
  -import-path ./api/proto \
  -proto ./api/proto/disperser/disperser.proto \
  -d '{"data": "'$(tools/kzgpad/bin/kzgpad -e hello)'"}' \
  disperser-holesky.eigenda.xyz:443 disperser.Disperser/DisperseBlob
```

**Step 3: Validate the blob was stored in a batch**

Invoke the Disperser/GetBlobStatus service in order to validate the blob was
correctly stored and dispersed to the EigenDA network. The GetBlobStatus service
will return a value via the BlobStatus enumerated type.

Best practice is for users to poll the GetBlobStatus service to monitor status
of the Blobs as needed. Rollups may Polling once every 5-10 seconds to monitor
the status of a blob until it has successfully dispersed on the network with
status of CONFIRMED. Confirmation can take up to a few minutes after the blob
has been initially sent to the disperser, depending on network conditions.

Example request:

```
# Update the value of INSERT_REQUEST_ID with the result of your disperse call
# above

$ grpcurl \
  -import-path ./api/proto \
  -proto ./api/proto/disperser/disperser.proto \
  -d '{"request_id": "INSERT_REQUEST_ID"}' \
  disperser-holesky.eigenda.xyz:443 disperser.Disperser/GetBlobStatus
```

**Step 4: Retrieve a blob**

Option A: invoke the Disperser/RetrieveBlob rpc endpoint. This is a recommended
function for anyone that would like to inspect a stored blob.

Example request:

```

# Note the value for batch_header_hash can be obtained from the result of your
# call to GetBlobStatus via info.blob_verification_proof.batch_metadata.batch_header_hash.

$ grpcurl \
  -import-path ./api/proto \
  -proto ./api/proto/disperser/disperser.proto \
  -d '{"batch_header_hash": "INSERT_VALUE", "blob_index":"INSERT_VALUE"}' \
  disperser-holesky.eigenda.xyz:443 disperser.Disperser/RetrieveBlob | \
  jq -r .data | \
  tools/kzgpad/bin/kzgpad -d -
```

Option B: Retrieve the blob directly from EigenDA nodes. Integrate the
[Retrieval Client](https://github.com/Layr-Labs/eigenda/blob/master/clients/retrieval_client.go)
into your Go binary.

### Null Bytes Padding

When the blob is retrieved it may be appended by a number of null bytes, which
the caller will need to remove. This occurs because the Disperser pads the blob
with null bytes to fit the frame size for encoding.

Once the user decodes the data, the decoded data may have null bytes appended to
the end. [Here is an example](https://github.com/Layr-Labs/eigenda/blob/master/test/integration_test.go#L522)
on how we trim the appended null bytes from recovered data.

## Troubleshooting

If you encounter an error that looks like this:

```bash
ERROR:
  Code: InvalidArgument
  Message: rpc error: code = InvalidArgument desc = encountered an error to convert a 32-bytes into a valid field element, please use the correct format where every 32 bytes(big-endian) is less than 21888242871839275222246405745257275088548364400416034343698204186575808495617
```

This means that you have stumbled upon an idiosyncracy of how EigenDA currently
works. Essentially what this means is that you have tried to disperse a blob
that is not encoded correctly, and that in order to disperse this blob you
should first encode it using `kzgpad`, a utility distributed in the `eigenda`
repo. This error is much more likely to be encountered when playing with EigenDA
using a raw GRPC CLI, since there is no encoding logic built-in. Please see
[Blob Encoding Requirements](./api-documentation/blob-serialization-requirements.md) for more detail.

