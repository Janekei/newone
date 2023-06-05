
<template>
 <div id="map4"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
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
   data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '在途',
    type: 'bar',
    data: [1820, 2348, 2903, 1049, 1317, 6302],
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
    data: [1932, 2343, 3100, 1215, 1341, 6818],
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
#map4 {
 width: 100%;
 height: 100%;
}
</style>