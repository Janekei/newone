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
     <BarBar :data="transitNotPODData" v-if="showBarBar" />
    </div>
   </ElCol>
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <PodLine :data="podAchievementRateData" v-if="showPodLine" />
    </div>
   </ElCol>
   <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
    <div class="echart">
     <BarLine :data="timelyBookingRateData" v-if="showBarLine" />
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
import { deliveringAmount, transitNotPOD, podAchievementRate, timelyBookingRate } from '@/api/logisticsInKenno/index'

const showPieEchart = ref(false)
const deliveringAmountData = ref()
const getDeliveringAmount = () => {
 deliveringAmount({}).then(res => {
  deliveringAmountData.value = res
  showPieEchart.value = true
 })
}

const showBarBar = ref(false)
const transitNotPODData = ref()
const getTransitNotPODData = () => {
 transitNotPOD({}).then(res => {
  transitNotPODData.value = res
  showBarBar.value = true
 })
}

const showPodLine = ref(false)
const podAchievementRateData = ref()
const getPodAchievementRateData = () => {
 podAchievementRate({}).then(res => {
  podAchievementRateData.value = res
  showPodLine.value = true
 })
}

const showBarLine = ref(false)
const timelyBookingRateData = ref()
const getTimelyBookingRateData = () => {
 timelyBookingRate({}).then(res => {
  timelyBookingRateData.value = res
  showBarLine.value = true
 })
}

onMounted(() => {
 getDeliveringAmount()
 getTransitNotPODData()
 getPodAchievementRateData()
 getTimelyBookingRateData()
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
