const web3 = require('./web3Peovider')

const getBalance = async (index) => {
  const accounts = await web3.eth.getAccounts()
  web3.eth.getBalance(accounts[index]).then(console.log)
}

getBalance(0)
