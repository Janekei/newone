
<template>
 <div class="echart" id="inventory-statistics"></div>
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
   top: 0,
   left: '3%',
   right: '4%',
   bottom: '5%',
   containLabel: true
  },
  xAxis: [
   {
    type: 'category',
    axisTick: {
     show: false,
    },
    splitLine: {
     show: false
    },
    axisLabel: {
     rotate: 45,
     color: '#000'
    },
    data: ['越南', '北亚', '非洲', '中国', '马来', '澳洲', '北美']
   }

  ],
  yAxis: [
   {
    type: 'value',
    axisLabel: {
     show: false
    },
    splitLine: {
     show: false
    },
   }
  ],
  series: [
   {
    name: '入库数量',
    type: 'bar',
    stack: 'Total',
    label: {
     show: true,
     position: 'top'

    },
    emphasis: {
     focus: 'series'
    },
    data: [320, 302, 341, 374, 390, 450, 420],
    barWidth: 20,
    itemStyle: {
     borderRadius: [10, 10, 10, 10], // 设置圆角大小，分别为左上、右上、右下、左下
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#66e6c2' // 渐变色起始颜色
     }, {
      offset: 1,
      color: '#67e6e2' // 渐变色终止颜色
     }])
    },
   },
   {
    name: '出库数量',
    type: 'bar',
    stack: 'Total',
    label: {
     show: true,
     position: 'bottom',
     formatter(value: any) {
      return value.data * -1
     }
    },
    emphasis: {
     focus: 'series'
    },
    data: [-120, -132, -101, -134, -190, -230, -210],
    itemStyle: {
     borderRadius: [10, 10, 10, 10], // 设置圆角大小，分别为左上、右上、右下、左下
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#38aee0' // 渐变色起始颜色
     }, {
      offset: 1,
      color: '#3b81e0' // 渐变色终止颜色
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