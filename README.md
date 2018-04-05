This is the Sundensity Sale Page webapp


## To build production version, 

    npm run build

then copy the build_webpack/ folder contents to a hosting location. The index.html might have to be edited for correct relative pathing if copying this built static app somewhere if the location hosted is not at root


## To compile smart contracts, 

    truffle compile


## To migrate smart contracts to local testrpc ethereum network

    Start testrpc locally as per its website instructions
    truffle migrate --reset

This will migrate all contracts as per migrations/ folder

## To deploy contracts to the test network running on the power2peer server

Add something like this to truffle.js, make sure this points to the right address of the server running the testnet

```
        shareddev: {
            host: "54.210.223.141",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 4000000
        }
```

Then run, 
    truffle migrate --network shareddev


## To use the test ethereum server setup on power2peer.com for the web app

We have setup a reverse proxy setup so that  https://power2peer.com/t/ reaches the testrpc or other network running on port 8545 at that server. Either testrpc or geth can be run on port 8545 on that server to connect to ethereum

in src/utils/getWeb3.js, ensure to use this url for the default case

geth can be started using script in ethscripts/gethlocalnet.sh

To start geth to create local network

1. Make sure ~/ethereum/localnetwork has a file called password.sec with the password to use for the accounts, such as 12341234
2. Use the ethscripts/genesis.json file, initialize geth with 
    geth --datadir=~/ethereum/localnetwork init genesis.json
3. Create at least one account. The first one will be the contract owner or coinbase account
    geth --datadir=~/ethereum/localnetwork account new
    Repeat for as many accounts as you need. Use the password that matches the one in password.sec
4. Now start geth with the ethscripts/gethlocalnet.sh
    It should start and start to mine ethers
5. Now you can connect using  geth attach https://power2peer.com/t/ or using Mist like Mist --rpc https://power2peer.com/t/



## To migrate smart contracts to the test network

There are a few steps here:

* Create one account in geth using geth instructions, make sure to remember its password

* Start geth on http://localhost:8545 with testnet as follows
    geth --testnet --syncmode light --cache 1024 --rpc --rpc --rpcapi eth,net,web3,personal --rpccorsdomain * --rpcaddr localhost

* In another terminal, unlock the account
    geth attach http://localhost:8545
    personal.unlockAccount(eth.accounts[0])

* Start Ethereum wallet (optional) to attach to this geth via this type of command
    /Applications/Ethereum\ Wallet.app/Contents/MacOS/Ethereum\ Wallet --rpc http://localhost:8545

* Now ensure truffle.js has contents like this to deploy to ropsten

    networks: {
        
        ropsten: {
            network_id: 3,
            host: '127.0.0.1',
            port: 8545,
            gas: 4000000
        }
    }

* Finally deploy contract using 
    truffle migrate --network shareddev

output should look like this

```
macbookpro:sale-page binod$ truffle migrate --network shareddev
Using network 'shareddev'.

Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
Address being deployed to is 0xb615331cd910e5a5ac527c47f727159611c3d833
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
Address being deployed to is 0xb615331cd910e5a5ac527c47f727159611c3d833
Running migration: 1_initial_migration.js
  Replacing Migrations...
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
  ... 0xc445d919cbf95f1d1db57843339c7858672687c412bc63c82207eea030cd75d0
Address being deployed to is 0x2495237a10cac321e0d9c32ade9f42c0de314b32
  Migrations: 0x2495237a10cac321e0d9c32ade9f42c0de314b32
Saving successful migration to network...
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
Address being deployed to is 0x2495237a10cac321e0d9c32ade9f42c0de314b32
  ... 0xafba09cf55bfdad2ab6b36318f9c0e3bc5d31b025ecc84e08aef224fbad22c90
Saving artifacts...
Running migration: 2_deploy_contracts.js
Account being used as admin 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
  Replacing AssetToken...
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
  ... 0xa2ed1bd63d3cec9f08aa647ab137364ce2f0541a8561e64cb8b6d8a10b6604a5
Address being deployed to is 0x8db4a55e23e9f5f63162d9dbaf703d5b60f66359
  AssetToken: 0x8db4a55e23e9f5f63162d9dbaf703d5b60f66359
  Replacing CrowdSale...
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
  ... 0x3025faa15ee42260110cd8046f02e3fff48c0690807f5479453026e2e053c0e1
Address being deployed to is 0xbf46081b978ad92cf8e135c8e3c8afbafd365278
  CrowdSale: 0xbf46081b978ad92cf8e135c8e3c8afbafd365278
Saving successful migration to network...
Address being deployed to is 0x7a7c3d133e9e4878fd55d9d9c86881f28ce9c139
Address being deployed to is 0x2495237a10cac321e0d9c32ade9f42c0de314b32
  ... 0x8a1fb23cb4247a02c11c9b42c501727d69368c38d5f19cd17170338fae77e976
Saving artifacts...
```



## Viewing deployed contracts in Mist

After deploying contracts to network, you can load them in Mist

Get the abi part of the contract from build/contracts and paste it in Mist when using the 'Watch contract' feature



## To create production build of react js code to deploy to wordpress site

    npm run build
    # copy whatever was just generated under build_webpack/ to built.react.package.js
    cp build_webpack/static/js/main.16487dfb.js built.react.package.js 

    # check in the built package too, the build_webpack/ is in .gitignore so won't be committed

    First delete the file 'built.react.package' on wordpress site, then upload this package to workdpress site via https://power2peer.com/wp-admin/post.php?post=457&action=edit to replace that file


## To attach a geth console against the remote ehtereum server on power2peer

    geth attach https://power2peer.com/t/


This will take you to a geth console from which you can access the ethereum setup


## To connect Ethereum Wallet (Mist) app to the test server

Start Mist with rpc argument like this

    /Applications/Ethereum\ Wallet.app/Contents/MacOS/Ethereum\ Wallet --rpc http://54.210.223.141:8545

or

    /Applications/Ethereum\ Wallet.app/Contents/MacOS/Ethereum\ Wallet --rpc https://power2peer.com/t/

Accept the warning dialog


## How to get information from contract in a truffle console

Truffle provides its own console to the ethereum ntwork. to use it type

    truffle console --network=shareddev

In the console, do these to fetch infrom from the contracts

(See this for ref: https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6)

```
  
  # get crowdsale contract
  CrowdSale.deployed().then(inst => { crowdsale = inst })
  
  # get address of token in the crowdSale
  crowdsale.tokenReward().then( addr => { tokenAddress = addr })

  # get token at that address
  coinInstance = AssetToken.at(tokenAddress)

  # get balance of a certain account in that token
  coinInstance.balanceOf(web3.eth.coinbase).then(b=>console.log(b.toString(10)))

  # or just
  coinInstance.balanceOf(web3.eth.coinbase)

  # another account should initially have no balance
  coinInstance.balanceOf(web3.eth.accounts[1]).then(b=>console.log(b.toString(10)))

  # Now if you transfer tokens from one account to another
  

```


## How to get data for a particular method of the contract

```
  ct = Crowdsale.at(addressOfContract)
  ct.contract.contribute.getData()
```



