import Web3 from "web3"
import { Plugin } from '@nuxt/types'

declare let window: any
declare module '@nuxt/types' {
  interface Context {
    $web3: Web3
  }
}

const web3Instance: Plugin = (context) => {
  let web3: Web3 | undefined

  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  } else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    const httpEndpoint = 'http://127.0.0.1:8545'
    web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint))
  }

  context.$web3 = web3
}

export default web3Instance
