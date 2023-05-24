
<template>
 <div class="overview">
  <template v-if="showEchart">
   <span style="font-size: 1rem" class="close" @click="close">
    <el-icon>
     <circle-close />
    </el-icon>
   </span>
   <template v-if="toggleMapFlag">
    <div class="top">
     <Header fontSize="1.2rem" title="各区库存情况" />

    </div>
    <div class="bottom">
     <div class="bottom-item" v-for="item in 6" :key="item">
      <div class="item">
       <div class="title"><span class="name">北美</span> <span class="date">较上周 3%</span>
        <ElIcon style="font-size: 1rem; color: red;">
         <Top />
        </ElIcon>
       </div>
       <div class="detail-item">在库库存：2354</div>
       <div class="detail-item">在港库存：2354</div>
       <div class="detail-item">预计到货量：2354</div>
      </div>
     </div>
    </div>
   </template>
   <template v-else>
    <Area />
   </template>

  </template>

  <Occupy v-else :showBorderId="2" :showBorder="showBorder" />
 </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import Header from '../Header.vue'
import Occupy from '../Occupy.vue'
import Area from './Components/Area.vue'
const emit = defineEmits(['close'])
const props = defineProps({
 echartIdList: {
  type: Array,
  default: () => []
 },
 showBorder: {
  type: Number
 },
 toggleMapFlag: {
  type: Boolean
 }
})
const showEchart = computed(() => {
 return props.echartIdList.includes(2)
})

const close = () => {
 emit('close', 2)
}
</script>

<style lang="less" scoped>
.overview {
 display: flex;
 position: relative;
 height: 100%;
 flex-direction: column;
 padding: 0 1rem;

 .bottom {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;

  &-item {
   width: calc(100% / 3);
   height: 50%;
   padding: 0.25rem;

   .item {
    width: 100%;
    height: 100%;
    border: 1px solid #22ceab;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .75rem;
    font-size: .875rem;

    .title {
     font-weight: 700;
     display: flex;
     align-items: center;
    }

    .name {
     font-size: 1.25rem;
     margin-right: 1rem;
    }

    .date {
     font-size: 1rem;
    }
   }

   .detail-item {
    color: #697478;
    font-size: 0.75rem;
   }
  }
 }
}

.close {
 cursor: pointer;
 position: absolute;
 z-index: 1;
 right: 1rem;
 top: 0;
}
</style>