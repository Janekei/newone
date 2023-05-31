
<template>
 <div class="echart" id="echart1"></div>
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
   right: '5%',
   bottom: '10%',
   top: '5%',
   containLabel: true
  },
  xAxis: {
   type: 'value'
  },
  yAxis: {
   type: 'category',
   data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  series: [
   {
    name: '出货量',
    type: 'bar',
    data: [50, 40, 100, 400, 350, 500, 50, 40, 100, 400, 350, 500],
    itemStyle: {
     borderRadius: [10, 10, 10, 10],
    }
   }
  ]
 };
}
const initChart = () => {
 const chartDom = document.getElementById('echart1');
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

<style lang="less" scoped>
.echart {
 width: 100%;
 height: 100%;
}
</style>