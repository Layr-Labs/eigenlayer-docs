


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

EigenDA is built as a [gRPC service](https://grpc.io/). There are
many available clients you may use for your integration. For the following
examples we leverage [grpcurl](https://github.com/fullstorydev/grpcurl), however
please see [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc#tools)
for a complete list to choose the best client for your project.

## On-Chain: Configure Your Sequencer Smart Contracts

Data Availability is a requirement for both ZK and Optimistic rollups
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
[EigenDARollupUtils.sol](https://github.com/Layr-Labs/eigenda/blob/master/contracts/src/libraries/EigenDARollupUtils.sol)
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
[EigenDARollupUtils.openCommitment()](https://github.com/Layr-Labs/eigenda/blob/b52bdcba0de3606e900d2ca86dfd46189576a482/contracts/src/libraries/EigenDARollupUtils.sol#L123)
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
