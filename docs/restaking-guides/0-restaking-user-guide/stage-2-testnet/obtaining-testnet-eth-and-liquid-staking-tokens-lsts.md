---
sidebar_position: 1
---

# Obtaining Testnet ETH & Liquid Staking Tokens (LSTs)

In this guide, we will show you how to use a Goerli faucet to load your wallet with [testnet ETH](https://ethereum.org/en/developers/docs/networks/#ethereum-testnets) and how to obtain Goerli Liquid Staking Tokens so you can start testing liquid restaking.

### Prerequisites

Before you can use a faucet to load your wallet with testnet ETH, you will need:

- An Ethereum-compatible wallet (e.g. MetaMask).
- Your ETH address.

## Obtain Goerli ETH (aka goETH) via a Faucet

Once you have a Goerli-compatible wallet and a Goerli ETH address, you can use a Goerli faucet to load your wallet with testnet ETH. Here are options available to obtain goETH:

- Option 1: [Paradigm Goerli Faucet](https://faucet.paradigm.xyz/)
- Option 2: [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- Option 3: [Bridge (convert) Mainnet (L1) ETH to Goerli ETH via LayerZero](https://testnetbridge.com/)

## Swap goETH for stETH (Lido stETH)

Once you have goETH in your wallet you simply send a transaction to the stETH token contract address for the amount of stETH you want to swap:

- Find the current deployed contract address for [Lido and stETH token proxy here](https://docs.lido.fi/deployed-contracts/goerli/).
- Open your wallet.
- Click **Send.**
- Paste the contract address in your wallet transaction.
- On MetaMask click **"I Understand".**
- Enter the amount you want to swap & confirm the transaction.
- Click **Next.**
- Click **Confirm.**
- Import the Lido and stETH token address to your wallet to view the available stETH tokens.

## Swap goETH for rETH (Rocket Pool goETH)

Use the Uniswap Goerli deployment to convert ETH to rETH:

- Visit the [Uniswap Frontend](https://app.uniswap.org/swap), switch to the ETH Goerli testnet. You may also review the [Uniswap Deployment Documentation](https://support.uniswap.org/hc/en-us/articles/14580495154445-Testnets-on-Uniswap) as needed.
- Initiate a swap from ETH to rETH.
- Import the [Rocket Pool testnet deployment](https://docs.rocketpool.net/overview/contracts-integrations.html) address to your wallet to view the available rETH tokens.

## Swap goETH for ETHx (Stader)

To convert Goerli ETH to ETHx you must send a deposit transaction to the Stader contract:

- Click “Connect to Web3” to connect your web3 wallet.
- Visit the Stader Goerli proxy [contract in Etherescan here](https://goerli.etherscan.io/address/0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823#writeProxyContract).
- Click either of the deposit() functions to expand their section.
  - payableAmount: Enter the ETH amount you wish to deposit.
  - \_receiver: the recipient of the ETHx. Most likely this will be your wallet address.
  - \_referralId (string): use the empty string (“”), if prompted.
- Click Write to initiate the transaction.
- Approve the transaction in your web3 wallet.
- Add the Goerli ETHx token to your web3 wallet via the following contract address in order to view your token balance: 0x3338eCd3ab3d3503c55c931d759fA6d78d287236


## Stake goETH for ankrETH (Ankr)

To convert Goerli ETH to ankrETH follow the instructions below:

- Visit [https://testnet.ankr.com/staking/stake/ethereum/](https://testnet.ankr.com/staking/stake/ethereum/)
- Follow the instructions on screen to stake (convert) your desired amount of Goerli ETH for Goerli ankrETH.
- Click “Add ankrETH to wallet” to add the ankrETH token to your web3 wallet and view your available balance.


## Swap goETH for LsETH (Liquid Staked ETH)​
- Navigate to the [Uniswap app](https://app.uniswap.org/swap) and connect your web3 wallet.
- In the app's settings, make sure you toggle testnet support "on" and select Ethereum Goerli as the active network.
- Click on your wallet address in the upper right hand corner of the app.
  - Select the Settings wheel.
  - Toggle "Show Testnets" to On.
  - In the list of networks to the left of your wallet address, change the active network to Goerli.
- Click "Select Token" and search for LsETH.
  - If the token does not appear, search instead for the token address manually: 0x3ecCAdA3e11c1Cc3e9B5a53176A67cc3ABDD3E46
- Initiate a swap from ETH to LsETH.
- Import the token address to your wallet to view the available LsETH tokens: 0x3ecCAdA3e11c1Cc3e9B5a53176A67cc3ABDD3E46


## Stake goETH for mETH (Mantle ETH)

- Visit the [Mantle ETH Goerli Proxy contract](https://goerli.etherscan.io/address/0x307770388c483BF225DCbe55EE5BA8b9d0bC5C1d#writeProxyContract).
- Click **Connect to Web3** to connect to your web3 wallet.
- Select "Contract"
- Select "Write as Proxy"
- Scroll down to the "19. stake" function.
  - Note: you must plan to stake **at least 0.1 Goerli ETH** in order for the stake function to work properly.
  - For the first parameter, "stake", input the amount of Goerli ETH you want to deposit. 
  - For the second parameter, "minMETHAMount", input the value "0" (number zero without quotes).
- Click **Write** to initiate the transaction via your web3 wallet.
- Import token to your web3 wallet via address 0x20d7E093B3fa5eBfA7a0fa414FaD547743a2400F .

