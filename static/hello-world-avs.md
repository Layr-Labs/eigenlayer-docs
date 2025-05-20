This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where content has been compressed (code blocks are separated by ⋮---- delimiter).

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  workflows/
    ci_rust.yaml
    ci_ts.yml
    foundry.yml
    rewards-scripts-check.yaml
abis/
  ECDSAStakeRegistry.json
  HelloWorldServiceManager.json
  IAVSDirectory.json
  IDelegationManager.json
contracts/
  anvil/
    build-state.sh
    deploy-el.sh
    deploy-helloworld.sh
  config/
    core/
      31337.json
    hello-world/
      31337.json
  mocks/
    MockStrategy.sol
  script/
    utils/
      CoreDeploymentParsingLib.sol
      HelloWorldDeploymentLib.sol
      SetupDistributionsLib.sol
      UpgradeableProxyLib.sol
    DeployEigenLayerCore.s.sol
    HelloWorldDeployer.s.sol
    SetupDistributions.s.sol
  src/
    HelloWorldServiceManager.sol
    IHelloWorldServiceManager.sol
  test/
    mockData/
      config/
        core/
          1337.json
        hello-world/
          1337.json
      deployments/
        core/
          1337.json
        hello-world/
          1337.json
      scratch/
        31337.json
        payment_info.json
        payments_test.json
        payments.json
    CoreDeploymentLib.t.sol
    ERC20Mock.sol
    HelloWorldServiceManager.t.sol
    SetupPaymentsLib.t.sol
  .env.example
  .gitignore
  foundry.toml
docs/
  FAQ.md
  nix-setup-guide.md
operator/
  rust/
    crates/
      operator/
        src/
          anvil.rs
          challenger.rs
          lib.rs
          spam_tasks.rs
          start_operator.rs
        Cargo.toml
      utils/
        src/
          bindings/
            ecdsastakeregistry.rs
            helloworldservicemanager.rs
            mod.rs
          lib.rs
        Cargo.toml
  createNewTasks.ts
  e2e.test.ts
  index.ts
scripts/
  rewards-script-check.sh
utils/
  abis.js
