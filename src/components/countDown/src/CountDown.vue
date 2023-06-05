<template>
  <div class="clockView">
    <div>
      <img class="countIcon" src="@/assets/imgs/count.png"/>
    </div>
    <div class="timeNum">
      08:08:08
    </div>

    <div class="rankView" v-if="ifBiddingOn">
      <div class="rankText">
        当前排名：2/12
      </div>
      <div class="rankText">
        已出价次数：2/3
      </div>
    </div>

  </div>
</template>

<script lang="ts" name="CountDown" setup>
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure

//传入接口接收线路模板列表
const props = defineProps({
  // 父组件传过来的模板对象
  ifBiddingOn: {
    type: Boolean,
    default: () => false
  },
})

//是否显示排名文字
const ifBiddingOn : Boolean = props.ifBiddingOn

</script>

<style lang="scss" scoped>
.clockView{
  padding: 0 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .countIcon{
    width:91px;
    height:91px;
  }

  .timeNum{
    color: #0000FF;
    padding:15px;
    font-size: 72px;
    font-weight:700;
  }

  .rankView{
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 700;
    .rankText{
      padding: 15px;
    }
  }
}
</style>
