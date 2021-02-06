<template>
  <div class="top-container">
    <section class="top-section py-20">
      <p class="text-2xl italic mb-10">選択タイプ</p>
      <p class="text-2xl italic font-bold"></p>
    </section>
    <Votes />

    <section class="top-section py-20">
      <p class="text-2xl italic mb-10">採点タイプ</p>
      <p class="text-2xl italic font-bold"></p>
    </section>
    <Votes />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Votes from '@/components/votes/Votes.vue'
//import Detail from '@/components/votes/DetailViewer.vue'

export default Vue.extend({
  layout: 'protected',
  components: {
    Votes,
  },
})
</script>

<style>
.top-container {
  margin: 0 auto;
  min-height: 100vh;
}

.top-section {
  text-align: center;
}
</style>
