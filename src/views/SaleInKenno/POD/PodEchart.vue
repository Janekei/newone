
<template>
 <div class="echart" id="pod-chart"></div>
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
   trigger: 'axis',
   axisPointer: {
    type: 'cross',
    crossStyle: {
     color: '#999'
    }
   }
  },
  grid: {
   left: '2%',
   right: '2%',
   bottom: '10%',
   top: '15%',
   containLabel: true
  },
  legend: {
   data: ['POD完成率', 'POD完成量'],
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  barMaxWidth: 20,
  xAxis: [
   {
    type: 'category',
    data: ['北亚', '越南', '北美', '澳大利亚', '法国', '韩国', '日本', '非洲', '意大利', '马来', '拉美', '中国', 'ROA'],
    axisPointer: {
     type: 'shadow'
    },
   }
  ],
  yAxis: [
   {
    type: 'value',
    name: 'POD完成量',
    axisLabel: {
     formatter: '{value}'
    },
    splitLine: false
   },
   {
    type: 'value',
    name: 'POD完成率',
    axisLabel: {
     formatter: '{value} %'
    },
    splitLine: false
   }
  ],
  series: [
   {
    name: 'POD完成率',
    type: 'line',
    yAxisIndex: 1,
    tooltip: {
     valueFormatter: function (value) {
      return value + ' %';
     }
    },
    itemStyle: {
     color: '#00c297'
    },
    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
   },
   {
    name: 'POD完成量',
    type: 'bar',
    tooltip: {
     valueFormatter: function (value) {
      return value + '';
     }
    },
    itemStyle: {
     color: '#2786f6',
     borderRadius: [10, 10, 10, 10]
    },
    data: [
     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
    ]
   }
  ]
 };
}
const initChart = () => {
 const chartDom = document.getElementById('pod-chart');
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