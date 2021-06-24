<template>
  <div>
    <div class="text-center my-6">
      <h1>Sign in your Wallet</h1>
    </div>
    <div class="d-flex justify-center my-6">
      <v-img src="/images/metamask.png" max-width="200"></v-img>
    </div>
    <div class="d-flex justify-center my-6">
      <v-btn class="mr-2" color="orange" @click="login"
        >Login with Metamask</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from '@nuxtjs/composition-api'
import Web3 from 'web3'
import AccountStore, { AccountKey } from '~/composables/store/account'

declare let window: any

export default defineComponent({
  setup() {
    provide(AccountKey, AccountStore)
    const store = inject(AccountKey)

    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    const login = async (): Promise<void> => {
      let web3: Web3|undefined
      if (window.ethereum) {
        web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
      } else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        )
      }

      if(!web3) {
        throw new Error('web3 instance is undifined or invalid value')
      }


      const account = await web3.eth.getAccounts()
      store.setAccount(account[0])

      web3.eth.personal
        .sign('ログインテスト', store.state.account.toLowerCase(), '')
        .then((res) => {
          console.log(res)
        })
    }

    return { login, store }
  },
})
</script>

<style lang="scss" scoped></style>
