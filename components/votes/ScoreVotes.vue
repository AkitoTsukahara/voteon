<template>
  <div>
    <section class="container mx-md py-5 px-6">
      <div
        v-for="voteSection in voteSections"
        :key="voteSection.title"
        class="py-12"
      >
        <h2 class="text-xl font-bold mb-8">
          {{ voteSection.title }}
          <span v-if="voteSection.targetValue !== 0"></span>
        </h2>
        <div class="flex flex-wrap justify-around">
          <Card
            v-for="action in voteSection.actionLists"
            :key="`action-${action.id}`"
            :value-info="action"
            :target-value="voteSection.targetValue"
          />
        </div>
      </div>
    </section>
    <section 
      v-if="show"
      class="button-wrapper">
      <div class="mx-md py-16 px-6 pt-6 text-center fixed-button">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
          @click="onClickConfirm"
        >
          Vote!
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/votes/ScoreCard.vue'
import { VOTE_TYPES, getValueActionData } from '@/data/data'

export default Vue.extend({
  data() {
    return {
      show: false,
    }
  },
  components: {
    Card,
  },
  computed: {
    // voteSections() {
    //   console.log("voteSections")
    //   return this.$accessor.votes.voteSections
    // }
  },
  async mounted() {
    this.$accessor.votes.setVoteTypes(VOTE_TYPES)
    this.$accessor.votes.setActionLists({ actionLists: getValueActionData()})
    await this.$accessor.votes.getVotedData()

    setTimeout(() => { this.show = true },3000)
  },
  methods: {
    async onClickConfirm() {
    
      const uid = this.$accessor.login.userInfo.uid
      const votes = this.$accessor.votes.getPointedActionLists

      if (this.$accessor.votes.votedDataId !== '') {
        await this.$firestore
          .collection('votes')
          .doc(this.$accessor.votes.votedDataId)
          .set({
            uid,
            ...votes,
          })
      } else {
        await this.$firestore.collection('votes').add({
          uid,
          ...votes,
        })
      }
      this.$router.push({ path: '/votes/finish' })
    },
  },
})
</script>
<style lang="scss" scoped>
.button-wrapper{
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 10px;
  text-align: center;
}
.fixed-btton{
    bottom: 40px;
    position: relative;
}
</style>