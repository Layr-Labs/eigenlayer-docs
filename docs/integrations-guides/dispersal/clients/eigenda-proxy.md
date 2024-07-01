# EigenDA Proxy

The [EigenDA Proxy](https://github.com/Layr-Labs/eigenda-proxy) wraps the [high-level EigenDA client](https://github.com/Layr-Labs/eigenda/blob/master/api/clients/eigenda_client.go) with an HTTP server, and performs additional verification tasks when reading and writing blobs that eliminate any trust assumption on the EigenDA disperser service. Instructions for building and running the EigenDA Proxy can be found [here](https://github.com/Layr-Labs/eigenda-proxy/blob/main/README.md).

### Security Features

When writing to EigenDA, the proxy verifies that the BN254 KZG commitment of the data matches the commitment that the EigenDA Disperser dispersed, ensuring that the Disperser hasn't tampered with the data during dispersal. The proxy also verifies the DA certificate returned by the disperser upon successful dispersal. It does this by checking that the batch was successfully dispersed, i.e. that the aggregated batch signature was written to the EigenDAServiceManager contract on Ethereum, that the signature was valid, and that the blob appears within the batch merkle tree.

When reading from EigenDA, the proxy does something similar. After retrieving a blob from the disperser, it recomputes the blob's KZG commitment and verifies that it matches the expected commitment in the DA certificate. This ensures that the sequencer could never read incorrect data from EigenDA, and avoids a trust assumption on the EigenDA disperser.
