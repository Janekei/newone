<template>
 <div class="center-echarts">
  <div class="title">
   系统监控
  </div>
  <ElRow class="echarts">
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <PieEchart :data="deliveringAmountData" v-if="showPieEchart" />
    </div>
   </ElCol>
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <BarBar />
    </div>
   </ElCol>
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <PodLine />
    </div>
   </ElCol>
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <BarLine />
    </div>
   </ElCol>
  </ElRow>
 </div>
</template>
 
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import PieEchart from './PieEchart.vue'
import BarBar from './BarBar.vue'
import PodLine from './PodLine.vue'
import BarLine from './BarLine.vue'
import { deliveringAmount } from '@/api/logisticsInKenno/index'

const showPieEchart = ref(false)
const deliveringAmountData = ref()
const getDeliveringAmount = () => {
 deliveringAmount({}).then(res => {
  deliveringAmountData.value = res
  showPieEchart.value = true
 })
}

onMounted(() => {
 getDeliveringAmount()
})
</script>

<style scoped lang="scss">
.center-echarts {
 .title {
  border-radius: .5rem;
  background-color: #c3eee5;
  padding: .625rem;
  width: 15%;
  font-size: 1.25rem;
 }

 .echarts {
  margin-top: 1rem;

  .echart {
   height: 15rem;
   margin: 1rem
  }

  .echart:first-child {
   margin: 0 .5rem 0 0;
  }

  .echart:last-child {
   margin: 0 0 0 .5rem;
  }
 }
}
</style>
