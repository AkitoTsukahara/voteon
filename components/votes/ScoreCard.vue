<template>
  <div
    :class="[
      'rounded overflow-hidden shadow-xl mb-5 card',
    ]"
  >
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ valueInfo.valueAction.title }}</div>
      <div class="range-container">
        <p class="text-sm">ビジネスに貢献できるか？</p>
        <div class="range-number">
          <div><p>😅</p></div>
          <div><p>😐</p></div>
          <div><p>🙂</p></div>
          <div><p>😁</p></div>
          <div><p>😍</p></div>
        </div>
        <input  v-model="point1" class="range" type="range" name="range" min="1" max="5" />
      </div>

      <div class="range-container">
        <p>周囲に良い影響を与えられるか？</p>
        <div class="range-number">
            <div><p>😅</p></div>
            <div><p>😐</p></div>
            <div><p>🙂</p></div>
            <div><p>😁</p></div>
            <div><p>😍</p></div>
          </div>
          <input v-model="point2" class="range" type="range" name="range" min="1" max="5" 
           />
      </div>

      <div class="range-container">
        <p>組織の強みと発信できるものか？</p>
        <div class="range-number">
            <div><p>😅</p></div>
            <div><p>😐</p></div>
            <div><p>🙂</p></div>
            <div><p>😁</p></div>
            <div><p>😍</p></div>
          </div>
          <input v-model="point3" class="range" type="range" name="range" min="1" max="5" 
           />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

type valueInfo = {
  id: number
  imgPath: string
  name: string
  point1: number
  point2: number
  point3: number
}

export default Vue.extend({
  props: {
    valueInfo: {
      type: Object,
      required: true,
    } as PropOptions<valueInfo>,
    targetValue: {
      type: Number,
      required: true,
    },
  },
  computed:{
    point1:{
      get(){
        //@ts-ignore
        return this.$props.valueInfo.point1
      },
      set(value){
        this.onChangeRange(1, Number(value))
      }
    },
    point2:{
      get(){
        //@ts-ignore
        return this.$props.valueInfo.point2
      },
      set(value){
        this.onChangeRange(2, Number(value))
      }
    },
    point3:{
      get(){
        //@ts-ignore
        return this.$props.valueInfo.point3
      },
      set(value){
        this.onChangeRange(3, Number(value))
      }
    }
  },
  mounted(){
    this.$forceUpdate()
  },
  methods: {
    onChangeRange(target:number, value:number){
      const { id } = this.valueInfo
      let {
        point1,
        point2,
        point3,
      } = this

      switch (target) {
        case 1:
          point1 = value
          break;
        case 2:
          point2 = value
          break;
        case 3:
          point3 = value
          break;

        default:
          break;
      }


      this.$accessor.votes.setRange({
        actionId: id,
        point1,
        point2, 
        point3
      })
    }
  },
})
</script>

<style lang="scss" scoped>
$selected_blue: #1565c0;
.card {
  position: relative;
  max-width: 22rem;
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
.range {
  width: 100%;
  &-number {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
}
</style>
