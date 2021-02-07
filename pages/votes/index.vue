<template>
  <div class="top-container">
    <section class="top-section py-20">
      <p class="text-2xl italic mb-10">選択タイプ</p>
      <p class="text-2xl italic font-bold"></p>
    </section>
    <!-- <SelectVotes /> -->

    <section class="top-section py-20">
      <p class="text-2xl italic mb-10">採点タイプ</p>
      <p class="text-2xl italic font-bold"></p>
    </section>
    <ScoreVotes />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
//import SelectVotes from '@/components/votes/SelectVotes.vue'
import ScoreVotes from '@/components/votes/ScoreVotes.vue'

export default Vue.extend({
  layout: 'protected',
  components: {
    //SelectVotes,
    ScoreVotes,
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
