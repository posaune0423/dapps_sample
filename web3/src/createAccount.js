const web3 = require('./web3Peovider')

const password = 'test1'
web3.eth.personal.newAccount(password).then(console.log)
