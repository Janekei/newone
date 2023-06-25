
<template>
 <div id="map5"></div>
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
   data: props.data.date
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '库存',
    data: props.data.list,
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
#map5 {
 width: 100%;
 height: 100%;
}
</style>