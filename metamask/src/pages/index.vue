<template>
  <div>
    <div v-if="store.state.signature">
      <h1 class="my-3">Hi, There !</h1>
      <p class="my-3">Your Public Address : {{ store.getAccount() }}</p>
      <p class="my-3">Your Signature : {{ store.getSignature() }}</p>
      <v-btn class="my-3" color="primary" @click="ecRecover(store.getSignature())"
        >Recover your address from signature above</v-btn
      >
      <p v-if="state.recovered_address" class="my-3">{{ state.recovered_address }}</p>
    </div>

    <div v-else class="text-center">
      <v-progress-circular
        indeterminate
        size="120"
        color="primary my-10"
        style="margin: calc(50vh - 120px) auto"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onBeforeMount,
  useRouter,
  watch,
  reactive
} from '@nuxtjs/composition-api'
import Web3 from 'web3'
import { MESSAGE } from '~/utils/const'
import { AccountKey } from '~/composables/store/account'

declare let window: any

export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      recovered_address: ''
    })

    const store = inject(AccountKey)
    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    const ecRecover = async (signature: string): Promise<void> => {
      let web3: Web3 | undefined
      if (window.ethereum) {
        web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

      if (!web3) {
        throw new Error('web3 instance is undifined or invalid value')
      }

      web3.eth.personal.ecRecover(MESSAGE, signature).then((res) => {
        console.log(res)
        state.recovered_address = res
      })
    }

    const checkIsAuth = (): void => {
      if (!store.state.signature) {
        router.push('/login')
      }
    }

    onBeforeMount(checkIsAuth)
    watch(store.state, checkIsAuth)

    return {
      store,
      state,
      ecRecover
    }
  }
})
</script>
