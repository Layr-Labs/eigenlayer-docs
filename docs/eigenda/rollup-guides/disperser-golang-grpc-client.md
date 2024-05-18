# Disperser Client Tutorial

EigenDA offers a low-level golang client which wraps the bottom-level GRPC client with ECDSA keypair authentication logic. That client is available in the EigenDA repo in [disperser_client.go](https://github.com/Layr-Labs/eigenda/blame/5ff66ae6a15d77956a878fe4d2d02751444c9fa9/clients/disperser_client.go#L49). This is a tutorial for getting started using this client.

Dependencies:

* Golang must be installed on your machine. You can install [golang here](https://go.dev/doc/install).

First let's start by setting up a project directory:

```
mkdir ~/Workspace/eigenda-dispersal-program
cd ~/Workspace/eigenda-dispsersal-program
```

Next let's define our project. Take some time to read through main.go, understanding each line and its corresponding comment.

```text
# go.mod
module github.com/foobar/low-level-disperser-client-example

go 1.21.1

require (
 github.com/Layr-Labs/eigenda v0.7.1
 github.com/Layr-Labs/eigenda/api v0.7.1
 google.golang.org/protobuf v1.33.0
)
```

```go
# main.go
package main

import (
 "context"
 "fmt"
 "time"

 disperser_rpc "github.com/Layr-Labs/eigenda/api/grpc/disperser"
 "github.com/Layr-Labs/eigenda/clients"
 "github.com/Layr-Labs/eigenda/core/auth"
 "github.com/Layr-Labs/eigenda/disperser"
 "github.com/Layr-Labs/eigenda/encoding/utils/codec"
 "google.golang.org/protobuf/encoding/protojson"
 "google.golang.org/protobuf/proto"
)

func main() {
 // Configuration for the disperser client
 config := clients.NewConfig(
  "disperser-holesky.eigenda.xyz",
  "443",
  time.Second*10, // request timeout
  true,           // useSecureGrpcFlag, should be set to true unless running against a local disperser for testing
 )

  // Retrieve authentication with private key
 eigendaAuthKey, ok := os.LookupEnv("EIGENDA_AUTH_PK")
 if !ok {
  fmt.Printf("No EIGENDA_AUTH_PK env var set")
  return
 }

 // Set up authentication with private key
 signer := auth.NewSigner(eigendaAuthKey)

 // Create the disperser client
 client := clients.NewDisperserClient(config, signer)

 // Context with timeout
 ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
 defer cancel()

 // Data to be dispersed (example data)
 data := []byte("example data to disperse")

 // encode data to be compatible with bn254 field element constraints
 data = codec.ConvertByPaddingEmptyByte(data)

 // Custom quorums (none for now, means we're dispersing to the default quorums)
 quorums := []uint8{}

 // Disperse the blob
 blobStatus, requestID, err := client.DisperseBlob(ctx, data, quorums)
 if err != nil || *blobStatus == disperser.Failed {
  fmt.Printf("Error dispersing blob: %v\n", err)
  return
 }

 // Print the initial result
 fmt.Printf("Initial Blob Status: %+v\n", blobStatus)
 fmt.Printf("Request ID: %s\n", string(requestID))

 // Create a new context for each status request
 statusOverallCtx, statusOverallCancel := context.WithTimeout(context.Background(), time.Minute*30)
 defer statusOverallCancel()

 ticker := time.NewTicker(time.Second * 5)

 // Poll GetBlobStatus until the status is done
 for {
  select {
  case <-ticker.C:
   // Create a new context for each status request
   statusCtx, statusCancel := context.WithTimeout(statusOverallCtx, time.Second*5)
   defer statusCancel()

   // Get the blob status
   statusReply, err := client.GetBlobStatus(statusCtx, requestID)
   if err != nil {
    fmt.Printf("Error getting blob status: %v\n", err)
    return
   }

   // Check if the status is done
   if statusReply.Status == disperser_rpc.BlobStatus_FINALIZED {
    fmt.Printf("Blob Status is finalized: %s\n", pprint(statusReply))
    return
   } else if statusReply.Status == disperser_rpc.BlobStatus_FAILED {
    fmt.Printf("Error dispersing blob: %v\n", statusReply.Status)
    return
   } else {
    fmt.Printf("Current Blob Status: %s\n", pprint(statusReply))
   }
  case <-statusOverallCtx.Done():
   fmt.Printf("Timed out waiting for blob to finalize\n")
   return
  }
 }
}

func pprint(m proto.Message) string {
 marshaler := protojson.MarshalOptions{
  Multiline: true,
  Indent:    "  ",
 }
 jsonBytes, err := marshaler.Marshal(m)
 if err != nil {
  panic("Failed to marshal proto to JSON")
 }
 return string(jsonBytes)
}
```

Finally, let's install our dependencies:

```bash
go mod tidy
```

If you run this you should see logs like these:

```bash
$ go run main.go
Initial Blob Status: Processing
Request ID: f9c979e84c19929dcdfc0c4f7ba65dc3ab47276e6d910480ed2d84ccbd4b8a3d-313731353939303238353532353837363539382f302f33332f312f33332fe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Current Blob Status: {
  "status":  "PROCESSING",
  "info":  {}
}

<many logs later, within 12 minutes>

Current Blob Status: {
  "status":  "CONFIRMED",
  "info":  {
    "blobHeader":  {
      "commitment":  {
        "x":  "EBXIwkZ7nXChaRx2Nz+SZyU/rX3WvZnLGeKpCW32OWs=",
        "y":  "LoTp8Bqz7pyhptnRBT5o01GAbPGXB52Ll+X+Pw+ibeg="
      },
      "dataLength":  1,
      "blobQuorumParams":  [
        {
          "adversaryThresholdPercentage":  33,
          "confirmationThresholdPercentage":  55,
          "chunkLength":  1
        },
        {
          "quorumNumber":  1,
          "adversaryThresholdPercentage":  33,
          "confirmationThresholdPercentage":  55,
          "chunkLength":  1
        }
      ]
    },
    "blobVerificationProof":  {
      "batchId":  15219,
      "blobIndex":  687,
      "batchMetadata":  {
        "batchHeader":  {
          "batchRoot":  "+yFLC9HFHJxkBixjGdFGv0psPC6R0DNynhowYgUvjtE=",
          "quorumNumbers":  "AAE=",
          "quorumSignedPercentages":  "VU4=",
          "referenceBlockNumber":  1564355
        },
        "signatoryRecordHash":  "HG1kkSIGjTOX2kFexdGnuAj7zDJaat0XQQavHjjXdPs=",
        "fee":  "AA==",
        "confirmationBlockNumber":  1564476,
        "batchHeaderHash":  "d1KhHvr0lhNCYiizYS5+v/2QWvSTsm7MeACChYDRli0="
      },
      "inclusionProof":  "3DDZAQV1jdb4Eb3pLAAVqAq69EMrmGMfwfcW9jQwShN8O4oqv7041DVjM09LARNO4VX1WUoVrSdXQ5ZXpaKKL7iREgnhNrHydYXfmJuGiS7dtxQubTDQ2O5bYTckzt/LZakvNf5hz87vEQdvHcYh2wpBugaX6/kgY/8OGiHLwocIXXwC5upaU92WSxFkHmd31xq7nAwDM5N8s7R9ktWBTbBGVFTtmTcctapohz551bskMoV79w28ie4Tc6NcdS5S9z1hR6tW9IGoHqeifynPjdvRaq51T/jnJWSC6gixbO6DOcw2qIU0+jhZsu6/ucHIwzxBQtvmp+7dLBthC7dZYllIOsc2nyTmUfp2mKXjP5vPEhbX+FLIMwagi3lGOI9zUdG/RYIpKxEIVoO5ffStDMotX4ZCgGZyQiTYR0maags/yc/ID27M8YVyu54nAAAyG89TpmqvVofJ1ove863ufA==",
      "quorumIndexes":  "AAE="
    }
  }
}

<many logs later, within another 12 minutes>

Current Blob Status is finalized: {
  "status":  "FINALIZED",
  "info":  {
    "blobHeader":  {
      "commitment":  {
        "x":  "EBXIwkZ7nXChaRx2Nz+SZyU/rX3WvZnLGeKpCW32OWs=",
        "y":  "LoTp8Bqz7pyhptnRBT5o01GAbPGXB52Ll+X+Pw+ibeg="
      },
      "dataLength":  1,
      "blobQuorumParams":  [
        {
          "adversaryThresholdPercentage":  33,
          "confirmationThresholdPercentage":  55,
          "chunkLength":  1
        },
        {
          "quorumNumber":  1,
          "adversaryThresholdPercentage":  33,
          "confirmationThresholdPercentage":  55,
          "chunkLength":  1
        }
      ]
    },
    "blobVerificationProof":  {
      "batchId":  15219,
      "blobIndex":  687,
      "batchMetadata":  {
        "batchHeader":  {
          "batchRoot":  "+yFLC9HFHJxkBixjGdFGv0psPC6R0DNynhowYgUvjtE=",
          "quorumNumbers":  "AAE=",
          "quorumSignedPercentages":  "VU4=",
          "referenceBlockNumber":  1564355
        },
        "signatoryRecordHash":  "HG1kkSIGjTOX2kFexdGnuAj7zDJaat0XQQavHjjXdPs=",
        "fee":  "AA==",
        "confirmationBlockNumber":  1564476,
        "batchHeaderHash":  "d1KhHvr0lhNCYiizYS5+v/2QWvSTsm7MeACChYDRli0="
      },
      "inclusionProof":  "3DDZAQV1jdb4Eb3pLAAVqAq69EMrmGMfwfcW9jQwShN8O4oqv7041DVjM09LARNO4VX1WUoVrSdXQ5ZXpaKKL7iREgnhNrHydYXfmJuGiS7dtxQubTDQ2O5bYTckzt/LZakvNf5hz87vEQdvHcYh2wpBugaX6/kgY/8OGiHLwocIXXwC5upaU92WSxFkHmd31xq7nAwDM5N8s7R9ktWBTbBGVFTtmTcctapohz551bskMoV79w28ie4Tc6NcdS5S9z1hR6tW9IGoHqeifynPjdvRaq51T/jnJWSC6gixbO6DOcw2qIU0+jhZsu6/ucHIwzxBQtvmp+7dLBthC7dZYllIOsc2nyTmUfp2mKXjP5vPEhbX+FLIMwagi3lGOI9zUdG/RYIpKxEIVoO5ffStDMotX4ZCgGZyQiTYR0maags/yc/ID27M8YVyu54nAAAyG89TpmqvVofJ1ove863ufA==",
      "quorumIndexes":  "AAE="
    }
  }
}
```

Congratulations you've now dispersed a blob using the low-level EigenDA disperser client.
