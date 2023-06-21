
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
    data: props.data.country
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
    data: props.data.list,
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