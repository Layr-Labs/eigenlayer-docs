---
sidebar_position: 1
title: Overview
---

# Introduction

## What is a Node Operator within EigenLayer?

Operators, who can be either individuals or organizations, play an active role in the EigenLayer protocol. By registering within EigenLayer, they enable ETH stakers to delegate their staked assets, whether in the form of native ETH or LSTs. The Node Operators then opt-in to provide a range of services to AVSs, enhancing the overall security and functionality of their networks.


## Operator Eligibility and Restaking Criteria

Becoming an Operator in the EigenLayer ecosystem does not require a specific amount of delegated restaked TVL. Essentially, any Ethereum address can serve as an Operator. An address can function as both a Restaker, engaging in either liquid or native restaking, and as an Operator simultaneously. However, it is important to note that this dual role is not mandatory. An Operator can participate in the EigenLayer network without having any restaked tokens.

Most Operators will receive token delegations sourced from other Restakers within the network, otherwise Operators can choose to self-delegate by allocating their restaked token balance.


## Staker and Operator Roles Clarification

Operators are not required to be Restakers. An Ethereum address can be both a Restaker (via liquid or native restaking) and 
simultaneously an Operator, however this is not a requirement. An Operator can have zero restaked tokens in EigenLayer.

An Operator is required to have tokens delegated to their address. The delegation can come from other Restakers or they 
can self-delegate their restaked token balance.

:::important
If a single address is used for Restaking and Operating activities when an Operator self delegates as a Restaker, the Operator
cannot undelegate from itself, and the Operator can only withdraw restaked funds. To avoid this limitation, use separate addresses
for Restaking and Operating activities when self delegating as a Restaker.
:::

## Rewards
Please see the [rewards claiming](../howto/claimrewards/claim-rewards-cli.mdx) documentation on how to claim rewards.


### Operator Sets

For information on Operator Sets, refer to [Operator Sets concept](../../eigenlayer/concepts/operator-sets/operator-sets-concept.md).




---

---
sidebar_position: 4
title: Operator Keys
---

For information on Operator keys, refer to [Keys](../../eigenlayer/concepts/keys-and-signatures).

:::important
When running Redistributable Operator Sets, Operators must ensure sufficient focus is given to key management and opsec. 
A compromise in an Operator key could enable a malicious actor to register for a malicious AVS, and slash and redistribute
allocated Staker funds to a specified address.
:::

For information on key management best practices, refer to: 
* [Node Operators](../howto/managekeys/institutional-operators.md)
* [Solo Stakers](../howto/managekeys/solo-operators.md).

---

---
sidebar_position: 2
title: User Access Management
---

For concept material on User Access Management (UAM) and roles, refer to:
* [User Access Management](../../eigenlayer/concepts/uam/user-access-management.md)
* [Accounts](../../eigenlayer/concepts/uam/uam-accounts.md)
* [Admins](../../eigenlayer/concepts/uam/uam-admins.md)
* [Appointees](../../eigenlayer/concepts/uam/uam-appointees.md)

User Access Management (UAM) enables Operators to set appointees for actions enabling a range of key management solutions to be 
implemented.  For example, from simple (ECDSA key rotation) to complex (upstream smart contract permissioning schemes).

