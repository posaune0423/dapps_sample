<template>
  <div>
    <div v-if="!store.state.signature">
      <div class="text-center my-6">
        <h1>Sign in your Wallet</h1>
      </div>
      <div class="d-flex justify-center my-6">
        <v-img src="/images/metamask.png" max-width="200"></v-img>
      </div>
      <div class="d-flex justify-center my-6">
        <v-btn class="mr-2" color="primary" @click="login">Login with Metamask</v-btn>
      </div>
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
  useRouter,
  onBeforeMount,
  watch,
  useContext
} from '@nuxtjs/composition-api'
import { MESSAGE } from '~/utils/const'
import { AccountKey } from '~/composables/store/account'

export default defineComponent({
  setup() {
    const router = useRouter()
    const { $web3 } = useContext()

    const store = inject(AccountKey)
    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    const checkIsAuth = (): void => {
      if (store.state.signature) {
        router.push('/')
      }
    }

    const login = async (): Promise<void> => {
      const account = await $web3.eth.getAccounts()
      store.setAccount(account[0])

      $web3.eth.personal.sign(MESSAGE, store.state.account.toLowerCase(), '').then((res: string) => {
        console.log('Signture : ', res)
        store.setSignature(res)

        checkIsAuth()
      })
    }

    onBeforeMount(checkIsAuth)
    watch(store.state, checkIsAuth)

    return { login, store }
  }
})
</script>

<style lang="scss" scoped></style>
