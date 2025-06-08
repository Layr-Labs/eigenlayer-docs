---
sidebar_position: 2
title: Obtaining Testnet ETH & Liquid Staking Tokens (LSTs)
---

To obtain testnet ETH, use a faucet to load your wallet with [testnet ETH](https://ethereum.org/en/developers/docs/networks/#ethereum-testnets).

### Prerequisites

Before you can use a faucet to load your wallet with testnet ETH, you need:

- An Ethereum-compatible wallet (e.g. MetaMask). Take note of its public address.
- [Add the Sepolia or Holesky network to your Web3 wallet](https://support.metamask.io/more-web3/learn/eth-on-testnets/) if it does not automatically appear.

### Obtain Sepolia ETH (sepETH) via a Faucet

Once you have a Sepolia compatible wallet and a Sepolia ETH address, you can use a faucet to load your wallet with testnet ETH. Here are options available to obtain sepETH:
- [Sepolia PoW Faucet](https://sepolia-faucet.pk910.de/)
- [Quicknode Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Automata Faucet](https://www.sepoliafaucet.io/)
- [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

### Obtain Holesky ETH (aka holETH) via a Faucet

Once you have a Holesky compatible wallet and a Holesky ETH address, you can use a faucet to load your wallet with testnet ETH. Here are options available to obtain holETH:
- [Holešky PoW Faucet](https://holesky-faucet.pk910.de)
- [Quicknode Faucet](https://faucet.quicknode.com/ethereum/holesky)
- [Automata Faucet](https://www.holeskyfaucet.io/)
- [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/holesky)

## Obtain Holesky Liquid Staking Tokens

Swap holETH for:

* [wETH](#swap-holeth-for-weth-wrapped-eth)
* [stETH](#swap-holeth-for-steth-lido)
* [ETHx](#swap-holeth-for-ethx-stader)
* [ankrETH](#stake-holeth-for-ankreth-ankr)
* [osETH](#mint-oseth-stakewise)
* [sfrxETH](#mint-and-stake-to-swap-holeth-for-sfrxeth)
* [mETH](#swap-holeth-for-meth-mantle-eth)

### Swap holETH for wETH (Wrapped ETH)​
- Send holETH to address 0x94373a4919B3240D86eA41593D5eBa789FEF3848.
- Import the WETH token address (0x94373a4919B3240D86eA41593D5eBa789FEF3848) to your web3 wallet to view your token balance.

### Swap holETH for stETH (Lido)​
- Visit: https://stake-holesky.testnet.fi/
- Connect your web3 wallet, choose the amount and click **Stake**.
- Import the [Lido and stETH token (proxy)](https://docs.lido.fi/deployed-contracts/holesky/) address for Holesky stETH token to your web3 wallet to view your token balance.
- Note: Lido on Holesky staking is rate-limited to 1500 holETH per rolling 24hr window.

### Swap holETH for ETHx (Stader)​
- Visit the Stader Holesky proxy contract’s Write as Proxy contract in Etherscan here: [0x7F09ceb3874F5E35Cd2135F56fd4329b88c5d119](https://holesky.etherscan.io/address/0x7F09ceb3874F5E35Cd2135F56fd4329b88c5d119#writeProxyContract).
- Click *Connect to Web3* to connect your web3 wallet.
- Click either of the **1.deposit()** or **2.deposit()** functions to expand their section:
- payableAmount: Enter the ETH amount you wish to deposit.
- _receiver: the recipient of the ETHx. Most likely this will be your wallet address.
- _referralId (string): use the empty string (“”), if prompted.
- Click *Write* to initiate the transaction. Approve the transaction in your web3 wallet.
- Import the Holesky ETHx token address (0xB4F5fc289a778B80392b86fa70A7111E5bE0F859) to your web3 wallet to view your token balance.

### Stake holETH for ankrETH (Ankr)​
- Visit [testnet.ankr.com/staking/stake/ethereum](https://testnet.ankr.com/staking/stake/ethereum/).
- Follow the instructions on screen to stake (convert) your desired amount of Holesky ETH for Holesky ankrETH.
- Click “Add ankrETH to wallet” to add the ankrETH token to your web3 wallet and view your available balance.

### Mint osETH (Stakewise)
- Visit the [Stakewise Holesky Vault Marketplace](https://app.stakewise.io/vaults?networkId=holesky).
- Select a vault to mint osETH.
- Input the amount you wish to stake and click **Stake** and verify the transaction in your Web3 wallet.
- Click *Mint* to convert your staked holETH to osETH and verify the transaction in your Web3 wallet.
- Click “Add osETH to your Wallet” 
- Or import the osETH address (0xF603c5A3F774F05d4D848A9bB139809790890864) for Holesky stETH token to your web3 wallet to view your token balance.

### Mint and Stake to Swap holETH for sfrxETH
- Add Holesky to your Web3 wallet (example instructions [here](https://www.coingecko.com/learn/holesky-testnet-eth#add-the-holesky-testnet-to-metamask)).
- Manually switch your wallet to the Holesky network. The Frax Finance app does not allow the user to choose Holesky directly. 
- Open the Frax Finance Mint app: [app.frax.finance/frxeth/mint](https://app.frax.finance/frxeth/mint) .
- Enter the amount you wish to mint and click **Mint & Stake**.
- Import the Holesky sfrxETH token address (0xa63f56985F9C7F3bc9fFc5685535649e0C1a55f3) to your web3 wallet to view your token balance.

### Swap holETH for mETH (Mantle ETH)​

- Visit the MantleETH proxy contract’s Write as Proxy contract in Etherscan here: [0xbe16244EAe9837219147384c8A7560BA14946262](https://holesky.etherscan.io/address/0xbe16244EAe9837219147384c8A7560BA14946262#writeProxyContract).
- Click **Connect to Web3** to connect your web3 wallet.
- Click on the **19.stake()** function to expand its section:
	- payableAmount: Enter the ETH amount you wish to deposit.
	- minMETHAmount: set to 0.
- Click **Write** to initiate the transaction. Approve the transaction in your web3 wallet.
- Import the Holesky mETH token address (0xe3C063B1BEe9de02eb28352b55D49D85514C67FF) to your web3 wallet to view your token balance.