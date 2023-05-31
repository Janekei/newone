
<template>
 <div id="map5"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
let myChart = ref()
const setOption = function () {
 const option = {
  title: {
   text: '近六月POD达成率',
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
   right: '8%',
   bottom: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   boundaryGap: false,
   data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '库存',
    data: [0.8, 0.5, 0.7, 0.74, 0.9, 0.88],
    type: 'line',
    areaStyle: {
     color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
       offset: 0,
       color: '#ef7d97' // 红色，透明度为 0.7
      }, {
       offset: 1,
       color: '#fef3f5' // 绿色，透明度为 0.7
      }]
     }
    },
    itemStyle: {
     color: '#e21444'
    },
    label: {
     show: true,
     position: 'top',
     formatter(value: any) {
      return value.data * 100 + '%'
     }
    }
   }
  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map5')
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
#map5 {
 width: 100%;
 height: 100%;
}
</style>