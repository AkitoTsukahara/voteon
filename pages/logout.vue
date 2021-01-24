<template>
  <div class="login-container flex items-center justify-center">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="onClick"
    >
      Log Out
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    onClick() {
      this.$auth.signOut().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
}
</style>
