---
sidebar_position: 1
---

# Dispersing your first blob

Rollup developers must plan for at least two points of integration with EigenDA: offchain
integration with their sequencer and onchain integration with their rollup smart
contracts. The offchain integration involves a series of RPC calls to the
EigenDA disperser as part of the transaction batching process. The onchain
integration involves a smart contract function call to verify the blob was
stored in the EigenDA network, as well as updates to how.

These instructions are built to interact with the live EigenDA testnet. For
developers who wish to operate a local network for testing and debugging, please
see the instructions in the [EigenDA inabox tests
here](https://github.com/Layr-Labs/eigenda/tree/master/inabox).

## Off-Chain: Configure Your Sequencer Backend Service

EigenDA is built as a [gRPC service](https://grpc.io/). There are
many available clients you may use for your integration. For the following
examples we leverage [grpcurl](https://github.com/fullstorydev/grpcurl), however
please see [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc#tools)
for a complete list to choose the best client for your project.

Please find the complete EigenDA API documentation in the [EigenDA github repo
here](https://github.com/Layr-Labs/eigenda/tree/master/api/docs).

### Disperse and Retrieve Blob Examples

**Prerequisites:**

- Open a linux terminal.
- [Install grpccurl for your environment](https://github.com/fullstorydev/grpcurl#installation).
- Download the eigenda repository and change your current working directory. The
included Protobuf definitions will be required:

``` 
gh repo clone Layr-Labs/eigenda
cd eigenda 
```

**Step 1: Store (Disperse) a blob**

Invoke the Disperser/DisperseBlob endpoint.

Example request:

```
# Download the EigenDA repo via gh client or wget
$ gh repo clone Layr-Labs/eigenda
# Change your working directory to the eigenda folder in order to point to the
# protobuf defintions correctly
$ cd eigenda

$ grpcurl -import-path ./api/proto -proto ./api/proto/disperser/disperser.proto -d '{"data": "0000"}' disperser-holesky.eigenda.xyz:443 disperser.Disperser/DisperseBlob
```

**Step 2: Validate the blob was stored in a batch**

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

$ grpcurl -import-path ./api/proto -proto ./api/proto/disperser/disperser.proto -d '{"request_id": "INSERT_REQUEST_ID"}' disperser-holesky.eigenda.xyz:443 disperser.Disperser/GetBlobStatus
```

**Step 3: Retrieve a blob**

Option A: invoke the Disperser/RetrieveBlob rpc endpoint. This is a recommended
function for anyone that would like to inspect a stored blob.

Example request:

```

# Note the value for batch_header_hash can be obtained from the result of your
# call to GetBlobStatus via info.blob_verification_proof.batch_metadata.batch_header_hash.

$ grpcurl -import-path ./api/proto -proto ./api/proto/disperser/disperser.proto -d '{"batch_header_hash": "INSERT_VALUE", "blob_index":"INSERT_VALUE"}' disperser-holesky.eigenda.xyz:443 disperser.Disperser/RetrieveBlob
```

Option B: Retrieve the blob directly from EigenDA nodes. Integrate the
[Retrieval
Client](https://github.com/Layr-Labs/eigenda/blob/master/clients/retrieval_client.go)
into your Go binary.

### Null Bytes Padding

When the blob is retrieved it may be appended by a number of null bytes, which
the caller will need to remove. This occurs because the Disperser pads the blob
with null bytes to fit the frame size for encoding.

Once the user decodes the data, the decoded data may have null bytes appended to
the end. [Here is an example](https://github.com/Layr-Labs/eigenda/blob/master/test/integration_test.go#L522)
on how we trim the appended null bytes from recovered data.

## On-Chain: Configure Your Sequencer Smart Contracts

Data Availability is a requirement for both for ZK and Optimistic rollups
([source](http://datalayr-docs.s3-website-us-east-1.amazonaws.com/build/rollups/)):

- In both optimistic rollups and ZK-rollups, if transaction data is not
available, then participants in the rollup will be unable to reconstruct the
rollup state so as to bridge out their assets if desired.  - In optimistic
rollups, if transaction data is not available, challengers are unable to check
the sequencer’s state commitment and create fraud proofs when applicable.

**Verifying Blob Availability On Chain**

verifyBlob() is the primary function that needs to be invoked by the rollup
smart contracts. This function will take the blobHeader and
blobVerificationProof as inputs and execute a series of checks to ensure the
blob was signed for and stored properly in the EigenDA network.

Each rollup can determine how often they will invoke this function and under
which conditions. This may be invoked via the sequencer, validator or other
component in the rollup architecture.

1. Import the
[EigenDABlobUtils.sol](https://github.com/Layr-Labs/eigenda/blob/master/contracts/src/libraries/EigenDABlobUtils.sol)
file to your rollup’s source code repository.
2. Add the library to your rollup smart contract.
3. Invoke the verifyBlob() function

On-chain applications will receive the blob header and blob verification proof
via the Rollup sequencer. This proof is returned during the confirmation phase
when the blob is first written. It is the responsibility of the rollup sequencer
to post a blob key extracted from this metadata on-chain, so that it might be
verified to be available during a fault proof challenge.

**Fraud Proving (Optional)**

If a rollup wishes to implement their own fraud proof with EigenDA, we have
provided an example via the
[EigenDAKZGUtils.openCommitment()](https://github.com/Layr-Labs/eigenda/blob/master/contracts/src/libraries/EigenDAKZGUtils.sol)
function. Opening a commitment is the way to prove to the light client for the
rollup (perhaps the rollup bridge smart contract) that a certain state
transition is incorrect. It reveals the underlying data of the polynomial.

Per
[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844#how-rollups-would-function):

“The fraud proof can verify the transition in smaller steps, loading at most a
few values of the blob at a time through calldata. For each value it would
provide a KZG proof and use the point evaluation precompile to verify the value
against the versioned hash that was submitted before, and then perform the fraud
proof verification on that data as is done today.”
