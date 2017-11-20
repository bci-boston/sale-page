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


## To migrate smart contracts to the testnet/Ropsten network

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
            gas: 4000000,
            from: "0x515f27392ec44007f66aee2c33f3824aea2acb97"
        }
    }

* Finally deploy contract using 
    truffle migrate --network ropsten



## To create production build of react js code to deploy to wordpress site

    npm run build
    # copy whatever was just generated under build_webpack/ to built.react.package.js
    cp build_webpack/static/js/main.16487dfb.js built.react.package.js 

    # check in the built package too, the build_webpack/ is in .gitignore so won't be committed


