# Operator Installation

## Node Operator Checklist

### **Software Requirements**

* Docker: Ensure that Docker is installed on your system. To download Docker, follow the instructions listed [here](https://docs.docker.com/get-docker/). &#x20;
* Docker Compose: Make sure Docker Compose is also installed and properly configured. To download Docker Compose, follow the instructions listed [here](https://docs.docker.com/compose/install/).&#x20;
* Linux Environment: EigenLayer is supported only on Linux. Ensure you have a Linux environment, such as Docker, for installation.
  * If you choose to install eigenlayer-cli using the Go programming language, ensure you have Go installed, version 1.21 or higher. You can find the installation guide [here](https://go.dev/doc/install).

***

### Checking for Requirements&#x20;

On a native Linux system, you can use the lsb\_release -a command to get information about your Linux distribution.

**Check for Docker**\
If you are not using a native Linux system and want to use EigenLayer, you can check if Docker is installed:

* Open a terminal or command prompt.
* Run the following command to check if Docker is installed and running:`css`

```
docker --version
```

If Docker is installed and running, EigenLayer can be used within a Docker container, which provides a Linux environment.

By following these steps, you can determine if you have a suitable Linux environment for EigenLayer installation.&#x20;

***

## Installation

#### Install CLI using Binary

The Eigenlayer CLI tool versions are managed using GitHub releases.&#x20;

To install it, you can download the binary directly from the release assets manually, or by using the following command, replacing `<VERSION>` and `<ARCH>` with the appropriate values.

```
curl -L https://github.com/NethermindEth/eigenlayer/releases/download/<VERSION>/eigenlayer-linux-<ARCH> --output eigenlayer
chmod +x ./eigenlayer
```

#### Linux/amd64

"Linux/amd64" signifies a Linux operating system variant tailored for computers using the prevalent amd64 (x86-64) architecture, which is widely used in desktops and servers, supporting both 32-bit and 64-bit software, with 64-bit being the prevalent choice for modern systems.

```
curl -L https://github.com/NethermindEth/eigenlayer/releases/download/v0.4.3/eigenlayer-linux-amd64 --output eigenlayer
chmod +x ./eigenlayer
```

#### Linux/arm64

"Linux/arm64" refers to a version of the Linux operating system that is specifically designed to run on computers using the ARM64 architecture, which is commonly used in mobile devices, embedded systems, and some server environments.

```
curl -L https://github.com/NethermindEth/eigenlayer/releases/download/v0.4.3/eigenlayer-linux-arm64 --output eigenlayer
chmod +x ./eigenlayer

```

_Note: If you are using Ubuntu 20.04 you can also use the following command to install the binary._&#x20;

#### Linux/amd64&#x20;

```
curl -L https://github.com/NethermindEth/eigenlayer/releases/download/v0.4.3/eigenlayer-linux-amd64-ubuntu-20-04
 --output eigenlayer
chmod +x ./eigenlayer
```

#### Linux/arm64

```
curl -L https://github.com/NethermindEth/eigenlayer/releases/download/v0.4.3/eigenlayer-linux-arm64-ubuntu-20-04
 --output eigenlayer
chmod +x ./eigenlayer
```

***

### Install CLI using Go

Now we’re going to install the eigenlayer-CLI using Go. The following command will install eigenlayer’s executable along with the library and its dependencies in your system.&#x20;

```
go install github.com/NethermindEth/eigenlayer/cmd/eigenlayer@latest
```

Now we’re going to verify that the installation has been printed in the correct path.&#x20;

```
go install github.com/NethermindEth/eigenlayer/cmd/eigenlayer@latest
```

To check if the GOBIN is not in your PATH, you can execute echo $GOBIN from the Terminal. If it doesn't print anything, then it is not in your PATH. To add GOBIN to your PATH, add the following lines to your $HOME/.profile:

```
export GOBIN=$GOPATH/bin
export PATH=$GOBIN:$PATH
```

Changes made to a profile file may not apply until the next time you log into your computer. To apply the changes immediately, run the shell commands directly or execute them from the profile using a command such as source $HOME/.profile.

***

### Install CLI from Source

To pursue this installation method you need to have Go. Please ensure that you installed Go with a minimum version of 1.21 [here](https://go.dev/doc/install).&#x20;

With this method, you generate the binary manually, downloading and compiling the source code.&#x20;

```
git clone https://github.com/NethermindEth/eigenlayer.git
cd eigenlayer
mkdir -p build
go build -o build/eigenlayer cmd/eigenlayer/main.go
```

or if you have **make** installed:

```
git clone https://github.com/NethermindEth/eigenlayer.git
cd eigenlayer
make build
```

The executable will be in the build folder.

In case you want the binary in your PATH (or if you used the [Go](https://github.com/NethermindEth/eigenlayer#install-eigenlayer-cli-using-go) method and you don't have $GOBIN in your PATH), please copy the binary to /usr/local/bin:

***

## Create and List Keys

### Create Keys

You can generate encrypted ECDSA and BLS keys using the CLI, which will be required for operator registration and other on-chain operations.

```
eigenlayer operator keys create --key-type ecdsa [keyname]
eigenlayer operator keys create --key-type bls [keyname]
```

* `[keyname]` - This will be the name of the created key file. It will be saved as `<keyname>.ecdsa.key.json` or `<keyname>.bls.key.json`.

This will prompt a password which you can use to encrypt the keys. Keys will be stored in a local disk and will be shown once keys are created. It will also show the private key only once, so that you can back it up in case you lose the password or key file.

#### Input Command

```
eigenlayer operator keys create --key-type ecdsa test
```

The tool is requesting a password to encrypt the ECDSA private key for security purposes. The password input is hidden for security reasons.

#### Output

```
? Enter password to encrypt the ecdsa private key:
ECDSA Private Key (Hex):  b3eba201405d5b5f7aaa9adf6bb734dc6c0f448ef64dd39df80ca2d92fca6d7b
Please backup the above private key hex in safe place.

Key location: /home/ubuntu/.eigenlayer/operator_keys/test.ecdsa.key.json
Public Key hex:  f87ee475109c2943038b3c006b8a004ee17bebf3357d10d8f63ef202c5c28723906533dccfda5d76c1da0a9f05cc6d32085ca1af8aaab5a28171474b1ad0aa68
Ethereum Address 0x6a8c0D554a694899041E52a91B4EC3Ff23d8aBD5

```

### Import Keys

You can import existing ECDSA and BLS keys using the CLI, which are required for operator registration and other on-chain operations. This is useful if you already have an address which you want to use as your operator.

To import an ECDSA key, use the command: `eigenlayer operator keys import --key-type ecdsa [keyname] [privatekey]`.\


&#x20;To import a BLS key, use the command: `eigenlayer operator keys import --key-type bls [keyname] [privatekey]`.

* `[keyname]` is the name of the imported key file, and it will be saved as `<keyname>.ecdsa.key.json` or `<keyname>.bls.key.json`.
* `privatekey` is the private key of the key you wish to import.
  * For BLS keys, it should be a large number.
  * For ECDSA keys, it should be in hex format.

#### Input Command

This part of the command tells the EigenLayer tool that you want to import a key.

```
eigenlayer operator keys import --key-type ecdsa test 6842fb8f5fa574d0482818b8a825a15c4d68f542693197f2c2497e3562f335f6
```

#### Output

This is a prompt asking you to enter a password to encrypt the ECDSA private key.

```
? Enter password to encrypt the ecdsa private key: *******
ECDSA Private Key (Hex):  6842fb8f5fa574d0482818b8a825a15c4d68f542693197f2c2497e3562f335f6
Please backup the above private key hex in safe place.

Key location: /home/ubuntu/.eigenlayer/operator_keys/test.ecdsa.key.json
Public Key hex:  a30264c19cd7292d5153da9c9df58f81aced417e8587dd339021c45ee61f20d55f4c3d374d6f472d3a2c4382e2a9770db395d60756d3b3ea97e8c1f9013eb1bb
Ethereum Address 0x9F664973BF656d6077E66973c474cB58eD5E97E1

```

This will initiate a password prompt that you can use to encrypt the keys. The keys will be stored on your local disk and will be displayed after they are created.&#x20;

The private key will also be shown only once, enabling you to create a backup in case you forget the password or lose the key file.

### List Keys

This is the command you can use to retrieve a list of the keys you have created with the EigenLayer cli tool.

```
eigenlayer operator keys list
```

When you run the Eigenlayer operator keys list command, it will display a list of all the keys that were generated using this specific command, along with their corresponding public keys.&#x20;

This information can be useful for managing and identifying the keys you've created. Public keys are typically used for encryption, authentication, and verifying digital signatures.

***

## Operator Registration

#### Configuration Setup

A sample YAML [configuration file](https://github.com/NethermindEth/eigenlayer/blob/develop/cli/operator/config/operator-config-example.yaml) and [metadata](https://github.com/NethermindEth/eigenlayer/blob/develop/cli/operator/config/metadata-example.json) are provided. To register, please fill in the required metadata in the `metadata.json` file. Metadata file also requires a logo of your operator.  Please ensure that images are also uploaded to a publicly hosted link. We only support `.png` images for now. Once the metadata url is available, fill that in the operator configuration yaml file.&#x20;

You may also generate an operator configuration files using the commands mentioned in [this section](https://github.com/NethermindEth/eigenlayer#sample-config-creation). Complete the necessary information to register your operator. Ensure that if you're using `local_keystore` as the signer, you provide the path to the keys created in the previous section

> _Note: Please ensure that when adding your metadata\_url link to operator configuration, the link is a publicly hosted link that can be accessed for registration._

The EigenLayer CLI requires access to an Ethereum RPC node in order to post registration. Please plan to either leverage an RPC node provider or run your own local RPC node to reference in operator-config.yaml.

An example list of providers is [available here](https://www.alchemy.com/list-of/rpc-node-providers-on-ethereum) for your reference. You may locate one using [Chainlist Goerli](https://chainlist.org/chain/5).

#### Goerli Smart contract addresses

For operator registration in a Goerli environment, you need to set the Slasher and BLS public key compendium contract as follows. \
\
The Operator CLI requires two sets of keys (ECDSA and BLS) for two different purpose. For ECDSA, this is an Operator Ethereum address and key for interacting with Eigenlayer. For the BLS key, this is a key that is used for attestation on EigenLayer.&#x20;

Slasher Contract Address: [`0xD11d60b669Ecf7bE10329726043B3ac07B380C22`](https://goerli.etherscan.io/address/0xD11d60b669Ecf7bE10329726043B3ac07B380C22)

BLS Public Key Compendium Contract Address: [`0xc81d3963087Fe09316cd1E032457989C7aC91b19`](https://goerli.etherscan.io/address/0xc81d3963087Fe09316cd1E032457989C7aC91b19)

```
# EigenLayer Slasher contract address
# This will be provided by EigenLayer team
el_slasher_address: 0xD11d60b669Ecf7bE10329726043B3ac07B380C22

# Address of BLS Public Key Compendium contract
# This will be provided by EigenLayer team
bls_public_key_compendium_address: 0xc81d3963087Fe09316cd1E032457989C7aC91b19
```

#### Operator registration command

This is the command you can use to register your operator.

> _Note: ECDSA and BLS keys are required for operator registration. You may choose to either_ [_create_](https://github.com/NethermindEth/eigenlayer#create-keys) _your own set of keys using the EigenLayer CLI (recommended for first time users) or_ [_import_](https://github.com/NethermindEth/eigenlayer#import-keys) _your existing keys (recommended for advanced users who already have keys created) as outlined in the previous section._

```
eigenlayer operator register operator-config.yaml
```

***

### Checking Status of Registration

This is the command you can use to inquire about the registration status of your operator.

```
eigenlayer operator status operator-config.yaml
```

***

### Metadata Updates

This is the command you can use to make changes or updates to the metadata of your operator.

```
eigenlayer operator update operator-config.yaml
```

### Sample Config Creation

This command allows you to create a sample configuration file as a starting point for setting up operator registration and metadata.&#x20;

This is useful when you want to generate a new configuration file.

```
eigenlayer operator config create
```

It will create two files: `operator.yaml` and `metadata.json.`

After completing the necessary information in `metadata.json`, please upload it to a publicly accessible location and then provide the URL in `operator.yaml`. A valid metadata URL is essential for a successful registration.