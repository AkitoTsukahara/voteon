<template>
  <div class="login-container flex items-center justify-center">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="onClick"
    >
      Sign in with Google
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    onClick() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$auth
        .signInWithPopup(provider)
        .then((credential: firebase.auth.UserCredential) => {
          if (credential.user !== null) {
              // @ts-ignore
            this.$accessor.login.setUserInfo(credential.user)
            this.$router.push({ path: '/votes' })
          }
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
})
</script>