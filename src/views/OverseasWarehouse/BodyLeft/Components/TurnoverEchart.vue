
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
  tooltip: {
   trigger: 'axis',
   axisPointer: {
    type: 'cross',
    crossStyle: {
     color: '#999'
    }
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
    splitLine: {
     show: false
    },
    position: 'right'
   },
   {
    type: 'value',
    splitLine: {
     show: false
    },
    position: 'left'
   }
  ],
  series: [
   {
    name: '库存周转率(天)',
    type: 'line',
    yAxisIndex: 1,
    data: [2, 3, 1, 4, 6, 10],
    itemStyle: {
     color: '#42cecf'
    },

    label: {
     show: true,
     position: 'top'
    }
   },
   {
    name: '库存周转率(次)',
    type: 'line',
    yAxisIndex: 1,
    data: [3, 2, 3, 5, 3, 2],
    itemStyle: {
     color: '#bcaadd'
    },

    label: {
     show: true,
     position: 'top'
    }
   },
   {
    name: '库存',
    type: 'bar',
    data: [
     1200, 2000, 1420, 1723, 980, 1523
    ],
    barWidth: 20,
    itemStyle: {
     color: '#379fd8',
     borderRadius: 8
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