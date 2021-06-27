<template>
  <div>
    <v-container v-if="store.state.signature">
      <h1 class="my-3">Hi, There !</h1>
      <p class="font-weight-bold">Your Public Address :</p>
      <p class="my-3 scrollable pa-1">
        <code class="font-weight-bold">{{ store.state.account }}</code>
      </p>
      <p class="font-weight-bold">Your Signature :</p>
      <p class="my-3 scrollable pa-1">
        <code class="font-weight-bold">{{ store.state.signature }}</code>
      </p>
      <v-btn class="my-3" color="primary" @click="ecRecover(store.state.signature)"
        >Recover your address</v-btn
      >
      <p class="font-weight-bold">Your Recovered Address :</p>
      <p v-if="state.recovered_address" class="my-3 scrollable pa-1">
        <code class="font-weight-bold">{{ state.recovered_address }}</code>
      </p>
    </v-container>

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

<style lang="scss" scoped>
.scrollable {
  overflow: scroll;
  overflow-x: auto;
  color: #efefef;
  background-color: #364549;
}
</style>
