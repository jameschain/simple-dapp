# Goal

(0) Technologies - React / Angular, Node.JS, Solidity

(1) There must be a file with the list of 5 addresses and the number of tokens in there.

You need to write:

(2) Small SmartContract where there will be addresses and the number of tokens attached to them

(3) On the front client must connect his metamask and:
(3.1) see the number of tokens on his balance
(3.2) claim any amount of tokens to his address from the smart contract address
(3.3) only the wallets among those five can claim tokens

Please:
⁃ structure everything in one repo that can be launched on localhost via hardhat.
⁃ please provide docs.

# Steps to start the app

In root directory

1. Install all dependencies including both smart contract and frontend.

```
yarn install-all
```

2. Compile the smart contract

```
yarn compile
```

3. Run unit test of the contract

```
yarn test
```

4. Run testnet on localhost:8545

```
yarn local-testnet
```

5. Deploy the contract

```
yarn deploy
```

6. Get the deployed contract address and add a line `NEXT_PUBLIC_GREETER_ADDRESS=0x5fbdb2315678afecb367f032d93f642f64180aa3` into `webapp/.env`.
7. Run the frontend application!

```
yarn run-dapp
```

Check [https://localhost:3000](https://localhost:3000)

# Description

The project is initiated by hardhat advanced sample project uses TypeScript.
The smart contract name is `Greeter` and it is ERC20 Token itself, the token symbol is `SS`

List of 5 addresses and number of tokens are stored in `constants/index.ts` as `claimableBalances`. Those will be passed as parameters for the contract deployment. Part of `deploy.ts` codebase here.

```
const addresses = Object.keys(claimableBalances);
const balances = Object.values(claimableBalances);

const Greeter = await ethers.getContractFactory("Greeter");
const greeter = await Greeter.deploy(addresses, balances);
```

In frontend application, you can see the claimable balance and current balance of `SS` token, there is simple input that you can specify amount to claim and click `Claim` button - you will get specified number of `SS` tokens in your wallet.
