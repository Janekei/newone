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
  legend: {
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  tooltip: {},
  series: [
   {
    name: 'Nightingale Chart',
    type: 'pie',
    center: ['50%', '40%'],
    radius: ['20%', '70%'],
    roseType: 'area',
    itemStyle: {
     borderRadius: 8
    },
    data: [
     { value: 40, name: '7日内库存' },
     { value: 38, name: '7-30日内库存' },
     { value: 32, name: '30日以上库存' }
    ]
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
