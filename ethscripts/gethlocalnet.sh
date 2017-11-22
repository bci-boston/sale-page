#!/bin/bash
WORKDIR=~/ethereum/localnetwork
mkdir -p $WORKDIR
geth --identity "miner1" --networkid 42 --datadir "$WORKDIR" --nodiscover --mine --rpc --rpcport "8042" --port "30303" --unlock 0 --password $WORKDIR/password.sec --ipcpath "~/Ethereum/geth.ipc" --rpcapi "web3,eth,net,debug,personal"