The protocol functions that an Operator can set appointees for are:
* [`AllocationManager.modifyAllocations`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#modifyallocations)
* [`AllocationManager.registerForOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#registerforoperatorsets)
* [`AllocationManager.deregisterFromOperatorSets`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#deregisterfromoperatorsets)
* [`AllocationManager.setAllocationDelay`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/AllocationManager.md#setallocationdelay)
* [`DelegationManager.modifyOperatorDetails`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#modifyoperatordetails)
* [`DelegationManager.updateOperatorMetadataURI`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#updateoperatormetadatauri)
* [`DelegationManager.undelegate`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/DelegationManager.md#undelegate)
* [`RewardsCoordinator.setClaimerFor`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#setclaimerfor)
* [`RewardsCoordinator.setOperatorAVSSplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#setoperatoravssplit)
* [`RewardsCoordinator.setOperatorPISplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#setoperatorpisplit)
* [`RewardsCoordinator.setOperatorSetSplit`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#setoperatorsetsplit)

For information on how to set admins and appointees for an AVS, refer to:
* [Add and Remove Admins](../howto/uam/op-add-remove-admins.md)
* [Add and Remove Appointees](../howto/uam/op-add-remove-appointees.md)


---

---
sidebar_position: 5
title: Implement Security Best Practices
---

# Operator Security Risks

## Malicious AVS 

- Guest container breaking  into host machine:
    - Kernel Exploits: Containers share the same kernel as the host. If there are vulnerabilities in the kernel, a container might exploit them to gain elevated privileges on the host.
    - Escape to Host: There have been vulnerabilities in the past that allowed processes within a container to escape and get access to the host. This is especially dangerous if containers are run with elevated privileges.
    - Inter-container Attacks: If one container is compromised, an attacker might try to move laterally to other containers on the same host.

- Access to the host’s network. Because containers run in a home stakers environment, they have access to a home network or a k8s environment.
- Malware in the container or via a supply chain attack or AVS is malicious.



## AVS Implementation and Deployment Bugs

- Running outdated software.
- Misconfigured ports and services open to the internet.
- Running containers with elevated privileges.


# What can operators do to mitigate malicious AVS risks?
## Operator Best Practices

- Regularly update and patch containers and the host system.
- Don't share your keys between AVSs / ETH validator. Refer to key management section.
- Monitor container runtime (logs) behavior for any suspicious activities and setup alerts as relevant.
- Do not run containers with privileged flag.It can give them almost unrestricted access to the host.
- Limit Resources to a container so it doesn’t take down the cluster / node
- Data Theft: Do not mount entire volumes into containers to prevent data leak, container escapes etc.
- Follow Network Access / Least privilege principles in your organization to reduce attack surface

## Infrastructure

General
- Only allow Network traffic to ports / from whitelisted ip's required by the AVS.
- Do not expose critical services like ssh to the internet.
- Configure your firewall with a DENY ALL approach and explicitly allow traffic that is required.
  
Docker Infra
- Network Segmentation: Use Docker's network policies to segment containers  and limit inter-container communication.
- Regular Audits: audit and monitor container activities using tools like - Docker Bench for Security or Clair.
- Isolation
    - Through VMs: lightweight VMs (like Kata Containers or gVisor) combine container - flexibility with VM isolation.
    - User namespaces, seccomp, AppArmor, and SELinux etc can help further restrict the container.

K8’s Infra
- Network Segmentation: Limit the services your AVSs can talk to. Follow least privilege principles via [Kubernetes Documentation Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

Incident Response Plan: 
- Have a plan in place for how to respond if a container is compromised. This includes isolating affected containers, analyzing, and restoring services.
- Regular Backups: Regularly backup your data and configurations to recover from any malicious changes.
- Stay Updated: Always keep an eye on Docker's official documentation, security advisories, and community forums for the latest best practices and updates.









---

---
sidebar_position: 3
title: Batch Claim Rewards
---

Batch rewards claiming for Stakers and Operators using the EigenLayer CLI is a gas efficient way to claim on behalf 
of multiple Earners in a single transaction.

To batch claim rewards, use the `-–batch-claim-file` option:

`eigenlayer rewards claim --earner-address 0x025246421e7247a729bbcff652c5cc1815ac6373 --eth-rpc-url http://rpc-url --network holesky --batch-claim-file samples/batch-claim.yaml`

The batch claim yaml file includes the Earner addresses, and token addresses for which to claim. For example:

```yaml
- earner_address: "0x025246421e7247a729bbcff652c5cc1815ac6373"
  token_addresses:
    - "0x3B78576F7D6837500bA3De27A60c7f594934027E"
- earner_address: "0x025246421e7247a729bbcff652c5cc1815ac6373"
  token_addresses:
    - "0x3B78576F7D6837500bA3De27A60c7f594934027E"
```

---

---
sidebar_position: 1
title: Claim Rewards
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites
* EigenLayer CLI installed.
* Wallet keys for the Earner or Claimer address accessible to the CLI.

### Earner

To claim rewards using the EigenLayer CLI as an [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md):

1. Check if rewards are available to claim.

<Tabs groupId="network">
  <TabItem value="mainnet" label="Mainnet">
    ```bash
    ./bin/eigenlayer rewards show \
      --network mainnet \
      --earner-address <earner-address> \
      --claim-type unclaimed

    ```

  </TabItem>
  <TabItem value="sepolia" label="Sepolia">
    ```bash
    ./bin/eigenlayer rewards show \
      --network sepolia \
      --earner-address <earner-address> \
      --claim-type unclaimed
    ```
  </TabItem>
</Tabs>

The token addresses and associated unclaimed rewards are displayed.

```bash
---------------------------------------------------------------------------------------
Token Address                              | Wei Amount
---------------------------------------------------------------------------------------
0x554c393923c753d146aa34608523ad7946b61662 | 6324648267039518
0xdf3b00151bf851e8c4036ceda284d38a2f1d09df | 132817613607829878
---------------------------------------------------------------------------------------
```

2. If using a local keystore file:

<Tabs groupId="network">
  <TabItem value="mainnet" label="Mainnet">

    ```bash
    ./bin/eigenlayer rewards claim \
      --network mainnet \
      --eth-rpc-url <mainnet-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --broadcast
    ```

  </TabItem>
  <TabItem value="sepolia" label="Sepolia">

    ```bash
    ./bin/eigenlayer rewards claim \
      --network sepolia \
      --eth-rpc-url <sepolia-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --broadcast
    ```
    `comma-separated-list-of-token-addresses` - You can get this from output of Step 3
  </TabItem>
</Tabs>

Where: 
* `earner-address` - [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md) with wallet keys accessible to the CLI. 
* `token-addresses` - Token addresses from output of previous step. 
* `recipient-address` - Address to receive the Rewards. The default is the [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md).

If you are using private key hex, Fireblocks or Web3Signer for key management, refer to the CLI help for the respective key manager.

```bash
./bin/eigenlayer rewards claim --help
```

### Claimer

To claim rewards using the EigenLayer CLI as a [Claimer](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md),
use the same commands as for Earner except specify the `claimer-address` option instead of the `earner-address` option.

---

---
sidebar_position: 3
title: Claim Rewards as a Smart Contract
---

To claim rewards when the [Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md) is a smart contract, 
generate either:
* JSON object with the arguments to call [`RewardsCoorinator.processClaim`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#processclaim).
* Calldata that can be signed and broadcast.

## JSON Object

To generate the JSON object, use:
```bash
    ./bin/eigenlayer rewards claim \
      --network mainnet \
      --eth-rpc-url <mainnet-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --output-type json
```

## Calldata

To generate the calldata, use:

```bash
    ./bin/eigenlayer rewards claim \
      --network mainnet \
      --eth-rpc-url <mainnet-eth-rpc-url> \
      --earner-address <earner-address> \
      --recipient-address <address-to-send-rewards-to> \
      --path-to-key-store /path/to/key/store-json \
      --token-addresses <comma-separated-list-of-token-addresses> \
      --output-type calldata
```

---

---
sidebar_position: 4
title: Rewards Distribution Data
---

:::important
After June 30, Rewards snapshot distribution data will no longer be updated in the [public S3 bucket](#via-s3-bucket). To continue getting updated rewards data,
users of the S3 bucket must migrate to the EigenLayer Sidecar by June 30.
:::

Rewards snapshot distribution data is available:
* From an [EigenLayer Sidecar](#using-eigenlayer-sidecar).
* Via a [public S3 bucket](#via-s3-bucket). Users may access this data for their own analytics purposes.

## Using EigenLayer Sidecar

The [EigenLayer Sidecar](https://sidecar-docs.eigenlayer.xyz/docs/sidecar/running/getting-started) is an open source, permissionless, verified indexer enabling anyone (for example AVS, Operator) to access 
EigenLayer’s protocol rewards in real-time.

For information on how to install and launch a Sidecar, refer to the [Sidecar documentation](https://sidecar-docs.eigenlayer.xyz/docs/sidecar/running/getting-started).

There are two methods to access the rewards data from a Sidecar:
* Terminal or a bash script with `curl` and `grpcurl`.
* Using the gRPC or HTTP clients published in the [protocol-apis](https://github.com/Layr-Labs/protocol-apis) Go package.

Refer to the [sidecar](https://github.com/Layr-Labs/sidecar) repository for [examples](https://github.com/Layr-Labs/sidecar/blob/master/examples/rewardsData/main.go).

To obtain rewards snapshot distribution data using a EigenLayer Sidecar:

1. List distribution roots. 
   ``` 
   # grpcurl
   grpcurl -plaintext -d '{ }' localhost:7100 eigenlayer.sidecar.v1.rewards.Rewards/ListDistributionRoots | jq '.distributionRoots[0]'

   # curl
   curl -s http://localhost:7101/rewards/v1/distribution-roots

   {
     "root": "0x2888a89a97b1d022688ef24bc2dd731ff5871465339a067874143629d92c9e49",
     "rootIndex": "217",
     "rewardsCalculationEnd": "2025-02-22T00:00:00Z",
     "rewardsCalculationEndUnit": "snapshot",
     "activatedAt": "2025-02-24T19:00:48Z",
     "activatedAtUnit": "timestamp",
     "createdAtBlockNumber": "3418350",
     "transactionHash": "0x769b4efbefb99c6c80738405ae5d082829d8e2e6f97ee20da615fa7073c16d90",
     "blockHeight": "3418350",
     "logIndex": "544"
   }
   ```
2. Use the `rootIndex` to fetch the rewards data.
   ```
   # grpcurl
   grpcurl -plaintext --max-msg-sz 2147483647 -d '{ "rootIndex": 217 }' localhost:7100 eigenlayer.sidecar.v1.rewards.Rewards/GetRewardsForDistributionRoot > rewardsData.json

   # curl
   curl -s http://localhost:7101/rewards/v1/distribution-roots/217/rewards > rewardsData.json

   {
    "rewards": [
     {
      "earner": "0xe44ce641a7cf6d52c06c278694313b08c2b181c0",
      "token": "0x3b78576f7d6837500ba3de27a60c7f594934027e",
      "amount": "130212752259281570",
      "snapshot": "2025-02-22T00:00:00Z"
     },
    // ...
    ]
   }
   ```

## Via S3 Bucket

:::important
After June 30, Rewards snapshot distribution data will no longer be updated in the [public S3 bucket](#via-s3-bucket). To continue getting updated rewards data,
users of the S3 bucket must migrate to the EigenLayer Sidecar by June 30.
:::

To obtain rewards snapshot distribution data from the S3 bucket: 

To get a list of snapshot dates from RewardsCoordinator contract:

1. Find the RewardsCoordinator Proxy address for Testnet or Mainnet [here](https://github.com/Layr-Labs/eigenlayer-contracts/?tab=readme-ov-file#deployments).
    1. Get the DistributionRoot(s) needed for the rewards time ranges desired.
       * Call `getCurrentDistributionRoot` to get the most recent root posted. `getCurrentClaimableDistributionRoot` returns the most recent claimable root since there is an activation delay.
       * Find the rewardsCalculationEndTimestamp value as the second value in the [DistributionRoot struct](https://github.com/Layr-Labs/eigenlayer-contracts/blob/b4fa900a11df04f3b0034e225deb1eb42b39f8bc/src/contracts/interfaces/IRewardsCoordinator.sol#L72) resulting tuple.
       * Or Index on the event `DistributionRootSubmitted` which is emitted when a [root is created](https://etherscan.io/tx/0x2aff6f7b0132092c05c8f6f41a5e5eeeb208aa0d95ebcc9022d7823e343dd012#eventlog).
       * Note: the current snapshot cadence is at most once per day for Testnet, weekly for Mainnet if there are new rewards to publish ([more detail here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/docs/core/RewardsCoordinator.md#off-chain-calculation)).
   2. Convert this rewardsCalculationEndTimestamp value from unix time stamp integer format to the date format YYYY-MM-DD using a conversion tool ([example here](https://www.unixtimestamp.com/)).

2. Construct the URL to return the claim-amounts.json file for the desired snapshot date in the following format:

`<bucket url>/<environment>/<network>/<snapshot date>/claim-amounts.json`

* bucket_url: 
  * [https://eigenlabs-rewards-testnet-holesky.s3.amazonaws.com](https://eigenlabs-rewards-testnet-holesky.s3.amazonaws.com)
  * [https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com](https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com)
* environment: testnet or mainnet
* network: holesky or ethereum

Example:

`https://eigenlabs-rewards-mainnet-ethereum.s3.amazonaws.com/mainnet/ethereum/2024-08-11/claim-amounts.json`

Extract data from the claim-amounts.json file as needed. Please find the schema here:

```

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EigenLayer rewards cumulative earnings",
  "type": "object",
  "properties": {
    "earner": {
      "type": "string",
      "description": "Ethereum address"
    },
    "token": {
      "type": "string",
      "Ethereum address"
    },
    "snapshot": {
      "type": "number",
      "Unix timestamp of the snapshot date in UTC"
    },
    "cumulative_amount": {
      "type": "string",
      "Cumulative amount of tokens earned over time (includes both claimed and unclaimed rewards)"
    }
  },
  "required": [
    "earner",
    "token",
    "snapshot",
    "cumulative_amount"
  ]
}
```

Note: claim-amounts.json file is not a json file, but a json line file where each line is a valid json object.


---

---
sidebar_position: 2
title: Set Programmatic Incentives Split
---

The default [Operator split for Programmatic Incentives (PI) is 10%](../../../eigenlayer/concepts/rewards/pi-split.md).

## Get Current PI Split

To obtain the current PI split, use:

`eigenlayer operator get-pi-split [options]` with

* `operator-address` - Operator address for which to get the operator split

To get the default split at the protocol level, use `eigenlayer operator get-pi-split` without specifying
`operator-address`.

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update PI Split

To update the PI split by Operator, use:

`eigenlayer operator set-pi-split [options]` with

* `operator-address` - Operator address for which to update the PI split
* `operator-split` - Split to set for the Operator in bips

---

---
sidebar_position: 3
title: Set Rewards Claimer
---

## Prerequisites

* EigenLayer CLI installed.
* Wallet keys for the Earner address accessible to the CLI.

## Set Claimer Address

To set an address as the [Claimer for an Earner](../../../eigenlayer/concepts/rewards/earners-claimers-recipients.md), use:

`eigenlayer rewards set-claimer [options]` with 

* `earner-address` - Address of the Earner
* `claimer-address` - Address of the Claimer

---

---
sidebar_position: 1
title: Set Rewards Split
---

The default Operator split for rewards is 10%. [The Operator split can be varied by AVS or by Operator Set](../../../eigenlayer/concepts/rewards/rewards-split.md).

## Get Current AVS Rewards Split

To obtain the current AVS rewards split, use:

`eigenlayer operator get-rewards-split [options]` with:

* `avs-address` - AVS address for which to get the operator split
* `operator-address` - Operator address for which to get the operator split

To get the default split at the protocol level, use `eigenlayer operator get-rewards-split` without specifying `avs-address`
or `operator-address`.

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update AVS Rewards Split

To update the AVS rewards split, use:

`eigenlayer operator set-rewards-split [options]` with:
* `avs-address` - AVS address for which to update the Operator split
* `operator-address` - Operator address for which to update the Operator Set split
* `operator-split` - Split to set for the Operator in bips for the specified AVS

Changes to the Rewards split take effect after a 7-day activation delay. Only one split can be pending.  That is, any pending
Rewards split must be completed before setting a new Rewards split.

## Get Current Operator Set Rewards Split

To obtain the current Operator Set rewards split, use:

`eigenlayer operator get-operatorset-split [options]` with:

* `avs-address` - AVS address for which to get the operator split
* `operator-address` - Operator address for which to get the operator split
* `operatorset-id` - Operator Set ID for which to get the split

The current split is returned in bips (1000 bips = 10%, 10000 bips = 100%).

## Update Operator Set Rewards Split

To update the Operator Set rewards split, use:

`eigenlayer operator set-operatorset-split [options]` with
* `avs-address` - AVS address for which to update the Operator Set split
* `operator-address` - Operator address for which to update the Operator Set split
* `operatorset-id` - Operator Set ID for which to update the split
* `operator-split` - Split to set for the Operator in bips for the specified Operator Set

Changes to the Rewards split take effect after a 7-day activation delay. Only one split can be pending.  That is, any pending
Rewards split must be completed before setting a new Rewards split. 


---

---
sidebar_position: 2
title: Node and Smart Contract Operators
---

# Key Management Best Practices for Node Operators

- Secure keys, including secrets such as passphrases or mnemonics, using services like AWS Secrets Manager or Hashicorp Vault. These services can be seamlessly integrated with automated mechanisms that safely retrieve secrets or keys (e.g., remote signers). If resources permit, consider running your own Hashicorp Vault instance, which grants full custody of keys and secrets while sacrificing the service provider's availability and security guarantees.
- Avoid generating all keys with the same mnemonic. Minimize the attack surface by employing a new mnemonic for every 200 or 1000 validator keys, depending on your preference. This approach also reduces the risk of losing key generation capabilities if a single mnemonic is lost, and limits the impact if an attacker gains access to a few mnemonics.
- Given that AVS keys are likely to be much fewer, not using the same seed to generate the keys is probably safer; generate each AVS key independently if possible.
- Use a remote signer like **[Web3signer](https://github.com/ConsenSys/web3signer)** or, better yet, distributed signers to eliminate single points of failure.
- Develop a custom solution involving tailor-made tools. For instance, use Web3signer for remote signing and store keys on AWS Secrets Manager. A custom tool can manage automatic key storage in Secrets Manager and facilitate interactions with Web3signer.

# Smart Contract Operators

We encourage institutional operators to register with EigenLayer using an [erc-1271](https://eips.ethereum.org/EIPS/eip-1271) smart contract wallet. This allows a lot more fine-grained control, such as multisig authorization and key rotation, which is currently not possible for EOA operators.

# Redistributable Operator Sets

When running Redistributable Operator Sets, Operators must ensure sufficient focus is given to key management and opsec.
A compromise in an Operator key could enable a malicious actor to register for a malicious AVS, and slash and redistribute
allocated Staker funds to a specified address.

Redistributable Operators Sets are identifiable by onchain metadata ([`AllcationManager.isRedistributingOperatorSet`](https://github.com/Layr-Labs/eigenlayer-contracts/blob/v1.5.0-rc.0/src/contracts/interfaces/IAllocationManager.sol)). 

---

---
sidebar_position: 3
id: solo-stakers
title: Solo stakers
---

# Key Management Best Practices for Solo Stakers

Individuals managing a limited number of validator keys typically do not require intricate distributed infrastructure for running nodes or employing remote signers. For these individuals, extensive staking services may be excessive and unnecessary. This means they will often store the keys with the decryption keys locally with the validator client or Node (which they maintain), which increases the vulnerability of the secrets, but, while stakers must safeguard validator keys against attacks, most key losses typically result from mundane reasons, such as losing the hardware containing the key. Users necessitate a backup strategy, mindful that if an attacker accesses the backed-up keys, they can sign any message deemed valid against the validator's public key. Appropriate precautions should be implemented to guarantee that backed-up validator keys are as inaccessible as feasible, ideally being completely offline and physically secure. Some of these precautions can be listed:

- Use hardware wallets: Store backed-up keys on secure hardware wallets such as Ledger or Trezor devices. These wallets provide an additional layer of protection by isolating the keys from internet-connected devices.
- Create multiple backups: Generate multiple copies of your backed-up keys and store them in separate, secure locations, such as safety deposit boxes, fireproof safes, or encrypted USB drives.
- Encrypt backups: Ensure your backed-up keys are encrypted using robust encryption algorithms. This protects the keys from unauthorized access in case the storage medium falls into the wrong hands.
- Implement physical security: Ensure the stored locations for backed-up keys are secure, with controlled access and protection against theft or damage.
- Regularly test recovery: Periodically test the recovery of your backed-up keys to ensure that they remain accessible and functional in case of an emergency.
- Employ secure communication channels: When transferring backed-up keys, use secure communication methods such as end-to-end encrypted messaging or other secure channels to prevent interception by malicious actors.
- Limit access: Restrict access to backed-up keys to a select few trusted individuals, and consider implementing a multi-signature scheme to require multiple parties for key recovery.
- Maintain secrecy: Avoid discussing the location or existence of your backed-up keys with others, and do not store any written records that could lead an attacker to their location.
- Continuously update security measures: Regularly assess and update the security measures in place to protect your backed-up keys, staying informed about the latest threats and best practices.
- Use an air-gapped device: Consider using an air-gapped device, such as a computer not connected to the internet, to store backed-up keys. This provides an additional layer of security against remote attacks. Use USB devices or QR codes for sharing the keys with the air-gapped device.

## Securing Mnemonic or Seed Phrases for Key Generation

The mnemonic (if applicable) or seed phrase utilized for generating keys should not be stored on any device, and the aforementioned precautions should be taken into account for safekeeping. Avoid key generation tools that write the mnemonic to the Terminal, an insecure buffer, or a file. Aim to generate keys on an air-gapped device, ensuring the mnemonic and passphrase are securely stored or loaded into memory.


---

---
sidebar_position: 6
title: Follow Webapp Content Guidelines
---

# Webapp Content Guidelines

## Operator Page

The following are guidelines (**“Guidelines”**) for what content Operators should include in their listing of their Operator on app.eigenlayer.xyz (the “**App**”). These Guidelines are intended to help ensure that Operators are providing relevant information from which restakers can select an Operator. 

The content in the Operator tile may include the following: 
- Factual information relating to:
    - The company or team running the Operator
    - The technical ability or experience relevant to the competence of the Operator 
- Links to website or social profiles associated with the Operator
- Logos associated with the Operator

The following content is **<ins>not permitted</ins>** to be displayed in the Operator tile:
- Any offer or promotion of illegal activities
- Any (i) vulgar or profane language or content or (ii) links to vulgar or profane content
- Promotions or incentives for stakers including offering of tokens
- Any false or misleading content
- Any links to content that is not owned or controlled by the Operator 
- Any links to social profiles other than those associated with the Operator
- Any content that violates the intellectual property rights of any other person or entity (including using the branding or logo of EigenLayer or Eigen Labs)
- Anything violating the [Terms of Service](/docs/eigenlayer/legal/terms-of-service.md)


Eigen Labs, Inc. (“**Eigen Labs**”) reserves the right to update these Guidelines at any time and without notice. If you violate these Guidelines, Eigen Labs may delist you or otherwise decrease your visibility on the App. 

## Reporting a Violation or Remediation of Guidelines

Please use our [Support channel](https://support.eigenlayer.xyz/) for reporting either of the following:
- Operator violations of Webapp Content Guidelines.
- Appeal to review and whitelist an Operator who has remediated their violation of the guidelines.

Click on the Intercom chat icon in the bottom right of your screen, then choose “Create a Ticket: Operator Blocklist”.



---

---
sidebar_position: 1
title: Install and register Operators
---

# Installation and Registration

## Node Operator Checklist

### **Software Requirements**

- Docker: Ensure that Docker is installed on your system. To download Docker, follow the instructions listed [here](https://docs.docker.com/get-docker/).
- Docker Compose: Make sure Docker Compose is also installed and properly configured. To download Docker Compose, follow the instructions listed [here](https://docs.docker.com/compose/install/).
- Linux Environment: EigenLayer is supported only on Linux. Ensure you have a Linux environment, such as Docker, for installation.
  - If you choose to install eigenlayer-cli using the Go programming language, ensure you have Go installed, version 1.21 or higher. You can find the installation guide [here](https://go.dev/doc/install).

---

### Checking for Requirements

On a native Linux system, you can use the lsb_release -a command to get information about your Linux distribution.

**Check for Docker**
If you are not using a native Linux system and want to use EigenLayer, you can check if Docker is installed:

- Open a terminal or command prompt.
- Run the following command to check if Docker is installed and running:`css`

```
docker --version
```

If Docker is installed and running, EigenLayer can be used within a Docker container, which provides a Linux environment.

By following these steps, you can determine if you have a suitable Linux environment for EigenLayer installation.

---

## CLI Installation

### Install CLI using Binary

To download a binary for latest release, run:

```
curl -sSfL https://raw.githubusercontent.com/layr-labs/eigenlayer-cli/master/scripts/install.sh | sh -s
```

The binary will be installed inside the `~/bin` directory.

To add the binary to your path, run:

```
export PATH=$PATH:~/bin
```

#### Install CLI in A Custom Location

To download the binary in a custom location, run:

```
curl -sSfL https://raw.githubusercontent.com/layr-labs/eigenlayer-cli/master/scripts/install.sh | sh -s -- -b <custom_location>
```

---

### Install CLI Using Go

Now we’re going to install the eigenlayer-CLI using Go. The following command will install eigenlayer’s executable along with the library and its dependencies in your system.

```
go install github.com/Layr-Labs/eigenlayer-cli/cmd/eigenlayer@latest
```

To check if the GOBIN is not in your PATH, you can execute `echo $GOBIN` from the Terminal. If it doesn't print anything, then it is not in your PATH. To add GOBIN to your PATH, add the following lines to your $HOME/.profile:

```
export GOBIN=$GOPATH/bin
export PATH=$GOBIN:$PATH
```

Changes made to a profile file may not apply until the next time you log into your computer. To apply the changes immediately, run the shell commands directly or execute them from the profile using a command such as source $HOME/.profile.

---

### Install CLI from Source

To pursue this installation method you need to have Go. Please ensure that you installed Go with a minimum version of 1.21 [here](https://go.dev/doc/install).

With this method, you generate the binary manually, downloading and compiling the source code.

```
git clone https://github.com/Layr-Labs/eigenlayer-cli.git
cd eigenlayer-cli
mkdir -p build
go build -o build/eigenlayer cmd/eigenlayer/main.go
```

or if you have **make** installed:

```
git clone https://github.com/Layr-Labs/eigenlayer-cli.git
cd eigenlayer-cli
make build
```

The executable will be in the build folder.

In case you want the binary in your PATH (or if you used the [Go](https://github.com/Layr-Labs/eigenlayer-cli#install-eigenlayer-cli-using-go) method and you don't have $GOBIN in your PATH), please copy the binary to /usr/local/bin:

---

## Create and List Keys

ECDSA keypair corresponds to the operator Ethereum address and key for interacting with Eigenlayer. The BLS key is used for attestation purposes within the EigenLayer protocol. BLS key is used when you register an AVS to EigenLayer.

### Create Keys

Generate encrypted ECDSA and BLS keys using the CLI:

```
eigenlayer operator keys create --key-type ecdsa [keyname]
eigenlayer operator keys create --key-type bls [keyname]
```

- `[keyname]` - This will be the name of the created key file. It will be saved as `<keyname>.ecdsa.key.json` or `<keyname>.bls.key.json`.

This will prompt a password which you can use to encrypt the keys. Keys will be stored in a local disk and will be shown once keys are created. It will also show the private key only once, so that you can back it up in case you lose the password or key file.

You can also create keys by piping your password to this command. This can help in automated key creation and will not prompt for password. This support got added in [v0.6.2](https://github.com/Layr-Labs/eigenlayer-cli/releases/tag/v0.6.2)
```
echo "password" | eigenlayer operator keys create --key-type ecdsa [keyname]
```

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

To import an ECDSA key, use the command: `eigenlayer operator keys import --key-type ecdsa [keyname] [privatekey]`.

To import a BLS key, use the command: `eigenlayer operator keys import --key-type bls [keyname] [privatekey]`.

- `[keyname]` is the name of the imported key file, and it will be saved as `<keyname>.ecdsa.key.json` or `<keyname>.bls.key.json`.
- `privatekey` is the private key of the key you wish to import.
  - For BLS keys, it should be a large number.
  - For ECDSA keys, it should be in hex format.


You can also import keys by piping your password to this command. This can help in automated key creation and will not prompt for password. This support got added in [v0.6.2](https://github.com/Layr-Labs/eigenlayer-cli/releases/tag/v0.6.2)
```
echo "password" | eigenlayer operator keys import --key-type ecdsa [keyname] [privatekey]
```

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

This will initiate a password prompt that you can use to encrypt the keys. The keys will be stored on your local disk and will be displayed after they are created.

The private key will also be shown only once, enabling you to create a backup in case you forget the password or lose the key file.

### List Keys

This is the command you can use to retrieve a list of the keys you have created with the EigenLayer cli tool.

```
eigenlayer operator keys list
```

When you run the Eigenlayer operator keys list command, it will display a list of all the keys that were generated using this specific command, along with their corresponding public keys.

This information can be useful for managing and identifying the keys you've created. Public keys are typically used for encryption, authentication, and verifying digital signatures.

### Export keys
If you want to see the private key of the existing keys, you can use the below command. This will only work if your keys are in default location (`~/.eigenlayer/operator_keys`)

```
eigenlayer operator keys export --key-type ecdsa [keyname]
```

This will also prompt for the password used to encrypt the key.

If your keys is not in the default location, you can give the full path to the key file using --key-path flag. You don't need to provide the key name in that case.

```
eigenlayer operator keys export --key-type ecdsa --key-path [path]
```

---

## Fund ECDSA Wallet

Send **at least 1 ETH** to the “address” field referenced in your operator.yaml file. This ETH will be used to cover the gas cost for operator registration in the subsequent steps.

If you are deploying to Testnet, please follow the instructions in [Obtaining Testnet ETH](https://docs.eigenlayer.xyz/restaking-guides/testnet/obtaining-testnet-eth-and-liquid-staking-tokens-lsts) to fund a web3 wallet with HolEth.


---

## Operator Configuration and Registration


**Step 1:** Create the config files needed for operator registration using the below command:

```
eigenlayer operator config create
```

When prompted for operator address, make sure your operator address is same as the ecdsa key address you created/imported in key creation steps. 

The command will create two files: `operator.yaml` and `metadata.json`.

**Step 2:** Upload Logo Image, Configure `metadata.json`, and Upload Both

Upload the logo of the operator to a publicly accessible location and set the url in your `metadata.json` file. Operator registration only supports `.png` images for now and must be less than 1MB in size.

The `name` and `description` should comply with the regex mention [here](https://github.com/Layr-Labs/eigensdk-go/blob/master/utils/utils.go#L29). You can use services like https://regex101.com/ to validate your fields. 

Complete your the details in `metadata.json`.  The `metadata.json` must be less than 4KB in size. Upload the file to a publicly accessible location and set that url in `operator.yaml`. Please note that a **publicly accessible** metadata url is required for successful registration. An example operator.yaml file is provided for your reference here: [operator.yaml](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml) .


:::info
For Mainnet Operators - the `metadata.json` and operator logo .png files MUST be hosted via github.com repositories specifically. Caveat: **gist.github.com** hosted files are not permitted.
These requirements do not apply to Testnet Operators.
:::

:::warning
When using Github for hosting please ensure you link to the raw file ([example](https://raw.githubusercontent.com/Layr-Labs/eigenlayer-cli/master/pkg/operator/config/metadata-example.json)), rather than the github repo URL ([example](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/metadata-example.json)).
:::


**Step 3:** Configure RPC Node:  

The EigenLayer CLI requires access to an Ethereum RPC node in order to post registration. Please plan to either leverage an RPC node provider or run your own local RPC node to reference in operator.yaml.


Please find example lists of RPC node providers here:
- https://chainlist.org/
- https://www.alchemy.com/list-of/rpc-node-providers-on-ethereum


Ensure that your Operator server can reach your RPC provider at this point. You may run the following command from your Operator server:
`curl -I [your_server_url]`




**Step 4:** DelegationManager Contract Address

You must configure the correct DelegationManager contract address for your environment.
- Navigate to [EigenLayer Contracts: Deployments](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments) and locate the Proxy address for `DelegationManager` for your environment (Mainnet, Testnet).
- Set the value for `el_delegation_manager_address` in your operator config file to the address for your environment.


**Optional:** Set Delegation Approver

Operators have the option to set [delegationApprover](https://github.com/Layr-Labs/eigenlayer-contracts/blob/mainnet/src/contracts/interfaces/IDelegationManager.sol#L30) when they register. If the `delegationApprover` is set to a nonzero value, then the `delegationApprover` address will be required sign its approval of new delegations from Stakers to this Operator. If the default value is left as the zero address (0x000...) then all new delegations will be automatically approved without the need for any signature. Please see [delegationApprover Design Patterns](#delegationapprover-design-patterns) below for more detail.

 The EigenLayer Web App simulates transactions to check for contract reversions. If the delegate call will revert for any reason the button will be disabled.





**Step 5:** Registration Command

This is the command you can use to register your operator.

```
eigenlayer operator register operator.yaml
```

:::note
ECDSA key is required for operator registration. You may choose to either: 
* [_create_](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/README.md#create-keys) your own set of keys using the EigenLayer CLI (if you have not previously created keys).
* [_import_](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/README.md#import-keys) your existing keys (if you have previously created keys).
:::

---

## Checking Status of Registration

This is the command you can use to inquire about the registration status of your operator.

```
eigenlayer operator status operator.yaml
```

---

## Metadata Updates
### General metadata update
This is the command you can use to make changes or updates to the metadata of your operator. Post v0.9.0, this command will not update metadata uri. Please use [below](#update-metadata-uri-post-v090) command to update it. 

```
eigenlayer operator update operator.yaml
```

### Update metadata URI (Post v0.9.0)
In [v0.9.0](https://github.com/Layr-Labs/eigenlayer-cli/releases/tag/v0.9.0), we have introduced a new command to update metadata uri.

```
eigenlayer operator update-metadata-uri operator.yaml
```



## delegationApprover Design Patterns

Delegation Approver functionality can be used in multiple ways to give Operators additional programmatic control over which Restakers they accept delegation from.


### Passing Signatures from the DelegationApprover to Stakers

One series of designs involves passing a unique signature from the Operator to the Restaker requesting approval. The unique signature will have a corresponding ‘salt’ (unique value used once) and an ‘expiry’. The Restaker passes the signature (salt & expiry) into the `DelegationManager.delegateTo` function ([source here](https://github.com/Layr-Labs/eigenlayer-contracts/blob/mainnet/src/contracts/core/DelegationManager.sol#L135-L155)). This function uses EIP1271 to check the signature, so either:
- A) The Operator has set an EOA as their `delegationApprover` and the DelegationManager simply checks that the signature is a valid ECDSA signature from the EOA.
- OR B) The Operator has set a smart contract as their `delegationApprover` and the DelegationManager calls the isValidSignature function on the `delegationApprover` and checks if the contract returns `0x1626ba7e` (as defined in the [EIP-1271 specification](https://eips.ethereum.org/EIPS/eip-1271#specification)).

If the delegationApprover themself calls the DelegationManager.delegateToBySignature function, then they need to provide a [signature from the Restaker](https://github.com/Layr-Labs/eigenlayer-contracts/blob/mainnet/src/contracts/core/DelegationManager.sol#L157-L204). The approverSignatureAndExpiry input is ignored if the caller is themselves the delegationApprover. One potential drawback to this approach is the delegationApprover would pay the gas for the transaction.

#### Generating approval signatures using eigenlayer-cli
If you want to generate signatures for stakers using delegationApprover address, you can use eigenlayer-cli (>= v0.10.8) to generate those. Use the following command to generate the approval signature.
```bash
eigenlayer operator get-delegation-approval \
  --ecdsa-private-key <delegation-approval-address-private-key> \
  operator.yaml <staker-address>
  --
```
This command will generate a signature similar to the example below.
```bash
operator: 0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f
approverSignatureAndExpiry.signature: 0xd8af4e2d294d644a989a517583420037d9a089de23bb828b3c00e309e5c6517b236221a5af145cea9eeba59f24732bb410efa79bc840130724b2bf23640011271c
approverSignatureAndExpiry.expiry: 1729989609
approverSalt: 0xdca4f1809aeb9c0f7059e328d1e28b317efff44b4ae9c2de67a53af8865876d3
```
Provide these details to stakers so they can successfully delegate to the operator. By default, the salt’s expiry is set to 3600 seconds. To modify this, use the --expiry flag followed by the desired expiry value. You can also use `--path-to-key-store` flag instead of `--ecdsa-private-key` if you have your approval key as a keystore. We do NOT support web3signer or fireblocks for this operation. 

In case you want to generate the unsigned salt and sign it yourself, just skip passing any signer information
```bash
eigenlayer operator get-delegation-approval \
  operator.yaml <staker-address>
```
The following command generates the salt hash. Sign this hash with the delegation approval key, then pass the resulting signature to your stakers.
```bash
staker: 0x5f8C207382426D3f7F248E6321Cf93B34e66d6b9
operator: 0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f
_delegationApprover: 0x111116fE4F8C2f83E3eB2318F090557b7CD0BF76
approverSalt: 0x5a94beaf38876a825bc1a12ba0c1e290e28934b9f9748a754cf76e3d10ecef23
expiry: 1729990089

hash: 0x48d6bfbd7ebc9c106c060904b0c9066951349858f1390d566d5cd726600dd1e8 (sign this payload)
```

#### Whitelisting and Blacklisting Restakers for Delegation

If the Operator uses option B above, a smart contract for their `delegationApprover`, they can also maintain an approved whitelist. The contract can store a Merkle root of approved signature hashes and provide each Restaker with a Merkle proof when they delegate. [This branch](https://github.com/Layr-Labs/eigenlayer-contracts/blob/feat-example-operator-delegation-whitelist/src/contracts/examples/DelegationApproverWhitelist.sol) provides a  proof of concept (PoC)  of what such a smart contract could look like.

The example above could be modified to act as a “blacklist” by using Merkle proofs of non-inclusion instead of Merkle proofs of inclusion.






---

---
sidebar_position: 2
title: Allocate and Register to Operator Set
---

:::important
Before proceeding, review the [Slashing Concept](../../eigenlayer/concepts/slashing/slashing-concept.md) content for information on how Operator Sets, Allocations, and Redistribution work.

When participating in Redistributable Operator Sets, Operator metadata identifies an Operator as `Redistributable`. 
The metedata helps Stakers to assess risk, but might affect an Operator's staking appeal. Operators should weigh this profile
change against the potential for higher rewards from protocols with different risk and reward structures. 

In general, there is a larger incentive to slash when redistribution is enabled. Redistributable Operator Sets may offer higher rewards, 
but these should be considered against the increased slashing risks.
:::

Set Allocation Delay:

```
eigenlayer operator allocations set-delay <flags> <allocation-delay>
```

Before allocating for their first Operator Set, an Operator is required to set an `ALLOCATION_DELAY` in the `AllocationManager`. If an Operator is registering with EigenLayer for the first time, they will be required to provide an `ALLOCATION_DELAY` during registration. It takes the amount of time specified in the `ALLOCATION_CONFIGURATION_DELAY` for the Operator's `ALLOCATION_DELAY` to be set initially or updated. This delay is to ensure Stakers have time to adjust to changes in their delegated Operator’s stake allocations. Stakers can withdraw their funds if an allocation is viewed as undesirable, subject to the `WITHDRAWAL_DELAY`

Set Allocations per Operator Set and Strategy

```
eigenlayer operator allocations update 
	--network sepolia
	--operator-address <operator-address> 
	--csv-file updates.csv 
	--caller-address <address-of-caller>
```

Use the csv in the below format to set multiple allocations in one transaction, where update.csv will look like:

```
avs_address,operator_set_id,strategy_address,bips
0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f,2,0x4936BA8f0a04CcC2e49b8C9E42448c5cD04bF3f5,1200
0x2222AAC0C980Cc029624b7ff55B88Bc6F63C538f,1,0x4936BA8f0a04CcC2e49b8C9E42448c5cD04bF3f5,165
```

The bips you provide here will be the final bips of your total stake.

* If the bips is more than what is currently slashable, it will take effect after allocation delay time which you have set in Step 1  
* If the bips is less than what is currently slashable, it will take effect after a deallocation delay which is set by protocol and can’t be changed per operator.  
  * Mainnet \- 14 days in blocks.  
  * Testnet \- 5 min in blocks.

There can only be one allocation or deallocation per (operator, strategy, operator set) at a time. Once the pending allocations/deallocation completes then you can start another if you would like. 

View all your allocations with show command as below

```
eigenlayer operator allocations show 
	--network sepolia
	--operator-address <operator-address> 
	--strategy-addresses <comma-separated-strategy-addresses>

```

Register to Operator Set

```
eigenlayer operator register-operator-sets 
	--operator-address <operator-address> 
	--avs-address <avs-service-manager-address> 
	--operator-set-ids <comma-separated-list-of-operator-set-ids>
	--caller-address <address-of-caller>
```

De-register from Operator Sets
```
eigenlayer operator deregister-operator-sets 
	--operator-address <operator-address> 
	--avs-address <avs-address> 
	--operator-set-ids <comma-separated-list-of-operator-set-ids>
	--caller-address <address-of-caller>
```

Note: If you are deregistering from an operator set which has some active allocation bips, you will have to explicitly deallocate from that operator set using the \`eigenlayer operator allocations update\` command specified above. If you don’t do this, that amount of stake would be unavailable until it is deallocated. Once you deallocate then after deallocation delay it will be available.


---

---
sidebar_position: 7
title: Troubleshoot
---

# Troubleshooting

Before creating an issue with EigenLayer support please check this page to see if you can resolve your issues. If you are still stuck, please create a support ticket

#### Getting "no contract code at given address"

If you are getting this issue then either you are using a wrong rpc in your [operator.yaml](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L32) file or you have wrong smart contract address in your [config](https://github.com/Layr-Labs/eigenlayer-cli/blob/master/pkg/operator/config/operator-config-example.yaml#L25).

* Please make sure you have correct rpc node chosen for your network and that it is also reachable via your machine.

* Please find the correct smart contract addresses listed in the [Operator Installation](operator-installation.md) section.

#### How to resolve the error "No contract code at given address" imply?

Ensure that your operator is pointing to the correct RPC service and that it is accessible from your operator ([example](https://chainlist.org/)).

#### My operator's metadata (name, description, logo) is not showing up in the webapp
Please make sure to comply with our metadata [guidelines](operator-installation.md#operator-configuration-and-registration)

---

---
sidebar_position: 1
title: Add and Remove Admins
---

:::caution
Security of admin keys is critical. UAM enables appointees with lessened permissions, and use of keys that can be rotated or
destroyed. For more information on key management best practices, refer to [AVS Developer Security Best Practices](../../../developers/Reference/avs-developer-best-practices.md).

After an account has added an admin and the pending admin has accepted, the account address no
longer has default admin privileges. That is, the original account key of the Operator or AVS cannot be
used for write operations to the protocol, unless previously added as an admin, or is added back as admin in the future.
There is no superadmin role.

The removal of default admin privileges upon adding additional admins enables accounts
to perform a key rotation to remove permissions from a potentially compromised original key.

For an account to retain admin
privileges for its own address, add the account first as an admin. After the account is added as an admin, add other admins as needed.
:::

## Add an Admin Using EigenLayer CLI 

Admins are added via a 2-step process. To add an admin:
1. As the current admin (or account if no admin has been set), add the pending admin:

    `eigenlayer user admin add-pending-admin [options]` with:
    * `account-address` - Operator address for which admin is being added
    * `admin-address` - Admin address to be added
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.

2. As the pending admin, accept the admin:

    `eigenlayer user admin accept-admin [command options]` with: 
    * `account-address` - Operator address for which admin is being added
    * `accepter-address` - Address of admin accepting the pending invite 

## Remove an Admin Using EigenLayer CLI

The caller must be an admin. Once an account has added an admin, there must always be at least one admin for the account. 

To remove a pending admin before they have accepted:
 
`eigenlayer user admin remove-pending-admin [options]` with:
    * `account-address` - Operator address for pending admin
    * `admin-address` - Pending admin address to be removed
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.

To remove an admin:

`eigenlayer user admin remove-admin [options]` with:
    * `account-address` - Operator address for admin
    * `admin-address` - Admin address to be removed  
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
       Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
       Set to the address of the admin using the CLI.




---

---
sidebar_position: 1
title: Add and Remove Appointees
---

Only admins (or the account if no admin has been set) can add appointees. Unlike adding an admin, there is no requirement
for an appointee to accept the appointment.

For the list of contracts and functions that can have appointees set, refer to:
* [User Account Management](../../../developers/Concepts/uam-for-avs.md) for AVS
* [User Account Management](../../concepts/uam-for-operators.md) for Operators

## Add an Appointee Using EigenLayer CLI 

To add an appointee:

`eigenlayer user appointee set [options]` with:
    * `account-address` - Operator address for admin
    * `appointee-address` - Appointee address to have ability to call specified function granted
    * `caller-address` - Not required when using `--broadcast` or the admin using the CLI is the `account-address`.
      Must be specified if `--output-type` is `calldata` and the admin using the CLI is not the `account-address`.
      Set to the address of the admin using the CLI.
    * `selector` - Function for which to grant appointee ability to call. Use Etherscan to obtain the selector.
    * `target-address` - Contract address containing function for which appointee is being granted permission to call 
      (for example, `AllocationManager`). The contract addresses are published in the [core contracts](https://github.com/Layr-Labs/eigenlayer-contracts?tab=readme-ov-file#deployments) repository.

## Remove an Appointee Using EigenLayer CLI

To remove an appointee: 

` eigenlayer user appointee remove [options]`

With the same options as adding an appointee but the permission is being removed instead of granted.


---

---
sidebar_position: 7
title: Operator FAQ
---



#### Am I required to publicly host metadata url?

Yes. You are required to host the metadata url publicly. The `metadata` url should always be available and should return a proper json response like [this](https://holesky-operator-metadata.s3.amazonaws.com/metadata.json)

#### Am I required to publicly host logo in metadata json?

Yes. You are required to host the logo publicly like [this](https://holesky-operator-metadata.s3.amazonaws.com/eigenlayer.png)

#### Are there any restrictions to the logo image?

Yes. We only support `.png` format and we strictly check the content of image. If your image doesn't satisfy the requirement then the EigenLayer App will not display the logo of your operator.

#### What if I lose access to my keys?

When you [create/import](../howto/operator-installation.md#create-and-list-keys) keys for the first time, it will ask a password to encrypt keys and once created, it will also show plaintext private key. Please make sure to backup the private key and the password. If you lose both you won't be able to get your keys back. If you lose the plaintext private key and still have your password you can run the export command to get your plaintext private key.

#### What is my operator address?

After you [create/import](../howto/operator-installation.md#create-and-list-keys) ecdsa key you will be shown below log message

```
? Enter password to encrypt the ecdsa private key:
ECDSA Private Key (Hex):  b3eba201405d5b5f7aaa9adf6bb734dc6c0f448ef64dd39df80ca2d92fca6d7b
Please backup the above private key hex in safe place.

Key location: /home/ubuntu/.eigenlayer/operator_keys/test.ecdsa.key.json
Public Key hex:  f87ee475109c2943038b3c006b8a004ee17bebf3357d10d8f63ef202c5c28723906533dccfda5d76c1da0a9f05cc6d32085ca1af8aaab5a28171474b1ad0aa68
Ethereum Address 0x6a8c0D554a694899041E52a91B4EC3Ff23d8aBD5
```

Your operator address is the `Ethereum Address` in the logs.

#### What if I want to change the password of my encrypted keys?

If you want to change the password of your encrypted keys, you have two options based on what information you have readily available:

1. If you know your private keys then you can just re-import and when importing, choose a different name and the new password.
2. If you don't know your private keys, you can get them using export. Once you have the private keys you can use option 1 to re-import.

#### What if I want to deactivate/deregister my operator from EigenLayer?

Currently, there's no way to deregister your operator but you can
update the name of your operator in metadata url to be `Deactivated` or something similar. This will help display your operator as not active on the webapp.

#### Is there a limit to the number of AVSs that an Operator can opt-in to?

There is no limit on the number of AVSs that an Operator can opt-in to. However, the Operator needs to ensure they have sufficient infrastructure capacity for the AVSs they opt-in to.



#### What is the process for rotating the keys for an existing operator? How can I register again and carry over the stake to a new key?

This operation is not supported at this time.
