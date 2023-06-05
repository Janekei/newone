
<template>
 <div class="echart" id="echart3"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
defineProps({
 title: {
  type: Array,
  default: () => []
 }
})

let myGlolbChart: any = void (0)
const setOption = () => {
 return {
  tooltip: {
   trigger: 'item'
  },
  series: [
   {
    name: '未交付',
    type: 'pie',
    radius: '50%',
    data: [
     { value: 1048, name: '北美' },
     { value: 735, name: '越南' },
     { value: 580, name: 'ROA' },
     { value: 484, name: '马来' },
     { value: 300, name: '拉美' }
    ],
    emphasis: {
     itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
     }
    }
   }
  ]
 };
}
const initChart = () => {
 const chartDom = document.getElementById('echart3');
 if (chartDom) {
  const myChart = echarts.init(chartDom);
  myChart.setOption(setOption(), true)
  myGlolbChart = myChart
 }
}
const resizeHandler = _.debounce(function () {
 myGlolbChart.resize()
}, 100)

onMounted(() => {
 initChart()
 window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
 window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="scss" scoped>
.echart {
 width: 100%;
 height: 100%;
}
</style>