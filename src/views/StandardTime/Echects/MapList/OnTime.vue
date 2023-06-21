
<template>
 <div id="map4"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'

const props = defineProps({
 data: {
  type: Object as any,
  default: null
 }
})
let myChart = ref()
const setOption = function () {
 const option = {
  tooltip: {},
  grid: {
   left: '10%',
   right: 0,
   bottom: 0,
   top: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   boundaryGap: false,
   data: props.data.country
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    data: props.data.list,
    type: 'line',
    itemStyle: {
     color: '#55a69a'
    },
    areaStyle: {
     color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
       offset: 0,
       color: '#acd4ce' // 红色，透明度为 0.7
      }, {
       offset: 1,
       color: '#fafcfc' // 绿色，透明度为 0.7
      }]
     }
    },
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map4')
 if (chartDom) {
  let chart = echarts.init(chartDom) //
  // 绘制图表
  chart.setOption(setOption(), true)
  myChart.value = markRaw(chart)
 }
}
const resizeHandle = debounce(function () {
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

<style lang="scss" scoped>
#map4 {
 width: 100%;
 height: 100%;
}
</style>