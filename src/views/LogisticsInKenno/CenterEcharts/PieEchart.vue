
<template>
 <div id="map3"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
let myChart = ref()
const setOption = function () {
 const option = {
  title: {
   text: '近六月发货量',
   textStyle: {
    fontSize: 16
   }
  },
  tooltip: {
   trigger: 'item'
  },
  legend: {
   orient: 'vertical',
   right: 'left',
   top: 'center'
  },
  series: [
   {
    name: '近六月发货量',
    type: 'pie',
    radius: '50%',
    center: ['40%', '60%'],
    label: {
     formatter: '{c}'
    },
    data: [
     { value: 1048, name: '一月' },
     { value: 735, name: '二月' },
     { value: 580, name: '三月' },
     { value: 484, name: '四月' },
     { value: 300, name: '五月' },
     { value: 230, name: '六月' }
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
#map3 {
 width: 100%;
 height: 100%;
}
</style>