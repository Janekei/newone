
<template>
 <div class="echart" :id="id"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'
const props = defineProps({
 id: {
  type: String,
  default: 'inventory-statistics'
 },
 data: {
  type: Object as any,
  default: null
 }
})

let myGlolbChart: any = void (0)
const setOption = () => {
 return {
  tooltip: {
   trigger: 'item',
   show: true
  },
  legend: {
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  grid: {
   left: '5%',
   right: '5%',
   bottom: '10%',
   top: '10%',
   containLabel: true
  },
  xAxis: {
   type: 'category',
   boundaryGap: false,
   data: ['0-30天', '31-60天', '61-90天', '91-180天', '大于180天']
  },
  yAxis: {
   type: 'value'
  },
  series: [
   {
    name: '超期',
    data: [820, 932, 901, 934, 1290],
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
       color: '#e77594' // 红色，透明度为 0.7
      }, {
       offset: 1,
       color: '#f1e8eb' // 绿色，透明度为 0.7
      }]
     }
    },
    itemStyle: {
     color: '#e23967'
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
const resizeHandler = debounce(function () {
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