
<template>
 <div class="echart" :id="id"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
const props = defineProps({
 id: {
  type: String,
  default: 'inventory-statistics'
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
   left: '5%',
   right: '5%',
   bottom: '10%',
   top: '10%',
   containLabel: true
  },
  xAxis: [
   {
    type: 'category',
    data: ['欧洲', '北美', '北亚', '非洲', '西亚', '印尼']
   }
  ],
  yAxis: [
   {
    type: 'value',
    splitLine: {
     show: false
    }
   }
  ],
  series: [
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
}
const initChart = () => {
 const chartDom = document.getElementById(props.id);
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