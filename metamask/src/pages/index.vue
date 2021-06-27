<template>
  <div>
    <div v-if="store.state.signature">
      <h1 class="my-3">Hi, There !</h1>
      <p class="my-3">
        <span class="font-weight-bold">Your Public Address : </span>
        {{ store.state.account }}
      </p>
      <p class="my-3">
        <span class="font-weight-bold">Your Signature : </span>
        {{ store.state.signature }}
      </p>
      <v-btn class="my-3" color="primary" @click="ecRecover(store.state.signature)"
        >Recover your address from signature above</v-btn
      >
      <p v-if="state.recovered_address" class="my-3">
        <span class="font-weight-bold">Your Recovered Address : </span>
        {{ state.recovered_address }}
      </p>
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
  reactive,
  useContext
} from '@nuxtjs/composition-api'
import { MESSAGE } from '~/utils/const'
import { AccountKey } from '~/composables/store/account'

export default defineComponent({
  setup() {
    const router = useRouter()
    const { $web3 } = useContext()
    const state = reactive({
      recovered_address: ''
    })

    const store = inject(AccountKey)
    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    const ecRecover = (signature: string): void => {
      $web3.eth.personal.ecRecover(MESSAGE, signature).then((res: string) => {
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
