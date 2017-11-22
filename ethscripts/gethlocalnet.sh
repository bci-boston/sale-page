#!/bin/bash
WORKDIR=~/ethereum/localnetwork
mkdir -p $WORKDIR
./geth-linux-amd64-1.7.3-4bb3c89d/geth --identity "miner1" --networkid 42 --datadir "$WORKDIR" --mine --rpc --rpcport "8545" --port "30303" --unlock 0 --password $WORKDIR/password.sec --ipcpath "~/geth.ipc" --rpcapi "web3,eth,net,debug,personal" --rpccorsdomain "*" --rpcaddr "0.0.0.0"