<template>
  <div class="container">
    <p>Nothing here currently</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    this.$router.push({ path: '/votes/' })
  },
})
</script>
