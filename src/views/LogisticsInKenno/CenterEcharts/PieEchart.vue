
<template>
 <div id="map3"></div>
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
    data: props.data,
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