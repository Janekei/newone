
<template>
 <div class="flex-box" v-if="showEchart">
  <div class="top">
   <div class="date">
    <span>2023/05/08 - 2023/05/14</span>
    <span style="font-size: 1rem" class="close" @click="close">
     <el-icon>
      <circle-close />
     </el-icon>
    </span>
   </div>
   <div class="echart-box">
    <InventoryStatisticsEchart />
   </div>
  </div>
  <div class="bottom">
   <div class="count">
    <div class="top-icon icon"></div>
    <div class="top-count detail">
     <span>出库数量</span>
     <span>5367</span>
    </div>
   </div>
   <div class="count">
    <div class="bottom-icon icon"></div>
    <div class="bottom-count detail">
     <span>入库数量</span>
     <span>7289</span>
    </div>
   </div>
  </div>
 </div>
 <Occupy v-else :showBorderId="1" :showBorder="showBorder" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import InventoryStatisticsEchart from './InventoryStatisticsEchart.vue'
import Occupy from './Occupy.vue'
const emit = defineEmits(['close'])
const props = defineProps({
 echartIdList: {
  type: Array,
  default: () => []
 },
 showBorder: {
  type: Number
 }
})

const showEchart = computed(() => {
 return props.echartIdList.includes(1)
})

const close = () => {
 emit('close', 1)
}
</script>

<style lang="scss" scoped>
.date {
 font-size: .75rem;
 margin-top: .375rem;
 display: flex;
 justify-content: space-between;

 .close {
  cursor: pointer;
 }
}

.flex-box {
 display: flex;
 flex-direction: column;
 height: 100%;

 .top {
  flex: 2;
  display: flex;
  flex-direction: column;

  .echart-box {
   flex: 1;
  }
 }

 .bottom {
  flex: 1;
  margin-top: 1rem;
 }
}

.bottom {
 display: flex;
 flex-direction: column;
 justify-content: space-between;

 .count {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .25rem .625rem .25rem .625rem;
  background-color: pink;
  height: 47%;
  box-shadow: 2px 2px 10px #909090;
  padding: .625rem 2rem;

  .icon {
   width: 4.375rem;
   height: 4.375rem;
   border-radius: 50%;
  }

  .detail {
   flex: 1;
   display: flex;
   align-items: center;
   flex-direction: column;
   font-weight: 700;

   span:nth-child(1) {
    font-size: 1.3rem;
   }

   span:nth-child(2) {
    font-size: 1.8rem;
   }
  }
 }

 .count:nth-child(1) {
  background-color: #a1f0e3;

  .icon {
   background-color: #04caa1;
   background-image: url(../../../assets/imgs/overseas/chuku.png);
   background-size: contain;
  }
 }

 .count:nth-child(2) {
  background-color: #83bbf9;

  .icon {
   background-color: #087cf0;
   background-image: url(../../../assets/imgs/overseas/ruku.png);
   background-size: contain;
  }
 }
}
</style>