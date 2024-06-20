---
sidebar_position: 3
---
# Blob Serialization Requirements

## BN254 Field Element Compatibility

Like EIP-4844, EigenDA identifies blobs using KZG commitments. Properly
speaking, KZG commitments commit to a polynomial whose coefficients and
evaluations live in a specific field associated with an Elliptic Curve. When
EigenDA accepts a blob of data, it has to convert this blob into a polynomial
living on this field. This must be done in a careful manner in order to avoid
restricting possible use cases for clients building
on EigenDA.

<!-- TODO: Link EIP-4844 -->

EigenDA will convert each 32 bytes of the incoming blob into a field element
(like EIP-4844), which is in turn interpreted as a coefficient of the blob
polynomial (Unlike EIP-4844). Since a field element cannot store a full 32
bytes, each 32 byte array must be validated by finding the BigEndian integer
associated with the array and checking whether it is within the field modulus.

```python
BLS_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617

def bytes_to_bls_field(b: Bytes32) -> BLSFieldElement:
    """
    Convert untrusted bytes to a trusted and validated BLS scalar field element.
    This function does not accept inputs greater than the BLS modulus.
    """
    field_element = int.from_bytes(b, ENDIANNESS)
    assert field_element < BLS_MODULUS
    return BLSFieldElement(field_element)
```

This validation means that an arbitrary string of bytes sent to EigenDA will
likely be rejected; instead of sending their raw bytes to EigenDA, users should
precondition the data in one of a few different ways to ensure that each 32 byte
chunk can be properly converted to a field element.

An obvious question that may arise is why EigenDA does not perform this
conversion for users; unfortunately, because Elliptic Curve field elements
cannot be represented by an integer number of bits, there is no generic lossless
conversion which does not require some validation; Moreover, hard-coding a lossy
conversion means that not all polynomials can be represented in EigenDA, which
in turn restricts certain use cases.

### Using kzgpad

If you do not adhere to this encoding scheme, you may encounter errors like these:

```bash
$ grpcurl \
    -import-path ./api/proto \
    -proto ./api/proto/disperser/disperser.proto \
    -d '{"data": "hello"}' \
    disperser-preprod-holesky.eigenda.xyz:443 disperser.Disperser/DisperseBlob

ERROR:
  Code: InvalidArgument
  Message: rpc error: code = InvalidArgument desc = encountered an error to convert a 32-bytes into a valid field element, please use the correct format where every 32bytes(big-endian) is less than 21888242871839275222246405745257275088548364400416034343698204186575808495617
```

The simplest way to resolve this until we have a dedicated EigenDA CLI is to
use the `kzgpad` utility documented in the [tutorial](./cli-guide.md):

```bash
$ grpcurl \
  -proto ./api/proto/disperser/disperser.proto \
  -import-path ./api/proto \
  -d '{"data": "'$(tools/kzgpad/bin/kzgpad -e hello)'"}' \
  disperser-holesky.eigenda.xyz:443 disperser.Disperser/DisperseBlob

{
  "result": "PROCESSING",
  "requestId": "OGEyYTVjOWI3Njg4MjdkZTVhOTU1MmMzOGEwNDRjNjY5NTljNjhmNmQyZjIxYjUyNjBhZjU0ZDJmODdkYjgyNy0zMTM3MzEzMjM2MzAzODM4MzYzOTMzMzgzMzMxMzYzMzM0MzYzNzJmMzAyZjMzMzMyZjMxMmYzMzMzMmZlM2IwYzQ0Mjk4ZmMxYzE0OWFmYmY0Yzg5OTZmYjkyNDI3YWU0MWU0NjQ5YjkzNGNhNDk1OTkxYjc4NTJiODU1"
}
```

## Pad One Byte Codec ("kzgpad")

One example golang encoding scheme for implementing the above validity rule is [copied from the EigenDA codesbase][1] below.

```go
// ConvertByPaddingEmptyByte takes bytes and insert an empty byte at the front of every 31 byte.
// The empty byte is padded at the low address, because we use big endian to interpret a fiedl element.
// This ensure every 32 bytes are within the valid range of a field element for bn254 curve.
// If the input data is not a multiple of 31, the reminder is added to the output by
// inserting a 0 and the reminder. The output does not necessarily be a multipler of 32
func ConvertByPaddingEmptyByte(data []byte) []byte {
 dataSize := len(data)
 parseSize := encoding.BYTES_PER_SYMBOL - 1
 putSize := encoding.BYTES_PER_SYMBOL

 dataLen := (dataSize + parseSize - 1) / parseSize

 validData := make([]byte, dataLen*putSize)
 validEnd := len(validData)

 for i := 0; i < dataLen; i++ {
  start := i * parseSize
  end := (i + 1) * parseSize
  if end > len(data) {
   end = len(data)
   // 1 is the empty byte
   validEnd = end - start + 1 + i*putSize
  }

  // with big endian, set first byte is always 0 to ensure data is within valid range of
  validData[i*encoding.BYTES_PER_SYMBOL] = 0x00
  copy(validData[i*encoding.BYTES_PER_SYMBOL+1:(i+1)*encoding.BYTES_PER_SYMBOL], data[start:end])

 }
 return validData[:validEnd]
}

// RemoveEmptyByteFromPaddedBytes takes bytes and remove the first byte from every 32 bytes.
// This reverses the change made by the function ConvertByPaddingEmptyByte.
// The function does not assume the input is a multiple of BYTES_PER_SYMBOL(32 bytes).
// For the reminder of the input, the first byte is taken out, and the rest is appended to
// the output.
func RemoveEmptyByteFromPaddedBytes(data []byte) []byte {
 dataSize := len(data)
 parseSize := encoding.BYTES_PER_SYMBOL
 dataLen := (dataSize + parseSize - 1) / parseSize

 putSize := encoding.BYTES_PER_SYMBOL - 1

 validData := make([]byte, dataLen*putSize)
 validLen := len(validData)

 for i := 0; i < dataLen; i++ {
  // add 1 to leave the first empty byte untouched
  start := i*parseSize + 1
  end := (i + 1) * parseSize

  if end > len(data) {
   end = len(data)
   validLen = end - start + i*putSize
  }

  copy(validData[i*putSize:(i+1)*putSize], data[start:end])
 }
 return validData[:validLen]
}
```

[1]: https://github.com/Layr-Labs/eigenda/blob/master/encoding/utils/codec/codec.go#L12
