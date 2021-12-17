# dapps_sample


## Prerequisites

- [Geth](https://github.com/ethereum/go-ethereum)
- [yarn](https://github.com/yarnpkg/berry)


## Start private ethereum network by json-rpc
```bash
$ git clone https://github.com/posaune0423/dapps_sample.git
$ cd eth_testnet
$ geth --http --http.port 8545 --http.api "web3,eth,net,personal" --http.corsdomain "*" --http.addr "0.0.0.0" --datadir . --nodiscover --networkid 10 console 2>> geth.log
```

Now you got ready for developing !
