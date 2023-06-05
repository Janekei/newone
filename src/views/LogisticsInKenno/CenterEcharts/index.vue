<template>
 <div class="center-echarts">
  <div class="title">
   系统监控
  </div>
  <div class="echarts">
   <div class="echart">
    <PieEchart />
   </div>
   <div class="echart">
    <BarBar />
   </div>
   <div class="echart">
    <PodLine />
   </div>
   <div class="echart">
    <BarLine />
   </div>
  </div>
 </div>
</template>
 
<script lang="ts" setup>
import PieEchart from './PieEchart.vue'
import BarBar from './BarBar.vue'
import PodLine from './PodLine.vue'
import BarLine from './BarLine.vue'
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
  display: flex;

  .echart {
   flex: 1;
   border-radius: .5rem;
   padding: 1rem;
   background-color: #fff;
   margin: 0 .5rem;
   height: 15rem;
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