.dockerignore
.env.example
.gitignore
.gitmodules
Cargo.toml
Dockerfile
flake.lock
flake.nix
jest.config.ts
LICENSE
Makefile
package.json
README.md
rust-toolchain.toml
tsconfig.json
```

# Files

## File: .github/workflows/ci_rust.yaml
````yaml
name: Build Rust CI

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["**"]

env:
  RUST_VERSION: 1.80

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout sources
        uses: actions/checkout@v4

      - name: Rustup toolchain install
        uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: ${{ env.RUST_VERSION }}

      - name: Caching
        uses: Swatinem/rust-cache@v2

      - name: Run cargo build
        run: |
          cargo build
      
      - name: Run cargo clippy
        run: |
          cargo clippy --all-targets --all-features -- -D warnings

      - name: Run cargo fmt
        run: |
          cargo fmt --all -- --check

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Rustup toolchain install
        uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: ${{ env.RUST_VERSION }}
    
      - name: Caching
        uses: Swatinem/rust-cache@v2
          
      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: v0.3.0

      - name: Run anvil with deployed contracts
        run: |
          make build-anvil-state-with-deployed-contracts

      - name: Run tests
        run: cargo test --workspace
````

## File: .github/workflows/ci_ts.yml
````yaml
name: Build Typescript CI

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["**"]

env:
  NODE_VERSION: 20

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install packages
        run: npm install

      - name: Build project
        run: npm run build
````

## File: .github/workflows/foundry.yml
````yaml
name: Foundry project

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - '*'

jobs:
  check-fmt:
    defaults:
      run:
        working-directory: ./contracts

    name: Check contract formatting
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: nightly

      - name: Print forge version
        run: forge --version

      - name: Check contract formatting
        run: forge fmt --check

  test:
    defaults:
      run:
        working-directory: ./contracts

    name: Foundry project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: nightly

      - name: Print forge version
        run: forge --version

      - name: Run Forge build
        run: forge build --optimize --optimizer-runs 200 --via-ir --sizes

      - name: Run Forge tests
        run: forge test -vvv
````

## File: .github/workflows/rewards-scripts-check.yaml
````yaml
name: rewards-scripts-check

on:
  push:
    branches:
      - master
  pull_request:

jobs:  
  Test:
    name: Rewards Scripts Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: stable

      - name: Install forge dependencies
        run: forge install
        working-directory: ./contracts

      - name: Copy .env.example to .env
        run: cp contracts/.env.example contracts/.env

      - name: Test
        run: ./scripts/rewards-script-check.sh
````

## File: abis/ECDSAStakeRegistry.json
````json
[
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_delegationManager",
        "type": "address",
        "internalType": "contract IDelegationManager"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperator",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getLastCheckpointOperatorWeight",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointThresholdWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointThresholdWeightAtBlock",
    "inputs": [
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointTotalWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointTotalWeightAtBlock",
    "inputs": [
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLatestOperatorSigningKey",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorSigningKeyAtBlock",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "blockNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorWeight",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorWeightAtBlock",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "_serviceManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quorum",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isValidSignature",
    "inputs": [
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "_signatureData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minimumWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "operatorRegistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "quorum",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerOperatorWithSignature",
    "inputs": [
      {
        "name": "operatorSignature",
        "type": "tuple",
        "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "salt",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "signingKey",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateMinimumWeight",
    "inputs": [
      {
        "name": "newMinimumWeight",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperatorSigningKey",
    "inputs": [
      {
        "name": "newSigningKey",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperators",
    "inputs": [
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperatorsForQuorum",
    "inputs": [
      {
        "name": "operatorsPerQuorum",
        "type": "address[][]",
        "internalType": "address[][]"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateQuorumConfig",
    "inputs": [
      {
        "name": "quorum",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      },
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateStakeThreshold",
    "inputs": [
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MinimumWeightUpdated",
    "inputs": [
      {
        "name": "previous",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "current",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorDeregistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorRegistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorWeightUpdated",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "oldWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "QuorumUpdated",
    "inputs": [
      {
        "name": "previous",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      },
      {
        "name": "current",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SigningKeyUpdate",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "updateBlock",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "newSigningKey",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "oldSigningKey",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ThresholdWeightUpdated",
    "inputs": [
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TotalWeightUpdated",
    "inputs": [
      {
        "name": "oldTotalWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newTotalWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UpdateMinimumWeight",
    "inputs": [
      {
        "name": "oldMinimumWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newMinimumWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InsufficientSignedStake",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientWeight",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidLength",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidQuorum",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidReferenceBlock",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSignedWeight",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidThreshold",
    "inputs": []
  },
  {
    "type": "error",
    "name": "LengthMismatch",
    "inputs": []
  },
  {
    "type": "error",
    "name": "MustUpdateAllOperators",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotSorted",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorAlreadyRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorNotRegistered",
    "inputs": []
  }
]
````

## File: abis/HelloWorldServiceManager.json
````json
[
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_avsDirectory",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_stakeRegistry",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_rewardsCoordinator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_delegationManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_allocationManager",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addPendingAdmin",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "allTaskHashes",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allTaskResponses",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allocationManager",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "avsDirectory",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createAVSRewardsSubmission",
    "inputs": [
      {
        "name": "rewardsSubmissions",
        "type": "tuple[]",
        "internalType": "struct IRewardsCoordinatorTypes.RewardsSubmission[]",
        "components": [
          {
            "name": "strategiesAndMultipliers",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.StrategyAndMultiplier[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          },
          {
            "name": "token",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startTimestamp",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "duration",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createNewTask",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createOperatorDirectedAVSRewardsSubmission",
    "inputs": [
      {
        "name": "operatorDirectedRewardsSubmissions",
        "type": "tuple[]",
        "internalType": "struct IRewardsCoordinatorTypes.OperatorDirectedRewardsSubmission[]",
        "components": [
          {
            "name": "strategiesAndMultipliers",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.StrategyAndMultiplier[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          },
          {
            "name": "token",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "operatorRewards",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.OperatorReward[]",
            "components": [
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "startTimestamp",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "duration",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperatorFromAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperatorFromOperatorSets",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operatorSetIds",
        "type": "uint32[]",
        "internalType": "uint32[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getOperatorRestakedStrategies",
    "inputs": [
      {
        "name": "_operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRestakeableStrategies",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_rewardsInitiator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "latestTaskNum",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerOperatorToAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operatorSignature",
        "type": "tuple",
        "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "salt",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAdmin",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAppointee",
    "inputs": [
      {
        "name": "appointee",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "selector",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removePendingAdmin",
    "inputs": [
      {
        "name": "pendingAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "respondToTask",
    "inputs": [
      {
        "name": "task",
        "type": "tuple",
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      },
      {
        "name": "referenceTaskIndex",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rewardsInitiator",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setAVSRegistrar",
    "inputs": [
      {
        "name": "registrar",
        "type": "address",
        "internalType": "contract IAVSRegistrar"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setAppointee",
    "inputs": [
      {
        "name": "appointee",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "selector",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setClaimerFor",
    "inputs": [
      {
        "name": "claimer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRewardsInitiator",
    "inputs": [
      {
        "name": "newRewardsInitiator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stakeRegistry",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateAVSMetadataURI",
    "inputs": [
      {
        "name": "_metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewTaskCreated",
    "inputs": [
      {
        "name": "taskIndex",
        "type": "uint32",
        "indexed": true,
        "internalType": "uint32"
      },
      {
        "name": "task",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RewardsInitiatorUpdated",
    "inputs": [
      {
        "name": "prevRewardsInitiator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "newRewardsInitiator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskResponded",
    "inputs": [
      {
        "name": "taskIndex",
        "type": "uint32",
        "indexed": true,
        "internalType": "uint32"
      },
      {
        "name": "task",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "DelayPeriodNotPassed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyRegistryCoordinator",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyRewardsInitiator",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyStakeRegistry",
    "inputs": []
  }
]
````

## File: abis/IAVSDirectory.json
````json
[
  {
    "type": "function",
    "name": "OPERATOR_AVS_REGISTRATION_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "OPERATOR_SET_REGISTRATION_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateOperatorAVSRegistrationDigestHash",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "expiry",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cancelSalt",
    "inputs": [
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperatorFromAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "initialPausedStatus",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "operatorSaltIsSpent",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerOperatorToAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operatorSignature",
        "type": "tuple",
        "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "salt",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateAVSMetadataURI",
    "inputs": [
      {
        "name": "metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "AVSMetadataURIUpdated",
    "inputs": [
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorAVSRegistrationStatusUpdated",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "status",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum IAVSDirectoryTypes.OperatorAVSRegistrationStatus"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InvalidSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorAlreadyRegisteredToAVS",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorNotRegisteredToAVS",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorNotRegisteredToEigenLayer",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SaltSpent",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SignatureExpired",
    "inputs": []
  }
]
````

## File: abis/IDelegationManager.json
````json
[
  {
    "type": "function",
    "name": "DELEGATION_APPROVAL_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "beaconChainETHStrategy",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IStrategy"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "burnOperatorShares",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "internalType": "contract IStrategy"
      },
      {
        "name": "prevMaxMagnitude",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "newMaxMagnitude",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "calculateDelegationApprovalDigestHash",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_delegationApprover",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "approverSalt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "expiry",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateWithdrawalRoot",
    "inputs": [
      {
        "name": "withdrawal",
        "type": "tuple",
        "internalType": "struct IDelegationManagerTypes.Withdrawal",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "completeQueuedWithdrawal",
    "inputs": [
      {
        "name": "withdrawal",
        "type": "tuple",
        "internalType": "struct IDelegationManagerTypes.Withdrawal",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      },
      {
        "name": "tokens",
        "type": "address[]",
        "internalType": "contract IERC20[]"
      },
      {
        "name": "receiveAsTokens",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "completeQueuedWithdrawals",
    "inputs": [
      {
        "name": "withdrawals",
        "type": "tuple[]",
        "internalType": "struct IDelegationManagerTypes.Withdrawal[]",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      },
      {
        "name": "tokens",
        "type": "address[][]",
        "internalType": "contract IERC20[][]"
      },
      {
        "name": "receiveAsTokens",
        "type": "bool[]",
        "internalType": "bool[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "convertToDepositShares",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategies",
        "type": "address[]",
        "internalType": "contract IStrategy[]"
      },
      {
        "name": "withdrawableShares",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cumulativeWithdrawalsQueued",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decreaseDelegatedShares",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "curDepositShares",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "beaconChainSlashingFactorDecrease",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "delegateTo",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "approverSignatureAndExpiry",
        "type": "tuple",
        "internalType": "struct ISignatureUtils.SignatureWithExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "approverSalt",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "delegatedTo",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "delegationApprover",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "delegationApproverSaltIsSpent",
    "inputs": [
      {
        "name": "_delegationApprover",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "depositScalingFactor",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "internalType": "contract IStrategy"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDepositedShares",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "contract IStrategy[]"
      },
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorShares",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategies",
        "type": "address[]",
        "internalType": "contract IStrategy[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorsShares",
    "inputs": [
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "strategies",
        "type": "address[]",
        "internalType": "contract IStrategy[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[][]",
        "internalType": "uint256[][]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getQueuedWithdrawal",
    "inputs": [
      {
        "name": "withdrawalRoot",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IDelegationManagerTypes.Withdrawal",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getQueuedWithdrawalRoots",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getQueuedWithdrawals",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "withdrawals",
        "type": "tuple[]",
        "internalType": "struct IDelegationManagerTypes.Withdrawal[]",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      },
      {
        "name": "shares",
        "type": "uint256[][]",
        "internalType": "uint256[][]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSlashableSharesInQueue",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "internalType": "contract IStrategy"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWithdrawableShares",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategies",
        "type": "address[]",
        "internalType": "contract IStrategy[]"
      }
    ],
    "outputs": [
      {
        "name": "withdrawableShares",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "depositShares",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "increaseDelegatedShares",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "internalType": "contract IStrategy"
      },
      {
        "name": "prevDepositShares",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "addedShares",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "initialPausedStatus",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isDelegated",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isOperator",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minWithdrawalDelayBlocks",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "modifyOperatorDetails",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "newDelegationApprover",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "queueWithdrawals",
    "inputs": [
      {
        "name": "params",
        "type": "tuple[]",
        "internalType": "struct IDelegationManagerTypes.QueuedWithdrawalParams[]",
        "components": [
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "depositShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "__deprecated_withdrawer",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "redelegate",
    "inputs": [
      {
        "name": "newOperator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "newOperatorApproverSig",
        "type": "tuple",
        "internalType": "struct ISignatureUtils.SignatureWithExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "approverSalt",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "withdrawalRoots",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerAsOperator",
    "inputs": [
      {
        "name": "initDelegationApprover",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allocationDelay",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "undelegate",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "withdrawalRoots",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperatorMetadataURI",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "DelegationApproverUpdated",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newDelegationApprover",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DepositScalingFactorUpdated",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "indexed": false,
        "internalType": "contract IStrategy"
      },
      {
        "name": "newDepositScalingFactor",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorMetadataURIUpdated",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorRegistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "delegationApprover",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorSharesBurned",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "indexed": false,
        "internalType": "contract IStrategy"
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorSharesDecreased",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "staker",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "indexed": false,
        "internalType": "contract IStrategy"
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorSharesIncreased",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "staker",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "strategy",
        "type": "address",
        "indexed": false,
        "internalType": "contract IStrategy"
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SlashingWithdrawalCompleted",
    "inputs": [
      {
        "name": "withdrawalRoot",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SlashingWithdrawalQueued",
    "inputs": [
      {
        "name": "withdrawalRoot",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "withdrawal",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IDelegationManagerTypes.Withdrawal",
        "components": [
          {
            "name": "staker",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "delegatedTo",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "withdrawer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startBlock",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "strategies",
            "type": "address[]",
            "internalType": "contract IStrategy[]"
          },
          {
            "name": "scaledShares",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      },
      {
        "name": "sharesToWithdraw",
        "type": "uint256[]",
        "indexed": false,
        "internalType": "uint256[]"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StakerDelegated",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StakerForceUndelegated",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StakerUndelegated",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ActivelyDelegated",
    "inputs": []
  },
  {
    "type": "error",
    "name": "CallerCannotUndelegate",
    "inputs": []
  },
  {
    "type": "error",
    "name": "FullySlashed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InputArrayLengthMismatch",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InputArrayLengthZero",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotActivelyDelegated",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyAllocationManager",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyEigenPodManager",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyStrategyManagerOrEigenPodManager",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorNotRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorsCannotUndelegate",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SaltSpent",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SignatureExpired",
    "inputs": []
  },
  {
    "type": "error",
    "name": "WithdrawalDelayNotElapsed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "WithdrawalNotQueued",
    "inputs": []
  },
  {
    "type": "error",
    "name": "WithdrawerNotCaller",
    "inputs": []
  }
]
````

## File: contracts/anvil/build-state.sh
````bash
#!/usr/bin/env bash

set -e

STATE_FILE="contracts/anvil/state.json"

mkdir -p "$(dirname "$STATE_FILE")"

echo "Starting Anvil with state dump in background"
anvil --dump-state "$STATE_FILE" --port 8545 --base-fee 0 --gas-price 0 > /dev/null 2>&1 &
ANVIL_PID=$!

sleep 3

cp .env.example .env
cp contracts/.env.example contracts/.env

echo "Building contracts"
make build-contracts > /dev/null 2>&1

echo "Deploying EigenLayer contracts."
make deploy-eigenlayer-contracts > /dev/null 2>&1

echo "Deploying HelloWorld contracts."
make deploy-helloworld-contracts > /dev/null 2>&1

echo "Killed Anvil"
kill $ANVIL_PID || true
````

## File: contracts/anvil/deploy-el.sh
````bash
#!/usr/bin/env bash

set -e

RPC_URL=http://localhost:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# cd to the directory of this script so that this can be run from anywhere
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
cd "$parent_path"

cd ../

forge script script/DeployEigenLayerCore.s.sol --rpc-url http://localhost:8545 --broadcast
````

## File: contracts/anvil/deploy-helloworld.sh
````bash
#!/usr/bin/env bash

set -e

RPC_URL=http://localhost:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# cd to the directory of this script so that this can be run from anywhere
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
cd "$parent_path"

cd ../

forge script script/HelloWorldDeployer.s.sol --rpc-url http://localhost:8545 --broadcast
````

## File: contracts/config/core/31337.json
````json
{
  "strategyManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "initialStrategyWhitelister": "0x959922be3caee4b8cd9a407cc3ac1c251c2007b1"
  },
  "delegationManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "minWithdrawalDelayBlocks": 50400
  },
  "eigenPodManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "allocationManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "deallocationDelay": 0,
    "allocationConfigurationDelay": 0
  },
  "strategyFactory": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "avsDirectory": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "rewardsCoordinator": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "rewardsUpdater": "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "activationDelay": 0,
    "defaultSplitBips": 1000,
    "calculationIntervalSeconds": 86400,
    "maxRewardsDuration": 864000,
    "maxRetroactiveLength": 432000,
    "maxFutureLength": 86400,
    "genesisRewardsTimestamp": 1672531200
  }
}
````

## File: contracts/config/hello-world/31337.json
````json
{
  "addresses": {
    "rewardsOwner": "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "rewardsInitiator": "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
  },
  "keys": {
    "rewardsOwner": "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97",
    "rewardsInitiator": "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6"
  }
}
````

## File: contracts/mocks/MockStrategy.sol
````
// SPDX-License-Identifier: BUSL-1.1
⋮----
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@eigenlayer/contracts/interfaces/IStrategy.sol";
⋮----
contract MockStrategy is IStrategy {
⋮----
uint256 public constant EXCHANGE_RATE = 1e18; // 1:1 exchange rate for simplicity
⋮----
emit StrategyTokenSet(_underlyingToken, 18); // Assuming 18 decimals for simplicity
⋮----
function deposit(IERC20 token, uint256 amount) external override returns (uint256) {
⋮----
function withdraw(address recipient, IERC20 token, uint256 amountShares) external override {
⋮----
function sharesToUnderlying(uint256 amountShares) external pure override returns (uint256) {
⋮----
function underlyingToShares(uint256 amountUnderlying) external pure override returns (uint256) {
⋮----
function userUnderlying(address user) external view override returns (uint256) {
⋮----
function shares(address user) external view override returns (uint256) {
⋮----
function sharesToUnderlyingView(uint256 amountShares) external pure override returns (uint256) {
⋮----
function underlyingToSharesView(uint256 amountUnderlying) external pure override returns (uint256) {
⋮----
function userUnderlyingView(address user) external view override returns (uint256) {
⋮----
function explanation() external pure override returns (string memory) {
````

## File: contracts/script/utils/CoreDeploymentParsingLib.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {TransparentUpgradeableProxy} from
    "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import {console2} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {DelegationManager} from "@eigenlayer/contracts/core/DelegationManager.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";
import {AVSDirectory} from "@eigenlayer/contracts/core/AVSDirectory.sol";
import {EigenPodManager} from "@eigenlayer/contracts/pods/EigenPodManager.sol";
import {RewardsCoordinator} from "@eigenlayer/contracts/core/RewardsCoordinator.sol";
import {StrategyBase} from "@eigenlayer/contracts/strategies/StrategyBase.sol";
import {EigenPod} from "@eigenlayer/contracts/pods/EigenPod.sol";
import {IETHPOSDeposit} from "@eigenlayer/contracts/interfaces/IETHPOSDeposit.sol";
import {StrategyBaseTVLLimits} from "@eigenlayer/contracts/strategies/StrategyBaseTVLLimits.sol";
import {PauserRegistry} from "@eigenlayer/contracts/permissions/PauserRegistry.sol";
import {IStrategy} from "@eigenlayer/contracts/interfaces/IStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISignatureUtilsMixin} from "@eigenlayer/contracts/interfaces/ISignatureUtilsMixin.sol";
import {IDelegationManager} from "@eigenlayer/contracts/interfaces/IDelegationManager.sol";
import {IBeacon} from "@openzeppelin/contracts/proxy/beacon/IBeacon.sol";
import {IStrategyManager} from "@eigenlayer/contracts/interfaces/IStrategyManager.sol";
import {ISlasher} from "@eigenlayer-middleware/src/interfaces/ISlasher.sol";
import {IEigenPodManager} from "@eigenlayer/contracts/interfaces/IEigenPodManager.sol";
import {IAVSDirectory} from "@eigenlayer/contracts/interfaces/IAVSDirectory.sol";
import {IPauserRegistry} from "@eigenlayer/contracts/interfaces/IPauserRegistry.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
⋮----
import {UpgradeableProxyLib} from "./UpgradeableProxyLib.sol";
import {CoreDeployLib} from "@eigenlayer-middleware/test/utils/CoreDeployLib.sol";
⋮----
function readDeploymentConfigValues(
⋮----
// StrategyManager start
⋮----
// StrategyManager config end
⋮----
// DelegationManager config start
⋮----
// DelegationManager config end
⋮----
// EigenPodManager config start
⋮----
// EigenPodManager config end
⋮----
// AllocationManager config start
⋮----
// AllocationManager config end
⋮----
// StrategyFactory config start
⋮----
// StrategyFactory config end
⋮----
// AVSDirectory config start
⋮----
// AVSDirectory config end
⋮----
// RewardsCoordinator config start
⋮----
// RewardsCoordinator config end
⋮----
function readDeploymentJson(
⋮----
/// TODO: Need to be able to read json from eigenlayer-contracts repo for holesky/mainnet and output the json here
function writeDeploymentJson(
⋮----
function _generateDeploymentJson(
⋮----
function _generateContractsJson(
⋮----
/// TODO: namespace contracts -> {avs, core}
````

## File: contracts/script/utils/HelloWorldDeploymentLib.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {TransparentUpgradeableProxy} from
    "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {ECDSAStakeRegistry} from "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import {HelloWorldServiceManager} from "../../src/HelloWorldServiceManager.sol";
import {IDelegationManager} from "@eigenlayer/contracts/interfaces/IDelegationManager.sol";
import {IECDSAStakeRegistryTypes} from
    "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistry.sol";
import {UpgradeableProxyLib} from "./UpgradeableProxyLib.sol";
import {CoreDeployLib, CoreDeploymentParsingLib} from "./CoreDeploymentParsingLib.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
⋮----
function deployContracts(
⋮----
// First, deploy upgradeable proxy contracts that will point to the implementations.
⋮----
function deployAndUpgradeStakeRegistryImpl(
⋮----
function deployAndUpgradeServiceManagerImpl(
⋮----
function readDeploymentJson(
⋮----
/// TODO: 2 Step for reading deployment json.  Read to the core and the AVS data
⋮----
/// write to default output path
function writeDeploymentJson(
⋮----
function readDeploymentConfigValues(
⋮----
function _generateDeploymentJson(
⋮----
function _generateContractsJson(
````

## File: contracts/script/utils/SetupDistributionsLib.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {
    IRewardsCoordinator,
    IRewardsCoordinatorTypes
} from "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
import {IStrategy} from "eigenlayer-contracts/src/contracts/interfaces/IStrategyManager.sol";
import {ECDSAServiceManagerBase} from
    "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import {Vm} from "forge-std/Vm.sol";
import {console} from "forge-std/console.sol";
⋮----
function createAVSRewardsSubmissions(
⋮----
function createOperatorDirectedAVSRewardsSubmissions(
⋮----
function processClaim(
⋮----
//we only have one token leaf
⋮----
// this workflow assumes a new root submitted for every payment claimed.  So we get the latest rood index to process a claim for
⋮----
function submitRoot(
⋮----
function createPaymentRoot(
⋮----
function createEarnerLeaves(
⋮----
function createTokenRoot(
⋮----
function createTokenLeaves(
⋮----
function defaultTokenLeaf(
⋮----
function writeLeavesToJson(
⋮----
function parseLeavesFromJson(
⋮----
function generateMerkleProof(
⋮----
/**
     * @notice this function returns the merkle root of a tree created from a set of leaves using keccak256 as its hash function
     *  @param leaves the leaves of the merkle tree
     *  @return The computed Merkle root of the tree.
     *  @dev This pads to the next power of 2. very inefficient! just for POC
     */
function merkleizeKeccak(
⋮----
// uint256 paddedLength = 2;
// while(paddedLength < leaves.length) {
//     paddedLength <<= 1;
// }
⋮----
// bytes32[] memory paddedLeaves = new bytes32[](paddedLength);
// for (uint256 i = 0; i < leaves.length; i++) {
//     paddedLeaves[i] = leaves[i];
⋮----
//there are half as many nodes in the layer above the leaves
⋮----
//create a layer to store the internal nodes
⋮----
//fill the layer with the pairwise hashes of the leaves
⋮----
//the next layer above has half as many nodes
⋮----
//while we haven't computed the root
⋮----
//overwrite the first numNodesInLayer nodes in layer with the pairwise hashes of their children
⋮----
//the first node in the layer is the root
⋮----
function padLeaves(
````

## File: contracts/script/utils/UpgradeableProxyLib.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {Vm} from "forge-std/Vm.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {
    ITransparentUpgradeableProxy,
    TransparentUpgradeableProxy
} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {EmptyContract} from "@eigenlayer/test/mocks/EmptyContract.sol";
⋮----
function deployProxyAdmin() internal returns (address) {
⋮----
function setUpEmptyProxy(
⋮----
function upgrade(address proxy, address impl) internal {
⋮----
function upgradeAndCall(address proxy, address impl, bytes memory initData) internal {
⋮----
function getImplementation(
⋮----
function getProxyAdmin(
````

## File: contracts/script/DeployEigenLayerCore.s.sol
````
// SPDX-License-Identifier: BUSL-1.1
⋮----
import {Script} from "forge-std/Script.sol";
⋮----
import {CoreDeployLib, CoreDeploymentParsingLib} from "./utils/CoreDeploymentParsingLib.sol";
import {UpgradeableProxyLib} from "./utils/UpgradeableProxyLib.sol";
⋮----
import {IRewardsCoordinator} from "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";
⋮----
import "forge-std/Test.sol";
⋮----
contract DeployEigenLayerCore is Script, Test {
⋮----
function setUp() public virtual {
⋮----
function run() external {
⋮----
//set the rewards updater to the deployer address for payment flow
⋮----
// TODO: the deployer lib should probably do this
````

## File: contracts/script/HelloWorldDeployer.s.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/Test.sol";
import {HelloWorldDeploymentLib} from "./utils/HelloWorldDeploymentLib.sol";
import {CoreDeployLib, CoreDeploymentParsingLib} from "./utils/CoreDeploymentParsingLib.sol";
import {UpgradeableProxyLib} from "./utils/UpgradeableProxyLib.sol";
import {StrategyBase} from "@eigenlayer/contracts/strategies/StrategyBase.sol";
import {ERC20Mock} from "../test/ERC20Mock.sol";
import {TransparentUpgradeableProxy} from
    "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";
import {IRewardsCoordinator} from "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
⋮----
import {
    IECDSAStakeRegistryTypes,
    IStrategy
} from "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistry.sol";
⋮----
import "forge-std/Test.sol";
⋮----
contract HelloWorldDeployer is Script, Test {
⋮----
function setUp() public virtual {
⋮----
function run() external {
⋮----
// NOTE: if this fails, it's because the initialStrategyWhitelister is not set to be the StrategyFactory
⋮----
function verifyDeployment() internal view {
````

## File: contracts/script/SetupDistributions.s.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {Script} from "forge-std/Script.sol";
import {HelloWorldDeploymentLib} from "./utils/HelloWorldDeploymentLib.sol";
import {CoreDeployLib, CoreDeploymentParsingLib} from "./utils/CoreDeploymentParsingLib.sol";
import {SetupDistributionsLib} from "./utils/SetupDistributionsLib.sol";
import {IRewardsCoordinator} from "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
import {RewardsCoordinator} from "@eigenlayer/contracts/core/RewardsCoordinator.sol";
import {IStrategy} from "@eigenlayer/contracts/interfaces/IStrategy.sol";
import {ERC20Mock} from "../test/ERC20Mock.sol";
⋮----
import "forge-std/Test.sol";
⋮----
contract SetupDistributions is Script, Test {
⋮----
//duration MUST be a multiple of CALCULATION_INTERVAL_SECONDS .
//https://github.com/Layr-Labs/eigenlayer-contracts/blob/865e723a6b5c634cf45cce1817dec0ea95f0e03b/src/contracts/core/RewardsCoordinator.sol#L439
⋮----
function setUp() public {
⋮----
// TODO: Get the filePath from config
⋮----
function run() external {
⋮----
// Go back 4 days
⋮----
// Start Timestamp must be a multiple of CALCULATION_INTERVAL_SECONDS
⋮----
// sets a multiplier based on block number such that cumulativeEarnings increase accordingly for multiple runs of this script in the same session
⋮----
function runOperatorDirected() external {
⋮----
function executeProcessClaim() public {
⋮----
function createAVSRewardsSubmissions(
⋮----
function createOperatorDirectedAVSRewardsSubmissions(
⋮----
function processClaim(
⋮----
function submitPaymentRoot(
⋮----
function _getEarnerLeaves(
⋮----
function _getEarners(
````

## File: contracts/src/HelloWorldServiceManager.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {ECDSAServiceManagerBase} from
    "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import {ECDSAStakeRegistry} from "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import {IServiceManager} from "@eigenlayer-middleware/src/interfaces/IServiceManager.sol";
import {ECDSAUpgradeable} from
    "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
import {IERC1271Upgradeable} from
    "@openzeppelin-upgrades/contracts/interfaces/IERC1271Upgradeable.sol";
import {IHelloWorldServiceManager} from "./IHelloWorldServiceManager.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
import {IAllocationManager} from "@eigenlayer/contracts/interfaces/IAllocationManager.sol";
import {TransparentUpgradeableProxy} from
    "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
⋮----
/**
 * @title Primary entrypoint for procuring services from HelloWorld.
 * @author Eigen Labs, Inc.
 */
contract HelloWorldServiceManager is ECDSAServiceManagerBase, IHelloWorldServiceManager {
⋮----
// mapping of task indices to all tasks hashes
// when a task is created, task hash is stored here,
// and responses need to pass the actual task,
// which is hashed onchain and checked against this mapping
⋮----
// mapping of task indices to hash of abi.encode(taskResponse, taskResponseMetadata)
⋮----
// mapping of task indices to task status (true if task has been responded to, false otherwise)
// TODO: use bitmap?
⋮----
// max interval in blocks for responding to a task
// operators can be penalized if they don't respond in time
⋮----
modifier onlyOperator() {
⋮----
function initialize(address initialOwner, address _rewardsInitiator) external initializer {
⋮----
// These are just to comply with IServiceManager interface
function addPendingAdmin(
⋮----
function removePendingAdmin(
⋮----
function removeAdmin(
⋮----
function setAppointee(address appointee, address target, bytes4 selector) external onlyOwner {}
⋮----
function removeAppointee(
⋮----
function deregisterOperatorFromOperatorSets(
⋮----
// unused
⋮----
/* FUNCTIONS */
// NOTE: this function creates new task, assigns it a taskId
function createNewTask(
⋮----
// create a new task struct
⋮----
// store hash of task onchain, emit event, and increase taskNum
⋮----
function respondToTask(
⋮----
// check that the task is valid, hasn't been responded yet, and is being responded in time
⋮----
// The message that was signed
⋮----
// Decode the signature data to get operators and their signatures
⋮----
// Check that referenceBlock matches task creation block
⋮----
// Store each operator's signature
⋮----
// Check that this operator hasn't already responded
⋮----
// Store the operator's signature
⋮----
// Emit event for this operator
⋮----
// Verify all signatures at once
⋮----
function slashOperator(
⋮----
// check that the task is valid, hasn't been responsed yet
⋮----
// check operator was registered when task was created
⋮----
// we update the storage with a sentinel value
⋮----
// TODO: slash operator
````

## File: contracts/src/IHelloWorldServiceManager.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
interface IHelloWorldServiceManager {
event NewTaskCreated(uint32 indexed taskIndex, Task task);
⋮----
event TaskResponded(uint32 indexed taskIndex, Task task, address operator);
⋮----
function latestTaskNum() external view returns (uint32);
⋮----
function allTaskHashes(
⋮----
function allTaskResponses(
⋮----
function createNewTask(
⋮----
function respondToTask(
⋮----
function slashOperator(
````

## File: contracts/test/mockData/config/core/1337.json
````json
{
  "strategyManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "initialStrategyWhitelister": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "delegationManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "minWithdrawalDelayBlocks": 50400
  },
  "eigenPodManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "allocationManager": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "deallocationDelay": 0,
    "allocationConfigurationDelay": 0
  },
  "strategyFactory": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "avsDirectory": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  },
  "rewardsCoordinator": {
    "initPausedStatus": 0,
    "initialOwner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "rewardsUpdater": "0x1234567890123456789012345678901234567890",
    "activationDelay": 604800,
    "defaultSplitBips": 1000,
    "calculationIntervalSeconds": 86400,
    "maxRewardsDuration": 864000,
    "maxRetroactiveLength": 86400,
    "maxFutureLength": 86400,
    "genesisRewardsTimestamp": 1672531200
  }
}
````

## File: contracts/test/mockData/config/hello-world/1337.json
````json
{
  "rewardsOwner": "0x",
  "rewardsInitiator": "0x"
}
````

## File: contracts/test/mockData/deployments/core/1337.json
````json
{
  "lastUpdate": {
    "timestamp": "1740693626",
    "block_number": "0"
  },
  "addresses": {
    "proxyAdmin": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    "delegationManager": "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
    "delegationManagerImpl": "0xa85233c63b9ee964add6f2cffe00fd84eb32338f",
    "avsDirectory": "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    "avsDirectoryImpl": "0x4a679253410272dd5232b3ff7cf5dbb88f295319",
    "strategyManager": "0x0165878a594ca255338adfa4d48449f69242eb8f",
    "strategyManagerImpl": "0x4ed7c70f96b99c776995fb64377f0d4ab3b0e1c1",
    "eigenPodManager": "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6",
    "eigenPodManagerImpl": "0xa82ff9afd8f496c3d6ac40e2a0f282e47488cfc9",
    "allocationManager": "0x610178da211fef7d417bc0e6fed39f05609ad788",
    "allocationManagerImpl": "0x322813fd9a801c5507c9de605d63cea4f2ce6c44",
    "eigenPodBeacon": "0xa51c1fc2f0d1a1b8494ed1fe312d7c3a78ed91c0",
    "pauserRegistry": "0x9a676e781a523b5d0c0e43731313a708cb607508",
    "pauserRegistryImpl": "0x0dcd1bf9a1b36ce34237eeafef220932846bcd82",
    "strategyFactory": "0x959922be3caee4b8cd9a407cc3ac1c251c2007b1",
    "strategyFactoryImpl": "0x95401dc811bb5740090279ba06cfa8fcf6113778",
    "strategyBeacon": "0xf5059a5d33d5853360d16c683c16e67980206f36",
    "rewardsCoordinator": "0x68b1d87f95878fe05b998f19b66f4baba5de1aed",
    "rewardsCoordinatorImpl": "0x70e0ba845a1a0f2da3359c97e0285013525ffc49",
    "permissionController": "0xc6e7df5e7b4f2a278906862b61205850344d4e7d",
    "permissionControllerImpl": "0x59b670e9fa9d0a427751af201d676719a970857b"
  }
}
````

## File: contracts/test/mockData/deployments/hello-world/1337.json
````json
{
  "lastUpdate": {
    "timestamp": "1740693629",
    "block_number": "39"
  },
  "addresses": {
    "proxyAdmin": "0x8f86403a4de0bb5791fa46b8e795c547942fe4cf",
    "helloWorldServiceManager": "0x5eb3bc0a489c5a8288765d2336659ebca68fcd00",
    "helloWorldServiceManagerImpl": "0x5f3f1dbd7b74c6b46e8c44f98792a1daf8d69154",
    "stakeRegistry": "0x809d550fca64d94bd9f66e60752a544199cfac3d",
    "stakeRegistryImpl": "0x4c5859f0f772848b2d91f1d83e2fe57935348029",
    "strategy": "0x24b3c7704709ed1491473f30393ffc93cfb0fc34",
    "token": "0x99bba657f2bbc93c02d617f8ba121cb8fc104acf"
  }
}
````

## File: contracts/test/mockData/scratch/31337.json
````json
{"lastUpdate":{"timestamp":"1","block_number":"1"},"addresses":{"proxyAdmin":"0x5615deb798bb3e4dfa0139dfa1b3d433cc23b72f","delegation":"0xf62849f9a0b5bf2913b396098f7c7019b51a820a","delegationManagerImpl":"0xdb25a7b768311de128bbda7b8426c3f9c74f3240","avsDirectory":"0xc7183455a4c133ae270771860664b6b7ec320bb1","avsDirectoryImpl":"0x3381cd18e2fb4db236bf0525938ab6e43db0440f","strategyManager":"0x1d1499e622d69689cdf9004d05ec547d650ff211","strategyManagerImpl":"0x756e0562323adcda4430d6cb456d9151f605290b","eigenPodManager":"0x03a6a84cd762d9707a21605b548aaab891562aab","eigenPodManagerImpl":"0xe8dc788818033232ef9772cb2e6622f1ec8bc840","strategyFactory":"0x13aa49bac059d709dd0a18d6bb63290076a702d7","strategyFactoryImpl":"0x1af7f588a501ea2b5bb3feefa744892aa2cf00e6","strategyBeacon":"0x886d6d1eb8d415b00052828cd6d5b321f072073d","rewardsCoordinator":"0x15cf58144ef33af1e14b5208015d11f9143e27b9"}}
````

## File: contracts/test/mockData/scratch/payment_info.json
````json
{
    "paymentInfo": {
        "recipient": "0x5555666677778888999900001111222233334444",
        "numPayments": 8,
        "amountPerPayment": "100000000000",
        "duration": 2592000,
        "startTimestamp": 864000,
        "endTimestamp": 1701907200,
        "indexToProve": 0
    }
}
````

## File: contracts/test/mockData/scratch/payments_test.json
````json
{
    "leaves": [
      "0x29036a1d92861ffd464a1e285030fad3978a36f953ae33c160e606d2ac746c42",
      "0x29036a1d92861ffd464a1e285030fad3978a36f953ae33c160e606d2ac746c42",
      "0x29036a1d92861ffd464a1e285030fad3978a36f953ae33c160e606d2ac746c42",
      "0x29036a1d92861ffd464a1e285030fad3978a36f953ae33c160e606d2ac746c42"
    ],
    "tokenLeaves": [
      "0xf5d87050cb923194fe63c7ed2c45cbc913fa6ecf322f3631149c36d9460b3ad6"
    ]
  }
````

## File: contracts/test/mockData/scratch/payments.json
````json
{
  "leaves": [
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c",
    "0x356fc063496b2cb93d500f88a326bc90c734137e93310643119b81618f40273c"
  ],
  "tokenLeaves": [
    "0xb85e3af535d0b85802155d225e67e51112a9404dba7a93c4dcfaca8ae5b9be9e"
  ]
}
````

## File: contracts/test/CoreDeploymentLib.t.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {
    CoreDeployLib, CoreDeploymentParsingLib
} from "../script/utils/CoreDeploymentParsingLib.sol";
import {UpgradeableProxyLib} from "../script/utils/UpgradeableProxyLib.sol";
⋮----
contract CoreDeploymentParsingLibTest is Test {
⋮----
function setUp() public {
⋮----
/// won't test specific functionality/values. Testing behavior of the library
function test_ReadConfig() public view {
⋮----
/// forge-config: default.allow_internal_expect_revert = true
function test_ReadConfig_Reverts() public {
⋮----
/// Incorrect path
⋮----
function test_ReadDeployment() public view {
⋮----
function test_ReadDeployment_Reverts() public {
⋮----
function test_DeployContracts() public {
⋮----
function test_WriteDeploymentJson() public {
⋮----
function test_WriteAndReadDeploymentJson() public {
⋮----
function test_ReadConfigFromM2DeploymentData() public {
/// TODO: Deployment json is missing the strategy factory
⋮----
// Path to the M2 deployment data JSON file
````

## File: contracts/test/ERC20Mock.sol
````
// SPDX-License-Identifier: MIT
⋮----
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
⋮----
contract ERC20Mock is ERC20 {
⋮----
function mint(address account, uint256 amount) public {
````

## File: contracts/test/HelloWorldServiceManager.t.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import {HelloWorldServiceManager} from "../src/HelloWorldServiceManager.sol";
import {MockAVSDeployer} from "@eigenlayer-middleware/test/utils/MockAVSDeployer.sol";
import {ECDSAStakeRegistry} from "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import {Vm} from "forge-std/Vm.sol";
import {console2} from "forge-std/Test.sol";
import {HelloWorldDeploymentLib} from "../script/utils/HelloWorldDeploymentLib.sol";
import {
    CoreDeployLib, CoreDeploymentParsingLib
} from "../script/utils/CoreDeploymentParsingLib.sol";
import {UpgradeableProxyLib} from "../script/utils/UpgradeableProxyLib.sol";
import {ERC20Mock} from "./ERC20Mock.sol";
import {IERC20, StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
⋮----
import {
    IECDSAStakeRegistryTypes,
    IStrategy
} from "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistry.sol";
import {IStrategyManager} from "@eigenlayer/contracts/interfaces/IStrategyManager.sol";
import {
    IDelegationManager,
    IDelegationManagerTypes
} from "@eigenlayer/contracts/interfaces/IDelegationManager.sol";
import {DelegationManager} from "@eigenlayer/contracts/core/DelegationManager.sol";
import {StrategyManager} from "@eigenlayer/contracts/core/StrategyManager.sol";
import {ISignatureUtilsMixinTypes} from "@eigenlayer/contracts/interfaces/ISignatureUtilsMixin.sol";
import {AVSDirectory} from "@eigenlayer/contracts/core/AVSDirectory.sol";
import {IAVSDirectoryTypes} from "@eigenlayer/contracts/interfaces/IAVSDirectory.sol";
import {Test, console2 as console} from "forge-std/Test.sol";
import {IHelloWorldServiceManager} from "../src/IHelloWorldServiceManager.sol";
import {ECDSAUpgradeable} from
    "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
⋮----
contract HelloWorldTaskManagerSetup is Test {
// used for `toEthSignedMessageHash`
⋮----
function setUp() public virtual {
⋮----
function addStrategy(
⋮----
function labelContracts(
⋮----
function signWithOperatorKey(
⋮----
function signWithSigningKey(
⋮----
function mintMockTokens(Operator memory operator, uint256 amount) internal {
⋮----
function depositTokenIntoStrategy(
⋮----
function registerAsOperator(
⋮----
function registerOperatorToAVS(
⋮----
function deregisterOperatorFromAVS(
⋮----
function createAndAddOperator() internal returns (Operator memory) {
⋮----
function updateOperatorWeights(
⋮----
function getOperators(
⋮----
// Sort the operators by address
⋮----
// Find the minimum operator by address
⋮----
// Swap the minimum operator with the ith operator
⋮----
function createTask(
⋮----
function respondToTask(
⋮----
function makeTaskResponse(
⋮----
function slashOperator(
⋮----
contract HelloWorldServiceManagerInitialization is HelloWorldTaskManagerSetup {
function testInitialization() public view {
⋮----
contract RegisterOperator is HelloWorldTaskManagerSetup {
⋮----
function setUp() public virtual override {
⋮----
/// Setting to internal state for convenience
⋮----
function testVerifyOperatorStates() public view {
⋮----
function test_RegisterOperatorToAVS() public {
⋮----
contract CreateTask is HelloWorldTaskManagerSetup {
⋮----
function setUp() public override {
⋮----
function testCreateTask() public {
⋮----
contract RespondToTask is HelloWorldTaskManagerSetup {
⋮----
function testRespondToTask() public {
⋮----
function testRespondToTaskWith2OperatorsAggregatedSignature() public {
⋮----
// Generate aggregated response with two operators
⋮----
function testRespondToTaskWith3OperatorsAggregatedSignature() public {
⋮----
// Generate aggregated response with three operators
⋮----
contract SlashOperator is HelloWorldTaskManagerSetup {
⋮----
function testValidResponseIsNotSlashable() public {
⋮----
// TODO: check the operator's balance was not reduced
⋮----
function testNoResponseIsSlashable() public {
⋮----
// TODO: check the operator's balance was reduced
⋮----
function testMultipleSlashings() public {
````

## File: contracts/test/SetupPaymentsLib.t.sol
````
// SPDX-License-Identifier: UNLICENSED
⋮----
import "forge-std/Test.sol";
import "../script/utils/SetupDistributionsLib.sol";
import "../script/utils/CoreDeploymentParsingLib.sol";
import "../script/utils/HelloWorldDeploymentLib.sol";
import "@eigenlayer/contracts/interfaces/IRewardsCoordinator.sol";
import "../src/IHelloWorldServiceManager.sol";
import "@eigenlayer/contracts/interfaces/IStrategy.sol";
import "@eigenlayer/contracts/libraries/Merkle.sol";
import "../script/DeployEigenLayerCore.s.sol";
import "../script/HelloWorldDeployer.s.sol";
import {StrategyFactory} from "@eigenlayer/contracts/strategies/StrategyFactory.sol";
import {HelloWorldTaskManagerSetup} from "test/HelloWorldServiceManager.t.sol";
import {ECDSAServiceManagerBase} from
    "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import {
    IECDSAStakeRegistryTypes,
    IStrategy
} from "@eigenlayer-middleware/src/interfaces/IECDSAStakeRegistry.sol";
import "@openzeppelin-upgrades/contracts/access/OwnableUpgradeable.sol";
⋮----
contract TestConstants {
⋮----
contract SetupDistributionsLibTest is Test, TestConstants, HelloWorldTaskManagerSetup {
⋮----
function setUp() public virtual override {
⋮----
strategy = addStrategy(address(mockToken)); // Similar function to HW_SM test using strategy factory
⋮----
function testSubmitRoot() public {
⋮----
function testWriteLeavesToJson() public {
⋮----
function testParseLeavesFromJson() public {
⋮----
function testGenerateMerkleProof() public view {
⋮----
function testProcessClaim() public {
⋮----
function testCreateAVSRewardsSubmissions() public {
````

## File: contracts/.env.example
````
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
HOLESKY_PRIVATE_KEY=
HOLESKY_RPC_URL=
ETHERSCAN_API_KEY=
````

## File: contracts/.gitignore
````
# Compiler files
cache/
out/

# Ignores development broadcast logs
broadcast/*

# Docs
docs/

# Dotenv file
.env


# DS_store files
.DS_Store
lib/.DS_Store
````

## File: contracts/foundry.toml
````toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
fs_permissions = [{ access = "read-write", path = "./" }]
solc = "0.8.27"
optimizer = true
via_ir = true

remappings = [
    "@eigenlayer/=lib/eigenlayer-middleware/lib/eigenlayer-contracts/src/",
    "@eigenlayer-scripts/=lib/eigenlayer-middleware/lib/eigenlayer-contracts/script/",
    "@eigenlayer-middleware/=lib/eigenlayer-middleware/",
    "@openzeppelin/=lib/eigenlayer-middleware/lib/openzeppelin-contracts/",
    "@openzeppelin-upgrades/=lib/eigenlayer-middleware/lib/openzeppelin-contracts-upgradeable/",
    "forge-std/=lib/forge-std/src/",
]

# Ignore warnings from middleware
ignored_warnings_from = ["lib/eigenlayer-middleware"]

[rpc_endpoints]
mainnet = "${MAINNET_RPC_URL}"
holesky = "${HOLESKY_RPC_URL}"
sepolia = "${SEPOLIA_RPC_URL}"
anvil = "${ANVIL_RPC_URL}"

[etherscan]
mainnet = { key = "${ETHERSCAN_API_KEY}" }
sepolia = { key = "${ETHERSCAN_API_KEY}" }
holesky = { key = "${ETHERSCAN_API_KEY}" }

[fmt]
bracket_spacing = false
int_types = "long"
line_length = 100
multiline_func_header = "params_first"
number_underscore = "thousands"
quote_style = "double"
tab_width = 4
````

## File: docs/FAQ.md
````markdown
FAQ About The Repo

The goal is to be a list of random bespoke things that might not be immediately clear and if using an AI tool to ask questions about the repo can be a source for the AI to surface information to the user

Typescript Notes:

- We used ts-node in the repo as a dev dependency and dev commands use ts-node to run the typescript files so that there isn't an intermediate build step that the developer must call in the process to compile the typescript files to javascript and then separately use the output javascript.  This allows us to directly run the typescript files which get compiled on the fly.  We will still use tsc when creating production builds of our code but during development using ts-node has better UX and is more clear for developing

Solidity Notes:

- If you're running into low level errors with transactions being executed by ethers.js ie, code: BAD_DATA or returned with No Data related errors, then one solution to get more verbose errors is to compile and deploy your smart contracts with --revert-strings debug.  This will insert verbose revert strings to catch before a low level revert would happen in an anvil instance.
````

## File: docs/nix-setup-guide.md
````markdown
# Nix Setup Guide 

Here you will find instructions on how to install and configure [nix package manager](https://nixos.wiki/wiki/Nix_package_manager) to work with 
projects.

## Installing / Upgrading 

If you don't have nix installed, follow the instructions on the 
[official website](https://nixos.org/download), or simply use one of following
commands in a terminal:

- For multi-user installation (i.e., system-wide setup, **recommended**)
```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```
- For single-user installation (i.e., local setup)
```bash 
sh <(curl -L https://nixos.org/nix/install) --no-daemon
```

We use nix `flakes` which require nix version `>= 2.4`, therefore if you already 
have nix installed, make sure to 
[upgrade](https://nixos.org/manual/nix/stable/installation/upgrading) to a 
recent version.

## Becoming a Truster User

If you are on NixOS or have installed nix in multi-user mode, you **must** be 
a [trusted user](https://nixos.org/nix/manual/#ssec-multi-user), which is 
necessary to enable access to our binary cache.

On non-NixOS systems, append the following line to the system-wide configuration 
`/etc/nix/nix.conf`:
```txt
trusted-users = USER root
```
**Where `USER` is the result of running `whoami` in a terminal.**

You can also use a group name by prefixing it with `@`. For instance, to add all 
members of the `wheel` group:
```txt
trusted-users = @wheel root
```

On NixOS, add the user/group name to the list under 
[`nix.settings.trusted-users`](https://search.nixos.org/options?show=nix.settings.trusted-users).

## Setting Up for Flakes

We use [Nix flakes](https://nixos.wiki/wiki/Flakes). To configure for flakes, follow the instruction  on the [Nixos Wiki](https://nixos.wiki/wiki/Flakes) or simply do one of the following depending on your system:

- On non-NixOS systems, edit one of the following two files (create them if they don't exist):
   - `/etc/nix/nix.conf` for system-wide settings on a multi-user installation 
   - `~/.config/nix/nix.conf` for user-wide settings on a single-user installation

By appending the following lines:
```txt
experimental-features = nix-command flakes
```

On NixOS systems, set the following NixOS options:
```nix
 nix.settings.experimental-features = [ "nix-command" "flakes" ];
```

## Notes for Apple Users

Apple Silicon users can run any Intel binary out-of-the-box thanks to Rosetta
emulation, but when working with nix flakes, the `aarch64-darwin` system will be
selected by default.

However, some projects at cannot be built natively on `aarch64-darwin`.

Therefore you must specify the `--system` explicitly to target `x86_64-darwin`.
```bash
nix (develop|build|run|check) --system x86_64-darwin # Will use the x86_64-darwin derivation
nix (develop|build|run|check) # Will use the aarch64-darwin derivation, if available
```

To enable this, you must append the following lines to your `/etc/nix/nix.conf` 
or `~/.config/nix/nix.conf`:
```txt
extra-platforms = x86_64-darwin aarch64-darwin
extra-sandbox-paths = /System/Library/Frameworks /System/Library/PrivateFrameworks /usr/lib /private/tmp /private/var/tmp /usr/bin/env
```

You may need to reload the nix daemon for changes to take effect:
```bash
sudo launchctl stop org.nixos.nix-daemon
sudo launchctl start org.nixos.nix-daemon
```

## Development Shell and VSCode 

Now that you have nix installed and configured, you may enter the development 
shell:
```
nix develop
```
If you are on Apple Silicon and a native shell is not available, you will want 
to run this instead:
```
nix develop --system x86_64-darwin
```

If you are a `VSCode` user, you may also start your development session by 
executing the following command:
```
nix develop --command code
```

If you are running `nix develop` for the first time, please enter `y` at the 
following prompts to create the local nix settings file 
`~/.local/share/nix/trusted-settings.json`:
```txt  
> do you want to allow configuration setting 'accept-flake-config' to be set to 'true' (y/N)?
> do you want to permanently mark this value as trusted (y/N)?
```

It is particularly important to accept the `extra-substituters` and 
`extra-trusted-public-keys` settings as these will grant access to our binary 
cache.

When `nix develop` is run for the first time, a significant amount of 
dependencies will be downloaded, built and installed. This process may take a 
couple of hours but is expected to happen only once. However, if you ever 
witness that GHC is also being built from scratch, then it is likely that your 
binary cache has not been configured properly or is not being considered.
Accepting the configuration settings as outlined above should be sufficient to 
avoid this. Nevertheless, if your caches are still broken, you'll want to review
this document carefully to ensure that your nix installation is properly 
configured.

You will know that your caches are broken if you see this message:
```
warning: ignoring untrusted substituter 'https://cache.iog.io', you are not a trusted user.
```

If is possible that your settings are correct but the nix daemon is not properly 
considering them. In this case, stop the `nix develop` process and restart the 
`nix-daemon` as follows:
```bash 
sudo systemctl stop nix-daemon.service
``` 
Once done, you can launch the `nix develop` process again.
````

## File: operator/rust/crates/operator/src/anvil.rs
````rust
fn workspace_dir() -> PathBuf {
let output = std::process::Command::new(env!("CARGO"))
.arg("locate-project")
.arg("--workspace")
.arg("--message-format=plain")
.output()
.unwrap()
⋮----
let cargo_path = Path::new(std::str::from_utf8(&output).unwrap().trim());
cargo_path.parent().unwrap().to_path_buf()
⋮----
/// Start an anvil container for testing, using the dump state file `ANVIL_STATE_PATH`
pub async fn start_anvil_container() -> (ContainerAsync<GenericImage>, String, String) {
⋮----
let absolute_path = workspace_dir().join(relative_path);
let absolute_path_str = absolute_path.to_str().unwrap();
⋮----
.with_entrypoint("anvil")
.with_wait_for(WaitFor::message_on_stdout("Listening on"))
.with_exposed_port(8545.tcp())
.with_mount(testcontainers::core::Mount::bind_mount(
⋮----
.with_cmd([
⋮----
.start()
⋮----
.unwrap();
⋮----
.ports()
⋮----
.map_to_host_port_ipv4(8545.tcp())
⋮----
let http_endpoint = format!("http://localhost:{port}");
let ws_endpoint = format!("ws://localhost:{port}");
````

## File: operator/rust/crates/operator/src/challenger.rs
````rust
use dotenv::dotenv;
⋮----
use futures::StreamExt;
⋮----
LazyLock::new(|| env::var("RPC_URL").expect("failed to retrieve RPC URL"));
⋮----
LazyLock::new(|| env::var("WS_URL").expect("failed to retrieve WS URL"));
⋮----
LazyLock::new(|| env::var("PRIVATE_KEY").expect("failed to retrieve private key"));
⋮----
/// Challenger struct
⋮----
pub struct Challenger {
⋮----
/// Challenger implementation
impl Challenger {
/// Create a new challenger
pub async fn new(rpc_url: String, ws_url: String, private_key: String) -> Result<Self> {
⋮----
let operator_address = signer.address();
⋮----
let service_manager_address = get_hello_world_service_manager().unwrap();
⋮----
let pr = get_provider(&rpc_url);
⋮----
.MAX_RESPONSE_INTERVAL_BLOCKS()
.call()
⋮----
Ok(Self {
⋮----
pub async fn start_challenger(&mut self) -> Result<()> {
get_logger().info("Challenger started: monitoring tasks", "");
⋮----
let ws_provider = get_ws_provider(&self.ws_url).await?;
⋮----
// Subscribe to NewTaskCreated events
⋮----
.address(self.service_manager_address)
.event_signature(HelloWorldServiceManager::NewTaskCreated::SIGNATURE_HASH)
.from_block(BlockNumberOrTag::Latest);
⋮----
.subscribe_logs(&new_task_filter)
⋮----
.into_stream();
⋮----
// Subscribe to TaskResponded events
⋮----
.event_signature(HelloWorldServiceManager::TaskResponded::SIGNATURE_HASH)
⋮----
.subscribe_logs(&responded_filter)
⋮----
// Subscribe to new block events
let mut block_stream = ws_provider.subscribe_blocks().await?.into_stream();
⋮----
Ok(())
⋮----
/// Handle a new task creation and handle the time that an operator has to respond to the task
fn handle_task_creation(&mut self, decoded: Log<HelloWorldServiceManager::NewTaskCreated>) {
let event = decoded.data().clone();
⋮----
get_logger().info(
&format!(
⋮----
// Save the task and create a cancellation channel
self.tasks.insert(task_index, event.task.clone());
⋮----
/// Handle a task response and cancel the timeout timer
fn handle_task_response(&mut self, decoded: Log<HelloWorldServiceManager::TaskResponded>) {
let event = decoded.data();
⋮----
get_logger().info(&format!("Task {} responded", task_index), "");
self.tasks.remove(&task_index);
⋮----
/// Handle the expiration of a task and slash the operator if so.
/// This function is called when a new block is received, iterates over all tasks and checks if they have expired
/// If so, it slashes the operator and removes the task from the list.
async fn check_tasks_timeout(&mut self, current_block: u64) -> Result<()> {
for (task_index, task) in self.tasks.clone() {
⋮----
self.slash_operator(task.clone(), task_index).await?;
⋮----
/// Execute the slashing of an operator
async fn slash_operator(&self, task: Task, task_index: u32) -> Result<()> {
let pr = get_signer(&KEY.to_string(), &self.rpc_url);
⋮----
.slashOperator(task, task_index, self.operator_address)
.send()
⋮----
&format!("Slashing transaction sent: {}", tx_result.tx_hash()),
⋮----
pub async fn main() -> Result<()> {
dotenv().ok();
init_logger(LogLevel::Info);
⋮----
let mut challenger = Challenger::new(RPC_URL.to_string(), WS_URL.to_string(), KEY.to_string())
⋮----
.unwrap();
⋮----
challenger.start_challenger().await?;
````

## File: operator/rust/crates/operator/src/lib.rs
````rust
//! Start creating tasks and respond appropriately
//! testing utils
/// Challenger struct for monitoring task completions and performing slashing
pub mod challenger;
/// Create createNewTask at regular intervals with random task names
pub mod spam_tasks;
/// Register Operator and monitor for NewTaskCreated event
pub mod start_operator;
⋮----
/// Anvil container for testing
⋮----
pub mod anvil;
⋮----
mod tests {
use crate::anvil::start_anvil_container;
use crate::spam_tasks::create_new_task;
use crate::start_operator::register_operator;
⋮----
use alloy::network::EthereumWallet;
use alloy::primitives::Address;
use alloy::providers::ProviderBuilder;
use alloy::signers::local::PrivateKeySigner;
use dotenv::dotenv;
use eigensdk::common::get_provider;
use eigensdk::logging::init_logger;
⋮----
use eigensdk::utils::slashing::core::delegationmanager::DelegationManager;
⋮----
use reqwest::Url;
use serial_test::serial;
use std::env;
use std::str::FromStr;
use std::sync::LazyLock;
⋮----
LazyLock::new(|| env::var("PRIVATE_KEY").expect("failed to retrieve private key"));
⋮----
async fn test_register_operator() {
let (_container, anvil_http, _) = start_anvil_container().await;
⋮----
dotenv().ok();
init_logger(eigensdk::logging::log_level::LogLevel::Info);
let private_key = &KEY.clone();
register_operator(&anvil_http, private_key).await.unwrap();
⋮----
let signer = PrivateKeySigner::from_str(private_key).unwrap();
let wallet = EthereumWallet::from(signer.clone());
⋮----
.wallet(wallet)
.on_http(Url::from_str(&anvil_http).unwrap());
let el_data = get_anvil_eigenlayer_deployment_data().unwrap();
⋮----
el_data.addresses.delegation_manager.parse().unwrap();
⋮----
.isOperator(signer.address())
.call()
⋮----
.unwrap()
⋮----
assert!(is_operator);
⋮----
async fn test_spam_tasks() {
⋮----
let hw_data = get_anvil_hello_world_deployment_data().unwrap();
⋮----
.parse()
.unwrap();
let provider = &get_provider(&anvil_http);
⋮----
let latest_task_num = hello_world_contract.latestTaskNum().call().await.unwrap();
⋮----
let _ = create_new_task(&anvil_http, "HelloEigen").await;
⋮----
hello_world_contract.latestTaskNum().call().await.unwrap();
⋮----
assert_eq!(task_num + 1, task_num_after_task);
````

## File: operator/rust/crates/operator/src/spam_tasks.rs
````rust
use alloy::primitives::Address;
use dotenv::dotenv;
use eigensdk::common::get_signer;
⋮----
use eyre::Result;
use hello_world_utils::get_anvil_hello_world_deployment_data;
use hello_world_utils::helloworldservicemanager::HelloWorldServiceManager;
use rand::Rng;
use std::env;
use std::sync::LazyLock;
⋮----
LazyLock::new(|| env::var("RPC_URL").expect("failed to retrieve RPC URL"));
⋮----
LazyLock::new(|| env::var("PRIVATE_KEY").expect("failed to retrieve private key"));
⋮----
/// Generate random task names from the given adjectives and nouns
fn generate_random_name() -> String {
⋮----
let adjective = adjectives[rng.random_range(0..adjectives.len())];
let noun = nouns[rng.random_range(0..nouns.len())];
let number: u16 = rng.random_range(0..1000);
⋮----
format!("{}{}{}", adjective, noun, number)
⋮----
/// Calls CreateNewTask function of the Hello world service manager contract
pub async fn create_new_task(rpc_url: &str, task_name: &str) -> Result<()> {
let hw_data = get_anvil_hello_world_deployment_data()?;
⋮----
hw_data.addresses.hello_world_service_manager.parse()?;
let pr = get_signer(&KEY.clone(), rpc_url);
⋮----
.createNewTask(task_name.to_string())
.send()
⋮----
.get_receipt()
⋮----
println!(
⋮----
Ok(())
⋮----
/// Start creating tasks at every 15 seconds
async fn start_creating_tasks() {
⋮----
init_logger(LogLevel::Info);
⋮----
interval.tick().await;
let random_name = generate_random_name();
get_logger().info(
&format!("Creating new task with name: {random_name}"),
⋮----
let _ = create_new_task(&RPC_URL, &random_name).await;
⋮----
async fn main() {
dotenv().ok();
start_creating_tasks().await;
````

## File: operator/rust/crates/operator/src/start_operator.rs
````rust
use alloy::dyn_abi::DynSolValue;
⋮----
use chrono::Utc;
use dotenv::dotenv;
⋮----
use eyre::Result;
use futures::StreamExt;
use hello_world_utils::ecdsastakeregistry::ECDSAStakeRegistry;
⋮----
use std::sync::LazyLock;
⋮----
LazyLock::new(|| env::var("RPC_URL").expect("failed to retrieve RPC URL"));
⋮----
LazyLock::new(|| env::var("WS_URL").expect("failed to retrieve WS URL"));
⋮----
LazyLock::new(|| env::var("PRIVATE_KEY").expect("failed to retrieve private key"));
⋮----
.expect("failed to retrieve operator response percentage")
⋮----
.expect("failed to parse operator response percentage")
⋮----
async fn sign_and_respond_to_task(
⋮----
let pr = get_signer(private_key, rpc_url);
⋮----
let message = format!("Hello, {}", name);
let m_hash = eip191_hash_message(keccak256(message.abi_encode_packed()));
let operators: Vec<DynSolValue> = vec![DynSolValue::Address(signer.address())];
⋮----
vec![DynSolValue::Bytes(signer.sign_hash_sync(&m_hash)?.into())];
let current_block = U256::from(get_provider(rpc_url).get_block_number().await?);
let signature_data = DynSolValue::Tuple(vec![
⋮----
.abi_encode_params();
⋮----
get_logger().info(
&format!("Signing and responding to task: {task_index:?}"),
⋮----
let hello_world_contract_address: Address = get_hello_world_service_manager()?;
⋮----
.respondToTask(task, task_index, signature_data.into())
.gas(500000)
.send()
⋮----
.get_receipt()
⋮----
&format!("Responded to task with tx hash {}", response_hash),
⋮----
Ok(())
⋮----
/// Monitor new tasks
async fn monitor_new_tasks(rpc_url: &str, private_key: &str) -> Result<()> {
⋮----
let ws_provider = get_ws_provider(&WS_URL).await?;
⋮----
// Subscribe to NewTaskCreated events
⋮----
.address(hello_world_contract_address)
.event_signature(HelloWorldServiceManager::NewTaskCreated::SIGNATURE_HASH)
.from_block(BlockNumberOrTag::Latest);
let mut new_task_stream = ws_provider.subscribe_logs(&filter).await?.into_stream();
⋮----
// Process tasks when a new event is detected
while let Some(log) = new_task_stream.next().await {
⋮----
&format!(
⋮----
// There is a `OPERATOR_RESPONSE_PERCENTAGE` chance that the operator will respond to the task.
// If the operator does not respond, the operator will be slashed.
let should_respond = rand::rng().random_bool(*OPERATOR_RESPONSE_PERCENTAGE / 100.0);
⋮----
sign_and_respond_to_task(
⋮----
&format!("Operator did not respond to task {}", taskIndex),
⋮----
/// Monitor new tasks using polling
async fn monitor_new_tasks_polling(rpc_url: &str, private_key: &str) -> Result<()> {
⋮----
let mut latest_processed_block = pr.get_block_number().await?;
⋮----
let current_block = pr.get_block_number().await?;
⋮----
.from_block(BlockNumberOrTag::Number(latest_processed_block))
.to_block(BlockNumberOrTag::Number(current_block));
⋮----
let logs = pr.get_logs(&filter).await?;
⋮----
if let Some(&HelloWorldServiceManager::NewTaskCreated::SIGNATURE_HASH) = log.topic0() {
⋮----
.log_decode()
.expect("Failed to decode log new task created")
⋮----
&format!("New task {} detected: Hello, {}", taskIndex, task.name),
⋮----
let _ = sign_and_respond_to_task(
⋮----
pub async fn register_operator(rpc_url: &str, private_key: &str) -> Result<()> {
⋮----
let el_data = get_anvil_eigenlayer_deployment_data()?;
let delegation_manager_address: Address = el_data.addresses.delegation_manager.parse()?;
let avs_directory_address: Address = el_data.addresses.avs_directory.parse()?;
⋮----
get_logger().clone(),
⋮----
rpc_url.to_string(),
⋮----
elcontracts_reader_instance.clone(),
⋮----
private_key.to_string(),
⋮----
address: signer.address(),
⋮----
staker_opt_out_window_blocks: Some(0),
⋮----
allocation_delay: Some(0),
⋮----
.is_operator_registered(signer.address())
⋮----
.unwrap();
get_logger().info(&format!("is registered {}", is_registered), "");
⋮----
.register_as_operator(operator)
⋮----
let receipt = pr.get_transaction_receipt(tx_hash).await?;
if !receipt.is_some_and(|r| r.inner.is_success()) {
get_logger().error("Operator registration failed", "");
return Err(eyre::eyre!("Operator registration failed"));
⋮----
rand::rngs::OsRng.try_fill_bytes(&mut salt).unwrap();
⋮----
let now = Utc::now().timestamp();
⋮----
.calculate_operator_avs_registration_digest_hash(
signer.address(),
⋮----
let signature = signer.sign_hash_sync(&digest_hash)?;
⋮----
signature: signature.as_bytes().into(),
⋮----
let stake_registry_address = get_stake_registry_address()?;
⋮----
.registerOperatorWithSignature(operator_signature, signer.clone().address())
.gas(500000);
⋮----
pub async fn main() {
use tokio::signal;
dotenv().ok();
init_logger(LogLevel::Info);
⋮----
if let Err(e) = register_operator(rpc_url, &KEY).await {
eprintln!("Failed to register operator: {:?}", e);
⋮----
// Start the task monitoring as a separate async task to keep the process running
⋮----
if let Err(e) = monitor_new_tasks(rpc_url, &KEY).await {
eprintln!("Failed to monitor new tasks: {:?}", e);
⋮----
// Wait for a Ctrl+C signal to gracefully shut down
⋮----
get_logger().info("Received Ctrl+C, shutting down...", "");
````

## File: operator/rust/crates/operator/Cargo.toml
````toml
[package]
name = "hello-world-avs-operator"
description = "Hello world avs operator start and spam utilities"

version.workspace = true
edition.workspace = true
rust-version.workspace = true
repository.workspace = true
license-file.workspace = true

[dependencies]
alloy.workspace = true
serde_json = "1.0.121"
num-bigint = "0.4.4"
reqwest = "0.12.9"
hex = "0.4.3"
futures = "0.3.30"
serde = "1.0.214"
testcontainers = "0.23"

#eigensdk-rs
eigensdk.workspace = true

hello-world-utils.workspace = true

#misc 
dotenv = "0.15.0"
rand = "0.9"
chrono = "0.4.38"
tracing = "0.1.40"
futures-util = "0.3"
eyre = "0.6.12"
#tokio
tokio = { workspace = true, features = ["full"] }
[lints]
workspace = true


[dev-dependencies]
serial_test = "3.1.1"

[[bin]]
name = "start_operator"
path = "src/start_operator.rs"


[[bin]]
name = "spam_tasks"
path = "src/spam_tasks.rs"

[[bin]]
name = "challenger"
path = "src/challenger.rs"
````

## File: operator/rust/crates/utils/src/bindings/ecdsastakeregistry.rs
````rust
///Module containing a contract's types and functions.
/**

```solidity
library IECDSAStakeRegistryTypes {
    struct Quorum { StrategyParams[] strategies; }
    struct StrategyParams { address strategy; uint96 multiplier; }
}
```*/
⋮----
pub mod IECDSAStakeRegistryTypes {
⋮----
/**```solidity
    struct Quorum { StrategyParams[] strategies; }
    ```*/
⋮----
pub struct Quorum {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Array<StrategyParams>,);
⋮----
type UnderlyingRustTuple<'a> = (
⋮----
fn _type_assertion(_t: alloy_sol_types::private::AssertTypeEq<UnderlyingRustTuple>) {
⋮----
fn from(value: Quorum) -> Self {
⋮----
fn from(tuple: UnderlyingRustTuple<'_>) -> Self {
⋮----
type SolType = Self;
⋮----
fn stv_to_tokens(&self) -> <Self as alloy_sol_types::SolType>::Token<'_> {
⋮----
fn stv_abi_encoded_size(&self) -> usize {
⋮----
<UnderlyingRustTuple<'_> as ::core::convert::From<Self>>::from(self.clone());
⋮----
fn stv_eip712_data_word(&self) -> alloy_sol_types::Word {
⋮----
fn stv_abi_encode_packed_to(&self, out: &mut alloy_sol_types::private::Vec<u8>) {
⋮----
fn stv_abi_packed_encoded_size(&self) -> usize {
⋮----
type RustType = Self;
type Token<'a> = <UnderlyingSolTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn valid_token(token: &Self::Token<'_>) -> bool {
⋮----
fn detokenize(token: Self::Token<'_>) -> Self::RustType {
⋮----
fn eip712_root_type() -> alloy_sol_types::private::Cow<'static, str> {
⋮----
fn eip712_components(
⋮----
components.push(<StrategyParams as alloy_sol_types::SolStruct>::eip712_root_type());
⋮----
.extend(<StrategyParams as alloy_sol_types::SolStruct>::eip712_components());
⋮----
fn eip712_encode_data(&self) -> alloy_sol_types::private::Vec<u8> {
⋮----
.to_vec()
⋮----
fn topic_preimage_length(rust: &Self::RustType) -> usize {
⋮----
fn encode_topic_preimage(
⋮----
out.reserve(<Self as alloy_sol_types::EventTopic>::topic_preimage_length(rust));
⋮----
fn encode_topic(rust: &Self::RustType) -> alloy_sol_types::abi::token::WordToken {
⋮----
/**```solidity
    struct StrategyParams { address strategy; uint96 multiplier; }
    ```*/
⋮----
pub struct StrategyParams {
⋮----
type UnderlyingSolTuple<'a> = (
⋮----
fn from(value: StrategyParams) -> Self {
⋮----
fn eip712_encode_type() -> alloy_sol_types::private::Cow<'static, str> {
⋮----
.concat()
⋮----
/**Creates a new wrapper around an on-chain [`IECDSAStakeRegistryTypes`](self) contract instance.

    See the [wrapper's documentation](`IECDSAStakeRegistryTypesInstance`) for more details.*/
⋮----
pub const fn new<
⋮----
/**A [`IECDSAStakeRegistryTypes`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`IECDSAStakeRegistryTypes`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct IECDSAStakeRegistryTypesInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
f.debug_tuple("IECDSAStakeRegistryTypesInstance")
.field(&self.address)
.finish()
⋮----
/// Instantiation and getters/setters.
⋮----
/**Creates a new wrapper around an on-chain [`IECDSAStakeRegistryTypes`](self) contract instance.

        See the [wrapper's documentation](`IECDSAStakeRegistryTypesInstance`) for more details.*/
⋮----
pub const fn new(address: alloy_sol_types::private::Address, provider: P) -> Self {
⋮----
/// Returns a reference to the address.
⋮----
pub const fn address(&self) -> &alloy_sol_types::private::Address {
⋮----
/// Sets the address.
⋮----
pub fn set_address(&mut self, address: alloy_sol_types::private::Address) {
⋮----
/// Sets the address and returns `self`.
pub fn at(mut self, address: alloy_sol_types::private::Address) -> Self {
self.set_address(address);
⋮----
/// Returns a reference to the provider.
⋮----
pub const fn provider(&self) -> &P {
⋮----
/// Clones the provider and returns a new instance with the cloned provider.
⋮----
pub fn with_cloned_provider(self) -> IECDSAStakeRegistryTypesInstance<T, P, N> {
⋮----
/// Function calls.
⋮----
/// Creates a new call builder using this contract instance's provider and address.
///
/// Note that the call can be any function call, not just those defined in this
/// contract. Prefer using the other methods for building type-safe contract calls.
pub fn call_builder<C: alloy_sol_types::SolCall>(
⋮----
/// Event filters.
⋮----
/// Creates a new event filter using this contract instance's provider and address.
⋮----
/// Note that the type can be any event, not just those defined in this contract.
/// Prefer using the other methods for building type-safe event filters.
pub fn event_filter<E: alloy_sol_types::SolEvent>(
⋮----
/**

```solidity
library ISignatureUtilsMixinTypes {
    struct SignatureWithSaltAndExpiry { bytes signature; bytes32 salt; uint256 expiry; }
}
```*/
⋮----
pub mod ISignatureUtilsMixinTypes {
⋮----
/**```solidity
    struct SignatureWithSaltAndExpiry { bytes signature; bytes32 salt; uint256 expiry; }
    ```*/
⋮----
pub struct SignatureWithSaltAndExpiry {
⋮----
fn from(value: SignatureWithSaltAndExpiry) -> Self {
⋮----
/**Creates a new wrapper around an on-chain [`ISignatureUtilsMixinTypes`](self) contract instance.

    See the [wrapper's documentation](`ISignatureUtilsMixinTypesInstance`) for more details.*/
⋮----
/**A [`ISignatureUtilsMixinTypes`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`ISignatureUtilsMixinTypes`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct ISignatureUtilsMixinTypesInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
f.debug_tuple("ISignatureUtilsMixinTypesInstance")
⋮----
/**Creates a new wrapper around an on-chain [`ISignatureUtilsMixinTypes`](self) contract instance.

        See the [wrapper's documentation](`ISignatureUtilsMixinTypesInstance`) for more details.*/
⋮----
pub fn with_cloned_provider(self) -> ISignatureUtilsMixinTypesInstance<T, P, N> {
⋮----
/**

Generated by the following Solidity interface...
```solidity
library IECDSAStakeRegistryTypes {
    struct Quorum {
        StrategyParams[] strategies;
    }
    struct StrategyParams {
        address strategy;
        uint96 multiplier;
    }
}

library ISignatureUtilsMixinTypes {
    struct SignatureWithSaltAndExpiry {
        bytes signature;
        bytes32 salt;
        uint256 expiry;
    }
}

interface ECDSAStakeRegistry {
    error InsufficientSignedStake();
    error InsufficientWeight();
    error InvalidLength();
    error InvalidQuorum();
    error InvalidReferenceBlock();
    error InvalidSignature();
    error InvalidSignedWeight();
    error InvalidThreshold();
    error LengthMismatch();
    error MustUpdateAllOperators();
    error NotSorted();
    error OperatorAlreadyRegistered();
    error OperatorNotRegistered();

    event Initialized(uint8 version);
    event MinimumWeightUpdated(uint256 previous, uint256 current);
    event OperatorDeregistered(address indexed operator, address indexed avs);
    event OperatorRegistered(address indexed operator, address indexed avs);
    event OperatorWeightUpdated(address indexed operator, uint256 oldWeight, uint256 newWeight);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event QuorumUpdated(IECDSAStakeRegistryTypes.Quorum previous, IECDSAStakeRegistryTypes.Quorum current);
    event SigningKeyUpdate(address indexed operator, uint256 indexed updateBlock, address indexed newSigningKey, address oldSigningKey);
    event ThresholdWeightUpdated(uint256 thresholdWeight);
    event TotalWeightUpdated(uint256 oldTotalWeight, uint256 newTotalWeight);
    event UpdateMinimumWeight(uint256 oldMinimumWeight, uint256 newMinimumWeight);

    constructor(address _delegationManager);

    function deregisterOperator() external;
    function getLastCheckpointOperatorWeight(address operator) external view returns (uint256);
    function getLastCheckpointThresholdWeight() external view returns (uint256);
    function getLastCheckpointThresholdWeightAtBlock(uint32 blockNumber) external view returns (uint256);
    function getLastCheckpointTotalWeight() external view returns (uint256);
    function getLastCheckpointTotalWeightAtBlock(uint32 blockNumber) external view returns (uint256);
    function getLatestOperatorSigningKey(address operator) external view returns (address);
    function getOperatorSigningKeyAtBlock(address operator, uint256 blockNumber) external view returns (address);
    function getOperatorWeight(address operator) external view returns (uint256);
    function getOperatorWeightAtBlock(address operator, uint32 blockNumber) external view returns (uint256);
    function initialize(address _serviceManager, uint256 thresholdWeight, IECDSAStakeRegistryTypes.Quorum memory quorum) external;
    function isValidSignature(bytes32 digest, bytes memory _signatureData) external view returns (bytes4);
    function minimumWeight() external view returns (uint256);
    function operatorRegistered(address operator) external view returns (bool);
    function owner() external view returns (address);
    function quorum() external view returns (IECDSAStakeRegistryTypes.Quorum memory);
    function registerOperatorWithSignature(ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry memory operatorSignature, address signingKey) external;
    function renounceOwnership() external;
    function transferOwnership(address newOwner) external;
    function updateMinimumWeight(uint256 newMinimumWeight, address[] memory operators) external;
    function updateOperatorSigningKey(address newSigningKey) external;
    function updateOperators(address[] memory operators) external;
    function updateOperatorsForQuorum(address[][] memory operatorsPerQuorum, bytes memory) external;
    function updateQuorumConfig(IECDSAStakeRegistryTypes.Quorum memory quorum, address[] memory operators) external;
    function updateStakeThreshold(uint256 thresholdWeight) external;
}
```

...which was generated by the following JSON ABI:
```json
[
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_delegationManager",
        "type": "address",
        "internalType": "contract IDelegationManager"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperator",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getLastCheckpointOperatorWeight",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointThresholdWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointThresholdWeightAtBlock",
    "inputs": [
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointTotalWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastCheckpointTotalWeightAtBlock",
    "inputs": [
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLatestOperatorSigningKey",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorSigningKeyAtBlock",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "blockNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorWeight",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOperatorWeightAtBlock",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "blockNumber",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "_serviceManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quorum",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isValidSignature",
    "inputs": [
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "_signatureData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minimumWeight",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "operatorRegistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "quorum",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerOperatorWithSignature",
    "inputs": [
      {
        "name": "operatorSignature",
        "type": "tuple",
        "internalType": "struct ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "salt",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "signingKey",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateMinimumWeight",
    "inputs": [
      {
        "name": "newMinimumWeight",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperatorSigningKey",
    "inputs": [
      {
        "name": "newSigningKey",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperators",
    "inputs": [
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOperatorsForQuorum",
    "inputs": [
      {
        "name": "operatorsPerQuorum",
        "type": "address[][]",
        "internalType": "address[][]"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateQuorumConfig",
    "inputs": [
      {
        "name": "quorum",
        "type": "tuple",
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      },
      {
        "name": "operators",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateStakeThreshold",
    "inputs": [
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MinimumWeightUpdated",
    "inputs": [
      {
        "name": "previous",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "current",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorDeregistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorRegistered",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "avs",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OperatorWeightUpdated",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "oldWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "QuorumUpdated",
    "inputs": [
      {
        "name": "previous",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      },
      {
        "name": "current",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IECDSAStakeRegistryTypes.Quorum",
        "components": [
          {
            "name": "strategies",
            "type": "tuple[]",
            "internalType": "struct IECDSAStakeRegistryTypes.StrategyParams[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SigningKeyUpdate",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "updateBlock",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "newSigningKey",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "oldSigningKey",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ThresholdWeightUpdated",
    "inputs": [
      {
        "name": "thresholdWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TotalWeightUpdated",
    "inputs": [
      {
        "name": "oldTotalWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newTotalWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UpdateMinimumWeight",
    "inputs": [
      {
        "name": "oldMinimumWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newMinimumWeight",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InsufficientSignedStake",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientWeight",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidLength",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidQuorum",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidReferenceBlock",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSignedWeight",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidThreshold",
    "inputs": []
  },
  {
    "type": "error",
    "name": "LengthMismatch",
    "inputs": []
  },
  {
    "type": "error",
    "name": "MustUpdateAllOperators",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotSorted",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorAlreadyRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OperatorNotRegistered",
    "inputs": []
  }
]
```*/
⋮----
pub mod ECDSAStakeRegistry {
⋮----
/// The creation / init bytecode of the contract.
⋮----
/// ```text
///0x60a034606657601f61254a38819003918201601f19168301916001600160401b03831184841017606a57808492602094604052833981010312606657516001600160a01b03811681036066576080526040516124cb908161007f8239608051816113080152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c8062cf2ab5146101a35780630dba33941461019e5780631626ba7e146101995780631703a018146101945780631e4cd85e1461018f578063314f3a491461018a5780633b242e4a146101855780633d5611f61461018057806340bf2fb71461017b5780635140a548146101765780635e1042e8146101715780635ef533291461016c578063696255be14610167578063715018a614610162578063743c31f41461015d578063857dc190146101585780638da5cb5b14610153578063955f2d901461014e57806398ec1ac914610149578063a2ce5fd114610144578063ab1189951461013f578063b933fa741461013a578063dec5d1f614610135578063ec7fbb31146101305763f2fde38b1461012b575f80fd5b610e04565b610dc4565b610d60565b610cf1565b610bdf565b610ad4565b610aad565b610a5f565b610a37565b61091d565b6108d2565b610877565b6107ec565b6107c8565b610785565b6106bf565b6106a2565b610618565b6105d0565b6105a5565b610578565b61052c565b6103b5565b61031f565b6102d7565b634e487b7160e01b5f52604160045260245ffd5b602081019081106001600160401b038211176101d757604052565b6101a8565b606081019081106001600160401b038211176101d757604052565b604081019081106001600160401b038211176101d757604052565b90601f801991011681019081106001600160401b038211176101d757604052565b60405190610242604083610212565b565b6001600160401b0381116101d75760051b60200190565b6001600160a01b0381160361026c57565b5f80fd5b9080601f8301121561026c57813561028781610244565b926102956040519485610212565b81845260208085019260051b82010192831161026c57602001905b8282106102bd5750505090565b6020809183356102cc8161025b565b8152019101906102b0565b3461026c57602036600319011261026c576004356001600160401b03811161026c5761030a61030f913690600401610270565b611464565b005b63ffffffff81160361026c57565b3461026c57602036600319011261026c57602061034c63ffffffff60043561034681610311565b166114c1565b604051908152f35b6001600160401b0381116101d757601f01601f191660200190565b81601f8201121561026c5780359061038682610354565b926103946040519485610212565b8284526020838301011161026c57815f926020809301838601378301015290565b3461026c57604036600319011261026c576004356024356001600160401b03811161026c576103e890369060040161036f565b9081518201916060816020850194031261026c5760208101516001600160401b03811161026c57810183603f8201121561026c5760208101519061042b82610244565b916104396040519384610212565b8083526020808085019260051b840101019186831161026c57604001905b8282106104af5750505060408201516001600160401b03811161026c57606061048b61049896602061049294870101610e95565b9301610f4d565b92611756565b604051630b135d3f60e11b815280602081015b0390f35b6020809183516104be8161025b565b815201910190610457565b5f91031261026c57565b602060408184019251938281528451809452019201905f5b8181106104f85750505090565b825180516001600160a01b031685526020908101516001600160601b031681860152604090940193909201916001016104eb565b3461026c575f36600319011261026c57606060405161054a816101bc565b526104ab60405161055a816101bc565b610562610f58565b81526040519182916020835260208301906104d3565b3461026c57602036600319011261026c57602061034c63ffffffff60043561059f81610311565b166115e8565b3461026c575f36600319011261026c5760206001600160e01b036105c7611839565b16604051908152f35b3461026c57602036600319011261026c576004356105ed8161025b565b6001600160a01b03165f908152606d602090815260409091206001600160e01b03906105c79061187d565b3461026c57604036600319011261026c576004356001600160401b03811161026c576060600319823603011261026c57604051610654816101dc565b81600401356001600160401b03811161026c5761030f9261067d6044926004369184010161036f565b835260248101356020840152013560408201526024359061069d8261025b565b610fcf565b3461026c575f36600319011261026c576020606754604051908152f35b3461026c57604036600319011261026c576004356001600160401b03811161026c573660238201121561026c5780600401356106fa81610244565b916107086040519384610212565b8183526024602084019260051b8201019036821161026c5760248101925b82841061075657602435856001600160401b03821161026c5761075061030f92369060040161036f565b50611109565b83356001600160401b03811161026c5760209161077a839260243691870101610270565b815201930192610726565b3461026c57604036600319011261026c5760206004356107a48161025b565b6001600160a01b039081165f908152606a8352604090206105c790602435906116b5565b3461026c57602036600319011261026c5761030f6004356107e7611917565b61196f565b3461026c57604036600319011261026c576024356004356001600160401b03821161026c577f713ca53b88d6eb63f5b1854cb8cbdd736ec51eda225e46791aa9298b0160648f61084361030f933690600401610270565b9161084c611917565b6067548160675561086f6040519283928360209093929193604081019481520152565b0390a1611464565b3461026c575f36600319011261026c5761088f611917565b603380546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b3461026c57602036600319011261026c576004356108ef8161025b565b335f52606e60205260ff60405f2054161561090e5761030f9033611a69565b6325ec6c1f60e01b5f5260045ffd5b3461026c575f36600319011261026c57335f908152606e6020526040902061094f9061094b905b5460ff1690565b1590565b61090e57610966610961606554611afa565b606555565b335f908152606e60205260409020805460ff1916905561098d61098833611d3e565b611e6f565b50506068546109b2906109a6906001600160a01b031681565b6001600160a01b031690565b803b1561026c576040516351b27a6d60e11b8152336004820152905f908290602490829084905af18015610a3257610a18575b6068546001600160a01b0316337f31e0adfec71bccee37b6e83a90c2fedb17d8f1693fee863c4771e7bfe2aed5805f80a3005b80610a265f610a2c93610212565b806104c9565b5f6109e5565b611232565b3461026c575f36600319011261026c576033546040516001600160a01b039091168152602090f35b3461026c57604036600319011261026c57602061034c600435610a818161025b565b60243590610a8e82610311565b60018060a01b03165f52606d835263ffffffff60405f209116906116b5565b3461026c57602036600319011261026c57602061034c600435610acf8161025b565b61127f565b3461026c57602036600319011261026c57600435610af18161025b565b60018060a01b03165f52606a602052602060018060a01b036105c760405f2061187d565b919060208382031261026c57604051610b2d816101bc565b80938035906001600160401b03821161026c570182601f8201121561026c57803590610b5882610244565b93610b666040519586610212565b82855260208086019360061b8301019181831161026c57602001925b828410610b90575050505052565b60408483031261026c5760405190610ba7826101f7565b8435610bb28161025b565b82526020850135906001600160601b038216820361026c5782602092836040950152815201930192610b82565b3461026c57606036600319011261026c57600435610bfc8161025b565b6044356024356001600160401b03821161026c57610c21610c69923690600401610b15565b905f5493610c4f610c3961094b8760ff9060081c1690565b80968197610ce3575b8115610cc3575b506113e6565b84610c60600160ff195f5416175f55565b610cac57611b66565b610c6f57005b610c7d61ff00195f54165f55565b604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b610cbe61010061ff00195f5416175f55565b611b66565b303b15915081610cd5575b505f610c49565b60ff1660011490505f610cce565b600160ff8216109150610c42565b3461026c575f36600319011261026c57606c5480610d20575060205f5b6040516001600160e01b039091168152f35b805f19810111610d5b57606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe0150154602090811c610d0e565b61123d565b3461026c57604036600319011261026c576004356001600160401b03811161026c57610d90903690600401610b15565b602435906001600160401b03821161026c5761030a610db661030f933690600401610270565b91610dbf611917565b611c47565b3461026c57602036600319011261026c57600435610de18161025b565b60018060a01b03165f52606e602052602060ff60405f2054166040519015158152f35b3461026c57602036600319011261026c57600435610e218161025b565b610e29611917565b6001600160a01b03811615610e415761030f90611a21565b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b9080601f8301121561026c57815191610ead83610244565b92610ebb6040519485610212565b80845260208085019160051b8301019183831161026c5760208101915b838310610ee757505050505090565b82516001600160401b03811161026c57820185603f8201121561026c57602081015191610f1383610354565b610f206040519182610212565b838152604083850101881061026c575f602085819660408397018386015e83010152815201920191610ed8565b519061024282610311565b60665490610f6582610244565b91610f736040519384610212565b80835260665f9081525f5160206124765f395f51905f52602085015b838310610f9c5750505050565b600160208192604051610fae816101f7565b8554848060a01b038116825260a01c83820152815201920192019190610f8f565b335f908152606e60205260409020909190610fe990610944565b6110cd5761103290610fff6109616065546118a7565b335f908152606e6020526040902061101e90805460ff19166001179055565b61102a61098833611d3e565b505033611a69565b606854611049906109a6906001600160a01b031681565b803b1561026c57604051639926ee7d60e01b8152915f9183918290849082906110769033600484016118d9565b03925af18015610a32576110b9575b506068546001600160a01b0316337fa453db612af59e5521d6ab9284dc3e2d06af286eb1b1b7b771fce4716c19f2c15f80a3565b80610a265f6110c793610212565b5f611085565b6342ee68b560e01b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b80518210156111045760209160051b010190565b6110dc565b80511561110457602001518051606554036111275761024290611464565b63169efb5b60e11b5f5260045ffd5b9061114082610244565b61114d6040519182610212565b828152809261115e601f1991610244565b0190602036910137565b60208183031261026c578051906001600160401b03821161026c57019080601f8301121561026c57815161119b81610244565b926111a96040519485610212565b81845260208085019260051b82010192831161026c57602001905b8282106111d15750505090565b81518152602091820191016111c4565b6060602091604081019360018060a01b031681526040838201528451809452019201905f5b8181106112135750505090565b82516001600160a01b0316845260209384019390920191600101611206565b6040513d5f823e3d90fd5b634e487b7160e01b5f52601160045260245ffd5b81810292918115918404141715610d5b57565b9060018201809211610d5b57565b91908201809211610d5b57565b611287610f58565b915f906112948451611136565b915f5b85518110156112e057806112da6112c16112b36001948a6110f0565b51516001600160a01b031690565b6112cb83886110f0565b6001600160a01b039091169052565b01611297565b50915f9061130492946040519384928392639004134760e01b8452600484016111e1565b03817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610a32575f916113c4575b505f915b84518310156113a25761139a60019161139461136086866110f0565b5161138e61138260206113738a8d6110f0565b5101516001600160601b031690565b6001600160601b031690565b90611251565b90611272565b920191611344565b9150506113b3919250612710900490565b60675481106113bf5790565b505f90565b6113e091503d805f833e6113d88183610212565b810190611168565b5f611340565b156113ed57565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b9190915f8382019384129112908015821691151617610d5b57565b905f805b83518210156114a25760019061149a906114946001600160a01b0361148d86896110f0565b5116611d3e565b90611449565b910190611468565b90506114af919250611e6f565b5050565b5f19810191908211610d5b57565b438110156115a4576114d290611ef4565b606b549063ffffffff165f5b82811061153f575050806114fb57505f5b6001600160e01b031690565b61153361150a61153a926114b3565b606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b40190565b5460201c90565b6114ef565b90918082169080831860011c8201809211610d5b57606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b482015463ffffffff168410156115925750915b906114de565b92915061159e90611264565b9061158c565b606460405162461bcd60e51b815260206004820152602060248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e65646044820152fd5b438110156115a4576115f990611ef4565b606c549063ffffffff165f5b8281106116505750508061161857505f90565b61153361162761153a926114b3565b606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe0160190565b90918082169080831860011c8201809211610d5b57606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe01682015463ffffffff168410156116a35750915b90611605565b9291506116af90611264565b9061169d565b90438110156115a4576116c790611ef4565b81549063ffffffff165f5b828110611702575050806116e757505f919050565b61153a916116f7611533926114b3565b905f5260205f200190565b90918082169080831860011c8201809211610d5b57845f528363ffffffff6117348460205f200163ffffffff90541690565b1611156117445750915b906116d2565b92915061175090611264565b9061173e565b939291938151905f955f938151840361182a57831561181b579291905f935b83851061178c5750505050506102429293506120e0565b909192939460018060a01b036117a287846110f0565b51169863ffffffff8816914383101561180c576117f7611801926117e58d600196815f52606a6020526117de888060a01b039160405f206116b5565b1692611f5c565b876117f08b896110f0565b5191611f80565b611394898c6120b5565b950193929190611775565b63e64f180f60e01b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b631fec674760e31b5f5260045ffd5b606b548061184657505f90565b805f19810111610d5b57606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b3015460201c90565b8054908161188b5750505f90565b815f19810111610d5b575f525f199060205f2001015460201c90565b5f198114610d5b5760010190565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b9060018060a01b031681526040602082015260806040611904845160608386015260a08501906118b5565b9360208101516060850152015191015290565b6033546001600160a01b0316330361192b57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b61197843611ef4565b6001600160e01b0382116119cc577f9324f7e5a7c0288808a634ccde44b8e979676474b22e29ee9dd569b55e791a4b916020916119c1906001600160e01b03831690606c6122a0565b5050604051908152a1565b60405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b6064820152608490fd5b603380546001600160a01b039283166001600160a01b0319821681179092559091167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3565b6001600160a01b039081165f818152606a6020526040902090929190611a8e9061187d565b6001600160a01b0390921692911690828214611af557805f52606a602052611ab98360405f20612151565b50506040516001600160a01b03909216825243917fd061168252f441733658f09e4d8f5b2d998ed4ef24a2bbfd6ceca52ea131500290602090a4565b505050565b8015610d5b575f190190565b15611b0d57565b60405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608490fd5b611b9f9291610dbf91611b7f60ff5f5460081c16611b06565b60018060a01b03166001600160601b0360a01b606854161760685561196f565b611bb860ff5f5460081c16611bb381611b06565b611b06565b61024233611a21565b606654600160401b8110156101d757600181016066556066548110156111045760665f5281516020929092015160a01b6001600160a01b0319166001600160a01b0392909216919091175f5160206124765f395f51905f5290910155565b9091611c36611c44936040845260408401906104d3565b9160208184039101526104d3565b90565b611c508161217b565b15611d175760405191611c62836101bc565b611c6a610f58565b83526066545f60665580611cdd575b505f5b82518051821015611ca35790611c9d611c97826001946110f0565b51611bc1565b01611c7c565b505091907f23aad4e61744ece164130aa415c1616e80136b0f0770e56589438b90b269265e91611cd860405192839283611c1f565b0390a1565b60665f525f5160206124765f395f51905f52015f5160206124765f395f51905f525b818110611d0c5750611c79565b5f8155600101611cff565b63d173577960e01b5f5260045ffd5b81810392915f138015828513169184121617610d5b57565b6001600160a01b0381165f818152606d602052604081209092908390611d639061187d565b60018060e01b03169384611d9260ff611d8c8660018060a01b03165f52606e60205260405f2090565b54161590565b15611e0757611da091611d26565b938415611e0057611dea611de57f88770dc862e47a7ed586907857eb1b75e4c5ffc8b707c7ee10eb74d6885fe5949460018060a01b03165f52606d60205260405f2090565b61212c565b50505b604080519182526020820192909252a290565b5050505090565b505050611e138161127f565b611e1d8482611d26565b938415611e0057611e6882611e637f88770dc862e47a7ed586907857eb1b75e4c5ffc8b707c7ee10eb74d6885fe5949560018060a01b03165f52606d60205260405f2090565b612151565b5050611ded565b90611e8b6001600160e01b03611e83611839565b169283611449565b90611e9543611ef4565b6001600160e01b0383116119cc57611eb9906001600160e01b03841690606b6122a0565b505060408051848152602081018490527f86dcf86b12dfeedea74ae9300dbdaa193bcce5809369c8177ea2f4eaaa65729b9181908101611cd8565b63ffffffff8111611f085763ffffffff1690565b60405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b6064820152608490fd5b6001600160a01b0391821691161015611f7157565b63ba50f91160e01b5f5260045ffd5b919091611f8d82846123b6565b93909260058510156120a157611fb69415938461208b575b508315611fcb575b50505015151590565b611fbc57565b638baa579f60e01b5f5260045ffd5b5f9350906120036120118594936040519283916020830195630b135d3f60e11b875260248401526040604484015260648301906118b5565b03601f198101835282610212565b51915afa3d15612084573d61202581610354565b906120336040519283610212565b81523d5f602083013e5b81612076575b81612052575b505f8080611fad565b905061206f630b135d3f60e11b91602080825183010191016123eb565b145f612049565b905060208151101590612043565b606061203d565b6001600160a01b0384811691161493505f611fa5565b634e487b7160e01b5f52602160045260245ffd5b9063ffffffff164381101561180c57611c449160018060a01b03165f52606d60205260405f206116b5565b9063ffffffff164381101561180c576120f8816114c1565b821161211d57612107906115e8565b1161210e57565b63e121632f60e01b5f5260045ffd5b634b05a0f760e11b5f5260045ffd5b5f6121409161213a43611ef4565b906122a0565b6001600160e01b0391821692911690565b61215a43611ef4565b6001600160e01b0383116119cc57612140926001600160e01b0316916122a0565b515f919082805b82518210156121d15761219b6109a66112b384866110f0565b906001600160a01b0380831691161015611f71576121c860019195611394611382602061137387896110f0565b91019093612182565b5050509061271014155f146121e4575f90565b600190565b805490600160401b8210156101d75760018201808255821015611104575f9081526020902001815160209283015190921b63ffffffff191663ffffffff92909216919091179055565b9060405161223f816101f7565b602081935463ffffffff81168352811c910152565b1561225b57565b60405162461bcd60e51b815260206004820152601b60248201527f436865636b706f696e743a2064656372656173696e67206b65797300000000006044820152606490fd5b909291928382548015155f1461238c579260209291846122d86122d36122c8612352986114b3565b855f5260205f200190565b612232565b9363ffffffff6122fd6122ef875163ffffffff1690565b828416928391161115612254565b61231761230e875163ffffffff1690565b63ffffffff1690565b036123565750612344926116f761232d926114b3565b9063ffffffff82549181199060201b169116179055565b01516001600160e01b031690565b9190565b91505061238791612374612368610233565b63ffffffff9093168352565b6001600160e01b038816828601526121e9565b612344565b50506123b19161239d612368610233565b6001600160e01b03851660208301526121e9565b5f9190565b9060418151145f146123e2576123de91602082015190606060408401519301515f1a906123fa565b9091565b50505f90600290565b9081602091031261026c575190565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841161246a576020935f9360ff60809460405194855216868401526040830152606082015282805260015afa15610a32575f516001600160a01b0381161561246257905f90565b505f90600190565b505050505f9060039056fe46501879b8ca8525e8c2fd519e2fbfcfa2ebea26501294aa02cbfcfb12e94354a26469706673582212200bd934ca0c33158a634e91f8eba933600d6993aa31a2669352d7969c54ecbb8e64736f6c634300081b0033
/// ```
⋮----
/// The runtime bytecode of the contract, as deployed on the network.
⋮----
///0x60806040526004361015610011575f80fd5b5f3560e01c8062cf2ab5146101a35780630dba33941461019e5780631626ba7e146101995780631703a018146101945780631e4cd85e1461018f578063314f3a491461018a5780633b242e4a146101855780633d5611f61461018057806340bf2fb71461017b5780635140a548146101765780635e1042e8146101715780635ef533291461016c578063696255be14610167578063715018a614610162578063743c31f41461015d578063857dc190146101585780638da5cb5b14610153578063955f2d901461014e57806398ec1ac914610149578063a2ce5fd114610144578063ab1189951461013f578063b933fa741461013a578063dec5d1f614610135578063ec7fbb31146101305763f2fde38b1461012b575f80fd5b610e04565b610dc4565b610d60565b610cf1565b610bdf565b610ad4565b610aad565b610a5f565b610a37565b61091d565b6108d2565b610877565b6107ec565b6107c8565b610785565b6106bf565b6106a2565b610618565b6105d0565b6105a5565b610578565b61052c565b6103b5565b61031f565b6102d7565b634e487b7160e01b5f52604160045260245ffd5b602081019081106001600160401b038211176101d757604052565b6101a8565b606081019081106001600160401b038211176101d757604052565b604081019081106001600160401b038211176101d757604052565b90601f801991011681019081106001600160401b038211176101d757604052565b60405190610242604083610212565b565b6001600160401b0381116101d75760051b60200190565b6001600160a01b0381160361026c57565b5f80fd5b9080601f8301121561026c57813561028781610244565b926102956040519485610212565b81845260208085019260051b82010192831161026c57602001905b8282106102bd5750505090565b6020809183356102cc8161025b565b8152019101906102b0565b3461026c57602036600319011261026c576004356001600160401b03811161026c5761030a61030f913690600401610270565b611464565b005b63ffffffff81160361026c57565b3461026c57602036600319011261026c57602061034c63ffffffff60043561034681610311565b166114c1565b604051908152f35b6001600160401b0381116101d757601f01601f191660200190565b81601f8201121561026c5780359061038682610354565b926103946040519485610212565b8284526020838301011161026c57815f926020809301838601378301015290565b3461026c57604036600319011261026c576004356024356001600160401b03811161026c576103e890369060040161036f565b9081518201916060816020850194031261026c5760208101516001600160401b03811161026c57810183603f8201121561026c5760208101519061042b82610244565b916104396040519384610212565b8083526020808085019260051b840101019186831161026c57604001905b8282106104af5750505060408201516001600160401b03811161026c57606061048b61049896602061049294870101610e95565b9301610f4d565b92611756565b604051630b135d3f60e11b815280602081015b0390f35b6020809183516104be8161025b565b815201910190610457565b5f91031261026c57565b602060408184019251938281528451809452019201905f5b8181106104f85750505090565b825180516001600160a01b031685526020908101516001600160601b031681860152604090940193909201916001016104eb565b3461026c575f36600319011261026c57606060405161054a816101bc565b526104ab60405161055a816101bc565b610562610f58565b81526040519182916020835260208301906104d3565b3461026c57602036600319011261026c57602061034c63ffffffff60043561059f81610311565b166115e8565b3461026c575f36600319011261026c5760206001600160e01b036105c7611839565b16604051908152f35b3461026c57602036600319011261026c576004356105ed8161025b565b6001600160a01b03165f908152606d602090815260409091206001600160e01b03906105c79061187d565b3461026c57604036600319011261026c576004356001600160401b03811161026c576060600319823603011261026c57604051610654816101dc565b81600401356001600160401b03811161026c5761030f9261067d6044926004369184010161036f565b835260248101356020840152013560408201526024359061069d8261025b565b610fcf565b3461026c575f36600319011261026c576020606754604051908152f35b3461026c57604036600319011261026c576004356001600160401b03811161026c573660238201121561026c5780600401356106fa81610244565b916107086040519384610212565b8183526024602084019260051b8201019036821161026c5760248101925b82841061075657602435856001600160401b03821161026c5761075061030f92369060040161036f565b50611109565b83356001600160401b03811161026c5760209161077a839260243691870101610270565b815201930192610726565b3461026c57604036600319011261026c5760206004356107a48161025b565b6001600160a01b039081165f908152606a8352604090206105c790602435906116b5565b3461026c57602036600319011261026c5761030f6004356107e7611917565b61196f565b3461026c57604036600319011261026c576024356004356001600160401b03821161026c577f713ca53b88d6eb63f5b1854cb8cbdd736ec51eda225e46791aa9298b0160648f61084361030f933690600401610270565b9161084c611917565b6067548160675561086f6040519283928360209093929193604081019481520152565b0390a1611464565b3461026c575f36600319011261026c5761088f611917565b603380546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b3461026c57602036600319011261026c576004356108ef8161025b565b335f52606e60205260ff60405f2054161561090e5761030f9033611a69565b6325ec6c1f60e01b5f5260045ffd5b3461026c575f36600319011261026c57335f908152606e6020526040902061094f9061094b905b5460ff1690565b1590565b61090e57610966610961606554611afa565b606555565b335f908152606e60205260409020805460ff1916905561098d61098833611d3e565b611e6f565b50506068546109b2906109a6906001600160a01b031681565b6001600160a01b031690565b803b1561026c576040516351b27a6d60e11b8152336004820152905f908290602490829084905af18015610a3257610a18575b6068546001600160a01b0316337f31e0adfec71bccee37b6e83a90c2fedb17d8f1693fee863c4771e7bfe2aed5805f80a3005b80610a265f610a2c93610212565b806104c9565b5f6109e5565b611232565b3461026c575f36600319011261026c576033546040516001600160a01b039091168152602090f35b3461026c57604036600319011261026c57602061034c600435610a818161025b565b60243590610a8e82610311565b60018060a01b03165f52606d835263ffffffff60405f209116906116b5565b3461026c57602036600319011261026c57602061034c600435610acf8161025b565b61127f565b3461026c57602036600319011261026c57600435610af18161025b565b60018060a01b03165f52606a602052602060018060a01b036105c760405f2061187d565b919060208382031261026c57604051610b2d816101bc565b80938035906001600160401b03821161026c570182601f8201121561026c57803590610b5882610244565b93610b666040519586610212565b82855260208086019360061b8301019181831161026c57602001925b828410610b90575050505052565b60408483031261026c5760405190610ba7826101f7565b8435610bb28161025b565b82526020850135906001600160601b038216820361026c5782602092836040950152815201930192610b82565b3461026c57606036600319011261026c57600435610bfc8161025b565b6044356024356001600160401b03821161026c57610c21610c69923690600401610b15565b905f5493610c4f610c3961094b8760ff9060081c1690565b80968197610ce3575b8115610cc3575b506113e6565b84610c60600160ff195f5416175f55565b610cac57611b66565b610c6f57005b610c7d61ff00195f54165f55565b604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b610cbe61010061ff00195f5416175f55565b611b66565b303b15915081610cd5575b505f610c49565b60ff1660011490505f610cce565b600160ff8216109150610c42565b3461026c575f36600319011261026c57606c5480610d20575060205f5b6040516001600160e01b039091168152f35b805f19810111610d5b57606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe0150154602090811c610d0e565b61123d565b3461026c57604036600319011261026c576004356001600160401b03811161026c57610d90903690600401610b15565b602435906001600160401b03821161026c5761030a610db661030f933690600401610270565b91610dbf611917565b611c47565b3461026c57602036600319011261026c57600435610de18161025b565b60018060a01b03165f52606e602052602060ff60405f2054166040519015158152f35b3461026c57602036600319011261026c57600435610e218161025b565b610e29611917565b6001600160a01b03811615610e415761030f90611a21565b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b9080601f8301121561026c57815191610ead83610244565b92610ebb6040519485610212565b80845260208085019160051b8301019183831161026c5760208101915b838310610ee757505050505090565b82516001600160401b03811161026c57820185603f8201121561026c57602081015191610f1383610354565b610f206040519182610212565b838152604083850101881061026c575f602085819660408397018386015e83010152815201920191610ed8565b519061024282610311565b60665490610f6582610244565b91610f736040519384610212565b80835260665f9081525f5160206124765f395f51905f52602085015b838310610f9c5750505050565b600160208192604051610fae816101f7565b8554848060a01b038116825260a01c83820152815201920192019190610f8f565b335f908152606e60205260409020909190610fe990610944565b6110cd5761103290610fff6109616065546118a7565b335f908152606e6020526040902061101e90805460ff19166001179055565b61102a61098833611d3e565b505033611a69565b606854611049906109a6906001600160a01b031681565b803b1561026c57604051639926ee7d60e01b8152915f9183918290849082906110769033600484016118d9565b03925af18015610a32576110b9575b506068546001600160a01b0316337fa453db612af59e5521d6ab9284dc3e2d06af286eb1b1b7b771fce4716c19f2c15f80a3565b80610a265f6110c793610212565b5f611085565b6342ee68b560e01b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b80518210156111045760209160051b010190565b6110dc565b80511561110457602001518051606554036111275761024290611464565b63169efb5b60e11b5f5260045ffd5b9061114082610244565b61114d6040519182610212565b828152809261115e601f1991610244565b0190602036910137565b60208183031261026c578051906001600160401b03821161026c57019080601f8301121561026c57815161119b81610244565b926111a96040519485610212565b81845260208085019260051b82010192831161026c57602001905b8282106111d15750505090565b81518152602091820191016111c4565b6060602091604081019360018060a01b031681526040838201528451809452019201905f5b8181106112135750505090565b82516001600160a01b0316845260209384019390920191600101611206565b6040513d5f823e3d90fd5b634e487b7160e01b5f52601160045260245ffd5b81810292918115918404141715610d5b57565b9060018201809211610d5b57565b91908201809211610d5b57565b611287610f58565b915f906112948451611136565b915f5b85518110156112e057806112da6112c16112b36001948a6110f0565b51516001600160a01b031690565b6112cb83886110f0565b6001600160a01b039091169052565b01611297565b50915f9061130492946040519384928392639004134760e01b8452600484016111e1565b03817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610a32575f916113c4575b505f915b84518310156113a25761139a60019161139461136086866110f0565b5161138e61138260206113738a8d6110f0565b5101516001600160601b031690565b6001600160601b031690565b90611251565b90611272565b920191611344565b9150506113b3919250612710900490565b60675481106113bf5790565b505f90565b6113e091503d805f833e6113d88183610212565b810190611168565b5f611340565b156113ed57565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b9190915f8382019384129112908015821691151617610d5b57565b905f805b83518210156114a25760019061149a906114946001600160a01b0361148d86896110f0565b5116611d3e565b90611449565b910190611468565b90506114af919250611e6f565b5050565b5f19810191908211610d5b57565b438110156115a4576114d290611ef4565b606b549063ffffffff165f5b82811061153f575050806114fb57505f5b6001600160e01b031690565b61153361150a61153a926114b3565b606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b40190565b5460201c90565b6114ef565b90918082169080831860011c8201809211610d5b57606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b482015463ffffffff168410156115925750915b906114de565b92915061159e90611264565b9061158c565b606460405162461bcd60e51b815260206004820152602060248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e65646044820152fd5b438110156115a4576115f990611ef4565b606c549063ffffffff165f5b8281106116505750508061161857505f90565b61153361162761153a926114b3565b606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe0160190565b90918082169080831860011c8201809211610d5b57606c5f527f2b4a51ab505fc96a0952efda2ba61bcd3078d4c02c39a186ec16f21883fbe01682015463ffffffff168410156116a35750915b90611605565b9291506116af90611264565b9061169d565b90438110156115a4576116c790611ef4565b81549063ffffffff165f5b828110611702575050806116e757505f919050565b61153a916116f7611533926114b3565b905f5260205f200190565b90918082169080831860011c8201809211610d5b57845f528363ffffffff6117348460205f200163ffffffff90541690565b1611156117445750915b906116d2565b92915061175090611264565b9061173e565b939291938151905f955f938151840361182a57831561181b579291905f935b83851061178c5750505050506102429293506120e0565b909192939460018060a01b036117a287846110f0565b51169863ffffffff8816914383101561180c576117f7611801926117e58d600196815f52606a6020526117de888060a01b039160405f206116b5565b1692611f5c565b876117f08b896110f0565b5191611f80565b611394898c6120b5565b950193929190611775565b63e64f180f60e01b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b631fec674760e31b5f5260045ffd5b606b548061184657505f90565b805f19810111610d5b57606b5f527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b3015460201c90565b8054908161188b5750505f90565b815f19810111610d5b575f525f199060205f2001015460201c90565b5f198114610d5b5760010190565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b9060018060a01b031681526040602082015260806040611904845160608386015260a08501906118b5565b9360208101516060850152015191015290565b6033546001600160a01b0316330361192b57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b61197843611ef4565b6001600160e01b0382116119cc577f9324f7e5a7c0288808a634ccde44b8e979676474b22e29ee9dd569b55e791a4b916020916119c1906001600160e01b03831690606c6122a0565b5050604051908152a1565b60405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b6064820152608490fd5b603380546001600160a01b039283166001600160a01b0319821681179092559091167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3565b6001600160a01b039081165f818152606a6020526040902090929190611a8e9061187d565b6001600160a01b0390921692911690828214611af557805f52606a602052611ab98360405f20612151565b50506040516001600160a01b03909216825243917fd061168252f441733658f09e4d8f5b2d998ed4ef24a2bbfd6ceca52ea131500290602090a4565b505050565b8015610d5b575f190190565b15611b0d57565b60405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608490fd5b611b9f9291610dbf91611b7f60ff5f5460081c16611b06565b60018060a01b03166001600160601b0360a01b606854161760685561196f565b611bb860ff5f5460081c16611bb381611b06565b611b06565b61024233611a21565b606654600160401b8110156101d757600181016066556066548110156111045760665f5281516020929092015160a01b6001600160a01b0319166001600160a01b0392909216919091175f5160206124765f395f51905f5290910155565b9091611c36611c44936040845260408401906104d3565b9160208184039101526104d3565b90565b611c508161217b565b15611d175760405191611c62836101bc565b611c6a610f58565b83526066545f60665580611cdd575b505f5b82518051821015611ca35790611c9d611c97826001946110f0565b51611bc1565b01611c7c565b505091907f23aad4e61744ece164130aa415c1616e80136b0f0770e56589438b90b269265e91611cd860405192839283611c1f565b0390a1565b60665f525f5160206124765f395f51905f52015f5160206124765f395f51905f525b818110611d0c5750611c79565b5f8155600101611cff565b63d173577960e01b5f5260045ffd5b81810392915f138015828513169184121617610d5b57565b6001600160a01b0381165f818152606d602052604081209092908390611d639061187d565b60018060e01b03169384611d9260ff611d8c8660018060a01b03165f52606e60205260405f2090565b54161590565b15611e0757611da091611d26565b938415611e0057611dea611de57f88770dc862e47a7ed586907857eb1b75e4c5ffc8b707c7ee10eb74d6885fe5949460018060a01b03165f52606d60205260405f2090565b61212c565b50505b604080519182526020820192909252a290565b5050505090565b505050611e138161127f565b611e1d8482611d26565b938415611e0057611e6882611e637f88770dc862e47a7ed586907857eb1b75e4c5ffc8b707c7ee10eb74d6885fe5949560018060a01b03165f52606d60205260405f2090565b612151565b5050611ded565b90611e8b6001600160e01b03611e83611839565b169283611449565b90611e9543611ef4565b6001600160e01b0383116119cc57611eb9906001600160e01b03841690606b6122a0565b505060408051848152602081018490527f86dcf86b12dfeedea74ae9300dbdaa193bcce5809369c8177ea2f4eaaa65729b9181908101611cd8565b63ffffffff8111611f085763ffffffff1690565b60405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b6064820152608490fd5b6001600160a01b0391821691161015611f7157565b63ba50f91160e01b5f5260045ffd5b919091611f8d82846123b6565b93909260058510156120a157611fb69415938461208b575b508315611fcb575b50505015151590565b611fbc57565b638baa579f60e01b5f5260045ffd5b5f9350906120036120118594936040519283916020830195630b135d3f60e11b875260248401526040604484015260648301906118b5565b03601f198101835282610212565b51915afa3d15612084573d61202581610354565b906120336040519283610212565b81523d5f602083013e5b81612076575b81612052575b505f8080611fad565b905061206f630b135d3f60e11b91602080825183010191016123eb565b145f612049565b905060208151101590612043565b606061203d565b6001600160a01b0384811691161493505f611fa5565b634e487b7160e01b5f52602160045260245ffd5b9063ffffffff164381101561180c57611c449160018060a01b03165f52606d60205260405f206116b5565b9063ffffffff164381101561180c576120f8816114c1565b821161211d57612107906115e8565b1161210e57565b63e121632f60e01b5f5260045ffd5b634b05a0f760e11b5f5260045ffd5b5f6121409161213a43611ef4565b906122a0565b6001600160e01b0391821692911690565b61215a43611ef4565b6001600160e01b0383116119cc57612140926001600160e01b0316916122a0565b515f919082805b82518210156121d15761219b6109a66112b384866110f0565b906001600160a01b0380831691161015611f71576121c860019195611394611382602061137387896110f0565b91019093612182565b5050509061271014155f146121e4575f90565b600190565b805490600160401b8210156101d75760018201808255821015611104575f9081526020902001815160209283015190921b63ffffffff191663ffffffff92909216919091179055565b9060405161223f816101f7565b602081935463ffffffff81168352811c910152565b1561225b57565b60405162461bcd60e51b815260206004820152601b60248201527f436865636b706f696e743a2064656372656173696e67206b65797300000000006044820152606490fd5b909291928382548015155f1461238c579260209291846122d86122d36122c8612352986114b3565b855f5260205f200190565b612232565b9363ffffffff6122fd6122ef875163ffffffff1690565b828416928391161115612254565b61231761230e875163ffffffff1690565b63ffffffff1690565b036123565750612344926116f761232d926114b3565b9063ffffffff82549181199060201b169116179055565b01516001600160e01b031690565b9190565b91505061238791612374612368610233565b63ffffffff9093168352565b6001600160e01b038816828601526121e9565b612344565b50506123b19161239d612368610233565b6001600160e01b03851660208301526121e9565b5f9190565b9060418151145f146123e2576123de91602082015190606060408401519301515f1a906123fa565b9091565b50505f90600290565b9081602091031261026c575190565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841161246a576020935f9360ff60809460405194855216868401526040830152606082015282805260015afa15610a32575f516001600160a01b0381161561246257905f90565b505f90600190565b505050505f9060039056fe46501879b8ca8525e8c2fd519e2fbfcfa2ebea26501294aa02cbfcfb12e94354a26469706673582212200bd934ca0c33158a634e91f8eba933600d6993aa31a2669352d7969c54ecbb8e64736f6c634300081b0033
⋮----
/**Custom error with signature `InsufficientSignedStake()` and selector `0xe121632f`.
    ```solidity
    error InsufficientSignedStake();
    ```*/
⋮----
pub struct InsufficientSignedStake {}
⋮----
type UnderlyingSolTuple<'a> = ();
⋮----
type UnderlyingRustTuple<'a> = ();
⋮----
fn from(value: InsufficientSignedStake) -> Self {
⋮----
type Parameters<'a> = UnderlyingSolTuple<'a>;
type Token<'a> = <Self::Parameters<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn new<'a>(
⋮----
tuple.into()
⋮----
fn tokenize(&self) -> Self::Token<'_> {
⋮----
/**Custom error with signature `InsufficientWeight()` and selector `0xa8792fd1`.
    ```solidity
    error InsufficientWeight();
    ```*/
⋮----
pub struct InsufficientWeight {}
⋮----
fn from(value: InsufficientWeight) -> Self {
⋮----
/**Custom error with signature `InvalidLength()` and selector `0x947d5a84`.
    ```solidity
    error InvalidLength();
    ```*/
⋮----
pub struct InvalidLength {}
⋮----
fn from(value: InvalidLength) -> Self {
⋮----
/**Custom error with signature `InvalidQuorum()` and selector `0xd1735779`.
    ```solidity
    error InvalidQuorum();
    ```*/
⋮----
pub struct InvalidQuorum {}
⋮----
fn from(value: InvalidQuorum) -> Self {
⋮----
/**Custom error with signature `InvalidReferenceBlock()` and selector `0xe64f180f`.
    ```solidity
    error InvalidReferenceBlock();
    ```*/
⋮----
pub struct InvalidReferenceBlock {}
⋮----
fn from(value: InvalidReferenceBlock) -> Self {
⋮----
/**Custom error with signature `InvalidSignature()` and selector `0x8baa579f`.
    ```solidity
    error InvalidSignature();
    ```*/
⋮----
pub struct InvalidSignature {}
⋮----
fn from(value: InvalidSignature) -> Self {
⋮----
/**Custom error with signature `InvalidSignedWeight()` and selector `0x960b41ee`.
    ```solidity
    error InvalidSignedWeight();
    ```*/
⋮----
pub struct InvalidSignedWeight {}
⋮----
fn from(value: InvalidSignedWeight) -> Self {
⋮----
/**Custom error with signature `InvalidThreshold()` and selector `0xaabd5a09`.
    ```solidity
    error InvalidThreshold();
    ```*/
⋮----
pub struct InvalidThreshold {}
⋮----
fn from(value: InvalidThreshold) -> Self {
⋮----
/**Custom error with signature `LengthMismatch()` and selector `0xff633a38`.
    ```solidity
    error LengthMismatch();
    ```*/
⋮----
pub struct LengthMismatch {}
⋮----
fn from(value: LengthMismatch) -> Self {
⋮----
/**Custom error with signature `MustUpdateAllOperators()` and selector `0x2d3df6b6`.
    ```solidity
    error MustUpdateAllOperators();
    ```*/
⋮----
pub struct MustUpdateAllOperators {}
⋮----
fn from(value: MustUpdateAllOperators) -> Self {
⋮----
/**Custom error with signature `NotSorted()` and selector `0xba50f911`.
    ```solidity
    error NotSorted();
    ```*/
⋮----
pub struct NotSorted {}
⋮----
fn from(value: NotSorted) -> Self {
⋮----
/**Custom error with signature `OperatorAlreadyRegistered()` and selector `0x42ee68b5`.
    ```solidity
    error OperatorAlreadyRegistered();
    ```*/
⋮----
pub struct OperatorAlreadyRegistered {}
⋮----
fn from(value: OperatorAlreadyRegistered) -> Self {
⋮----
/**Custom error with signature `OperatorNotRegistered()` and selector `0x25ec6c1f`.
    ```solidity
    error OperatorNotRegistered();
    ```*/
⋮----
pub struct OperatorNotRegistered {}
⋮----
fn from(value: OperatorNotRegistered) -> Self {
⋮----
/**Event with signature `Initialized(uint8)` and selector `0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498`.
    ```solidity
    event Initialized(uint8 version);
    ```*/
⋮----
pub struct Initialized {
⋮----
type DataTuple<'a> = (alloy::sol_types::sol_data::Uint<8>,);
type DataToken<'a> = <Self::DataTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
type TopicList = (alloy_sol_types::sol_data::FixedBytes<32>,);
⋮----
fn new(
⋮----
fn check_signature(
⋮----
return Err(alloy_sol_types::Error::invalid_event_signature_hash(
⋮----
Ok(())
⋮----
fn tokenize_body(&self) -> Self::DataToken<'_> {
⋮----
fn topics(&self) -> <Self::TopicList as alloy_sol_types::SolType>::RustType {
(Self::SIGNATURE_HASH.into(),)
⋮----
fn encode_topics_raw(
⋮----
if out.len() < <Self::TopicList as alloy_sol_types::TopicList>::COUNT {
return Err(alloy_sol_types::Error::Overrun);
⋮----
fn to_log_data(&self) -> alloy_sol_types::private::LogData {
⋮----
fn into_log_data(self) -> alloy_sol_types::private::LogData {
⋮----
fn from(this: &Initialized) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `MinimumWeightUpdated(uint256,uint256)` and selector `0x713ca53b88d6eb63f5b1854cb8cbdd736ec51eda225e46791aa9298b0160648f`.
    ```solidity
    event MinimumWeightUpdated(uint256 previous, uint256 current);
    ```*/
⋮----
pub struct MinimumWeightUpdated {
⋮----
type DataTuple<'a> = (
⋮----
fn from(this: &MinimumWeightUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `OperatorDeregistered(address,address)` and selector `0x31e0adfec71bccee37b6e83a90c2fedb17d8f1693fee863c4771e7bfe2aed580`.
    ```solidity
    event OperatorDeregistered(address indexed operator, address indexed avs);
    ```*/
⋮----
pub struct OperatorDeregistered {
⋮----
type DataTuple<'a> = ();
⋮----
type TopicList = (
⋮----
Self::SIGNATURE_HASH.into(),
self.operator.clone(),
self.avs.clone(),
⋮----
fn from(this: &OperatorDeregistered) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `OperatorRegistered(address,address)` and selector `0xa453db612af59e5521d6ab9284dc3e2d06af286eb1b1b7b771fce4716c19f2c1`.
    ```solidity
    event OperatorRegistered(address indexed operator, address indexed avs);
    ```*/
⋮----
pub struct OperatorRegistered {
⋮----
fn from(this: &OperatorRegistered) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `OperatorWeightUpdated(address,uint256,uint256)` and selector `0x88770dc862e47a7ed586907857eb1b75e4c5ffc8b707c7ee10eb74d6885fe594`.
    ```solidity
    event OperatorWeightUpdated(address indexed operator, uint256 oldWeight, uint256 newWeight);
    ```*/
⋮----
pub struct OperatorWeightUpdated {
⋮----
(Self::SIGNATURE_HASH.into(), self.operator.clone())
⋮----
fn from(this: &OperatorWeightUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `OwnershipTransferred(address,address)` and selector `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`.
    ```solidity
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    ```*/
⋮----
pub struct OwnershipTransferred {
⋮----
self.previousOwner.clone(),
self.newOwner.clone(),
⋮----
fn from(this: &OwnershipTransferred) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `QuorumUpdated(((address,uint96)[]),((address,uint96)[]))` and selector `0x23aad4e61744ece164130aa415c1616e80136b0f0770e56589438b90b269265e`.
    ```solidity
    event QuorumUpdated(IECDSAStakeRegistryTypes.Quorum previous, IECDSAStakeRegistryTypes.Quorum current);
    ```*/
⋮----
pub struct QuorumUpdated {
⋮----
fn from(this: &QuorumUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `SigningKeyUpdate(address,uint256,address,address)` and selector `0xd061168252f441733658f09e4d8f5b2d998ed4ef24a2bbfd6ceca52ea1315002`.
    ```solidity
    event SigningKeyUpdate(address indexed operator, uint256 indexed updateBlock, address indexed newSigningKey, address oldSigningKey);
    ```*/
⋮----
pub struct SigningKeyUpdate {
⋮----
type DataTuple<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
self.updateBlock.clone(),
self.newSigningKey.clone(),
⋮----
fn from(this: &SigningKeyUpdate) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `ThresholdWeightUpdated(uint256)` and selector `0x9324f7e5a7c0288808a634ccde44b8e979676474b22e29ee9dd569b55e791a4b`.
    ```solidity
    event ThresholdWeightUpdated(uint256 thresholdWeight);
    ```*/
⋮----
pub struct ThresholdWeightUpdated {
⋮----
type DataTuple<'a> = (alloy::sol_types::sol_data::Uint<256>,);
⋮----
fn from(this: &ThresholdWeightUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `TotalWeightUpdated(uint256,uint256)` and selector `0x86dcf86b12dfeedea74ae9300dbdaa193bcce5809369c8177ea2f4eaaa65729b`.
    ```solidity
    event TotalWeightUpdated(uint256 oldTotalWeight, uint256 newTotalWeight);
    ```*/
⋮----
pub struct TotalWeightUpdated {
⋮----
fn from(this: &TotalWeightUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `UpdateMinimumWeight(uint256,uint256)` and selector `0x1ea42186b305fa37310450d9fb87ea1e8f0c7f447e771479e3b27634bfe84dc1`.
    ```solidity
    event UpdateMinimumWeight(uint256 oldMinimumWeight, uint256 newMinimumWeight);
    ```*/
⋮----
pub struct UpdateMinimumWeight {
⋮----
fn from(this: &UpdateMinimumWeight) -> alloy_sol_types::private::LogData {
⋮----
/**Constructor`.
    ```solidity
    constructor(address _delegationManager);
    ```*/
⋮----
pub struct constructorCall {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::Address,);
⋮----
fn from(value: constructorCall) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
/**Function with signature `deregisterOperator()` and selector `0x857dc190`.
    ```solidity
    function deregisterOperator() external;
    ```*/
⋮----
pub struct deregisterOperatorCall {}
///Container type for the return parameters of the [`deregisterOperator()`](deregisterOperatorCall) function.
⋮----
pub struct deregisterOperatorReturn {}
⋮----
fn from(value: deregisterOperatorCall) -> Self {
⋮----
fn from(value: deregisterOperatorReturn) -> Self {
⋮----
type Parameters<'a> = ();
⋮----
type Return = deregisterOperatorReturn;
type ReturnTuple<'a> = ();
type ReturnToken<'a> = <Self::ReturnTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn abi_decode_returns(
⋮----
.map(Into::into)
⋮----
/**Function with signature `getLastCheckpointOperatorWeight(address)` and selector `0x3b242e4a`.
    ```solidity
    function getLastCheckpointOperatorWeight(address operator) external view returns (uint256);
    ```*/
⋮----
pub struct getLastCheckpointOperatorWeightCall {
⋮----
///Container type for the return parameters of the [`getLastCheckpointOperatorWeight(address)`](getLastCheckpointOperatorWeightCall) function.
⋮----
pub struct getLastCheckpointOperatorWeightReturn {
⋮----
fn from(value: getLastCheckpointOperatorWeightCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Uint<256>,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::primitives::aliases::U256,);
⋮----
fn from(value: getLastCheckpointOperatorWeightReturn) -> Self {
⋮----
type Return = getLastCheckpointOperatorWeightReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Uint<256>,);
⋮----
/**Function with signature `getLastCheckpointThresholdWeight()` and selector `0xb933fa74`.
    ```solidity
    function getLastCheckpointThresholdWeight() external view returns (uint256);
    ```*/
⋮----
pub struct getLastCheckpointThresholdWeightCall {}
///Container type for the return parameters of the [`getLastCheckpointThresholdWeight()`](getLastCheckpointThresholdWeightCall) function.
⋮----
pub struct getLastCheckpointThresholdWeightReturn {
⋮----
fn from(value: getLastCheckpointThresholdWeightCall) -> Self {
⋮----
fn from(value: getLastCheckpointThresholdWeightReturn) -> Self {
⋮----
type Return = getLastCheckpointThresholdWeightReturn;
⋮----
/**Function with signature `getLastCheckpointThresholdWeightAtBlock(uint32)` and selector `0x1e4cd85e`.
    ```solidity
    function getLastCheckpointThresholdWeightAtBlock(uint32 blockNumber) external view returns (uint256);
    ```*/
⋮----
pub struct getLastCheckpointThresholdWeightAtBlockCall {
⋮----
///Container type for the return parameters of the [`getLastCheckpointThresholdWeightAtBlock(uint32)`](getLastCheckpointThresholdWeightAtBlockCall) function.
⋮----
pub struct getLastCheckpointThresholdWeightAtBlockReturn {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Uint<32>,);
⋮----
type UnderlyingRustTuple<'a> = (u32,);
⋮----
fn from(value: getLastCheckpointThresholdWeightAtBlockCall) -> Self {
⋮----
fn from(value: getLastCheckpointThresholdWeightAtBlockReturn) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::Uint<32>,);
⋮----
type Return = getLastCheckpointThresholdWeightAtBlockReturn;
⋮----
/**Function with signature `getLastCheckpointTotalWeight()` and selector `0x314f3a49`.
    ```solidity
    function getLastCheckpointTotalWeight() external view returns (uint256);
    ```*/
⋮----
pub struct getLastCheckpointTotalWeightCall {}
///Container type for the return parameters of the [`getLastCheckpointTotalWeight()`](getLastCheckpointTotalWeightCall) function.
⋮----
pub struct getLastCheckpointTotalWeightReturn {
⋮----
fn from(value: getLastCheckpointTotalWeightCall) -> Self {
⋮----
fn from(value: getLastCheckpointTotalWeightReturn) -> Self {
⋮----
type Return = getLastCheckpointTotalWeightReturn;
⋮----
/**Function with signature `getLastCheckpointTotalWeightAtBlock(uint32)` and selector `0x0dba3394`.
    ```solidity
    function getLastCheckpointTotalWeightAtBlock(uint32 blockNumber) external view returns (uint256);
    ```*/
⋮----
pub struct getLastCheckpointTotalWeightAtBlockCall {
⋮----
///Container type for the return parameters of the [`getLastCheckpointTotalWeightAtBlock(uint32)`](getLastCheckpointTotalWeightAtBlockCall) function.
⋮----
pub struct getLastCheckpointTotalWeightAtBlockReturn {
⋮----
fn from(value: getLastCheckpointTotalWeightAtBlockCall) -> Self {
⋮----
fn from(value: getLastCheckpointTotalWeightAtBlockReturn) -> Self {
⋮----
type Return = getLastCheckpointTotalWeightAtBlockReturn;
⋮----
/**Function with signature `getLatestOperatorSigningKey(address)` and selector `0xa2ce5fd1`.
    ```solidity
    function getLatestOperatorSigningKey(address operator) external view returns (address);
    ```*/
⋮----
pub struct getLatestOperatorSigningKeyCall {
⋮----
///Container type for the return parameters of the [`getLatestOperatorSigningKey(address)`](getLatestOperatorSigningKeyCall) function.
⋮----
pub struct getLatestOperatorSigningKeyReturn {
⋮----
fn from(value: getLatestOperatorSigningKeyCall) -> Self {
⋮----
fn from(value: getLatestOperatorSigningKeyReturn) -> Self {
⋮----
type Return = getLatestOperatorSigningKeyReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
/**Function with signature `getOperatorSigningKeyAtBlock(address,uint256)` and selector `0x5e1042e8`.
    ```solidity
    function getOperatorSigningKeyAtBlock(address operator, uint256 blockNumber) external view returns (address);
    ```*/
⋮----
pub struct getOperatorSigningKeyAtBlockCall {
⋮----
///Container type for the return parameters of the [`getOperatorSigningKeyAtBlock(address,uint256)`](getOperatorSigningKeyAtBlockCall) function.
⋮----
pub struct getOperatorSigningKeyAtBlockReturn {
⋮----
fn from(value: getOperatorSigningKeyAtBlockCall) -> Self {
⋮----
fn from(value: getOperatorSigningKeyAtBlockReturn) -> Self {
⋮----
type Parameters<'a> = (
⋮----
type Return = getOperatorSigningKeyAtBlockReturn;
⋮----
/**Function with signature `getOperatorWeight(address)` and selector `0x98ec1ac9`.
    ```solidity
    function getOperatorWeight(address operator) external view returns (uint256);
    ```*/
⋮----
pub struct getOperatorWeightCall {
⋮----
///Container type for the return parameters of the [`getOperatorWeight(address)`](getOperatorWeightCall) function.
⋮----
pub struct getOperatorWeightReturn {
⋮----
fn from(value: getOperatorWeightCall) -> Self {
⋮----
fn from(value: getOperatorWeightReturn) -> Self {
⋮----
type Return = getOperatorWeightReturn;
⋮----
/**Function with signature `getOperatorWeightAtBlock(address,uint32)` and selector `0x955f2d90`.
    ```solidity
    function getOperatorWeightAtBlock(address operator, uint32 blockNumber) external view returns (uint256);
    ```*/
⋮----
pub struct getOperatorWeightAtBlockCall {
⋮----
///Container type for the return parameters of the [`getOperatorWeightAtBlock(address,uint32)`](getOperatorWeightAtBlockCall) function.
⋮----
pub struct getOperatorWeightAtBlockReturn {
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::Address, u32);
⋮----
fn from(value: getOperatorWeightAtBlockCall) -> Self {
⋮----
fn from(value: getOperatorWeightAtBlockReturn) -> Self {
⋮----
type Return = getOperatorWeightAtBlockReturn;
⋮----
/**Function with signature `initialize(address,uint256,((address,uint96)[]))` and selector `0xab118995`.
    ```solidity
    function initialize(address _serviceManager, uint256 thresholdWeight, IECDSAStakeRegistryTypes.Quorum memory quorum) external;
    ```*/
⋮----
pub struct initializeCall {
⋮----
///Container type for the return parameters of the [`initialize(address,uint256,((address,uint96)[]))`](initializeCall) function.
⋮----
pub struct initializeReturn {}
⋮----
fn from(value: initializeCall) -> Self {
⋮----
fn from(value: initializeReturn) -> Self {
⋮----
type Return = initializeReturn;
⋮----
/**Function with signature `isValidSignature(bytes32,bytes)` and selector `0x1626ba7e`.
    ```solidity
    function isValidSignature(bytes32 digest, bytes memory _signatureData) external view returns (bytes4);
    ```*/
⋮----
pub struct isValidSignatureCall {
⋮----
///Container type for the return parameters of the [`isValidSignature(bytes32,bytes)`](isValidSignatureCall) function.
⋮----
pub struct isValidSignatureReturn {
⋮----
fn from(value: isValidSignatureCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::FixedBytes<4>,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::FixedBytes<4>,);
⋮----
fn from(value: isValidSignatureReturn) -> Self {
⋮----
type Return = isValidSignatureReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::FixedBytes<4>,);
⋮----
/**Function with signature `minimumWeight()` and selector `0x40bf2fb7`.
    ```solidity
    function minimumWeight() external view returns (uint256);
    ```*/
⋮----
pub struct minimumWeightCall {}
///Container type for the return parameters of the [`minimumWeight()`](minimumWeightCall) function.
⋮----
pub struct minimumWeightReturn {
⋮----
fn from(value: minimumWeightCall) -> Self {
⋮----
fn from(value: minimumWeightReturn) -> Self {
⋮----
type Return = minimumWeightReturn;
⋮----
/**Function with signature `operatorRegistered(address)` and selector `0xec7fbb31`.
    ```solidity
    function operatorRegistered(address operator) external view returns (bool);
    ```*/
⋮----
pub struct operatorRegisteredCall {
⋮----
///Container type for the return parameters of the [`operatorRegistered(address)`](operatorRegisteredCall) function.
⋮----
pub struct operatorRegisteredReturn {
⋮----
fn from(value: operatorRegisteredCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Bool,);
⋮----
type UnderlyingRustTuple<'a> = (bool,);
⋮----
fn from(value: operatorRegisteredReturn) -> Self {
⋮----
type Return = operatorRegisteredReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Bool,);
⋮----
/**Function with signature `owner()` and selector `0x8da5cb5b`.
    ```solidity
    function owner() external view returns (address);
    ```*/
⋮----
pub struct ownerCall {}
///Container type for the return parameters of the [`owner()`](ownerCall) function.
⋮----
pub struct ownerReturn {
⋮----
fn from(value: ownerCall) -> Self {
⋮----
fn from(value: ownerReturn) -> Self {
⋮----
type Return = ownerReturn;
⋮----
/**Function with signature `quorum()` and selector `0x1703a018`.
    ```solidity
    function quorum() external view returns (IECDSAStakeRegistryTypes.Quorum memory);
    ```*/
⋮----
pub struct quorumCall {}
///Container type for the return parameters of the [`quorum()`](quorumCall) function.
⋮----
pub struct quorumReturn {
⋮----
fn from(value: quorumCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (IECDSAStakeRegistryTypes::Quorum,);
⋮----
type UnderlyingRustTuple<'a> =
⋮----
fn from(value: quorumReturn) -> Self {
⋮----
type Return = quorumReturn;
type ReturnTuple<'a> = (IECDSAStakeRegistryTypes::Quorum,);
⋮----
/**Function with signature `registerOperatorWithSignature((bytes,bytes32,uint256),address)` and selector `0x3d5611f6`.
    ```solidity
    function registerOperatorWithSignature(ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry memory operatorSignature, address signingKey) external;
    ```*/
⋮----
pub struct registerOperatorWithSignatureCall {
⋮----
///Container type for the return parameters of the [`registerOperatorWithSignature((bytes,bytes32,uint256),address)`](registerOperatorWithSignatureCall) function.
⋮----
pub struct registerOperatorWithSignatureReturn {}
⋮----
fn from(value: registerOperatorWithSignatureCall) -> Self {
⋮----
fn from(value: registerOperatorWithSignatureReturn) -> Self {
⋮----
type Return = registerOperatorWithSignatureReturn;
⋮----
/**Function with signature `renounceOwnership()` and selector `0x715018a6`.
    ```solidity
    function renounceOwnership() external;
    ```*/
⋮----
pub struct renounceOwnershipCall {}
///Container type for the return parameters of the [`renounceOwnership()`](renounceOwnershipCall) function.
⋮----
pub struct renounceOwnershipReturn {}
⋮----
fn from(value: renounceOwnershipCall) -> Self {
⋮----
fn from(value: renounceOwnershipReturn) -> Self {
⋮----
type Return = renounceOwnershipReturn;
⋮----
/**Function with signature `transferOwnership(address)` and selector `0xf2fde38b`.
    ```solidity
    function transferOwnership(address newOwner) external;
    ```*/
⋮----
pub struct transferOwnershipCall {
⋮----
///Container type for the return parameters of the [`transferOwnership(address)`](transferOwnershipCall) function.
⋮----
pub struct transferOwnershipReturn {}
⋮----
fn from(value: transferOwnershipCall) -> Self {
⋮----
fn from(value: transferOwnershipReturn) -> Self {
⋮----
type Return = transferOwnershipReturn;
⋮----
/**Function with signature `updateMinimumWeight(uint256,address[])` and selector `0x696255be`.
    ```solidity
    function updateMinimumWeight(uint256 newMinimumWeight, address[] memory operators) external;
    ```*/
⋮----
pub struct updateMinimumWeightCall {
⋮----
///Container type for the return parameters of the [`updateMinimumWeight(uint256,address[])`](updateMinimumWeightCall) function.
⋮----
pub struct updateMinimumWeightReturn {}
⋮----
fn from(value: updateMinimumWeightCall) -> Self {
⋮----
fn from(value: updateMinimumWeightReturn) -> Self {
⋮----
type Return = updateMinimumWeightReturn;
⋮----
/**Function with signature `updateOperatorSigningKey(address)` and selector `0x743c31f4`.
    ```solidity
    function updateOperatorSigningKey(address newSigningKey) external;
    ```*/
⋮----
pub struct updateOperatorSigningKeyCall {
⋮----
///Container type for the return parameters of the [`updateOperatorSigningKey(address)`](updateOperatorSigningKeyCall) function.
⋮----
pub struct updateOperatorSigningKeyReturn {}
⋮----
fn from(value: updateOperatorSigningKeyCall) -> Self {
⋮----
fn from(value: updateOperatorSigningKeyReturn) -> Self {
⋮----
type Return = updateOperatorSigningKeyReturn;
⋮----
/**Function with signature `updateOperators(address[])` and selector `0x00cf2ab5`.
    ```solidity
    function updateOperators(address[] memory operators) external;
    ```*/
⋮----
pub struct updateOperatorsCall {
⋮----
///Container type for the return parameters of the [`updateOperators(address[])`](updateOperatorsCall) function.
⋮----
pub struct updateOperatorsReturn {}
⋮----
type UnderlyingSolTuple<'a> =
⋮----
fn from(value: updateOperatorsCall) -> Self {
⋮----
fn from(value: updateOperatorsReturn) -> Self {
⋮----
type Parameters<'a> =
⋮----
type Return = updateOperatorsReturn;
⋮----
/**Function with signature `updateOperatorsForQuorum(address[][],bytes)` and selector `0x5140a548`.
    ```solidity
    function updateOperatorsForQuorum(address[][] memory operatorsPerQuorum, bytes memory) external;
    ```*/
⋮----
pub struct updateOperatorsForQuorumCall {
⋮----
///Container type for the return parameters of the [`updateOperatorsForQuorum(address[][],bytes)`](updateOperatorsForQuorumCall) function.
⋮----
pub struct updateOperatorsForQuorumReturn {}
⋮----
fn from(value: updateOperatorsForQuorumCall) -> Self {
⋮----
fn from(value: updateOperatorsForQuorumReturn) -> Self {
⋮----
type Return = updateOperatorsForQuorumReturn;
⋮----
/**Function with signature `updateQuorumConfig(((address,uint96)[]),address[])` and selector `0xdec5d1f6`.
    ```solidity
    function updateQuorumConfig(IECDSAStakeRegistryTypes.Quorum memory quorum, address[] memory operators) external;
    ```*/
⋮----
pub struct updateQuorumConfigCall {
⋮----
///Container type for the return parameters of the [`updateQuorumConfig(((address,uint96)[]),address[])`](updateQuorumConfigCall) function.
⋮----
pub struct updateQuorumConfigReturn {}
⋮----
fn from(value: updateQuorumConfigCall) -> Self {
⋮----
fn from(value: updateQuorumConfigReturn) -> Self {
⋮----
type Return = updateQuorumConfigReturn;
⋮----
/**Function with signature `updateStakeThreshold(uint256)` and selector `0x5ef53329`.
    ```solidity
    function updateStakeThreshold(uint256 thresholdWeight) external;
    ```*/
⋮----
pub struct updateStakeThresholdCall {
⋮----
///Container type for the return parameters of the [`updateStakeThreshold(uint256)`](updateStakeThresholdCall) function.
⋮----
pub struct updateStakeThresholdReturn {}
⋮----
fn from(value: updateStakeThresholdCall) -> Self {
⋮----
fn from(value: updateStakeThresholdReturn) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::Uint<256>,);
⋮----
type Return = updateStakeThresholdReturn;
⋮----
///Container for all the [`ECDSAStakeRegistry`](self) function calls.
pub enum ECDSAStakeRegistryCalls {
⋮----
impl ECDSAStakeRegistryCalls {
/// All the selectors of this enum.
⋮----
/// Note that the selectors might not be in the same order as the variants.
/// No guarantees are made about the order of the selectors.
⋮----
/// Prefer using `SolInterface` methods instead.
⋮----
fn selector(&self) -> [u8; 4] {
⋮----
fn selector_at(i: usize) -> ::core::option::Option<[u8; 4]> {
Self::SELECTORS.get(i).copied()
⋮----
fn valid_selector(selector: [u8; 4]) -> bool {
Self::SELECTORS.binary_search(&selector).is_ok()
⋮----
fn abi_decode_raw(
⋮----
fn updateOperators(
⋮----
.map(ECDSAStakeRegistryCalls::updateOperators)
⋮----
fn getLastCheckpointTotalWeightAtBlock(
⋮----
.map(
⋮----
fn isValidSignature(
⋮----
.map(ECDSAStakeRegistryCalls::isValidSignature)
⋮----
fn quorum(
⋮----
.map(ECDSAStakeRegistryCalls::quorum)
⋮----
fn getLastCheckpointThresholdWeightAtBlock(
⋮----
fn getLastCheckpointTotalWeight(
⋮----
.map(ECDSAStakeRegistryCalls::getLastCheckpointTotalWeight)
⋮----
fn getLastCheckpointOperatorWeight(
⋮----
fn registerOperatorWithSignature(
⋮----
.map(ECDSAStakeRegistryCalls::registerOperatorWithSignature)
⋮----
fn minimumWeight(
⋮----
.map(ECDSAStakeRegistryCalls::minimumWeight)
⋮----
fn updateOperatorsForQuorum(
⋮----
.map(ECDSAStakeRegistryCalls::updateOperatorsForQuorum)
⋮----
fn getOperatorSigningKeyAtBlock(
⋮----
.map(ECDSAStakeRegistryCalls::getOperatorSigningKeyAtBlock)
⋮----
fn updateStakeThreshold(
⋮----
.map(ECDSAStakeRegistryCalls::updateStakeThreshold)
⋮----
fn updateMinimumWeight(
⋮----
.map(ECDSAStakeRegistryCalls::updateMinimumWeight)
⋮----
fn renounceOwnership(
⋮----
.map(ECDSAStakeRegistryCalls::renounceOwnership)
⋮----
fn updateOperatorSigningKey(
⋮----
.map(ECDSAStakeRegistryCalls::updateOperatorSigningKey)
⋮----
fn deregisterOperator(
⋮----
.map(ECDSAStakeRegistryCalls::deregisterOperator)
⋮----
fn owner(
⋮----
.map(ECDSAStakeRegistryCalls::owner)
⋮----
fn getOperatorWeightAtBlock(
⋮----
.map(ECDSAStakeRegistryCalls::getOperatorWeightAtBlock)
⋮----
fn getOperatorWeight(
⋮----
.map(ECDSAStakeRegistryCalls::getOperatorWeight)
⋮----
fn getLatestOperatorSigningKey(
⋮----
.map(ECDSAStakeRegistryCalls::getLatestOperatorSigningKey)
⋮----
fn initialize(
⋮----
.map(ECDSAStakeRegistryCalls::initialize)
⋮----
fn getLastCheckpointThresholdWeight(
⋮----
fn updateQuorumConfig(
⋮----
.map(ECDSAStakeRegistryCalls::updateQuorumConfig)
⋮----
fn operatorRegistered(
⋮----
.map(ECDSAStakeRegistryCalls::operatorRegistered)
⋮----
fn transferOwnership(
⋮----
.map(ECDSAStakeRegistryCalls::transferOwnership)
⋮----
let Ok(idx) = Self::SELECTORS.binary_search(&selector) else {
return Err(alloy_sol_types::Error::unknown_selector(
⋮----
fn abi_encoded_size(&self) -> usize {
⋮----
fn abi_encode_raw(&self, out: &mut alloy_sol_types::private::Vec<u8>) {
⋮----
///Container for all the [`ECDSAStakeRegistry`](self) custom errors.
pub enum ECDSAStakeRegistryErrors {
⋮----
impl ECDSAStakeRegistryErrors {
⋮----
fn OperatorNotRegistered(
⋮----
.map(ECDSAStakeRegistryErrors::OperatorNotRegistered)
⋮----
fn MustUpdateAllOperators(
⋮----
.map(ECDSAStakeRegistryErrors::MustUpdateAllOperators)
⋮----
fn OperatorAlreadyRegistered(
⋮----
.map(ECDSAStakeRegistryErrors::OperatorAlreadyRegistered)
⋮----
fn InvalidSignature(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidSignature)
⋮----
fn InvalidLength(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidLength)
⋮----
fn InvalidSignedWeight(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidSignedWeight)
⋮----
fn InsufficientWeight(
⋮----
.map(ECDSAStakeRegistryErrors::InsufficientWeight)
⋮----
fn InvalidThreshold(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidThreshold)
⋮----
fn NotSorted(
⋮----
.map(ECDSAStakeRegistryErrors::NotSorted)
⋮----
fn InvalidQuorum(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidQuorum)
⋮----
fn InsufficientSignedStake(
⋮----
.map(ECDSAStakeRegistryErrors::InsufficientSignedStake)
⋮----
fn InvalidReferenceBlock(
⋮----
.map(ECDSAStakeRegistryErrors::InvalidReferenceBlock)
⋮----
fn LengthMismatch(
⋮----
.map(ECDSAStakeRegistryErrors::LengthMismatch)
⋮----
///Container for all the [`ECDSAStakeRegistry`](self) events.
pub enum ECDSAStakeRegistryEvents {
⋮----
impl ECDSAStakeRegistryEvents {
⋮----
fn decode_raw_log(
⋮----
match topics.first().copied() {
⋮----
.map(Self::Initialized)
⋮----
.map(Self::MinimumWeightUpdated)
⋮----
.map(Self::OperatorDeregistered)
⋮----
.map(Self::OperatorRegistered)
⋮----
.map(Self::OperatorWeightUpdated)
⋮----
.map(Self::OwnershipTransferred)
⋮----
.map(Self::QuorumUpdated)
⋮----
.map(Self::SigningKeyUpdate)
⋮----
.map(Self::ThresholdWeightUpdated)
⋮----
.map(Self::TotalWeightUpdated)
⋮----
.map(Self::UpdateMinimumWeight)
⋮----
topics.to_vec(),
data.to_vec().into(),
⋮----
/**Creates a new wrapper around an on-chain [`ECDSAStakeRegistry`](self) contract instance.

    See the [wrapper's documentation](`ECDSAStakeRegistryInstance`) for more details.*/
⋮----
/**Deploys this contract using the given `provider` and constructor arguments, if any.

    Returns a new instance of the contract, if the deployment was successful.

    For more fine-grained control over the deployment process, use [`deploy_builder`] instead.*/
⋮----
pub fn deploy<
⋮----
/**Creates a `RawCallBuilder` for deploying this contract using the given `provider`
    and constructor arguments, if any.

    This is a simple wrapper around creating a `RawCallBuilder` with the data set to
    the bytecode concatenated with the constructor's ABI-encoded arguments.*/
⋮----
pub fn deploy_builder<
⋮----
/**A [`ECDSAStakeRegistry`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`ECDSAStakeRegistry`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct ECDSAStakeRegistryInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
f.debug_tuple("ECDSAStakeRegistryInstance")
⋮----
/**Creates a new wrapper around an on-chain [`ECDSAStakeRegistry`](self) contract instance.

        See the [wrapper's documentation](`ECDSAStakeRegistryInstance`) for more details.*/
⋮----
/**Deploys this contract using the given `provider` and constructor arguments, if any.

        Returns a new instance of the contract, if the deployment was successful.

        For more fine-grained control over the deployment process, use [`deploy_builder`] instead.*/
⋮----
pub async fn deploy(
⋮----
let contract_address = call_builder.deploy().await?;
Ok(Self::new(contract_address, call_builder.provider))
⋮----
/**Creates a `RawCallBuilder` for deploying this contract using the given `provider`
        and constructor arguments, if any.

        This is a simple wrapper around creating a `RawCallBuilder` with the data set to
        the bytecode concatenated with the constructor's ABI-encoded arguments.*/
⋮----
pub fn deploy_builder(
⋮----
.into(),
⋮----
pub fn with_cloned_provider(self) -> ECDSAStakeRegistryInstance<T, P, N> {
⋮----
///Creates a new call builder for the [`deregisterOperator`] function.
pub fn deregisterOperator(
⋮----
self.call_builder(&deregisterOperatorCall {})
⋮----
///Creates a new call builder for the [`getLastCheckpointOperatorWeight`] function.
pub fn getLastCheckpointOperatorWeight(
⋮----
self.call_builder(&getLastCheckpointOperatorWeightCall { operator })
⋮----
///Creates a new call builder for the [`getLastCheckpointThresholdWeight`] function.
pub fn getLastCheckpointThresholdWeight(
⋮----
self.call_builder(&getLastCheckpointThresholdWeightCall {})
⋮----
///Creates a new call builder for the [`getLastCheckpointThresholdWeightAtBlock`] function.
pub fn getLastCheckpointThresholdWeightAtBlock(
⋮----
self.call_builder(&getLastCheckpointThresholdWeightAtBlockCall { blockNumber })
⋮----
///Creates a new call builder for the [`getLastCheckpointTotalWeight`] function.
pub fn getLastCheckpointTotalWeight(
⋮----
self.call_builder(&getLastCheckpointTotalWeightCall {})
⋮----
///Creates a new call builder for the [`getLastCheckpointTotalWeightAtBlock`] function.
pub fn getLastCheckpointTotalWeightAtBlock(
⋮----
self.call_builder(&getLastCheckpointTotalWeightAtBlockCall { blockNumber })
⋮----
///Creates a new call builder for the [`getLatestOperatorSigningKey`] function.
pub fn getLatestOperatorSigningKey(
⋮----
self.call_builder(&getLatestOperatorSigningKeyCall { operator })
⋮----
///Creates a new call builder for the [`getOperatorSigningKeyAtBlock`] function.
pub fn getOperatorSigningKeyAtBlock(
⋮----
self.call_builder(&getOperatorSigningKeyAtBlockCall {
⋮----
///Creates a new call builder for the [`getOperatorWeight`] function.
pub fn getOperatorWeight(
⋮----
self.call_builder(&getOperatorWeightCall { operator })
⋮----
///Creates a new call builder for the [`getOperatorWeightAtBlock`] function.
pub fn getOperatorWeightAtBlock(
⋮----
self.call_builder(&getOperatorWeightAtBlockCall {
⋮----
///Creates a new call builder for the [`initialize`] function.
pub fn initialize(
⋮----
self.call_builder(&initializeCall {
⋮----
///Creates a new call builder for the [`isValidSignature`] function.
pub fn isValidSignature(
⋮----
self.call_builder(&isValidSignatureCall {
⋮----
///Creates a new call builder for the [`minimumWeight`] function.
pub fn minimumWeight(&self) -> alloy_contract::SolCallBuilder<T, &P, minimumWeightCall, N> {
self.call_builder(&minimumWeightCall {})
⋮----
///Creates a new call builder for the [`operatorRegistered`] function.
pub fn operatorRegistered(
⋮----
self.call_builder(&operatorRegisteredCall { operator })
⋮----
///Creates a new call builder for the [`owner`] function.
pub fn owner(&self) -> alloy_contract::SolCallBuilder<T, &P, ownerCall, N> {
self.call_builder(&ownerCall {})
⋮----
///Creates a new call builder for the [`quorum`] function.
pub fn quorum(&self) -> alloy_contract::SolCallBuilder<T, &P, quorumCall, N> {
self.call_builder(&quorumCall {})
⋮----
///Creates a new call builder for the [`registerOperatorWithSignature`] function.
pub fn registerOperatorWithSignature(
⋮----
self.call_builder(&registerOperatorWithSignatureCall {
⋮----
///Creates a new call builder for the [`renounceOwnership`] function.
pub fn renounceOwnership(
⋮----
self.call_builder(&renounceOwnershipCall {})
⋮----
///Creates a new call builder for the [`transferOwnership`] function.
pub fn transferOwnership(
⋮----
self.call_builder(&transferOwnershipCall { newOwner })
⋮----
///Creates a new call builder for the [`updateMinimumWeight`] function.
pub fn updateMinimumWeight(
⋮----
self.call_builder(&updateMinimumWeightCall {
⋮----
///Creates a new call builder for the [`updateOperatorSigningKey`] function.
pub fn updateOperatorSigningKey(
⋮----
self.call_builder(&updateOperatorSigningKeyCall { newSigningKey })
⋮----
///Creates a new call builder for the [`updateOperators`] function.
pub fn updateOperators(
⋮----
self.call_builder(&updateOperatorsCall { operators })
⋮----
///Creates a new call builder for the [`updateOperatorsForQuorum`] function.
pub fn updateOperatorsForQuorum(
⋮----
self.call_builder(&updateOperatorsForQuorumCall {
⋮----
///Creates a new call builder for the [`updateQuorumConfig`] function.
pub fn updateQuorumConfig(
⋮----
self.call_builder(&updateQuorumConfigCall { quorum, operators })
⋮----
///Creates a new call builder for the [`updateStakeThreshold`] function.
pub fn updateStakeThreshold(
⋮----
self.call_builder(&updateStakeThresholdCall { thresholdWeight })
⋮----
///Creates a new event filter for the [`Initialized`] event.
pub fn Initialized_filter(&self) -> alloy_contract::Event<T, &P, Initialized, N> {
⋮----
///Creates a new event filter for the [`MinimumWeightUpdated`] event.
pub fn MinimumWeightUpdated_filter(
⋮----
///Creates a new event filter for the [`OperatorDeregistered`] event.
pub fn OperatorDeregistered_filter(
⋮----
///Creates a new event filter for the [`OperatorRegistered`] event.
pub fn OperatorRegistered_filter(
⋮----
///Creates a new event filter for the [`OperatorWeightUpdated`] event.
pub fn OperatorWeightUpdated_filter(
⋮----
///Creates a new event filter for the [`OwnershipTransferred`] event.
pub fn OwnershipTransferred_filter(
⋮----
///Creates a new event filter for the [`QuorumUpdated`] event.
pub fn QuorumUpdated_filter(&self) -> alloy_contract::Event<T, &P, QuorumUpdated, N> {
⋮----
///Creates a new event filter for the [`SigningKeyUpdate`] event.
pub fn SigningKeyUpdate_filter(&self) -> alloy_contract::Event<T, &P, SigningKeyUpdate, N> {
⋮----
///Creates a new event filter for the [`ThresholdWeightUpdated`] event.
pub fn ThresholdWeightUpdated_filter(
⋮----
///Creates a new event filter for the [`TotalWeightUpdated`] event.
pub fn TotalWeightUpdated_filter(
⋮----
///Creates a new event filter for the [`UpdateMinimumWeight`] event.
pub fn UpdateMinimumWeight_filter(
````

## File: operator/rust/crates/utils/src/bindings/helloworldservicemanager.rs
````rust
///Module containing a contract's types and functions.
/**

```solidity
library IHelloWorldServiceManager {
    struct Task { string name; uint32 taskCreatedBlock; }
}
```*/
⋮----
pub mod IHelloWorldServiceManager {
⋮----
/**```solidity
    struct Task { string name; uint32 taskCreatedBlock; }
    ```*/
⋮----
pub struct Task {
⋮----
type UnderlyingSolTuple<'a> = (
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::String, u32);
⋮----
fn _type_assertion(_t: alloy_sol_types::private::AssertTypeEq<UnderlyingRustTuple>) {
⋮----
fn from(value: Task) -> Self {
⋮----
fn from(tuple: UnderlyingRustTuple<'_>) -> Self {
⋮----
type SolType = Self;
⋮----
fn stv_to_tokens(&self) -> <Self as alloy_sol_types::SolType>::Token<'_> {
⋮----
fn stv_abi_encoded_size(&self) -> usize {
⋮----
<UnderlyingRustTuple<'_> as ::core::convert::From<Self>>::from(self.clone());
⋮----
fn stv_eip712_data_word(&self) -> alloy_sol_types::Word {
⋮----
fn stv_abi_encode_packed_to(&self, out: &mut alloy_sol_types::private::Vec<u8>) {
⋮----
fn stv_abi_packed_encoded_size(&self) -> usize {
⋮----
type RustType = Self;
type Token<'a> = <UnderlyingSolTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn valid_token(token: &Self::Token<'_>) -> bool {
⋮----
fn detokenize(token: Self::Token<'_>) -> Self::RustType {
⋮----
fn eip712_root_type() -> alloy_sol_types::private::Cow<'static, str> {
⋮----
fn eip712_components(
⋮----
fn eip712_encode_type() -> alloy_sol_types::private::Cow<'static, str> {
⋮----
fn eip712_encode_data(&self) -> alloy_sol_types::private::Vec<u8> {
⋮----
.concat()
⋮----
fn topic_preimage_length(rust: &Self::RustType) -> usize {
⋮----
fn encode_topic_preimage(
⋮----
out.reserve(<Self as alloy_sol_types::EventTopic>::topic_preimage_length(rust));
⋮----
fn encode_topic(rust: &Self::RustType) -> alloy_sol_types::abi::token::WordToken {
⋮----
/**Creates a new wrapper around an on-chain [`IHelloWorldServiceManager`](self) contract instance.

    See the [wrapper's documentation](`IHelloWorldServiceManagerInstance`) for more details.*/
⋮----
pub const fn new<
⋮----
/**A [`IHelloWorldServiceManager`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`IHelloWorldServiceManager`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct IHelloWorldServiceManagerInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
f.debug_tuple("IHelloWorldServiceManagerInstance")
.field(&self.address)
.finish()
⋮----
/// Instantiation and getters/setters.
⋮----
/**Creates a new wrapper around an on-chain [`IHelloWorldServiceManager`](self) contract instance.

        See the [wrapper's documentation](`IHelloWorldServiceManagerInstance`) for more details.*/
⋮----
pub const fn new(address: alloy_sol_types::private::Address, provider: P) -> Self {
⋮----
/// Returns a reference to the address.
⋮----
pub const fn address(&self) -> &alloy_sol_types::private::Address {
⋮----
/// Sets the address.
⋮----
pub fn set_address(&mut self, address: alloy_sol_types::private::Address) {
⋮----
/// Sets the address and returns `self`.
pub fn at(mut self, address: alloy_sol_types::private::Address) -> Self {
self.set_address(address);
⋮----
/// Returns a reference to the provider.
⋮----
pub const fn provider(&self) -> &P {
⋮----
/// Clones the provider and returns a new instance with the cloned provider.
⋮----
pub fn with_cloned_provider(self) -> IHelloWorldServiceManagerInstance<T, P, N> {
⋮----
/// Function calls.
⋮----
/// Creates a new call builder using this contract instance's provider and address.
///
/// Note that the call can be any function call, not just those defined in this
/// contract. Prefer using the other methods for building type-safe contract calls.
pub fn call_builder<C: alloy_sol_types::SolCall>(
⋮----
/// Event filters.
⋮----
/// Creates a new event filter using this contract instance's provider and address.
⋮----
/// Note that the type can be any event, not just those defined in this contract.
/// Prefer using the other methods for building type-safe event filters.
pub fn event_filter<E: alloy_sol_types::SolEvent>(
⋮----
/**

```solidity
library IRewardsCoordinatorTypes {
    struct OperatorDirectedRewardsSubmission { StrategyAndMultiplier[] strategiesAndMultipliers; address token; OperatorReward[] operatorRewards; uint32 startTimestamp; uint32 duration; string description; }
    struct OperatorReward { address operator; uint256 amount; }
    struct RewardsSubmission { StrategyAndMultiplier[] strategiesAndMultipliers; address token; uint256 amount; uint32 startTimestamp; uint32 duration; }
    struct StrategyAndMultiplier { address strategy; uint96 multiplier; }
}
```*/
⋮----
pub mod IRewardsCoordinatorTypes {
⋮----
/**```solidity
    struct OperatorDirectedRewardsSubmission { StrategyAndMultiplier[] strategiesAndMultipliers; address token; OperatorReward[] operatorRewards; uint32 startTimestamp; uint32 duration; string description; }
    ```*/
⋮----
pub struct OperatorDirectedRewardsSubmission {
⋮----
type UnderlyingRustTuple<'a> = (
⋮----
fn from(value: OperatorDirectedRewardsSubmission) -> Self {
⋮----
components.push(
⋮----
components.extend(
⋮----
components.push(<OperatorReward as alloy_sol_types::SolStruct>::eip712_root_type());
⋮----
.extend(<OperatorReward as alloy_sol_types::SolStruct>::eip712_components());
⋮----
/**```solidity
    struct OperatorReward { address operator; uint256 amount; }
    ```*/
⋮----
pub struct OperatorReward {
⋮----
fn from(value: OperatorReward) -> Self {
⋮----
/**```solidity
    struct RewardsSubmission { StrategyAndMultiplier[] strategiesAndMultipliers; address token; uint256 amount; uint32 startTimestamp; uint32 duration; }
    ```*/
⋮----
pub struct RewardsSubmission {
⋮----
fn from(value: RewardsSubmission) -> Self {
⋮----
/**```solidity
    struct StrategyAndMultiplier { address strategy; uint96 multiplier; }
    ```*/
⋮----
pub struct StrategyAndMultiplier {
⋮----
fn from(value: StrategyAndMultiplier) -> Self {
⋮----
/**Creates a new wrapper around an on-chain [`IRewardsCoordinatorTypes`](self) contract instance.

    See the [wrapper's documentation](`IRewardsCoordinatorTypesInstance`) for more details.*/
⋮----
/**A [`IRewardsCoordinatorTypes`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`IRewardsCoordinatorTypes`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct IRewardsCoordinatorTypesInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
f.debug_tuple("IRewardsCoordinatorTypesInstance")
⋮----
/**Creates a new wrapper around an on-chain [`IRewardsCoordinatorTypes`](self) contract instance.

        See the [wrapper's documentation](`IRewardsCoordinatorTypesInstance`) for more details.*/
⋮----
pub fn with_cloned_provider(self) -> IRewardsCoordinatorTypesInstance<T, P, N> {
⋮----
/**

```solidity
library ISignatureUtilsMixinTypes {
    struct SignatureWithSaltAndExpiry { bytes signature; bytes32 salt; uint256 expiry; }
}
```*/
⋮----
pub mod ISignatureUtilsMixinTypes {
⋮----
/**```solidity
    struct SignatureWithSaltAndExpiry { bytes signature; bytes32 salt; uint256 expiry; }
    ```*/
⋮----
pub struct SignatureWithSaltAndExpiry {
⋮----
fn from(value: SignatureWithSaltAndExpiry) -> Self {
⋮----
/**Creates a new wrapper around an on-chain [`ISignatureUtilsMixinTypes`](self) contract instance.

    See the [wrapper's documentation](`ISignatureUtilsMixinTypesInstance`) for more details.*/
⋮----
/**A [`ISignatureUtilsMixinTypes`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`ISignatureUtilsMixinTypes`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct ISignatureUtilsMixinTypesInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
f.debug_tuple("ISignatureUtilsMixinTypesInstance")
⋮----
/**Creates a new wrapper around an on-chain [`ISignatureUtilsMixinTypes`](self) contract instance.

        See the [wrapper's documentation](`ISignatureUtilsMixinTypesInstance`) for more details.*/
⋮----
pub fn with_cloned_provider(self) -> ISignatureUtilsMixinTypesInstance<T, P, N> {
⋮----
/**

Generated by the following Solidity interface...
```solidity
library IHelloWorldServiceManager {
    struct Task {
        string name;
        uint32 taskCreatedBlock;
    }
}

library IRewardsCoordinatorTypes {
    struct OperatorDirectedRewardsSubmission {
        StrategyAndMultiplier[] strategiesAndMultipliers;
        address token;
        OperatorReward[] operatorRewards;
        uint32 startTimestamp;
        uint32 duration;
        string description;
    }
    struct OperatorReward {
        address operator;
        uint256 amount;
    }
    struct RewardsSubmission {
        StrategyAndMultiplier[] strategiesAndMultipliers;
        address token;
        uint256 amount;
        uint32 startTimestamp;
        uint32 duration;
    }
    struct StrategyAndMultiplier {
        address strategy;
        uint96 multiplier;
    }
}

library ISignatureUtilsMixinTypes {
    struct SignatureWithSaltAndExpiry {
        bytes signature;
        bytes32 salt;
        uint256 expiry;
    }
}

interface HelloWorldServiceManager {
    error DelayPeriodNotPassed();
    error OnlyRegistryCoordinator();
    error OnlyRewardsInitiator();
    error OnlyStakeRegistry();

    event Initialized(uint8 version);
    event NewTaskCreated(uint32 indexed taskIndex, IHelloWorldServiceManager.Task task);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RewardsInitiatorUpdated(address prevRewardsInitiator, address newRewardsInitiator);
    event TaskResponded(uint32 indexed taskIndex, IHelloWorldServiceManager.Task task, address operator);

    constructor(address _avsDirectory, address _stakeRegistry, address _rewardsCoordinator, address _delegationManager, address _allocationManager, uint32 _maxResponseIntervalBlocks);

    function MAX_RESPONSE_INTERVAL_BLOCKS() external view returns (uint32);
    function addPendingAdmin(address admin) external;
    function allTaskHashes(uint32) external view returns (bytes32);
    function allTaskResponses(address, uint32) external view returns (bytes memory);
    function allocationManager() external view returns (address);
    function avsDirectory() external view returns (address);
    function createAVSRewardsSubmission(IRewardsCoordinatorTypes.RewardsSubmission[] memory rewardsSubmissions) external;
    function createNewTask(string memory name) external returns (IHelloWorldServiceManager.Task memory);
    function createOperatorDirectedAVSRewardsSubmission(IRewardsCoordinatorTypes.OperatorDirectedRewardsSubmission[] memory operatorDirectedRewardsSubmissions) external;
    function deregisterOperatorFromAVS(address operator) external;
    function deregisterOperatorFromOperatorSets(address operator, uint32[] memory operatorSetIds) external;
    function getOperatorRestakedStrategies(address _operator) external view returns (address[] memory);
    function getRestakeableStrategies() external view returns (address[] memory);
    function initialize(address initialOwner, address _rewardsInitiator) external;
    function latestTaskNum() external view returns (uint32);
    function owner() external view returns (address);
    function registerOperatorToAVS(address operator, ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry memory operatorSignature) external;
    function removeAdmin(address admin) external;
    function removeAppointee(address appointee, address target, bytes4 selector) external;
    function removePendingAdmin(address pendingAdmin) external;
    function renounceOwnership() external;
    function respondToTask(IHelloWorldServiceManager.Task memory task, uint32 referenceTaskIndex, bytes memory signature) external;
    function rewardsInitiator() external view returns (address);
    function setAVSRegistrar(address registrar) external;
    function setAppointee(address appointee, address target, bytes4 selector) external;
    function setClaimerFor(address claimer) external;
    function setRewardsInitiator(address newRewardsInitiator) external;
    function slashOperator(IHelloWorldServiceManager.Task memory task, uint32 referenceTaskIndex, address operator) external;
    function stakeRegistry() external view returns (address);
    function taskWasResponded(uint32) external view returns (bool);
    function transferOwnership(address newOwner) external;
    function updateAVSMetadataURI(string memory _metadataURI) external;
}
```

...which was generated by the following JSON ABI:
```json
[
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_avsDirectory",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_stakeRegistry",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_rewardsCoordinator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_delegationManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_allocationManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_maxResponseIntervalBlocks",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "MAX_RESPONSE_INTERVAL_BLOCKS",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "addPendingAdmin",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "allTaskHashes",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allTaskResponses",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allocationManager",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "avsDirectory",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createAVSRewardsSubmission",
    "inputs": [
      {
        "name": "rewardsSubmissions",
        "type": "tuple[]",
        "internalType": "struct IRewardsCoordinatorTypes.RewardsSubmission[]",
        "components": [
          {
            "name": "strategiesAndMultipliers",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.StrategyAndMultiplier[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          },
          {
            "name": "token",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startTimestamp",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "duration",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createNewTask",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createOperatorDirectedAVSRewardsSubmission",
    "inputs": [
      {
        "name": "operatorDirectedRewardsSubmissions",
        "type": "tuple[]",
        "internalType": "struct IRewardsCoordinatorTypes.OperatorDirectedRewardsSubmission[]",
        "components": [
          {
            "name": "strategiesAndMultipliers",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.StrategyAndMultiplier[]",
            "components": [
              {
                "name": "strategy",
                "type": "address",
                "internalType": "contract IStrategy"
              },
              {
                "name": "multiplier",
                "type": "uint96",
                "internalType": "uint96"
              }
            ]
          },
          {
            "name": "token",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "operatorRewards",
            "type": "tuple[]",
            "internalType": "struct IRewardsCoordinatorTypes.OperatorReward[]",
            "components": [
              {
                "name": "operator",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "startTimestamp",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "duration",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperatorFromAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deregisterOperatorFromOperatorSets",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operatorSetIds",
        "type": "uint32[]",
        "internalType": "uint32[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getOperatorRestakedStrategies",
    "inputs": [
      {
        "name": "_operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRestakeableStrategies",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_rewardsInitiator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "latestTaskNum",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerOperatorToAVS",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operatorSignature",
        "type": "tuple",
        "internalType": "struct ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry",
        "components": [
          {
            "name": "signature",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "salt",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "expiry",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAdmin",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAppointee",
    "inputs": [
      {
        "name": "appointee",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "selector",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removePendingAdmin",
    "inputs": [
      {
        "name": "pendingAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "respondToTask",
    "inputs": [
      {
        "name": "task",
        "type": "tuple",
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      },
      {
        "name": "referenceTaskIndex",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rewardsInitiator",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setAVSRegistrar",
    "inputs": [
      {
        "name": "registrar",
        "type": "address",
        "internalType": "contract IAVSRegistrar"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setAppointee",
    "inputs": [
      {
        "name": "appointee",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "selector",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setClaimerFor",
    "inputs": [
      {
        "name": "claimer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRewardsInitiator",
    "inputs": [
      {
        "name": "newRewardsInitiator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "slashOperator",
    "inputs": [
      {
        "name": "task",
        "type": "tuple",
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      },
      {
        "name": "referenceTaskIndex",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stakeRegistry",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "taskWasResponded",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateAVSMetadataURI",
    "inputs": [
      {
        "name": "_metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewTaskCreated",
    "inputs": [
      {
        "name": "taskIndex",
        "type": "uint32",
        "indexed": true,
        "internalType": "uint32"
      },
      {
        "name": "task",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RewardsInitiatorUpdated",
    "inputs": [
      {
        "name": "prevRewardsInitiator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "newRewardsInitiator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskResponded",
    "inputs": [
      {
        "name": "taskIndex",
        "type": "uint32",
        "indexed": true,
        "internalType": "uint32"
      },
      {
        "name": "task",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IHelloWorldServiceManager.Task",
        "components": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "taskCreatedBlock",
            "type": "uint32",
            "internalType": "uint32"
          }
        ]
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "DelayPeriodNotPassed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyRegistryCoordinator",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyRewardsInitiator",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyStakeRegistry",
    "inputs": []
  }
]
```*/
⋮----
pub mod HelloWorldServiceManager {
⋮----
/// The creation / init bytecode of the contract.
⋮----
/// ```text
///0x610140346101eb57601f612bd938819003918201601f19168301916001600160401b038311848410176101ef5780849260c0946040528339810103126101eb5761004881610203565b9061005560208201610203565b61006160408301610203565b61006d60608401610203565b9160a061007c60808601610203565b9401519463ffffffff861686036101eb5760a05260805260e0526101005260c0525f5460ff8160081c166101965760ff8082160361015c575b50610120526040516129c1908161021882396080518181816104e20152818161082901528181610cc001528181610f090152818161132f0152818161197b0152611bb0015260a0518181816107a00152818161085b01528181610ce801526112eb015260c05181818161045601526105a9015260e0518181816101b7015281816109100152610b9901526101005181611c76015261012051818181610ea901526112570152f35b60ff90811916175f557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a15f6100b5565b60405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b51906001600160a01b03821682036101eb5756fe60806040526004361015610011575f80fd5b5f5f3560e01c80631785f53c14611e865780631fdb0cfd14611ea8578063279432eb14611e865780632d89f6fc14611e5157806333cfb7b714611b835780633415a49c146115245780633bc28c8c14611500578063485cc9551461135e578063683048351461131a5780636b3aa72e146112d6578063715018a61461127b578063733d056c1461123b5780637b6c42361461120157806385edf874146111225780638b00ce7c146110ff5780638da5cb5b146110d75780639677de1014610db85780639926ee7d14610c245780639da16d8e14610c01578063a0169ddd14610b74578063a20b99bf146108d2578063a364f4da1461080d578063a98fb35514610786578063ba5508801461076c578063c1a8e2c5146106d7578063c20bab7f146105d8578063ca8aa7c714610593578063e481af9d146104bd578063f25f161014610424578063f2fde38b14610393578063fc299dee1461036a5763fce36c7d1461017a575f80fd5b34610257576020366003190112610257576004356001600160401b038111610366576101aa9036906004016120e4565b6101b592919261257c565b7f0000000000000000000000000000000000000000000000000000000000000000825b82811061030257506001600160a01b031690813b156102fe576040519363fce36c7d60e01b8552816024860160206004880152526044850160448360051b87010192828690609e19813603015b8383106102655788808b8181808c0381838f5af1801561025a576102465750f35b8161025091611fca565b6102575780f35b80fd5b6040513d84823e3d90fd5b9091929394956043198a82030186528635828112156102fa5760206001928582930190608063ffffffff6102e8826102ae6102a08780612617565b60a0885260a088019161264b565b95898060a01b036102c0898301611ed7565b168887015260408101356040870152836102dc60608301611f5c565b16606087015201611f5c565b16910152980196019493019190610225565b8980fd5b8280fd5b8061033761031e6020610318600195888b6126af565b01612603565b604061032b84888b6126af565b013590309033906126d1565b61036061034a602061031884888b6126af565b84604061035885898c6126af565b01359161271c565b016101d8565b5080fd5b50346102575780600319360112610257576065546040516001600160a01b039091168152602090f35b5034610257576020366003190112610257576103ad611ec1565b6103b561233c565b6001600160a01b038116156103d0576103cd90612534565b80f35b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b503461025757602036600319011261025757806004356001600160a01b038116908190036104ba5761045461233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b85782916044839260405194859384926334f65bfd60e21b845230600485015260248401525af1801561025a576102465750f35b505b50fd5b50346102575780600319360112610257576040516302e0740360e31b815281816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561025a578291610571575b506105268151516124a4565b915b8151805182101561055f57600191906001600160a01b039061054b908390612286565b5151166105588286612286565b5201610528565b6040518061056d8682611f6d565b0390f35b61058d91503d8084833e6105858183611fca565b810190612394565b5f61051a565b50346102575780600319360112610257576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5034610257576040366003190112610257576105f2611ec1565b6105fa611f49565b9060018060a01b03168252609960205263ffffffff6040832091165f5260205260405f209060405191818154916106308361212b565b80865292600181169081156106ad575060011461066c575b61056d8561065881870382611fca565b604051918291602083526020830190612095565b815260208120939250905b808210610693575090915081016020016106588261056d610648565b919260018160209254838588010152019101909291610677565b86955061056d9693506020925061065894915060ff191682840152151560051b8201019293610648565b5034610257576040366003190112610257576106f1611ec1565b506024356001600160401b03811161036657366023820112156103665780600401356024602061072083612114565b61072d6040519182611fca565b838152019160051b8301019136831161076857602401905b828210610750578380f35b6020809161075d84611f5c565b815201910190610745565b8380fd5b50346102575761077b36611eeb565b5050506103cd61233c565b503461025757806107963661205a565b61079e61233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316803b156104b85760405163a98fb35560e01b81526020600482015291839183918290849082906107fc906024830190612095565b03925af1801561025a576102465750f35b503461025757602036600319011261025757610827611ec1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036108c35781907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b8576040516351b27a6d60e11b81526001600160a01b0390911660048201529082908290602490829084905af1801561025a576102465750f35b6346bf228160e01b8252600482fd5b5034610257576020366003190112610257576004356001600160401b038111610366576109039036906004016120e4565b61090e92919261257c565b7f0000000000000000000000000000000000000000000000000000000000000000825b828110610abf5750919283926001600160a01b031690813b15610aba57935060405191634e5cd2fd60e11b835280604484013060048601526040602486015252606483019060648160051b850101958092869160be19813603015b8484106109ad578880898181808f0381838e5af1801561025a576102465750f35b878a036063190183528535818112156102fa578201996109de6109d08c80612617565b60c0845260c084019161264b565b9a6001600160a01b036109f360208301611ed7565b1660208301526020610a086040830183612617565b848f036040860152808f529d9091019c8c5b818110610a89575050506020610a798c9d600194610a6b8563ffffffff610a446060889901611f5c565b16606084015263ffffffff610a5b60808301611f5c565b16608084015260a0810190612163565b9160a0818503910152612194565b980194019401939295995061098c565b90919d60408f60019260208392858060a01b03610aa582611ed7565b16835201356020820152019f01929101610a1a565b505050fd5b909291829483955b610adf610ad585858561259f565b60408101906125c1565b9050871015610b2f57610af6610ad585858561259f565b881015610b1b576001916020610b13928a60061b010135906125f6565b960195610ac7565b634e487b7160e01b86526032600452602486fd5b600192949593919650610b6e90610b5881308a610b536020610318898d339561259f565b6126d1565b84610b696020610318868a8d61259f565b61271c565b01610931565b50346102575760203660031901126102575780610b8f611ec1565b610b9761233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b85760405163a0169ddd60e01b81526001600160a01b0390911660048201529082908290602490829084905af1801561025a576102465750f35b503461025757602036600319011261025757610c1b611ec1565b506103cd61233c565b5034610d91576040366003190112610d9157610c3e611ec1565b602435906001600160401b038211610d915760606003198336030112610d915760405190606082018281106001600160401b03821117610da45760405282600401356001600160401b038111610d9157610c9e906004369186010161203c565b8252602082019160248401358352604460408201940135845260018060a01b037f0000000000000000000000000000000000000000000000000000000000000000163303610d95577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b15610d91575f610d5993819560405197889687958694639926ee7d60e01b865260018060a01b0316600486015260406024860152516060604486015260a4850190612095565b9151606484015251608483015203925af18015610d8657610d78575080f35b610d8491505f90611fca565b005b6040513d5f823e3d90fd5b5f80fd5b6346bf228160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b34610d91576060366003190112610d91576004356001600160401b038111610d915760406003198236030112610d9157610df0611f49565b906044356001600160a01b0381169190829003610d9157610e5663ffffffff604051602081019060208252610e3d81610e2f60408201886004016121b4565b03601f198101835282611fca565b519020941693845f52609860205260405f2054146121e9565b825f52609a60205260ff60405f20541661108757602490825f52609960205260405f20845f52602052610e95610e8f60405f205461212b565b156122ae565b0163ffffffff610ece610ea78361225b565b7f00000000000000000000000000000000000000000000000000000000000000009061226c565b1643111561103357610edf9061225b565b604051630955f2d960e41b81526004810183905263ffffffff9190911660248201526020816044817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611001575b5015610fa2575f52609960205260405f20905f5260205260405f20610f66815461212b565b601f8111610f82575b50600e661cdb185cda195960ca1b019055005b610f9c90825f52601f60205f20910160051c81019061230d565b81610f6f565b60405162461bcd60e51b815260206004820152603160248201527f4f70657261746f7220776173206e6f742072656769737465726564207768656e604482015270081d185cdac81dd85cc818dc99585d1959607a1b6064820152608490fd5b90506020813d60201161102b575b8161101c60209383611fca565b81010312610d91575183610f41565b3d915061100f565b60405162461bcd60e51b815260206004820152602660248201527f5461736b20726573706f6e73652074696d6520686173206e6f742065787069726044820152651959081e595d60d21b6064820152608490fd5b60405162461bcd60e51b815260206004820152602260248201527f5461736b2068617320616c7265616479206265656e20726573706f6e64656420604482015261746f60f01b6064820152608490fd5b34610d91575f366003190112610d91576033546040516001600160a01b039091168152602090f35b34610d91575f366003190112610d9157602063ffffffff60975416604051908152f35b34610d91576111303661205a565b611138612323565b50611141612323565b90815263ffffffff43166020820152604051602081019061116681610e2f85856120b9565b51902063ffffffff609754165f52609860205260405f205560975490600163ffffffff8316807f58180a6a0403a63c2b5ce4b85d129d46a80d37851b2216bd0a98b59e7309b847604051806111bb87826120b9565b0390a2019163ffffffff83116111ed5763ffffffff61056d93169063ffffffff191617609755604051918291826120b9565b634e487b7160e01b5f52601160045260245ffd5b34610d91576020366003190112610d915763ffffffff61121f611f36565b165f52609a602052602060ff60405f2054166040519015158152f35b34610d91575f366003190112610d9157602060405163ffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b34610d91575f366003190112610d915761129361233c565b603380546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b34610d91575f366003190112610d91576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610d91575f366003190112610d91576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610d91576040366003190112610d9157611377611ec1565b602435906001600160a01b0382168203610d91575f549160ff8360081c1615928380946114f3575b80156114dc575b156114805760ff1981166001175f558361146f575b5060ff5f5460081c1615611416576113d56113da92612534565b6124d6565b6113e057005b61ff00195f54165f557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160018152a1005b60405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608490fd5b61ffff1916610101175f55836113bb565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b50303b1580156113a65750600160ff8216146113a6565b50600160ff82161061139f565b34610d91576020366003190112610d9157610d8461151c611ec1565b6113d561233c565b34610d91576060366003190112610d91576004356001600160401b038111610d915736819003600482016040600319830112610d9157611562611f49565b906044356001600160401b038111610d915761158290369060040161203c565b926115a863ffffffff604051602081019060208252610e3d81610e2f60408201896121b4565b602485019463ffffffff6115be610ea78861225b565b164311611b2f5782359160221901821215610d9157016004810135906001600160401b038211610d9157602401908036038213610d915761162c602760405183819460208301966602432b6363796160cd1b88528484013781015f838201520301601f198101835282611fca565b5190207f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f52601c52603c5f2092805181019060608160208401930312610d915760208101516001600160401b038111610d915781019582603f88011215610d9157602087015161169c81612114565b976116aa604051998a611fca565b818952602080808b019360051b8301010190858211610d9157604001915b818310611b0f5750505060408201516001600160401b038111610d915782019280603f85011215610d915760208401519361170285612114565b946117106040519687611fca565b8086526020808088019260051b8401010191838311610d915760408101915b838310611aa557505050505060608201519063ffffffff8216809203610d915761175d63ffffffff9161225b565b1603611a49575f5b8651811015611932576001600160a01b036117808289612286565b51165f52609960205260405f20855f526020526117a3610e8f60405f205461212b565b6117ad8184612286565b516001600160a01b036117c0838a612286565b51165f52609960205260405f20865f5260205260405f20908051906001600160401b038211610da4576117f3835461212b565b601f81116118f7575b50602090601f8311600114611890576001949392915f9183611885575b50505f19600383901b1c191690841b1790555b857f8eb2d2fcccf5801e10ff58cd73e8781ba923122963789378771f03c1148b023e838060a01b0361185e848c612286565b5116604051809160408252611876604083018b6121b4565b9060208301520390a201611765565b015190508b80611819565b90601f19831691845f52815f20925f5b8181106118df5750916001969594929183889593106118c7575b505050811b01905561182c565b01515f1960f88460031b161c191690558b80806118ba565b929360206001819287860151815501950193016118a0565b61192290845f5260205f20601f850160051c81019160208610611928575b601f0160051c019061230d565b8a6117fc565b9091508190611915565b61197760208388885f52609a835260405f20600160ff198254161790556040519384928392630b135d3f60e11b84526004840152604060248401526044830190612095565b03817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611a06575b506001600160e01b031916630b135d3f60e11b036119cd57005b60405162461bcd60e51b8152602060048201526011602482015270496e76616c6964207369676e617475726560781b6044820152606490fd5b90506020813d602011611a41575b81611a2160209383611fca565b81010312610d9157516001600160e01b031981168103610d9157816119b3565b3d9150611a14565b60405162461bcd60e51b815260206004820152602e60248201527f5265666572656e636520626c6f636b206d757374206d61746368207461736b2060448201526d6372656174696f6e20626c6f636b60901b6064820152608490fd5b82516001600160401b038111610d915760209083010185603f82011215610d9157602081015191611ad583611feb565b611ae26040519182611fca565b8381526040838501018810610d91575f602085819660408397018386015e8301015281520192019161172f565b82516001600160a01b0381168103610d91578152602092830192016116c8565b60405162461bcd60e51b815260206004820152602660248201527f5461736b20726573706f6e73652074696d652068617320616c726561647920656044820152651e1c1a5c995960d21b6064820152608490fd5b34610d91576020366003190112610d9157611b9c611ec1565b6040516302e0740360e31b81525f816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611e37575b509081515190611bf782612114565b90611c056040519283611fca565b828252611c1183612114565b602083019490601f19013686375f5b848110611e0957505060408051639004134760e01b81526001600160a01b0390921660048301526024820152815160448201819052909384916064830191905f5b818110611de757505f939283900391508290507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610d86575f93611d55575b505f5f5b838110611d295750611cc3906124a4565b925f905f5b848110611cdd576040518061056d8882611f6d565b611ce78183612286565b51611cf5575b600101611cc8565b91600190611d21906001600160a01b03611d0f8688612286565b5116611d1b828a612286565b52612496565b929050611ced565b611d338186612286565b51611d41575b600101611cb2565b90611d4d600191612496565b919050611d39565b9092503d805f833e611d678183611fca565b810190602081830312610d91578051906001600160401b038211610d9157019080601f83011215610d91578151611d9d81612114565b92611dab6040519485611fca565b81845260208085019260051b820101928311610d9157602001905b828210611dd7575050509183611cae565b8151815260209182019101611dc6565b82516001600160a01b0316845287945060209384019390920191600101611c61565b600190818060a09895981b03611e20828551612286565b515116611e2d8287612286565b5201949194611c20565b611e4b91503d805f833e6105858183611fca565b82611be8565b34610d91576020366003190112610d915763ffffffff611e6f611f36565b165f526098602052602060405f2054604051908152f35b34610d91576020366003190112610d9157611e9f611ec1565b50610d8461233c565b34610d9157611eb636611eeb565b505050610d8461233c565b600435906001600160a01b0382168203610d9157565b35906001600160a01b0382168203610d9157565b6060906003190112610d91576004356001600160a01b0381168103610d9157906024356001600160a01b0381168103610d9157906044356001600160e01b031981168103610d915790565b6004359063ffffffff82168203610d9157565b6024359063ffffffff82168203610d9157565b359063ffffffff82168203610d9157565b60206040818301928281528451809452019201905f5b818110611f905750505090565b82516001600160a01b0316845260209384019390920191600101611f83565b604081019081106001600160401b03821117610da457604052565b90601f801991011681019081106001600160401b03821117610da457604052565b6001600160401b038111610da457601f01601f191660200190565b92919261201282611feb565b916120206040519384611fca565b829481845281830111610d91578281602093845f960137010152565b9080601f83011215610d915781602061205793359101612006565b90565b6020600319820112610d9157600435906001600160401b038211610d915780602383011215610d915781602461205793600401359101612006565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b60208152604063ffffffff60206120da855184838701526060860190612095565b9401511691015290565b9181601f84011215610d91578235916001600160401b038311610d91576020808501948460051b010111610d9157565b6001600160401b038111610da45760051b60200190565b90600182811c92168015612159575b602083101461214557565b634e487b7160e01b5f52602260045260245ffd5b91607f169161213a565b9035601e1982360301811215610d915701602081359101916001600160401b038211610d91578136038313610d9157565b908060209392818452848401375f828201840152601f01601f1916010190565b90602063ffffffff6121e2826121db6121cd8780612163565b604088526040880191612194565b9501611f5c565b1691015290565b156121f057565b60405162461bcd60e51b815260206004820152603d60248201527f737570706c696564207461736b20646f6573206e6f74206d617463682074686560448201527f206f6e65207265636f7264656420696e2074686520636f6e74726163740000006064820152608490fd5b3563ffffffff81168103610d915790565b9063ffffffff8091169116019063ffffffff82116111ed57565b805182101561229a5760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b156122b557565b60405162461bcd60e51b815260206004820152602a60248201527f4f70657261746f722068617320616c726561647920726573706f6e64656420746044820152696f20746865207461736b60b01b6064820152608490fd5b818110612318575050565b5f815560010161230d565b6040519061233082611faf565b5f602083606081520152565b6033546001600160a01b0316330361235057565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b602081830312610d91578051906001600160401b038211610d91570190602082820312610d915760405191602083018381106001600160401b03821117610da4576040528051906001600160401b038211610d91570181601f82011215610d915780519061240182612114565b9261240f6040519485611fca565b82845260208085019360061b83010191818311610d9157602001925b82841061243b5750505050815290565b604084830312610d91576040519061245282611faf565b84516001600160a01b0381168103610d915782526020850151906bffffffffffffffffffffffff82168203610d91578260209283604095015281520193019261242b565b5f1981146111ed5760010190565b906124ae82612114565b6124bb6040519182611fca565b82815280926124cc601f1991612114565b0190602036910137565b606554604080516001600160a01b038084168252841660208201529192917fe11cddf1816a43318ca175bbc52cd0185436e9cbead7c83acc54a73e461717e39190a16001600160a01b03166001600160a01b03199190911617606555565b603380546001600160a01b039283166001600160a01b0319821681179092559091167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3565b6065546001600160a01b0316330361259057565b638e79fdb560e01b5f5260045ffd5b919081101561229a5760051b8101359060be1981360301821215610d91570190565b903590601e1981360301821215610d9157018035906001600160401b038211610d9157602001918160061b36038313610d9157565b919082018092116111ed57565b356001600160a01b0381168103610d915790565b9035601e1982360301811215610d915701602081359101916001600160401b038211610d91578160061b36038313610d9157565b916020908281520191905f905b8082106126655750505090565b909192833560018060a01b038116809103610d915781526020840135906bffffffffffffffffffffffff8216809203610d9157604081600193602083940152019401920190612658565b919081101561229a5760051b81013590609e1981360301821215610d91570190565b6040516323b872dd60e01b60208201526001600160a01b03928316602482015292909116604483015260648083019390935291815261271a91612715608483611fca565b6127da565b565b604051636eb1769f60e11b81523060048201526001600160a01b0383166024820152602081806044810103816001600160a01b0386165afa908115610d86575f916127a6575b5061271a93612770916125f6565b60405163095ea7b360e01b60208201526001600160a01b0390931660248401526044808401919091528252612715606483611fca565b90506020813d6020116127d2575b816127c160209383611fca565b81010312610d91575161271a612762565b3d91506127b4565b906128599160018060a01b03165f80604051936127f8604086611fca565b602085527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564602086015260208151910182855af13d156128ea573d9161283d83611feb565b9261284b6040519485611fca565b83523d5f602085013e6128ee565b80519081159182156128c7575b50501561286f57565b60405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608490fd5b8192509060209181010312610d9157602001518015158103610d91575f80612866565b6060915b919290156129505750815115612902575090565b3b1561290b5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156129635750805190602001fd5b60405162461bcd60e51b815260206004820152908190612987906024830190612095565b0390fdfea26469706673582212203b546342ef21a7255d0d7b7411818c65d38edbcdfc1e788629169d92e5ba18bc64736f6c634300081b0033
/// ```
⋮----
/// The runtime bytecode of the contract, as deployed on the network.
⋮----
///0x60806040526004361015610011575f80fd5b5f5f3560e01c80631785f53c14611e865780631fdb0cfd14611ea8578063279432eb14611e865780632d89f6fc14611e5157806333cfb7b714611b835780633415a49c146115245780633bc28c8c14611500578063485cc9551461135e578063683048351461131a5780636b3aa72e146112d6578063715018a61461127b578063733d056c1461123b5780637b6c42361461120157806385edf874146111225780638b00ce7c146110ff5780638da5cb5b146110d75780639677de1014610db85780639926ee7d14610c245780639da16d8e14610c01578063a0169ddd14610b74578063a20b99bf146108d2578063a364f4da1461080d578063a98fb35514610786578063ba5508801461076c578063c1a8e2c5146106d7578063c20bab7f146105d8578063ca8aa7c714610593578063e481af9d146104bd578063f25f161014610424578063f2fde38b14610393578063fc299dee1461036a5763fce36c7d1461017a575f80fd5b34610257576020366003190112610257576004356001600160401b038111610366576101aa9036906004016120e4565b6101b592919261257c565b7f0000000000000000000000000000000000000000000000000000000000000000825b82811061030257506001600160a01b031690813b156102fe576040519363fce36c7d60e01b8552816024860160206004880152526044850160448360051b87010192828690609e19813603015b8383106102655788808b8181808c0381838f5af1801561025a576102465750f35b8161025091611fca565b6102575780f35b80fd5b6040513d84823e3d90fd5b9091929394956043198a82030186528635828112156102fa5760206001928582930190608063ffffffff6102e8826102ae6102a08780612617565b60a0885260a088019161264b565b95898060a01b036102c0898301611ed7565b168887015260408101356040870152836102dc60608301611f5c565b16606087015201611f5c565b16910152980196019493019190610225565b8980fd5b8280fd5b8061033761031e6020610318600195888b6126af565b01612603565b604061032b84888b6126af565b013590309033906126d1565b61036061034a602061031884888b6126af565b84604061035885898c6126af565b01359161271c565b016101d8565b5080fd5b50346102575780600319360112610257576065546040516001600160a01b039091168152602090f35b5034610257576020366003190112610257576103ad611ec1565b6103b561233c565b6001600160a01b038116156103d0576103cd90612534565b80f35b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b503461025757602036600319011261025757806004356001600160a01b038116908190036104ba5761045461233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b85782916044839260405194859384926334f65bfd60e21b845230600485015260248401525af1801561025a576102465750f35b505b50fd5b50346102575780600319360112610257576040516302e0740360e31b815281816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561025a578291610571575b506105268151516124a4565b915b8151805182101561055f57600191906001600160a01b039061054b908390612286565b5151166105588286612286565b5201610528565b6040518061056d8682611f6d565b0390f35b61058d91503d8084833e6105858183611fca565b810190612394565b5f61051a565b50346102575780600319360112610257576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5034610257576040366003190112610257576105f2611ec1565b6105fa611f49565b9060018060a01b03168252609960205263ffffffff6040832091165f5260205260405f209060405191818154916106308361212b565b80865292600181169081156106ad575060011461066c575b61056d8561065881870382611fca565b604051918291602083526020830190612095565b815260208120939250905b808210610693575090915081016020016106588261056d610648565b919260018160209254838588010152019101909291610677565b86955061056d9693506020925061065894915060ff191682840152151560051b8201019293610648565b5034610257576040366003190112610257576106f1611ec1565b506024356001600160401b03811161036657366023820112156103665780600401356024602061072083612114565b61072d6040519182611fca565b838152019160051b8301019136831161076857602401905b828210610750578380f35b6020809161075d84611f5c565b815201910190610745565b8380fd5b50346102575761077b36611eeb565b5050506103cd61233c565b503461025757806107963661205a565b61079e61233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316803b156104b85760405163a98fb35560e01b81526020600482015291839183918290849082906107fc906024830190612095565b03925af1801561025a576102465750f35b503461025757602036600319011261025757610827611ec1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036108c35781907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b8576040516351b27a6d60e11b81526001600160a01b0390911660048201529082908290602490829084905af1801561025a576102465750f35b6346bf228160e01b8252600482fd5b5034610257576020366003190112610257576004356001600160401b038111610366576109039036906004016120e4565b61090e92919261257c565b7f0000000000000000000000000000000000000000000000000000000000000000825b828110610abf5750919283926001600160a01b031690813b15610aba57935060405191634e5cd2fd60e11b835280604484013060048601526040602486015252606483019060648160051b850101958092869160be19813603015b8484106109ad578880898181808f0381838e5af1801561025a576102465750f35b878a036063190183528535818112156102fa578201996109de6109d08c80612617565b60c0845260c084019161264b565b9a6001600160a01b036109f360208301611ed7565b1660208301526020610a086040830183612617565b848f036040860152808f529d9091019c8c5b818110610a89575050506020610a798c9d600194610a6b8563ffffffff610a446060889901611f5c565b16606084015263ffffffff610a5b60808301611f5c565b16608084015260a0810190612163565b9160a0818503910152612194565b980194019401939295995061098c565b90919d60408f60019260208392858060a01b03610aa582611ed7565b16835201356020820152019f01929101610a1a565b505050fd5b909291829483955b610adf610ad585858561259f565b60408101906125c1565b9050871015610b2f57610af6610ad585858561259f565b881015610b1b576001916020610b13928a60061b010135906125f6565b960195610ac7565b634e487b7160e01b86526032600452602486fd5b600192949593919650610b6e90610b5881308a610b536020610318898d339561259f565b6126d1565b84610b696020610318868a8d61259f565b61271c565b01610931565b50346102575760203660031901126102575780610b8f611ec1565b610b9761233c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b156104b85760405163a0169ddd60e01b81526001600160a01b0390911660048201529082908290602490829084905af1801561025a576102465750f35b503461025757602036600319011261025757610c1b611ec1565b506103cd61233c565b5034610d91576040366003190112610d9157610c3e611ec1565b602435906001600160401b038211610d915760606003198336030112610d915760405190606082018281106001600160401b03821117610da45760405282600401356001600160401b038111610d9157610c9e906004369186010161203c565b8252602082019160248401358352604460408201940135845260018060a01b037f0000000000000000000000000000000000000000000000000000000000000000163303610d95577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690813b15610d91575f610d5993819560405197889687958694639926ee7d60e01b865260018060a01b0316600486015260406024860152516060604486015260a4850190612095565b9151606484015251608483015203925af18015610d8657610d78575080f35b610d8491505f90611fca565b005b6040513d5f823e3d90fd5b5f80fd5b6346bf228160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b34610d91576060366003190112610d91576004356001600160401b038111610d915760406003198236030112610d9157610df0611f49565b906044356001600160a01b0381169190829003610d9157610e5663ffffffff604051602081019060208252610e3d81610e2f60408201886004016121b4565b03601f198101835282611fca565b519020941693845f52609860205260405f2054146121e9565b825f52609a60205260ff60405f20541661108757602490825f52609960205260405f20845f52602052610e95610e8f60405f205461212b565b156122ae565b0163ffffffff610ece610ea78361225b565b7f00000000000000000000000000000000000000000000000000000000000000009061226c565b1643111561103357610edf9061225b565b604051630955f2d960e41b81526004810183905263ffffffff9190911660248201526020816044817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611001575b5015610fa2575f52609960205260405f20905f5260205260405f20610f66815461212b565b601f8111610f82575b50600e661cdb185cda195960ca1b019055005b610f9c90825f52601f60205f20910160051c81019061230d565b81610f6f565b60405162461bcd60e51b815260206004820152603160248201527f4f70657261746f7220776173206e6f742072656769737465726564207768656e604482015270081d185cdac81dd85cc818dc99585d1959607a1b6064820152608490fd5b90506020813d60201161102b575b8161101c60209383611fca565b81010312610d91575183610f41565b3d915061100f565b60405162461bcd60e51b815260206004820152602660248201527f5461736b20726573706f6e73652074696d6520686173206e6f742065787069726044820152651959081e595d60d21b6064820152608490fd5b60405162461bcd60e51b815260206004820152602260248201527f5461736b2068617320616c7265616479206265656e20726573706f6e64656420604482015261746f60f01b6064820152608490fd5b34610d91575f366003190112610d91576033546040516001600160a01b039091168152602090f35b34610d91575f366003190112610d9157602063ffffffff60975416604051908152f35b34610d91576111303661205a565b611138612323565b50611141612323565b90815263ffffffff43166020820152604051602081019061116681610e2f85856120b9565b51902063ffffffff609754165f52609860205260405f205560975490600163ffffffff8316807f58180a6a0403a63c2b5ce4b85d129d46a80d37851b2216bd0a98b59e7309b847604051806111bb87826120b9565b0390a2019163ffffffff83116111ed5763ffffffff61056d93169063ffffffff191617609755604051918291826120b9565b634e487b7160e01b5f52601160045260245ffd5b34610d91576020366003190112610d915763ffffffff61121f611f36565b165f52609a602052602060ff60405f2054166040519015158152f35b34610d91575f366003190112610d9157602060405163ffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b34610d91575f366003190112610d915761129361233c565b603380546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b34610d91575f366003190112610d91576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610d91575f366003190112610d91576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610d91576040366003190112610d9157611377611ec1565b602435906001600160a01b0382168203610d91575f549160ff8360081c1615928380946114f3575b80156114dc575b156114805760ff1981166001175f558361146f575b5060ff5f5460081c1615611416576113d56113da92612534565b6124d6565b6113e057005b61ff00195f54165f557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160018152a1005b60405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608490fd5b61ffff1916610101175f55836113bb565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b50303b1580156113a65750600160ff8216146113a6565b50600160ff82161061139f565b34610d91576020366003190112610d9157610d8461151c611ec1565b6113d561233c565b34610d91576060366003190112610d91576004356001600160401b038111610d915736819003600482016040600319830112610d9157611562611f49565b906044356001600160401b038111610d915761158290369060040161203c565b926115a863ffffffff604051602081019060208252610e3d81610e2f60408201896121b4565b602485019463ffffffff6115be610ea78861225b565b164311611b2f5782359160221901821215610d9157016004810135906001600160401b038211610d9157602401908036038213610d915761162c602760405183819460208301966602432b6363796160cd1b88528484013781015f838201520301601f198101835282611fca565b5190207f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f52601c52603c5f2092805181019060608160208401930312610d915760208101516001600160401b038111610d915781019582603f88011215610d9157602087015161169c81612114565b976116aa604051998a611fca565b818952602080808b019360051b8301010190858211610d9157604001915b818310611b0f5750505060408201516001600160401b038111610d915782019280603f85011215610d915760208401519361170285612114565b946117106040519687611fca565b8086526020808088019260051b8401010191838311610d915760408101915b838310611aa557505050505060608201519063ffffffff8216809203610d915761175d63ffffffff9161225b565b1603611a49575f5b8651811015611932576001600160a01b036117808289612286565b51165f52609960205260405f20855f526020526117a3610e8f60405f205461212b565b6117ad8184612286565b516001600160a01b036117c0838a612286565b51165f52609960205260405f20865f5260205260405f20908051906001600160401b038211610da4576117f3835461212b565b601f81116118f7575b50602090601f8311600114611890576001949392915f9183611885575b50505f19600383901b1c191690841b1790555b857f8eb2d2fcccf5801e10ff58cd73e8781ba923122963789378771f03c1148b023e838060a01b0361185e848c612286565b5116604051809160408252611876604083018b6121b4565b9060208301520390a201611765565b015190508b80611819565b90601f19831691845f52815f20925f5b8181106118df5750916001969594929183889593106118c7575b505050811b01905561182c565b01515f1960f88460031b161c191690558b80806118ba565b929360206001819287860151815501950193016118a0565b61192290845f5260205f20601f850160051c81019160208610611928575b601f0160051c019061230d565b8a6117fc565b9091508190611915565b61197760208388885f52609a835260405f20600160ff198254161790556040519384928392630b135d3f60e11b84526004840152604060248401526044830190612095565b03817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611a06575b506001600160e01b031916630b135d3f60e11b036119cd57005b60405162461bcd60e51b8152602060048201526011602482015270496e76616c6964207369676e617475726560781b6044820152606490fd5b90506020813d602011611a41575b81611a2160209383611fca565b81010312610d9157516001600160e01b031981168103610d9157816119b3565b3d9150611a14565b60405162461bcd60e51b815260206004820152602e60248201527f5265666572656e636520626c6f636b206d757374206d61746368207461736b2060448201526d6372656174696f6e20626c6f636b60901b6064820152608490fd5b82516001600160401b038111610d915760209083010185603f82011215610d9157602081015191611ad583611feb565b611ae26040519182611fca565b8381526040838501018810610d91575f602085819660408397018386015e8301015281520192019161172f565b82516001600160a01b0381168103610d91578152602092830192016116c8565b60405162461bcd60e51b815260206004820152602660248201527f5461736b20726573706f6e73652074696d652068617320616c726561647920656044820152651e1c1a5c995960d21b6064820152608490fd5b34610d91576020366003190112610d9157611b9c611ec1565b6040516302e0740360e31b81525f816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610d86575f91611e37575b509081515190611bf782612114565b90611c056040519283611fca565b828252611c1183612114565b602083019490601f19013686375f5b848110611e0957505060408051639004134760e01b81526001600160a01b0390921660048301526024820152815160448201819052909384916064830191905f5b818110611de757505f939283900391508290507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610d86575f93611d55575b505f5f5b838110611d295750611cc3906124a4565b925f905f5b848110611cdd576040518061056d8882611f6d565b611ce78183612286565b51611cf5575b600101611cc8565b91600190611d21906001600160a01b03611d0f8688612286565b5116611d1b828a612286565b52612496565b929050611ced565b611d338186612286565b51611d41575b600101611cb2565b90611d4d600191612496565b919050611d39565b9092503d805f833e611d678183611fca565b810190602081830312610d91578051906001600160401b038211610d9157019080601f83011215610d91578151611d9d81612114565b92611dab6040519485611fca565b81845260208085019260051b820101928311610d9157602001905b828210611dd7575050509183611cae565b8151815260209182019101611dc6565b82516001600160a01b0316845287945060209384019390920191600101611c61565b600190818060a09895981b03611e20828551612286565b515116611e2d8287612286565b5201949194611c20565b611e4b91503d805f833e6105858183611fca565b82611be8565b34610d91576020366003190112610d915763ffffffff611e6f611f36565b165f526098602052602060405f2054604051908152f35b34610d91576020366003190112610d9157611e9f611ec1565b50610d8461233c565b34610d9157611eb636611eeb565b505050610d8461233c565b600435906001600160a01b0382168203610d9157565b35906001600160a01b0382168203610d9157565b6060906003190112610d91576004356001600160a01b0381168103610d9157906024356001600160a01b0381168103610d9157906044356001600160e01b031981168103610d915790565b6004359063ffffffff82168203610d9157565b6024359063ffffffff82168203610d9157565b359063ffffffff82168203610d9157565b60206040818301928281528451809452019201905f5b818110611f905750505090565b82516001600160a01b0316845260209384019390920191600101611f83565b604081019081106001600160401b03821117610da457604052565b90601f801991011681019081106001600160401b03821117610da457604052565b6001600160401b038111610da457601f01601f191660200190565b92919261201282611feb565b916120206040519384611fca565b829481845281830111610d91578281602093845f960137010152565b9080601f83011215610d915781602061205793359101612006565b90565b6020600319820112610d9157600435906001600160401b038211610d915780602383011215610d915781602461205793600401359101612006565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b60208152604063ffffffff60206120da855184838701526060860190612095565b9401511691015290565b9181601f84011215610d91578235916001600160401b038311610d91576020808501948460051b010111610d9157565b6001600160401b038111610da45760051b60200190565b90600182811c92168015612159575b602083101461214557565b634e487b7160e01b5f52602260045260245ffd5b91607f169161213a565b9035601e1982360301811215610d915701602081359101916001600160401b038211610d91578136038313610d9157565b908060209392818452848401375f828201840152601f01601f1916010190565b90602063ffffffff6121e2826121db6121cd8780612163565b604088526040880191612194565b9501611f5c565b1691015290565b156121f057565b60405162461bcd60e51b815260206004820152603d60248201527f737570706c696564207461736b20646f6573206e6f74206d617463682074686560448201527f206f6e65207265636f7264656420696e2074686520636f6e74726163740000006064820152608490fd5b3563ffffffff81168103610d915790565b9063ffffffff8091169116019063ffffffff82116111ed57565b805182101561229a5760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b156122b557565b60405162461bcd60e51b815260206004820152602a60248201527f4f70657261746f722068617320616c726561647920726573706f6e64656420746044820152696f20746865207461736b60b01b6064820152608490fd5b818110612318575050565b5f815560010161230d565b6040519061233082611faf565b5f602083606081520152565b6033546001600160a01b0316330361235057565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b602081830312610d91578051906001600160401b038211610d91570190602082820312610d915760405191602083018381106001600160401b03821117610da4576040528051906001600160401b038211610d91570181601f82011215610d915780519061240182612114565b9261240f6040519485611fca565b82845260208085019360061b83010191818311610d9157602001925b82841061243b5750505050815290565b604084830312610d91576040519061245282611faf565b84516001600160a01b0381168103610d915782526020850151906bffffffffffffffffffffffff82168203610d91578260209283604095015281520193019261242b565b5f1981146111ed5760010190565b906124ae82612114565b6124bb6040519182611fca565b82815280926124cc601f1991612114565b0190602036910137565b606554604080516001600160a01b038084168252841660208201529192917fe11cddf1816a43318ca175bbc52cd0185436e9cbead7c83acc54a73e461717e39190a16001600160a01b03166001600160a01b03199190911617606555565b603380546001600160a01b039283166001600160a01b0319821681179092559091167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3565b6065546001600160a01b0316330361259057565b638e79fdb560e01b5f5260045ffd5b919081101561229a5760051b8101359060be1981360301821215610d91570190565b903590601e1981360301821215610d9157018035906001600160401b038211610d9157602001918160061b36038313610d9157565b919082018092116111ed57565b356001600160a01b0381168103610d915790565b9035601e1982360301811215610d915701602081359101916001600160401b038211610d91578160061b36038313610d9157565b916020908281520191905f905b8082106126655750505090565b909192833560018060a01b038116809103610d915781526020840135906bffffffffffffffffffffffff8216809203610d9157604081600193602083940152019401920190612658565b919081101561229a5760051b81013590609e1981360301821215610d91570190565b6040516323b872dd60e01b60208201526001600160a01b03928316602482015292909116604483015260648083019390935291815261271a91612715608483611fca565b6127da565b565b604051636eb1769f60e11b81523060048201526001600160a01b0383166024820152602081806044810103816001600160a01b0386165afa908115610d86575f916127a6575b5061271a93612770916125f6565b60405163095ea7b360e01b60208201526001600160a01b0390931660248401526044808401919091528252612715606483611fca565b90506020813d6020116127d2575b816127c160209383611fca565b81010312610d91575161271a612762565b3d91506127b4565b906128599160018060a01b03165f80604051936127f8604086611fca565b602085527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564602086015260208151910182855af13d156128ea573d9161283d83611feb565b9261284b6040519485611fca565b83523d5f602085013e6128ee565b80519081159182156128c7575b50501561286f57565b60405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608490fd5b8192509060209181010312610d9157602001518015158103610d91575f80612866565b6060915b919290156129505750815115612902575090565b3b1561290b5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156129635750805190602001fd5b60405162461bcd60e51b815260206004820152908190612987906024830190612095565b0390fdfea26469706673582212203b546342ef21a7255d0d7b7411818c65d38edbcdfc1e788629169d92e5ba18bc64736f6c634300081b0033
⋮----
/**Custom error with signature `DelayPeriodNotPassed()` and selector `0xfb623b04`.
    ```solidity
    error DelayPeriodNotPassed();
    ```*/
⋮----
pub struct DelayPeriodNotPassed {}
⋮----
type UnderlyingSolTuple<'a> = ();
⋮----
type UnderlyingRustTuple<'a> = ();
⋮----
fn from(value: DelayPeriodNotPassed) -> Self {
⋮----
type Parameters<'a> = UnderlyingSolTuple<'a>;
type Token<'a> = <Self::Parameters<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn new<'a>(
⋮----
tuple.into()
⋮----
fn tokenize(&self) -> Self::Token<'_> {
⋮----
/**Custom error with signature `OnlyRegistryCoordinator()` and selector `0x8729b7be`.
    ```solidity
    error OnlyRegistryCoordinator();
    ```*/
⋮----
pub struct OnlyRegistryCoordinator {}
⋮----
fn from(value: OnlyRegistryCoordinator) -> Self {
⋮----
/**Custom error with signature `OnlyRewardsInitiator()` and selector `0x8e79fdb5`.
    ```solidity
    error OnlyRewardsInitiator();
    ```*/
⋮----
pub struct OnlyRewardsInitiator {}
⋮----
fn from(value: OnlyRewardsInitiator) -> Self {
⋮----
/**Custom error with signature `OnlyStakeRegistry()` and selector `0x46bf2281`.
    ```solidity
    error OnlyStakeRegistry();
    ```*/
⋮----
pub struct OnlyStakeRegistry {}
⋮----
fn from(value: OnlyStakeRegistry) -> Self {
⋮----
/**Event with signature `Initialized(uint8)` and selector `0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498`.
    ```solidity
    event Initialized(uint8 version);
    ```*/
⋮----
pub struct Initialized {
⋮----
type DataTuple<'a> = (alloy::sol_types::sol_data::Uint<8>,);
type DataToken<'a> = <Self::DataTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
type TopicList = (alloy_sol_types::sol_data::FixedBytes<32>,);
⋮----
fn new(
⋮----
fn check_signature(
⋮----
return Err(alloy_sol_types::Error::invalid_event_signature_hash(
⋮----
Ok(())
⋮----
fn tokenize_body(&self) -> Self::DataToken<'_> {
⋮----
fn topics(&self) -> <Self::TopicList as alloy_sol_types::SolType>::RustType {
(Self::SIGNATURE_HASH.into(),)
⋮----
fn encode_topics_raw(
⋮----
if out.len() < <Self::TopicList as alloy_sol_types::TopicList>::COUNT {
return Err(alloy_sol_types::Error::Overrun);
⋮----
fn to_log_data(&self) -> alloy_sol_types::private::LogData {
⋮----
fn into_log_data(self) -> alloy_sol_types::private::LogData {
⋮----
fn from(this: &Initialized) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `NewTaskCreated(uint32,(string,uint32))` and selector `0x58180a6a0403a63c2b5ce4b85d129d46a80d37851b2216bd0a98b59e7309b847`.
    ```solidity
    event NewTaskCreated(uint32 indexed taskIndex, IHelloWorldServiceManager.Task task);
    ```*/
⋮----
pub struct NewTaskCreated {
⋮----
type DataTuple<'a> = (IHelloWorldServiceManager::Task,);
⋮----
type TopicList = (
⋮----
(Self::SIGNATURE_HASH.into(), self.taskIndex.clone())
⋮----
fn from(this: &NewTaskCreated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `OwnershipTransferred(address,address)` and selector `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`.
    ```solidity
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    ```*/
⋮----
pub struct OwnershipTransferred {
⋮----
type DataTuple<'a> = ();
⋮----
Self::SIGNATURE_HASH.into(),
self.previousOwner.clone(),
self.newOwner.clone(),
⋮----
fn from(this: &OwnershipTransferred) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `RewardsInitiatorUpdated(address,address)` and selector `0xe11cddf1816a43318ca175bbc52cd0185436e9cbead7c83acc54a73e461717e3`.
    ```solidity
    event RewardsInitiatorUpdated(address prevRewardsInitiator, address newRewardsInitiator);
    ```*/
⋮----
pub struct RewardsInitiatorUpdated {
⋮----
type DataTuple<'a> = (
⋮----
fn from(this: &RewardsInitiatorUpdated) -> alloy_sol_types::private::LogData {
⋮----
/**Event with signature `TaskResponded(uint32,(string,uint32),address)` and selector `0x8eb2d2fcccf5801e10ff58cd73e8781ba923122963789378771f03c1148b023e`.
    ```solidity
    event TaskResponded(uint32 indexed taskIndex, IHelloWorldServiceManager.Task task, address operator);
    ```*/
⋮----
pub struct TaskResponded {
⋮----
fn from(this: &TaskResponded) -> alloy_sol_types::private::LogData {
⋮----
/**Constructor`.
    ```solidity
    constructor(address _avsDirectory, address _stakeRegistry, address _rewardsCoordinator, address _delegationManager, address _allocationManager, uint32 _maxResponseIntervalBlocks);
    ```*/
⋮----
pub struct constructorCall {
⋮----
fn from(value: constructorCall) -> Self {
⋮----
type Parameters<'a> = (
⋮----
/**Function with signature `MAX_RESPONSE_INTERVAL_BLOCKS()` and selector `0x733d056c`.
    ```solidity
    function MAX_RESPONSE_INTERVAL_BLOCKS() external view returns (uint32);
    ```*/
⋮----
pub struct MAX_RESPONSE_INTERVAL_BLOCKSCall {}
///Container type for the return parameters of the [`MAX_RESPONSE_INTERVAL_BLOCKS()`](MAX_RESPONSE_INTERVAL_BLOCKSCall) function.
⋮----
pub struct MAX_RESPONSE_INTERVAL_BLOCKSReturn {
⋮----
fn from(value: MAX_RESPONSE_INTERVAL_BLOCKSCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Uint<32>,);
⋮----
type UnderlyingRustTuple<'a> = (u32,);
⋮----
fn from(value: MAX_RESPONSE_INTERVAL_BLOCKSReturn) -> Self {
⋮----
type Parameters<'a> = ();
⋮----
type Return = MAX_RESPONSE_INTERVAL_BLOCKSReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Uint<32>,);
type ReturnToken<'a> = <Self::ReturnTuple<'a> as alloy_sol_types::SolType>::Token<'a>;
⋮----
fn abi_decode_returns(
⋮----
.map(Into::into)
⋮----
/**Function with signature `addPendingAdmin(address)` and selector `0x279432eb`.
    ```solidity
    function addPendingAdmin(address admin) external;
    ```*/
⋮----
pub struct addPendingAdminCall {
⋮----
///Container type for the return parameters of the [`addPendingAdmin(address)`](addPendingAdminCall) function.
⋮----
pub struct addPendingAdminReturn {}
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::Address,);
⋮----
fn from(value: addPendingAdminCall) -> Self {
⋮----
fn from(value: addPendingAdminReturn) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
type Return = addPendingAdminReturn;
type ReturnTuple<'a> = ();
⋮----
/**Function with signature `allTaskHashes(uint32)` and selector `0x2d89f6fc`.
    ```solidity
    function allTaskHashes(uint32) external view returns (bytes32);
    ```*/
⋮----
pub struct allTaskHashesCall {
⋮----
///Container type for the return parameters of the [`allTaskHashes(uint32)`](allTaskHashesCall) function.
⋮----
pub struct allTaskHashesReturn {
⋮----
fn from(value: allTaskHashesCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::FixedBytes<32>,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::FixedBytes<32>,);
⋮----
fn from(value: allTaskHashesReturn) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::Uint<32>,);
⋮----
type Return = allTaskHashesReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::FixedBytes<32>,);
⋮----
/**Function with signature `allTaskResponses(address,uint32)` and selector `0xc20bab7f`.
    ```solidity
    function allTaskResponses(address, uint32) external view returns (bytes memory);
    ```*/
⋮----
pub struct allTaskResponsesCall {
⋮----
///Container type for the return parameters of the [`allTaskResponses(address,uint32)`](allTaskResponsesCall) function.
⋮----
pub struct allTaskResponsesReturn {
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::Address, u32);
⋮----
fn from(value: allTaskResponsesCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Bytes,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::Bytes,);
⋮----
fn from(value: allTaskResponsesReturn) -> Self {
⋮----
type Return = allTaskResponsesReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Bytes,);
⋮----
/**Function with signature `allocationManager()` and selector `0xca8aa7c7`.
    ```solidity
    function allocationManager() external view returns (address);
    ```*/
⋮----
pub struct allocationManagerCall {}
///Container type for the return parameters of the [`allocationManager()`](allocationManagerCall) function.
⋮----
pub struct allocationManagerReturn {
⋮----
fn from(value: allocationManagerCall) -> Self {
⋮----
fn from(value: allocationManagerReturn) -> Self {
⋮----
type Return = allocationManagerReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Address,);
⋮----
/**Function with signature `avsDirectory()` and selector `0x6b3aa72e`.
    ```solidity
    function avsDirectory() external view returns (address);
    ```*/
⋮----
pub struct avsDirectoryCall {}
///Container type for the return parameters of the [`avsDirectory()`](avsDirectoryCall) function.
⋮----
pub struct avsDirectoryReturn {
⋮----
fn from(value: avsDirectoryCall) -> Self {
⋮----
fn from(value: avsDirectoryReturn) -> Self {
⋮----
type Return = avsDirectoryReturn;
⋮----
/**Function with signature `createAVSRewardsSubmission(((address,uint96)[],address,uint256,uint32,uint32)[])` and selector `0xfce36c7d`.
    ```solidity
    function createAVSRewardsSubmission(IRewardsCoordinatorTypes.RewardsSubmission[] memory rewardsSubmissions) external;
    ```*/
⋮----
pub struct createAVSRewardsSubmissionCall {
⋮----
///Container type for the return parameters of the [`createAVSRewardsSubmission(((address,uint96)[],address,uint256,uint32,uint32)[])`](createAVSRewardsSubmissionCall) function.
⋮----
pub struct createAVSRewardsSubmissionReturn {}
⋮----
type UnderlyingSolTuple<'a> =
⋮----
fn from(value: createAVSRewardsSubmissionCall) -> Self {
⋮----
fn from(value: createAVSRewardsSubmissionReturn) -> Self {
⋮----
type Parameters<'a> =
⋮----
type Return = createAVSRewardsSubmissionReturn;
⋮----
/**Function with signature `createNewTask(string)` and selector `0x85edf874`.
    ```solidity
    function createNewTask(string memory name) external returns (IHelloWorldServiceManager.Task memory);
    ```*/
⋮----
pub struct createNewTaskCall {
⋮----
///Container type for the return parameters of the [`createNewTask(string)`](createNewTaskCall) function.
⋮----
pub struct createNewTaskReturn {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::String,);
⋮----
type UnderlyingRustTuple<'a> = (alloy::sol_types::private::String,);
⋮----
fn from(value: createNewTaskCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (IHelloWorldServiceManager::Task,);
⋮----
type UnderlyingRustTuple<'a> =
⋮----
fn from(value: createNewTaskReturn) -> Self {
⋮----
type Parameters<'a> = (alloy::sol_types::sol_data::String,);
⋮----
type Return = createNewTaskReturn;
type ReturnTuple<'a> = (IHelloWorldServiceManager::Task,);
⋮----
/**Function with signature `createOperatorDirectedAVSRewardsSubmission(((address,uint96)[],address,(address,uint256)[],uint32,uint32,string)[])` and selector `0xa20b99bf`.
    ```solidity
    function createOperatorDirectedAVSRewardsSubmission(IRewardsCoordinatorTypes.OperatorDirectedRewardsSubmission[] memory operatorDirectedRewardsSubmissions) external;
    ```*/
⋮----
pub struct createOperatorDirectedAVSRewardsSubmissionCall {
⋮----
///Container type for the return parameters of the [`createOperatorDirectedAVSRewardsSubmission(((address,uint96)[],address,(address,uint256)[],uint32,uint32,string)[])`](createOperatorDirectedAVSRewardsSubmissionCall) function.
⋮----
pub struct createOperatorDirectedAVSRewardsSubmissionReturn {}
⋮----
fn from(value: createOperatorDirectedAVSRewardsSubmissionCall) -> Self {
⋮----
fn from(value: createOperatorDirectedAVSRewardsSubmissionReturn) -> Self {
⋮----
type Return = createOperatorDirectedAVSRewardsSubmissionReturn;
⋮----
/**Function with signature `deregisterOperatorFromAVS(address)` and selector `0xa364f4da`.
    ```solidity
    function deregisterOperatorFromAVS(address operator) external;
    ```*/
⋮----
pub struct deregisterOperatorFromAVSCall {
⋮----
///Container type for the return parameters of the [`deregisterOperatorFromAVS(address)`](deregisterOperatorFromAVSCall) function.
⋮----
pub struct deregisterOperatorFromAVSReturn {}
⋮----
fn from(value: deregisterOperatorFromAVSCall) -> Self {
⋮----
fn from(value: deregisterOperatorFromAVSReturn) -> Self {
⋮----
type Return = deregisterOperatorFromAVSReturn;
⋮----
/**Function with signature `deregisterOperatorFromOperatorSets(address,uint32[])` and selector `0xc1a8e2c5`.
    ```solidity
    function deregisterOperatorFromOperatorSets(address operator, uint32[] memory operatorSetIds) external;
    ```*/
⋮----
pub struct deregisterOperatorFromOperatorSetsCall {
⋮----
///Container type for the return parameters of the [`deregisterOperatorFromOperatorSets(address,uint32[])`](deregisterOperatorFromOperatorSetsCall) function.
⋮----
pub struct deregisterOperatorFromOperatorSetsReturn {}
⋮----
fn from(value: deregisterOperatorFromOperatorSetsCall) -> Self {
⋮----
fn from(value: deregisterOperatorFromOperatorSetsReturn) -> Self {
⋮----
type Return = deregisterOperatorFromOperatorSetsReturn;
⋮----
/**Function with signature `getOperatorRestakedStrategies(address)` and selector `0x33cfb7b7`.
    ```solidity
    function getOperatorRestakedStrategies(address _operator) external view returns (address[] memory);
    ```*/
⋮----
pub struct getOperatorRestakedStrategiesCall {
⋮----
///Container type for the return parameters of the [`getOperatorRestakedStrategies(address)`](getOperatorRestakedStrategiesCall) function.
⋮----
pub struct getOperatorRestakedStrategiesReturn {
⋮----
fn from(value: getOperatorRestakedStrategiesCall) -> Self {
⋮----
fn from(value: getOperatorRestakedStrategiesReturn) -> Self {
⋮----
type Return = getOperatorRestakedStrategiesReturn;
type ReturnTuple<'a> =
⋮----
/**Function with signature `getRestakeableStrategies()` and selector `0xe481af9d`.
    ```solidity
    function getRestakeableStrategies() external view returns (address[] memory);
    ```*/
⋮----
pub struct getRestakeableStrategiesCall {}
///Container type for the return parameters of the [`getRestakeableStrategies()`](getRestakeableStrategiesCall) function.
⋮----
pub struct getRestakeableStrategiesReturn {
⋮----
fn from(value: getRestakeableStrategiesCall) -> Self {
⋮----
fn from(value: getRestakeableStrategiesReturn) -> Self {
⋮----
type Return = getRestakeableStrategiesReturn;
⋮----
/**Function with signature `initialize(address,address)` and selector `0x485cc955`.
    ```solidity
    function initialize(address initialOwner, address _rewardsInitiator) external;
    ```*/
⋮----
pub struct initializeCall {
⋮----
///Container type for the return parameters of the [`initialize(address,address)`](initializeCall) function.
⋮----
pub struct initializeReturn {}
⋮----
fn from(value: initializeCall) -> Self {
⋮----
fn from(value: initializeReturn) -> Self {
⋮----
type Return = initializeReturn;
⋮----
/**Function with signature `latestTaskNum()` and selector `0x8b00ce7c`.
    ```solidity
    function latestTaskNum() external view returns (uint32);
    ```*/
⋮----
pub struct latestTaskNumCall {}
///Container type for the return parameters of the [`latestTaskNum()`](latestTaskNumCall) function.
⋮----
pub struct latestTaskNumReturn {
⋮----
fn from(value: latestTaskNumCall) -> Self {
⋮----
fn from(value: latestTaskNumReturn) -> Self {
⋮----
type Return = latestTaskNumReturn;
⋮----
/**Function with signature `owner()` and selector `0x8da5cb5b`.
    ```solidity
    function owner() external view returns (address);
    ```*/
⋮----
pub struct ownerCall {}
///Container type for the return parameters of the [`owner()`](ownerCall) function.
⋮----
pub struct ownerReturn {
⋮----
fn from(value: ownerCall) -> Self {
⋮----
fn from(value: ownerReturn) -> Self {
⋮----
type Return = ownerReturn;
⋮----
/**Function with signature `registerOperatorToAVS(address,(bytes,bytes32,uint256))` and selector `0x9926ee7d`.
    ```solidity
    function registerOperatorToAVS(address operator, ISignatureUtilsMixinTypes.SignatureWithSaltAndExpiry memory operatorSignature) external;
    ```*/
⋮----
pub struct registerOperatorToAVSCall {
⋮----
///Container type for the return parameters of the [`registerOperatorToAVS(address,(bytes,bytes32,uint256))`](registerOperatorToAVSCall) function.
⋮----
pub struct registerOperatorToAVSReturn {}
⋮----
fn from(value: registerOperatorToAVSCall) -> Self {
⋮----
fn from(value: registerOperatorToAVSReturn) -> Self {
⋮----
type Return = registerOperatorToAVSReturn;
⋮----
/**Function with signature `removeAdmin(address)` and selector `0x1785f53c`.
    ```solidity
    function removeAdmin(address admin) external;
    ```*/
⋮----
pub struct removeAdminCall {
⋮----
///Container type for the return parameters of the [`removeAdmin(address)`](removeAdminCall) function.
⋮----
pub struct removeAdminReturn {}
⋮----
fn from(value: removeAdminCall) -> Self {
⋮----
fn from(value: removeAdminReturn) -> Self {
⋮----
type Return = removeAdminReturn;
⋮----
/**Function with signature `removeAppointee(address,address,bytes4)` and selector `0xba550880`.
    ```solidity
    function removeAppointee(address appointee, address target, bytes4 selector) external;
    ```*/
⋮----
pub struct removeAppointeeCall {
⋮----
///Container type for the return parameters of the [`removeAppointee(address,address,bytes4)`](removeAppointeeCall) function.
⋮----
pub struct removeAppointeeReturn {}
⋮----
fn from(value: removeAppointeeCall) -> Self {
⋮----
fn from(value: removeAppointeeReturn) -> Self {
⋮----
type Return = removeAppointeeReturn;
⋮----
/**Function with signature `removePendingAdmin(address)` and selector `0x9da16d8e`.
    ```solidity
    function removePendingAdmin(address pendingAdmin) external;
    ```*/
⋮----
pub struct removePendingAdminCall {
⋮----
///Container type for the return parameters of the [`removePendingAdmin(address)`](removePendingAdminCall) function.
⋮----
pub struct removePendingAdminReturn {}
⋮----
fn from(value: removePendingAdminCall) -> Self {
⋮----
fn from(value: removePendingAdminReturn) -> Self {
⋮----
type Return = removePendingAdminReturn;
⋮----
/**Function with signature `renounceOwnership()` and selector `0x715018a6`.
    ```solidity
    function renounceOwnership() external;
    ```*/
⋮----
pub struct renounceOwnershipCall {}
///Container type for the return parameters of the [`renounceOwnership()`](renounceOwnershipCall) function.
⋮----
pub struct renounceOwnershipReturn {}
⋮----
fn from(value: renounceOwnershipCall) -> Self {
⋮----
fn from(value: renounceOwnershipReturn) -> Self {
⋮----
type Return = renounceOwnershipReturn;
⋮----
/**Function with signature `respondToTask((string,uint32),uint32,bytes)` and selector `0x3415a49c`.
    ```solidity
    function respondToTask(IHelloWorldServiceManager.Task memory task, uint32 referenceTaskIndex, bytes memory signature) external;
    ```*/
⋮----
pub struct respondToTaskCall {
⋮----
///Container type for the return parameters of the [`respondToTask((string,uint32),uint32,bytes)`](respondToTaskCall) function.
⋮----
pub struct respondToTaskReturn {}
⋮----
fn from(value: respondToTaskCall) -> Self {
⋮----
fn from(value: respondToTaskReturn) -> Self {
⋮----
type Return = respondToTaskReturn;
⋮----
/**Function with signature `rewardsInitiator()` and selector `0xfc299dee`.
    ```solidity
    function rewardsInitiator() external view returns (address);
    ```*/
⋮----
pub struct rewardsInitiatorCall {}
///Container type for the return parameters of the [`rewardsInitiator()`](rewardsInitiatorCall) function.
⋮----
pub struct rewardsInitiatorReturn {
⋮----
fn from(value: rewardsInitiatorCall) -> Self {
⋮----
fn from(value: rewardsInitiatorReturn) -> Self {
⋮----
type Return = rewardsInitiatorReturn;
⋮----
/**Function with signature `setAVSRegistrar(address)` and selector `0xf25f1610`.
    ```solidity
    function setAVSRegistrar(address registrar) external;
    ```*/
⋮----
pub struct setAVSRegistrarCall {
⋮----
///Container type for the return parameters of the [`setAVSRegistrar(address)`](setAVSRegistrarCall) function.
⋮----
pub struct setAVSRegistrarReturn {}
⋮----
fn from(value: setAVSRegistrarCall) -> Self {
⋮----
fn from(value: setAVSRegistrarReturn) -> Self {
⋮----
type Return = setAVSRegistrarReturn;
⋮----
/**Function with signature `setAppointee(address,address,bytes4)` and selector `0x1fdb0cfd`.
    ```solidity
    function setAppointee(address appointee, address target, bytes4 selector) external;
    ```*/
⋮----
pub struct setAppointeeCall {
⋮----
///Container type for the return parameters of the [`setAppointee(address,address,bytes4)`](setAppointeeCall) function.
⋮----
pub struct setAppointeeReturn {}
⋮----
fn from(value: setAppointeeCall) -> Self {
⋮----
fn from(value: setAppointeeReturn) -> Self {
⋮----
type Return = setAppointeeReturn;
⋮----
/**Function with signature `setClaimerFor(address)` and selector `0xa0169ddd`.
    ```solidity
    function setClaimerFor(address claimer) external;
    ```*/
⋮----
pub struct setClaimerForCall {
⋮----
///Container type for the return parameters of the [`setClaimerFor(address)`](setClaimerForCall) function.
⋮----
pub struct setClaimerForReturn {}
⋮----
fn from(value: setClaimerForCall) -> Self {
⋮----
fn from(value: setClaimerForReturn) -> Self {
⋮----
type Return = setClaimerForReturn;
⋮----
/**Function with signature `setRewardsInitiator(address)` and selector `0x3bc28c8c`.
    ```solidity
    function setRewardsInitiator(address newRewardsInitiator) external;
    ```*/
⋮----
pub struct setRewardsInitiatorCall {
⋮----
///Container type for the return parameters of the [`setRewardsInitiator(address)`](setRewardsInitiatorCall) function.
⋮----
pub struct setRewardsInitiatorReturn {}
⋮----
fn from(value: setRewardsInitiatorCall) -> Self {
⋮----
fn from(value: setRewardsInitiatorReturn) -> Self {
⋮----
type Return = setRewardsInitiatorReturn;
⋮----
/**Function with signature `slashOperator((string,uint32),uint32,address)` and selector `0x9677de10`.
    ```solidity
    function slashOperator(IHelloWorldServiceManager.Task memory task, uint32 referenceTaskIndex, address operator) external;
    ```*/
⋮----
pub struct slashOperatorCall {
⋮----
///Container type for the return parameters of the [`slashOperator((string,uint32),uint32,address)`](slashOperatorCall) function.
⋮----
pub struct slashOperatorReturn {}
⋮----
fn from(value: slashOperatorCall) -> Self {
⋮----
fn from(value: slashOperatorReturn) -> Self {
⋮----
type Return = slashOperatorReturn;
⋮----
/**Function with signature `stakeRegistry()` and selector `0x68304835`.
    ```solidity
    function stakeRegistry() external view returns (address);
    ```*/
⋮----
pub struct stakeRegistryCall {}
///Container type for the return parameters of the [`stakeRegistry()`](stakeRegistryCall) function.
⋮----
pub struct stakeRegistryReturn {
⋮----
fn from(value: stakeRegistryCall) -> Self {
⋮----
fn from(value: stakeRegistryReturn) -> Self {
⋮----
type Return = stakeRegistryReturn;
⋮----
/**Function with signature `taskWasResponded(uint32)` and selector `0x7b6c4236`.
    ```solidity
    function taskWasResponded(uint32) external view returns (bool);
    ```*/
⋮----
pub struct taskWasRespondedCall {
⋮----
///Container type for the return parameters of the [`taskWasResponded(uint32)`](taskWasRespondedCall) function.
⋮----
pub struct taskWasRespondedReturn {
⋮----
fn from(value: taskWasRespondedCall) -> Self {
⋮----
type UnderlyingSolTuple<'a> = (alloy::sol_types::sol_data::Bool,);
⋮----
type UnderlyingRustTuple<'a> = (bool,);
⋮----
fn from(value: taskWasRespondedReturn) -> Self {
⋮----
type Return = taskWasRespondedReturn;
type ReturnTuple<'a> = (alloy::sol_types::sol_data::Bool,);
⋮----
/**Function with signature `transferOwnership(address)` and selector `0xf2fde38b`.
    ```solidity
    function transferOwnership(address newOwner) external;
    ```*/
⋮----
pub struct transferOwnershipCall {
⋮----
///Container type for the return parameters of the [`transferOwnership(address)`](transferOwnershipCall) function.
⋮----
pub struct transferOwnershipReturn {}
⋮----
fn from(value: transferOwnershipCall) -> Self {
⋮----
fn from(value: transferOwnershipReturn) -> Self {
⋮----
type Return = transferOwnershipReturn;
⋮----
/**Function with signature `updateAVSMetadataURI(string)` and selector `0xa98fb355`.
    ```solidity
    function updateAVSMetadataURI(string memory _metadataURI) external;
    ```*/
⋮----
pub struct updateAVSMetadataURICall {
⋮----
///Container type for the return parameters of the [`updateAVSMetadataURI(string)`](updateAVSMetadataURICall) function.
⋮----
pub struct updateAVSMetadataURIReturn {}
⋮----
fn from(value: updateAVSMetadataURICall) -> Self {
⋮----
fn from(value: updateAVSMetadataURIReturn) -> Self {
⋮----
type Return = updateAVSMetadataURIReturn;
⋮----
///Container for all the [`HelloWorldServiceManager`](self) function calls.
pub enum HelloWorldServiceManagerCalls {
⋮----
impl HelloWorldServiceManagerCalls {
/// All the selectors of this enum.
⋮----
/// Note that the selectors might not be in the same order as the variants.
/// No guarantees are made about the order of the selectors.
⋮----
/// Prefer using `SolInterface` methods instead.
⋮----
fn selector(&self) -> [u8; 4] {
⋮----
fn selector_at(i: usize) -> ::core::option::Option<[u8; 4]> {
Self::SELECTORS.get(i).copied()
⋮----
fn valid_selector(selector: [u8; 4]) -> bool {
Self::SELECTORS.binary_search(&selector).is_ok()
⋮----
fn abi_decode_raw(
⋮----
fn removeAdmin(
⋮----
.map(HelloWorldServiceManagerCalls::removeAdmin)
⋮----
fn setAppointee(
⋮----
.map(HelloWorldServiceManagerCalls::setAppointee)
⋮----
fn addPendingAdmin(
⋮----
.map(HelloWorldServiceManagerCalls::addPendingAdmin)
⋮----
fn allTaskHashes(
⋮----
.map(HelloWorldServiceManagerCalls::allTaskHashes)
⋮----
fn getOperatorRestakedStrategies(
⋮----
.map(
⋮----
fn respondToTask(
⋮----
.map(HelloWorldServiceManagerCalls::respondToTask)
⋮----
fn setRewardsInitiator(
⋮----
.map(HelloWorldServiceManagerCalls::setRewardsInitiator)
⋮----
fn initialize(
⋮----
.map(HelloWorldServiceManagerCalls::initialize)
⋮----
fn stakeRegistry(
⋮----
.map(HelloWorldServiceManagerCalls::stakeRegistry)
⋮----
fn avsDirectory(
⋮----
.map(HelloWorldServiceManagerCalls::avsDirectory)
⋮----
fn renounceOwnership(
⋮----
.map(HelloWorldServiceManagerCalls::renounceOwnership)
⋮----
fn MAX_RESPONSE_INTERVAL_BLOCKS(
⋮----
fn taskWasResponded(
⋮----
.map(HelloWorldServiceManagerCalls::taskWasResponded)
⋮----
fn createNewTask(
⋮----
.map(HelloWorldServiceManagerCalls::createNewTask)
⋮----
fn latestTaskNum(
⋮----
.map(HelloWorldServiceManagerCalls::latestTaskNum)
⋮----
fn owner(
⋮----
.map(HelloWorldServiceManagerCalls::owner)
⋮----
fn slashOperator(
⋮----
.map(HelloWorldServiceManagerCalls::slashOperator)
⋮----
fn registerOperatorToAVS(
⋮----
.map(HelloWorldServiceManagerCalls::registerOperatorToAVS)
⋮----
fn removePendingAdmin(
⋮----
.map(HelloWorldServiceManagerCalls::removePendingAdmin)
⋮----
fn setClaimerFor(
⋮----
.map(HelloWorldServiceManagerCalls::setClaimerFor)
⋮----
fn createOperatorDirectedAVSRewardsSubmission(
⋮----
fn deregisterOperatorFromAVS(
⋮----
.map(HelloWorldServiceManagerCalls::deregisterOperatorFromAVS)
⋮----
fn updateAVSMetadataURI(
⋮----
.map(HelloWorldServiceManagerCalls::updateAVSMetadataURI)
⋮----
fn removeAppointee(
⋮----
.map(HelloWorldServiceManagerCalls::removeAppointee)
⋮----
fn deregisterOperatorFromOperatorSets(
⋮----
fn allTaskResponses(
⋮----
.map(HelloWorldServiceManagerCalls::allTaskResponses)
⋮----
fn allocationManager(
⋮----
.map(HelloWorldServiceManagerCalls::allocationManager)
⋮----
fn getRestakeableStrategies(
⋮----
.map(HelloWorldServiceManagerCalls::getRestakeableStrategies)
⋮----
fn setAVSRegistrar(
⋮----
.map(HelloWorldServiceManagerCalls::setAVSRegistrar)
⋮----
fn transferOwnership(
⋮----
.map(HelloWorldServiceManagerCalls::transferOwnership)
⋮----
fn rewardsInitiator(
⋮----
.map(HelloWorldServiceManagerCalls::rewardsInitiator)
⋮----
fn createAVSRewardsSubmission(
⋮----
let Ok(idx) = Self::SELECTORS.binary_search(&selector) else {
return Err(alloy_sol_types::Error::unknown_selector(
⋮----
fn abi_encoded_size(&self) -> usize {
⋮----
fn abi_encode_raw(&self, out: &mut alloy_sol_types::private::Vec<u8>) {
⋮----
///Container for all the [`HelloWorldServiceManager`](self) custom errors.
pub enum HelloWorldServiceManagerErrors {
⋮----
impl HelloWorldServiceManagerErrors {
⋮----
fn OnlyStakeRegistry(
⋮----
.map(HelloWorldServiceManagerErrors::OnlyStakeRegistry)
⋮----
fn OnlyRegistryCoordinator(
⋮----
.map(HelloWorldServiceManagerErrors::OnlyRegistryCoordinator)
⋮----
fn OnlyRewardsInitiator(
⋮----
.map(HelloWorldServiceManagerErrors::OnlyRewardsInitiator)
⋮----
fn DelayPeriodNotPassed(
⋮----
.map(HelloWorldServiceManagerErrors::DelayPeriodNotPassed)
⋮----
///Container for all the [`HelloWorldServiceManager`](self) events.
pub enum HelloWorldServiceManagerEvents {
⋮----
impl HelloWorldServiceManagerEvents {
⋮----
fn decode_raw_log(
⋮----
match topics.first().copied() {
⋮----
.map(Self::Initialized)
⋮----
.map(Self::NewTaskCreated)
⋮----
.map(Self::OwnershipTransferred)
⋮----
.map(Self::RewardsInitiatorUpdated)
⋮----
.map(Self::TaskResponded)
⋮----
topics.to_vec(),
data.to_vec().into(),
⋮----
/**Creates a new wrapper around an on-chain [`HelloWorldServiceManager`](self) contract instance.

    See the [wrapper's documentation](`HelloWorldServiceManagerInstance`) for more details.*/
⋮----
/**Deploys this contract using the given `provider` and constructor arguments, if any.

    Returns a new instance of the contract, if the deployment was successful.

    For more fine-grained control over the deployment process, use [`deploy_builder`] instead.*/
⋮----
pub fn deploy<
⋮----
/**Creates a `RawCallBuilder` for deploying this contract using the given `provider`
    and constructor arguments, if any.

    This is a simple wrapper around creating a `RawCallBuilder` with the data set to
    the bytecode concatenated with the constructor's ABI-encoded arguments.*/
⋮----
pub fn deploy_builder<
⋮----
/**A [`HelloWorldServiceManager`](self) instance.

    Contains type-safe methods for interacting with an on-chain instance of the
    [`HelloWorldServiceManager`](self) contract located at a given `address`, using a given
    provider `P`.

    If the contract bytecode is available (see the [`sol!`](alloy_sol_types::sol!)
    documentation on how to provide it), the `deploy` and `deploy_builder` methods can
    be used to deploy a new instance of the contract.

    See the [module-level documentation](self) for all the available methods.*/
⋮----
pub struct HelloWorldServiceManagerInstance<T, P, N = alloy_contract::private::Ethereum> {
⋮----
f.debug_tuple("HelloWorldServiceManagerInstance")
⋮----
/**Creates a new wrapper around an on-chain [`HelloWorldServiceManager`](self) contract instance.

        See the [wrapper's documentation](`HelloWorldServiceManagerInstance`) for more details.*/
⋮----
/**Deploys this contract using the given `provider` and constructor arguments, if any.

        Returns a new instance of the contract, if the deployment was successful.

        For more fine-grained control over the deployment process, use [`deploy_builder`] instead.*/
⋮----
pub async fn deploy(
⋮----
let contract_address = call_builder.deploy().await?;
Ok(Self::new(contract_address, call_builder.provider))
⋮----
/**Creates a `RawCallBuilder` for deploying this contract using the given `provider`
        and constructor arguments, if any.

        This is a simple wrapper around creating a `RawCallBuilder` with the data set to
        the bytecode concatenated with the constructor's ABI-encoded arguments.*/
⋮----
pub fn deploy_builder(
⋮----
.into(),
⋮----
pub fn with_cloned_provider(self) -> HelloWorldServiceManagerInstance<T, P, N> {
⋮----
///Creates a new call builder for the [`MAX_RESPONSE_INTERVAL_BLOCKS`] function.
pub fn MAX_RESPONSE_INTERVAL_BLOCKS(
⋮----
self.call_builder(&MAX_RESPONSE_INTERVAL_BLOCKSCall {})
⋮----
///Creates a new call builder for the [`addPendingAdmin`] function.
pub fn addPendingAdmin(
⋮----
self.call_builder(&addPendingAdminCall { admin })
⋮----
///Creates a new call builder for the [`allTaskHashes`] function.
pub fn allTaskHashes(
⋮----
self.call_builder(&allTaskHashesCall { _0 })
⋮----
///Creates a new call builder for the [`allTaskResponses`] function.
pub fn allTaskResponses(
⋮----
self.call_builder(&allTaskResponsesCall { _0, _1 })
⋮----
///Creates a new call builder for the [`allocationManager`] function.
pub fn allocationManager(
⋮----
self.call_builder(&allocationManagerCall {})
⋮----
///Creates a new call builder for the [`avsDirectory`] function.
pub fn avsDirectory(&self) -> alloy_contract::SolCallBuilder<T, &P, avsDirectoryCall, N> {
self.call_builder(&avsDirectoryCall {})
⋮----
///Creates a new call builder for the [`createAVSRewardsSubmission`] function.
pub fn createAVSRewardsSubmission(
⋮----
self.call_builder(&createAVSRewardsSubmissionCall { rewardsSubmissions })
⋮----
///Creates a new call builder for the [`createNewTask`] function.
pub fn createNewTask(
⋮----
self.call_builder(&createNewTaskCall { name })
⋮----
///Creates a new call builder for the [`createOperatorDirectedAVSRewardsSubmission`] function.
pub fn createOperatorDirectedAVSRewardsSubmission(
⋮----
self.call_builder(&createOperatorDirectedAVSRewardsSubmissionCall {
⋮----
///Creates a new call builder for the [`deregisterOperatorFromAVS`] function.
pub fn deregisterOperatorFromAVS(
⋮----
self.call_builder(&deregisterOperatorFromAVSCall { operator })
⋮----
///Creates a new call builder for the [`deregisterOperatorFromOperatorSets`] function.
pub fn deregisterOperatorFromOperatorSets(
⋮----
self.call_builder(&deregisterOperatorFromOperatorSetsCall {
⋮----
///Creates a new call builder for the [`getOperatorRestakedStrategies`] function.
pub fn getOperatorRestakedStrategies(
⋮----
self.call_builder(&getOperatorRestakedStrategiesCall { _operator })
⋮----
///Creates a new call builder for the [`getRestakeableStrategies`] function.
pub fn getRestakeableStrategies(
⋮----
self.call_builder(&getRestakeableStrategiesCall {})
⋮----
///Creates a new call builder for the [`initialize`] function.
pub fn initialize(
⋮----
self.call_builder(&initializeCall {
⋮----
///Creates a new call builder for the [`latestTaskNum`] function.
pub fn latestTaskNum(&self) -> alloy_contract::SolCallBuilder<T, &P, latestTaskNumCall, N> {
self.call_builder(&latestTaskNumCall {})
⋮----
///Creates a new call builder for the [`owner`] function.
pub fn owner(&self) -> alloy_contract::SolCallBuilder<T, &P, ownerCall, N> {
self.call_builder(&ownerCall {})
⋮----
///Creates a new call builder for the [`registerOperatorToAVS`] function.
pub fn registerOperatorToAVS(
⋮----
self.call_builder(&registerOperatorToAVSCall {
⋮----
///Creates a new call builder for the [`removeAdmin`] function.
pub fn removeAdmin(
⋮----
self.call_builder(&removeAdminCall { admin })
⋮----
///Creates a new call builder for the [`removeAppointee`] function.
pub fn removeAppointee(
⋮----
self.call_builder(&removeAppointeeCall {
⋮----
///Creates a new call builder for the [`removePendingAdmin`] function.
pub fn removePendingAdmin(
⋮----
self.call_builder(&removePendingAdminCall { pendingAdmin })
⋮----
///Creates a new call builder for the [`renounceOwnership`] function.
pub fn renounceOwnership(
⋮----
self.call_builder(&renounceOwnershipCall {})
⋮----
///Creates a new call builder for the [`respondToTask`] function.
pub fn respondToTask(
⋮----
self.call_builder(&respondToTaskCall {
⋮----
///Creates a new call builder for the [`rewardsInitiator`] function.
pub fn rewardsInitiator(
⋮----
self.call_builder(&rewardsInitiatorCall {})
⋮----
///Creates a new call builder for the [`setAVSRegistrar`] function.
pub fn setAVSRegistrar(
⋮----
self.call_builder(&setAVSRegistrarCall { registrar })
⋮----
///Creates a new call builder for the [`setAppointee`] function.
pub fn setAppointee(
⋮----
self.call_builder(&setAppointeeCall {
⋮----
///Creates a new call builder for the [`setClaimerFor`] function.
pub fn setClaimerFor(
⋮----
self.call_builder(&setClaimerForCall { claimer })
⋮----
///Creates a new call builder for the [`setRewardsInitiator`] function.
pub fn setRewardsInitiator(
⋮----
self.call_builder(&setRewardsInitiatorCall {
⋮----
///Creates a new call builder for the [`slashOperator`] function.
pub fn slashOperator(
⋮----
self.call_builder(&slashOperatorCall {
⋮----
///Creates a new call builder for the [`stakeRegistry`] function.
pub fn stakeRegistry(&self) -> alloy_contract::SolCallBuilder<T, &P, stakeRegistryCall, N> {
self.call_builder(&stakeRegistryCall {})
⋮----
///Creates a new call builder for the [`taskWasResponded`] function.
pub fn taskWasResponded(
⋮----
self.call_builder(&taskWasRespondedCall { _0 })
⋮----
///Creates a new call builder for the [`transferOwnership`] function.
pub fn transferOwnership(
⋮----
self.call_builder(&transferOwnershipCall { newOwner })
⋮----
///Creates a new call builder for the [`updateAVSMetadataURI`] function.
pub fn updateAVSMetadataURI(
⋮----
self.call_builder(&updateAVSMetadataURICall { _metadataURI })
⋮----
///Creates a new event filter for the [`Initialized`] event.
pub fn Initialized_filter(&self) -> alloy_contract::Event<T, &P, Initialized, N> {
⋮----
///Creates a new event filter for the [`NewTaskCreated`] event.
pub fn NewTaskCreated_filter(&self) -> alloy_contract::Event<T, &P, NewTaskCreated, N> {
⋮----
///Creates a new event filter for the [`OwnershipTransferred`] event.
pub fn OwnershipTransferred_filter(
⋮----
///Creates a new event filter for the [`RewardsInitiatorUpdated`] event.
pub fn RewardsInitiatorUpdated_filter(
⋮----
///Creates a new event filter for the [`TaskResponded`] event.
pub fn TaskResponded_filter(&self) -> alloy_contract::Event<T, &P, TaskResponded, N> {
````

## File: operator/rust/crates/utils/src/bindings/mod.rs
````rust
//! This module contains the sol! generated bindings for solidity contracts.
//! This is autogenerated code.
//! Do not manually edit these files.
//! These files may be overwritten by the codegen system at any time.
pub mod r#ecdsastakeregistry;
pub mod r#helloworldservicemanager;
````

## File: operator/rust/crates/utils/src/lib.rs
````rust
mod bindings;
⋮----
use std::path::Path;
⋮----
use alloy::primitives::Address;
use serde::Deserialize;
⋮----
pub struct HelloWorldData {
⋮----
pub struct LastUpdate {
⋮----
pub struct HelloWorldAddresses {
⋮----
pub struct EigenLayerData {
⋮----
pub struct EigenLayerAddresses {
⋮----
pub fn get_anvil_eigenlayer_deployment_data() -> eyre::Result<EigenLayerData> {
let file_path = Path::new(&env!("CARGO_MANIFEST_DIR").to_string())
.join("../../../../contracts/deployments/core/31337.json");
⋮----
Ok(el_parsed)
⋮----
pub fn get_anvil_hello_world_deployment_data() -> eyre::Result<HelloWorldData> {
⋮----
.join("../../../../contracts/deployments/hello-world/31337.json");
⋮----
Ok(parsed_data)
⋮----
pub fn get_hello_world_service_manager() -> eyre::Result<Address> {
let data = get_anvil_hello_world_deployment_data()?;
⋮----
data.addresses.hello_world_service_manager.parse()?;
Ok(hello_world_contract_address)
⋮----
pub fn get_stake_registry_address() -> eyre::Result<Address> {
⋮----
let stake_registry_address: Address = data.addresses.stake_registry.parse()?;
Ok(stake_registry_address)
⋮----
pub fn get_delegation_manager_address() -> eyre::Result<Address> {
let data = get_anvil_eigenlayer_deployment_data()?;
let delegation_manager_address: Address = data.addresses.delegation_manager.parse()?;
Ok(delegation_manager_address)
⋮----
pub fn get_avs_directory_address() -> eyre::Result<Address> {
⋮----
let avs_directory_address: Address = data.addresses.avs_directory.parse()?;
Ok(avs_directory_address)
````

## File: operator/rust/crates/utils/Cargo.toml
````toml
[package]
name = "hello-world-utils"
description = "Hello world avs operator start and spam utilities"

version.workspace = true
edition.workspace = true
rust-version.workspace = true
repository.workspace = true
license-file.workspace = true

[dependencies]
alloy.workspace = true
serde.workspace = true
serde_json = "1.0.121"
eyre = "0.6.12"
````

## File: operator/createNewTasks.ts
````typescript
import { ethers } from "ethers";
⋮----
// Setup env variables
⋮----
/// TODO: Hack
⋮----
// Initialize contract objects from ABIs
⋮----
// Function to generate random names
function generateRandomName(): string
⋮----
async function createNewTask(taskName: string)
⋮----
// Send a transaction to the createNewTask function
⋮----
// Wait for the transaction to be mined
⋮----
// Function to create a new task with a random name every 15 seconds
function startCreatingTasks()
⋮----
// Start the process
````

## File: operator/e2e.test.ts
````typescript
import { createAnvil, Anvil } from "@viem/anvil";
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import util from 'util';
import { ethers } from "ethers";
⋮----
async function loadJsonFile(filePath: string): Promise<any>
⋮----
async function loadDeployments(): Promise<Record<string, any>>
````

## File: operator/index.ts
````typescript
import { ethers } from "ethers";
⋮----
// Check if the process.env object is empty
⋮----
// Setup env variables
⋮----
/// TODO: Hack
⋮----
// Load core deployment data
⋮----
const delegationManagerAddress = coreDeploymentData.addresses.delegationManager; // todo: reminder to fix the naming of this contract in the deployment file, change to delegationManager
⋮----
// Load ABIs
⋮----
// Initialize contract objects from ABIs
⋮----
const signAndRespondToTask = async (taskIndex: number, taskCreatedBlock: number, taskName: string) =>
⋮----
const registerOperator = async () =>
⋮----
// Registers as an Operator in EigenLayer.
⋮----
"0x0000000000000000000000000000000000000000", // initDelegationApprover
0, // allocationDelay
"", // metadataURI
⋮----
const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now
⋮----
// Define the output structure
⋮----
// Calculate the digest hash, which is a unique value representing the operator, avs, unique value (salt) and expiration date.
⋮----
// Sign the digest hash with the operator's private key
⋮----
// Encode the signature in the required format
⋮----
// Register Operator to AVS
// Per release here: https://github.com/Layr-Labs/eigenlayer-middleware/blob/v0.2.1-mainnet-rewards/src/unaudited/ECDSAStakeRegistry.sol#L49
⋮----
const monitorNewTasks = async () =>
⋮----
//console.log(`Creating new task "EigenWorld"`);
//await helloWorldServiceManager.createNewTask("EigenWorld");
⋮----
const main = async () =>
````

## File: scripts/rewards-script-check.sh
````bash
#!/bin/bash

# This flags makes the script exit if any command has a non-zero exit status, or 
# if tries to use a non defined variable
set -e -o nounset

# Execute anvil in background
anvil -q &

# Deploy contracts
make deploy-eigenlayer-contracts
make deploy-helloworld-contracts

# Check that at first, claimer balance in token is zero
initialBalance=$(make claimer-account-token-balance | tail -n1 | tr -d '[:space:]')

echo "Initial balance: '$initialBalance'"

if [ "$initialBalance" -ne 0 ]; then
    echo "claimer balance in token should be zero"
    exit 2
fi

# Create and claim normal distribution root
echo "Creating distribution root:"
make create-avs-distributions-root

echo "Claiming distribution root:"
make claim-distributions

# Check that after claim, claimer balance in token is 100
balanceAfterClaim=$(make claimer-account-token-balance | tail -n1 | tr -d '[:space:]')

echo "Balance after first claim: '$balanceAfterClaim'"

if [ "$balanceAfterClaim" -ne 100 ]; then
    echo "After first claim, claimer balance in token should be 100"
    exit 3
fi

# Create and claim operator directed distribution root
echo "Creating operator directed distribution root:"
make create-operator-directed-distributions-root

echo "Claiming distribution root:"
make claim-distributions

# Check that after another claim, claimer balance in token is 200
balanceAfterClaim=$(make claimer-account-token-balance | tail -n1 | tr -d '[:space:]')

echo "Balance after second claim: '$balanceAfterClaim'"

if [ "$balanceAfterClaim" -ne 200 ]; then
    echo "After second claim, claimer balance in token should be 200"
    exit 3
fi

# Kill anvil executing in background
kill $(pgrep anvil)
````

## File: utils/abis.js
````javascript
const artifactsDir = path.join(contractsDir, 'out');
⋮----
if (!fs.existsSync(abiDir)) {
fs.mkdirSync(abiDir);
⋮----
function checkArtifactsDirectory() {
if (!fs.existsSync(artifactsDir)) {
console.error(`The artifacts directory '${artifactsDir}' does not exist.`);
console.log('Please compile your contracts first using "forge build"');
process.exit(1);
⋮----
const files = fs.readdirSync(artifactsDir);
⋮----
console.error(`The artifacts directory '${artifactsDir}' is empty.`);
console.log('Please compile your contracts first using "forge build" or confirm the path is correct.');
⋮----
function extractAbi(contractName) {
const outputPath = path.join(artifactsDir, `${contractName}.sol`, `${contractName}.json`);
const abiOutputPath = path.join(abiDir, `${contractName}.json`);
⋮----
const contractData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
const abi = JSON.stringify(contractData.abi, null, 2);
fs.writeFileSync(abiOutputPath, abi);
console.log(`Extracted ABI for ${contractName}`);
⋮----
console.error(`Error extracting ABI for ${contractName}:`, error.message);
⋮----
checkArtifactsDirectory();
⋮----
extractAbi(contractName);
⋮----
console.log('ABI extraction complete. Check the "abis" directory for the output.');
````

## File: .dockerignore
````
node_modules/
target/
````

## File: .env.example
````
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
OPERATOR_RESPONSE_PERCENTAGE=80
RPC_URL=http://localhost:8545
WS_URL=ws://localhost:8545
````

## File: .gitignore
````
# Ignore node_modules directory
node_modules/

# Ignore built output
dist/

# Ignore environment-specific files
.env

# Ignore nixos related environment-specific files
.envrc
.cargo/
.direnv/

# Ignore editor-specific files
.vscode/
.idea/

# Ignore TypeScript build artifacts
dist/**/*.js
dist/*.js.map
dist/*.d.ts

# Ignore local anvil state
# utils/anvil/*.json
contracts/anvil/state.json

oldUtils

target/
debug/

yarn.lock
contracts/deployments/

**/.DS_Store
````

## File: .gitmodules
````
[submodule "contracts/lib/forge-std"]
	path = contracts/lib/forge-std
	url = https://github.com/foundry-rs/forge-std
[submodule "contracts/lib/eigenlayer-middleware"]
	path = contracts/lib/eigenlayer-middleware
	url = https://github.com/Layr-Labs/eigenlayer-middleware
````

## File: Cargo.toml
````toml
[workspace]
members = ["operator/rust/crates/operator/", "operator/rust/crates/utils/"]

resolver = "2"

[workspace.package]
version = "0.0.1-alpha"
edition = "2021"
authors = ["Eigen Layer contributors"]
rust-version = "1.80"
repository = "https://github.com/Layr-Labs/hello-world-avs"
homepage = ""
license-file = "LICENSE"

[workspace.lints.rust]
missing_debug_implementations = "warn"
missing_docs = "warn"
unreachable_pub = "warn"
unused_must_use = "deny"
rust_2018_idioms = { level = "deny", priority = -1 }


[workspace.lints]
rustdoc.all = "warn"


[workspace.dependencies]

#tokio
tokio = { version = "1.37.0", features = [
    "test-util",
    "full",
    "sync",
    "rt-multi-thread",
    "macros",
] }

serde = "1.0.214"

hello-world-avs-operator = { path = "operator/rust/crates/operator" }
hello-world-utils = { path = "operator/rust/crates/utils" }

alloy = { version = "0.13", features = ["full"] }
eigensdk = { version = "=1.0.0-rc.0", features = ["full"] }
````

## File: Dockerfile
````dockerfile
FROM node:22

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
````

## File: flake.lock
````
{
  "nodes": {
    "flake-utils": {
      "inputs": {
        "systems": "systems"
      },
      "locked": {
        "lastModified": 1726560853,
        "narHash": "sha256-X6rJYSESBVr3hBoH0WbKE5KvhPU5bloyZ2L4K60/fPQ=",
        "owner": "numtide",
        "repo": "flake-utils",
        "rev": "c1dfcf08411b08f6b8615f7d8971a2bfa81d5e8a",
        "type": "github"
      },
      "original": {
        "owner": "numtide",
        "repo": "flake-utils",
        "type": "github"
      }
    },
    "flake-utils_2": {
      "locked": {
        "lastModified": 1644229661,
        "narHash": "sha256-1YdnJAsNy69bpcjuoKdOYQX0YxZBiCYZo4Twxerqv7k=",
        "owner": "numtide",
        "repo": "flake-utils",
        "rev": "3cecb5b042f7f209c56ffd8371b2711a290ec797",
        "type": "github"
      },
      "original": {
        "owner": "numtide",
        "repo": "flake-utils",
        "type": "github"
      }
    },
    "foundry": {
      "inputs": {
        "flake-utils": "flake-utils_2",
        "nixpkgs": "nixpkgs"
      },
      "locked": {
        "lastModified": 1725354688,
        "narHash": "sha256-KHHFemVt6C/hbGoMzIq7cpxmjdp+KZVZaqbvx02aliY=",
        "owner": "shazow",
        "repo": "foundry.nix",
        "rev": "671672bd60a0d2e5f6757638fdf27e806df755a4",
        "type": "github"
      },
      "original": {
        "owner": "shazow",
        "ref": "monthly",
        "repo": "foundry.nix",
        "type": "github"
      }
    },
    "nixpkgs": {
      "locked": {
        "lastModified": 1666753130,
        "narHash": "sha256-Wff1dGPFSneXJLI2c0kkdWTgxnQ416KE6X4KnFkgPYQ=",
        "owner": "NixOS",
        "repo": "nixpkgs",
        "rev": "f540aeda6f677354f1e7144ab04352f61aaa0118",
        "type": "github"
      },
      "original": {
        "id": "nixpkgs",
        "type": "indirect"
      }
    },
    "nixpkgs_2": {
      "locked": {
        "lastModified": 1726755586,
        "narHash": "sha256-PmUr/2GQGvFTIJ6/Tvsins7Q43KTMvMFhvG6oaYK+Wk=",
        "owner": "NixOs",
        "repo": "nixpkgs",
        "rev": "c04d5652cfa9742b1d519688f65d1bbccea9eb7e",
        "type": "github"
      },
      "original": {
        "owner": "NixOs",
        "ref": "nixos-unstable",
        "repo": "nixpkgs",
        "type": "github"
      }
    },
    "nixpkgs_3": {
      "locked": {
        "lastModified": 1718428119,
        "narHash": "sha256-WdWDpNaq6u1IPtxtYHHWpl5BmabtpmLnMAx0RdJ/vo8=",
        "owner": "NixOS",
        "repo": "nixpkgs",
        "rev": "e6cea36f83499eb4e9cd184c8a8e823296b50ad5",
        "type": "github"
      },
      "original": {
        "owner": "NixOS",
        "ref": "nixpkgs-unstable",
        "repo": "nixpkgs",
        "type": "github"
      }
    },
    "root": {
      "inputs": {
        "flake-utils": "flake-utils",
        "foundry": "foundry",
        "nixpkgs": "nixpkgs_2",
        "rust-overlay": "rust-overlay"
      }
    },
    "rust-overlay": {
      "inputs": {
        "nixpkgs": "nixpkgs_3"
      },
      "locked": {
        "lastModified": 1726972233,
        "narHash": "sha256-FlL/bNESOtDQoczRhmPfReNAmLqVg+dAX4HectPOOf0=",
        "owner": "oxalica",
        "repo": "rust-overlay",
        "rev": "36d73192555e569d27579f6c486fea3ab768823c",
        "type": "github"
      },
      "original": {
        "owner": "oxalica",
        "repo": "rust-overlay",
        "type": "github"
      }
    },
    "systems": {
      "locked": {
        "lastModified": 1681028828,
        "narHash": "sha256-Vy1rq5AaRuLzOxct8nz4T6wlgyUR7zLU309k9mBC768=",
        "owner": "nix-systems",
        "repo": "default",
        "rev": "da67096a3b9bf56a91d16901293e51ba5b49a27e",
        "type": "github"
      },
      "original": {
        "owner": "nix-systems",
        "repo": "default",
        "type": "github"
      }
    }
  },
  "root": "root",
  "version": 7
}
````

## File: flake.nix
````
{
  description = "ethereum-rs project";
  inputs = {
    nixpkgs.url = "github:NixOs/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url = "github:numtide/flake-utils";
    foundry.url = "github:shazow/foundry.nix/monthly"; # Use monthly branch for permanent releases

  };
  outputs = { self, nixpkgs, rust-overlay, flake-utils, foundry, ... }@inputs:
  flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = import nixpkgs {
      inherit system;
      overlays = [ rust-overlay.overlays.default foundry.overlay ];
    };

    toolchain = pkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
    cargoTomlContents = builtins.readFile ./Cargo.toml;
    version = (builtins.fromTOML cargoTomlContents).package.version;

    ethereumEs = pkgs.rustPlatform.buildRustPackage {
      inherit version;
      name = "ethereumEs";
      buildInputs = with pkgs; [ openssl ];
      nativeBuildInputs = with pkgs; [ pkg-config openssl.dev ];

      src = pkgs.lib.cleanSourceWith { src = self; };

      cargoLock.lockFile = ./Cargo.lock;

    };
  in {

    overlays.default = final: prev: { ethereumEs = ethereumEs; };

    gitRev = if (builtins.hasAttr "rev" self) then self.rev else "dirty";

    devShells.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        foundry-bin
        solc
        toolchain
        openssl
        cargo-insta
        pkg-config
        eza
        rust-analyzer-unwrapped
        nodejs_20
        nodePackages.typescript
        nodePackages.typescript-language-server
        watchexec
      ];
      shellHook = ''
        ## for the IDE to access rust crates source code
        export RUST_SRC_PATH="${toolchain}/lib/rustlib/src/rust/library"

        ## do not pollute the global cargo repository
        export CARGO_HOME="$(pwd)/.cargo"
        export PATH="$CARGO_HOME/bin:$PATH"

      '';
    };
  });
}
````

## File: jest.config.ts
````typescript
import type { Config } from '@jest/types';
⋮----
testTimeout: 60000, // 60 seconds
maxWorkers: 1, // Run tests sequentially
````

## File: LICENSE
````
Copyright 2024 Eigen Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
````

## File: Makefile
````
############################# HELP MESSAGE #############################
# Make sure the help command stays first, so that it's printed by default when `make` is called without arguments
.PHONY: help tests
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


RUST_BINDINGS_PATH:=operator/rust/crates/utils/src/bindings

-----------------------------: ##

___ANVIL_STATE___: ##
build-anvil-state-with-deployed-contracts: ## builds anvil state with deployed contracts and generates a state
	@chmod +x ./contracts/anvil/build-state.sh
	./contracts/anvil/build-state.sh

___CONTRACTS___: ##

build-contracts: ## builds all contracts
	cd contracts && forge build

deploy-eigenlayer-contracts:
	@chmod +x ./contracts/anvil/deploy-el.sh
	./contracts/anvil/deploy-el.sh

deploy-helloworld-contracts:
	@chmod +x ./contracts/anvil/deploy-helloworld.sh
	./contracts/anvil/deploy-helloworld.sh

generate-bindings:
	cd contracts && forge build --force --skip test --skip script
	rm -rf ${RUST_BINDINGS_PATH}
	forge bind --alloy --skip-build --overwrite --module \
		--root contracts/  \
		--bindings-path ${RUST_BINDINGS_PATH} \
		--select '^ECDSAStakeRegistry$$' --select '^HelloWorldServiceManager$$'

__CLI__: ##

send-fund: ## sends fund to the operator saved in tests/keys/test.ecdsa.key.json
	cast send 0x860B6912C2d0337ef05bbC89b0C2CB6CbAEAB4A5 --value 10ether \
		--private-key 

-----------------------------: ##
# We pipe all zapper logs through https://github.com/maoueh/zap-pretty so make sure to install it
# TODO: piping to zap-pretty only works when zapper environment is set to production, unsure why
____OFFCHAIN_SOFTWARE___:
start-operator: ## start operator (part of quickstart)
	tsc && node dist/index.js

spam-tasks: ## start tasks spamming (part of quickstart)
	tsc && node dist/createNewTasks.js

-----------------------------: ##
_____HELPER_____: ##
tests-contract: ## runs all forge tests
	cd contracts && forge test

___RUST_OFFCHAIN_SOFTWARE___:
start-rust-operator: ## start operator (part of quickstart) 
	cargo run --bin start_operator

spam-rust-tasks:  ## start tasks spamming (part of quickstart)
	cargo run --bin spam_tasks

start-rust-challenger: ## start challenger (part of quickstart)
	cargo run --bin challenger

__REWARDS__: ##

TOKEN_ADDRESS=$(shell jq -r '.addresses.token' contracts/deployments/hello-world/31337.json)

create-avs-distributions-root:
	npm run create-distributions-root

claim-distributions:
	npm run claim-distributions

create-operator-directed-distributions-root:
	npm run create-operator-directed-distributions-root

get-deployed-token-address:
	@echo "Deployed token Address: $(TOKEN_ADDRESS)"

claimer-account-token-balance:
	cast balance --erc20 $(TOKEN_ADDRESS) 0x0000000000000000000000000000000000000001
````

## File: package.json
````json
{
  "name": "hello-world-avs",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start:operator": "ts-node operator/index.ts",
    "start:traffic": "ts-node operator/createNewTasks.ts",
    "start:anvil": "anvil",
    "deploy:core": "cd contracts && forge script script/DeployEigenLayerCore.s.sol --rpc-url http://localhost:8545 --broadcast --optimize --optimizer-runs 200 --via-ir",
    "deploy:hello-world": "cd contracts && forge script script/HelloWorldDeployer.s.sol --rpc-url http://localhost:8545 --broadcast --optimize --optimizer-runs 200 --via-ir",
    "deploy:core-debug": "cd contracts && forge script script/DeployEigenLayerCore.s.sol --rpc-url http://localhost:8545 --broadcast --revert-strings debug --optimize --optimizer-runs 200 --via-ir",
    "deploy:hello-world-debug": "cd contracts && forge script script/HelloWorldDeployer.s.sol --rpc-url http://localhost:8545 --broadcast --revert-strings debug",
    "create-distributions-root": "cd contracts && forge script script/SetupDistributions.s.sol --rpc-url http://localhost:8545 --broadcast -v --sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "claim-distributions": "cd contracts && forge script script/SetupDistributions.s.sol --rpc-url http://localhost:8545 --broadcast --sig \"executeProcessClaim()\" -v --sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "create-operator-directed-distributions-root": "cd contracts && forge script script/SetupDistributions.s.sol --rpc-url http://localhost:8545 --broadcast --sig \"runOperatorDirected()\" -v --sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "build": "tsc",
    "build:forge": "cd contracts && forge build",
    "extract:abis": "node utils/abis.js",
    "test": "NODE_OPTIONS=\"$NODE_OPTIONS --experimental-vm-modules\" npx jest"
  },
  "dependencies": {
    "dotenv": "^10.0.0",
    "ethers": "^6.13.2"
  },
  "devDependencies": {
    "@types/jest": "^29.5.13",
    "@types/node": "^20.12.12",
    "@viem/anvil": "^0.0.10",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}
````

## File: README.md
````markdown
# Hello World AVS

Welcome to the Hello World AVS. This project shows you the simplest functionality you can expect from an AVS. It will give you a concrete understanding of the basic components. For new users, please find [this video walkthrough](https://drive.google.com/file/d/1P6uA6kYWCbpeorTjADuoTlQ-q8uqwPZf/view?usp=sharing) of the hello world AVS repository.

## Architecture

![hello-world-png](./assets/hello-world-diagramv2.png)

### AVS User Flow

1) AVS consumer requests a "Hello World" message to be generated and signed.
2) HelloWorld contract receives the request and emits a NewTaskCreated event for the request.
3) All Operators who are registered to the AVS and has staked, delegated assets takes this request. Operator generates the requested message, hashes it, and signs the hash with their private key.
4) Each Operator submits their signed hash back to the HelloWorld AVS contract.
5) If the Operator is registered to the AVS and has the minimum needed stake, the submission is accepted.

That's it. This simple flow highlights some of the core mechanics of how AVSs work.

### Slashing

> [!WARNING]
> This example does not use the new operator-sets workflow. Please refer to [ELIP-002](https://github.com/eigenfoundation/ELIPs/blob/main/ELIPs/ELIP-002.md) for more details.
> For an example of the new workflow, check out the Incredible Squaring examples ([Go version here](https://github.com/Layr-Labs/incredible-squaring-avs), [Rust version here](https://github.com/Layr-Labs/incredible-squaring-avs-rs)).

The example includes a simple slashing condition: "a task MUST be responded by enough operators before N blocks have passed since the task creation". You can modify the `OPERATOR_RESPONSE_PERCENTAGE` value in the `.env` file to adjust the chance of an operator responding to a task.
In case this condition isn't satisfied by some operator, anyone can permissionlessly slash them via calling `HelloWorldServiceManager.slashOperator`.

For the [Rust example](#quick-start-rust), we have a `challenger` that listens for new tasks and checks whether the operators have responded. If not, `challenger` is authorized to slash the operator.

## Local Devnet Deployment

The following instructions explain how to manually deploy the AVS from scratch including EigenLayer and AVS specific contracts using Foundry (forge) to a local anvil chain, and start Typescript Operator application and tasks.

## Development Environment

This section describes the tooling required for local development.

### Non-Nix Environment

Install dependencies:

- [Node](https://nodejs.org/en/download/)
- [Typescript](https://www.typescriptlang.org/download)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [tcs](https://www.npmjs.com/package/tcs#installation)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Foundry](https://getfoundry.sh/)
- [ethers](https://www.npmjs.com/package/ethers)

### Nix Environment 

On [Nix](https://nixos.org/) platforms, if you already have the proper Nix configuration, you can build the project's artifacts inside a `nix develop` shell

``` sh
nix develop
```

Otherwise, please refer to [installed and configured](./docs/nix-setup-guide.md) section.

## Quick start (TypeScript)

### Start Anvil Chain

In terminal window #1, execute the following commands:

```sh

# Install npm packages
npm install

# Start local anvil chain
npm run start:anvil
```

### Deploy Contracts and Start Operator

Open a separate terminal window #2, execute the following commands

```sh
# Setup .env file
cp .env.example .env
cp contracts/.env.example contracts/.env

# Updates dependencies if necessary and builds the contracts 
npm run build:forge

# Deploy the EigenLayer contracts
npm run deploy:core

# Deploy the Hello World AVS contracts
npm run deploy:hello-world

# (Optional) Update ABIs
npm run extract:abis

# Start the Operator application
npm run start:operator
```

### Create Hello-World-AVS Tasks

Open a separate terminal window #3, execute the following commands

```sh
# Start the createNewTasks application 
npm run start:traffic
```

### Create and Claim Distribution

In a terminal, start a new instance of anvil and deploy the core and avs contracts

```sh
# Start anvil
npm run start:anvil
# Deploy the EigenLayer contracts
npm run deploy:core

# Deploy the Hello World AVS contracts
npm run deploy:hello-world

```

In another terminal, run:

```sh
# Create distribution roots
npm run create-distributions-root

# Claim created distribution
npm run claim-distributions
```

To run operator directed rewards distribution, run:

```sh
#Create distribution roots
npm run create-operator-directed-distributions-root

# Claim created rewards distribution
npm run claim-distributions
```

## Quick start (Rust)

For Rust example, we have a simple operator that monitors new tasks and responds to them, a spammer that generates random tasks and a challeger that listens for new tasks and checks the operators response, [if found that operator did not respond to the task](#slashing), it will slash the operator.

### Anvil Deployment

1. Start Anvil Chain

In terminal window #1, execute the following commands:

```sh
# Start local anvil chain
anvil
```

2. Deploy Contracts

Open a separate terminal window #2, execute the following commands

```sh
# Setup .env file
cp .env.example .env
cp contracts/.env.example contracts/.env

# Builds the contracts
make build-contracts

# Deploy the EigenLayer contracts
make deploy-eigenlayer-contracts

# Deploy the Hello World AVS contracts
make deploy-helloworld-contracts
```

3. Start Challenge Manager

In terminal window #2, execute the following command

```sh
# Start the Challenge Manager
make start-rust-challenger
```

4. Start Rust Operator

In terminal window #3, execute the following command

```sh
# Start the Operator
make start-rust-operator
```

5. Spam Tasks

Open a separate terminal window #4, execute the following command

```sh
# Start sending tasks
make spam-rust-tasks
```

### Testing

1. Build anvil state with deployed contracts

```sh
# Build contracts
make build-contracts

# Starts anvil in the background with the --dump-state flag, builds and deploys the 
# contracts, and generates a state.json file for use in tests.
make build-anvil-state-with-deployed-contracts
```

2. Run tests

```sh
cargo test --workspace
```

## Help and Support

For help and support deploying and modifying this repo for your AVS, please:

1. Open a ticket via the intercom link at [support.eigenlayer.xyz](https://support.eigenlayer.xyz).
2. Include the necessary troubleshooting information for your environment:
  * Local anvil testing:
    * Redeploy your local test using `--revert-strings debug` flag via the following commands and retest: `npm run deploy:core-debug && npm run deploy:hello-world-debug`
    * Include the full stacktrace from your error as a .txt file attachment.
    * Create a minimal repo that demonstrates the behavior (fork or otherwise)
    * Steps require to reproduce issue (compile and cause the error)
  * Holesky testing:
    * Ensure contracts are verified on Holesky. Eg `forge verify-contract --chain-id 17000 --num-of-optimizations 200 src/YourContract.sol:YourContract YOUR_CONTRACT_ADDRESS`
    * Send us your transaction hash where your contract is failing. We will use Tenderly to debug (adjust gas limit) and/or cast to re-run the transaction (eg `cast call --trace "trace_replayTransaction(0xTransactionHash)"`).

## Contact Us

If you're planning to build an AVS and would like to speak with a member of the EigenLayer DevRel team to discuss your ideas or architecture, please fill out this form and we'll be in touch shortly: [EigenLayer AVS Intro Call](https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l)

## Disclaimers

- This repo is meant currently intended for _local anvil development testing_. Holesky deployment support will be added shortly.
- Users who wish to build an AVS for Production purposes will want to migrate from the `ECDSAServiceManagerBase` implementation in `HelloWorldServiceManager.sol` to a BLS style architecture using [RegistryCoordinator](https://github.com/Layr-Labs/eigenlayer-middleware/blob/dev/docs/RegistryCoordinator.md).

## Appendix (Future Capabilities In Progress)

### Adding a New Strategy

### Potential Enhancements to the AVS (for learning purposes)

The architecture can be further enhanced via:

- the nature of the request is more sophisticated than generating a constant string
- the operators might need to coordinate with each other
- the type of signature is different based on the constraints of the service
- the type and amount of security used to secure the AVS
````

## File: rust-toolchain.toml
````toml
[toolchain]
channel = "nightly"
components = [
    "cargo",
    "clippy",
    "rust-analyzer",
    "rust-src",
    "rust-std",
    "rustc",
    "rustfmt",
]
targets = [ "wasm32-unknown-unknown" ]
profile = "minimal"
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": [
    "node_modules",
    "contracts"
  ]
}
````
