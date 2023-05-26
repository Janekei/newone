
<template>
 <div id="map2"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
let myChart = ref()
const setOption = function () {
 const option = {
  grid: {
   left: '10%',
   right: 0,
   bottom: 0,
   top: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   data: ['非洲', '马来', '北亚', '中国', '韩国', '北美', '欧洲']
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    barWidth: 25,
    itemStyle: {
     color: '#516391',
     borderRadius: [10, 10, 10, 10]
    }
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map2')
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

<style lang="less" scoped>
#map2 {
 width: 100%;
 height: 100%;
}
</style>