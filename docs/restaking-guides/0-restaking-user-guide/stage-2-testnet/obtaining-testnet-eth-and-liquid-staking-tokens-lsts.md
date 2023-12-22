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

Congratulations! You can now use this testnet ETH and LSTs for testing restaking on EigenLayer.
