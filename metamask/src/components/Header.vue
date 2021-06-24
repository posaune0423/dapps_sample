<template>
  <div>
    <v-app-bar color="gray accent-4">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <nuxt-link to="/" class="ml-4" style="text-decoration: none;">
        <v-toolbar-title>Metamask Test</v-toolbar-title>
      </nuxt-link>

      <div class="flex-grow-1"></div>

      <v-btn color="primary" to="/login">
        Login
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
