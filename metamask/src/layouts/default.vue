<template>
  <v-app>
    <v-main>
      <Header />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from '@nuxtjs/composition-api'
import Header from '~/components/Header.vue'
import AccountStore, { AccountKey } from '~/composables/store/account'

export default defineComponent({
  components: {
    Header
  },
  setup() {
    provide(AccountKey, AccountStore)
    const store = inject(AccountKey)

    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    return {
      store
    }
  }
})
</script>
