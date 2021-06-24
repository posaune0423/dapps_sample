const web3 = require('./web3Peovider')

const pass = 'pass1'

const setTxn = async () => {
  const accounts = await web3.eth.getAccounts()
  web3.eth
    .sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: 100,
    }, pass)
    .then(console.log)
}

setTxn()
