<template>
  <div>
    <v-app-bar color="gray accent-4">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <nuxt-link to="/" class="ml-4" style="text-decoration: none">
        <v-toolbar-title>Metamask Test</v-toolbar-title>
      </nuxt-link>

      <div class="flex-grow-1"></div>

      <v-btn v-if="store.state.signature" color="primary" @click="logout"> Logout </v-btn>
      <v-btn v-else color="primary" to="/login"> Login </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { AccountKey } from '~/composables/store/account'

export default defineComponent({
  setup() {
    const store = inject(AccountKey)
    if (!store) {
      throw new Error(`${AccountKey} is not provided`)
    }

    const logout = () => {
      store.logout()
    }

    return {
      store,
      logout
    }
  }
})
</script>

<style scoped></style>
