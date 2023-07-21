
<template>
 <div class="echart" id="inventory-statistics"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'
const props = defineProps({
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
   axisPointer: {
    type: 'shadow'
   },
   formatter(value: any) {
    return `
             <div style="font-weight: 700">${value.name}</div>
             <div>${value.seriesName}    ${value.data < 0 ? value.data * -1 : value.data}</div>
           `
   }
  },
  legend: {
   data: ['出库数量', '入库数量'],
   left: 'center', // 图例水平居中
   top: 'bottom', // 图例垂直底部对齐
   orient: 'horizontal'
  },
  grid: {
   left: '10%',
   right: 0,
   bottom: '10%',
   top: '10%',
   containLabel: true
  },
  xAxis: [
   {
    type: 'value',
    axisLabel: {
     show: true,
     formatter(value) {
      return value * -1
     }
    },
    splitLine: {
     show: false
    },
   }

  ],
  yAxis: [
   {
    type: 'category',
    axisTick: {
     show: false,
    },
    splitLine: {
     show: false
    },
    axisLabel: {
     color: '#000'
    },
    data: props.data.country
   }

  ],
  series: [
   {
    name: '入库数量',
    type: 'bar',
    stack: 'Total',
    emphasis: {
     focus: 'series'
    },
    data: props.data.warehousing,
    barWidth: 20,
    itemStyle: {
     borderRadius: [10, 10, 10, 10], // 设置圆角大小，分别为左上、右上、右下、左下
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#c28d54' // 渐变色起始颜色
     }, {
      offset: 1,
      color: '#c3ad55' // 渐变色终止颜色
     }])
    },
   },
   {
    name: '出库数量',
    type: 'bar',
    stack: 'Total',
    emphasis: {
     focus: 'series'
    },
    data: props.data.outbound,
    itemStyle: {
     borderRadius: [10, 10, 10, 10], // 设置圆角大小，分别为左上、右上、右下、左下
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#5ca4b2' // 渐变色起始颜色
     }, {
      offset: 1,
      color: '#5bb2a8' // 渐变色终止颜色
     }])
    },
   }
  ]
 };
}
const initChart = () => {
 const chartDom = document.getElementById('inventory-statistics');
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