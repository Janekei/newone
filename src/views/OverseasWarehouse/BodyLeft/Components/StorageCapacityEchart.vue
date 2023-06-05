
<template>
 <div id="map1"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
let myChart = ref()
const setOption = function () {
 const option = {
  tooltip: {
   trigger: 'axis',
   axisPointer: {
    type: 'shadow'
   }
  },
  legend: {
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  grid: {
   left: 0,
   right: 0,
   bottom: '15%',
   top: '10%',
   containLabel: true
  },
  xAxis: [
   {
    type: 'category',
    data: ['欧洲', '北美', '北亚', '非洲', '西亚', '印尼'],
    axisLabel: {
     rotate: 20,
    },
   }
  ],
  yAxis: [
   {
    type: 'value',
    name: '已用库容',
    splitLine: {
     show: false
    }
   },
   {
    type: 'value',
    name: '剩余库容',
    splitLine: {
     show: false
    }
   }
  ],
  series: [
   {
    name: '已用库容',
    type: 'bar',
    stack: 'Ad',
    emphasis: {
     focus: 'series'
    },
    data: [220, 182, 191, 234, 290, 330],
    itemStyle: {
     color: '#3b95e0',
     borderRadius: 8
    },
    barWidth: 20,
    label: {
     show: true,
     position: 'bottom '
    },
   },
   {
    name: '剩余库容',
    type: 'bar',
    stack: 'Ad',
    emphasis: {
     focus: 'series'
    },
    data: [150, 232, 201, 154, 190, 330],
    itemStyle: {
     color: '#67e5d8',
     borderRadius: 8
    },
    barWidth: 20,
    label: {
     show: true,
     position: 'bottom '
    },

   }
  ]
 }
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map1')
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

<style lang="scss" scoped>
#map1 {
 width: 100%;
 height: 100%;
}
</style>