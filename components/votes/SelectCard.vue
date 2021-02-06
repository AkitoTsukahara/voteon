<template>
  <div
    :class="[
      'rounded overflow-hidden shadow-xl mr-5 mb-5 card',
      { selected: userInfo.isSelected },
      { 'is-not-selectable': userInfo.isNotSelectable },
    ]"
  >
    <div class="check-mark shadow-xl"></div>
    <img
      class="object-cover h-32 w-full"
      :src="userInfo.imgPath"
      :alt="userInfo.name"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ userInfo.name }}</div>
      <p class="text-gray-700 text-base mb-1">
        Value Actions
      </p>
      <ul class="list-disc mb-1">
        <li
          v-for="action in userInfo.actions"
          :key="`member-${userInfo.id}-${action.title}`"
          class="text-sm ml-4"
        >
          {{ action.title }}
        </li>
      </ul>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-sm"
        @click="onClickSelect"
      >
        Select
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
type UserAction = {
  title: string
  targetValues: number[]
  description: string
  URL: string
}
type UserInfo = {
  id: number
  memberId: number
  imgPath: string
  name: string
  actions: UserAction[]
  isSelected: boolean
}
export default Vue.extend({
  props: {
    userInfo: {
      type: Object,
      required: true,
    } as PropOptions<UserInfo>,
    targetValue: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClickSeeDetail() {
      this.$accessor.detailViewer.setIsShown(true)
      this.$accessor.detailViewer.setShownUserId(this.userInfo.memberId)
      this.$accessor.detailViewer.setTargetValue(this.targetValue)
    },
    onClickSelect() {
      if (this.userInfo.isSelected) {
        return
      }
      const selectedData = {
        memberId: this.userInfo.memberId,
        sectionId: this.userInfo.id,
        targetValue: this.targetValue,
      }
      this.$accessor.votes.selectMember(selectedData)
    },
  },
})
</script>

<style lang="scss" scoped>
$selected_blue: #1565c0;
.card {
  position: relative;
  max-width: 18rem;
  &.selected {
    border: $selected_blue solid 4px;
  }
  &.is-not-selectable {
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      background: #000;
      position: absolute;
      opacity: 0.3;
      z-index: 10;
    }
  }
}
.check-mark {
  position: absolute;
  top: 10px;
  right: 10px;
  border: #eee solid 1px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: #7f7f7f;
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 13px;
    border-bottom: #fff solid 2px;
    border-right: #fff solid 2px;
    transform: rotate(45deg);
    top: 3px;
    left: 7px;
  }
}
.selected {
  & .check-mark {
    background: $selected_blue;
  }
}
</style>