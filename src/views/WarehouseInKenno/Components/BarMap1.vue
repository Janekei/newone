<template>
 <div :id="id" class="echart"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
const props = defineProps({
 id: {
  type: String,
  default: ''
 }
})

let myChart = ref()
const setOption = function () {
 const option = {
  grid: {
   left: 0,
   right: 0,
   bottom: 0,
   top: '10%',
   containLabel: true
  },
  tooltip: {},
  xAxis: {
   type: 'category',
   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    data: [
     120,
     {
      value: 200,
      itemStyle: {
       color: '#a90000'
      }
     },
     150,
     80,
     70,
     110,
     130
    ],
    type: 'bar'
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById(props.id)
 if (chartDom) {
  let chart = echarts.init(chartDom) //
  // 绘制图表
  chart.setOption(setOption(), true)
  myChart.value = markRaw(chart)
 }
}
const resizeHandle = _.debounce(function () {
 myChart.value.resize()
}, 100)
onMounted(() => {
 initChart()
 window.addEventListener('resize', resizeHandle)
})
onUnmounted(() => {
 window.removeEventListener('resize', resizeHandle)
})
</script>

<style scoped lang="less">
.echart {
 height: 100%;
}
</style>
