
<template>
 <div id="map3"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'
let myChart = ref()
const setOption = function () {
 const option = {
  tooltip: {
   trigger: 'item',
   show: true
  },
  legend: {
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  grid: {
   left: 0,
   right: 0,
   bottom: '10%',
   top: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   boundaryGap: false,
   data: ['0-30天', '31-60天', '61-90天', '91-180天', '大于180天'],
   axisLabel: {
    rotate: 20,
   },
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '库存',
    data: [820, 932, 901, 934, 1290],
    type: 'line',
    areaStyle: {
     color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
       offset: 0,
       color: '#5cbfe5' // 红色，透明度为 0.7
      }, {
       offset: 1,
       color: '#eef9fc' // 绿色，透明度为 0.7
      }]
     }
    },
    itemStyle: {
     color: '#3c88e0'
    },
    label: {
     show: true,
     position: 'top'
    }
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map3')
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
#map3 {
 width: 100%;
 height: 100%;
}
</style>