
<template>
 <div id="map4"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'

const props = defineProps({
 data: {
  type: Object as any,
  default: () => ({})
 }
})
let myChart = ref()
const setOption = function () {
 const option = {
  title: {
   text: '近六月在途看库存和未POD数量',
   textStyle: {
    fontSize: 16
   }
  },
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
   left: '0',
   right: '0',
   bottom: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   data: props.data.date
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '在途',
    type: 'bar',
    data: props.data.transit,
    itemStyle: {
     color: '#3f97e3',
     borderRadius: [10, 10, 10, 10]
    },
    label: {
     show: true,
     position: 'top'
    },
   },
   {
    name: '未POD',
    type: 'bar',
    data: props.data.notPOD,
    itemStyle: {
     color: '#6be5cf',
     borderRadius: [10, 10, 10, 10]
    },
    label: {
     show: true,
     position: 'top'
    },
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map4')
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
#map4 {
 width: 100%;
 height: 100%;
}
</style>