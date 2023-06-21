
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
   trigger: 'item'
  },
  legend: {
   orient: 'vertical',
   right: '15%',
   top: 'center',
   bottom: 20
  },
  series: [
   {
    name: 'Access From',
    type: 'pie',
    radius: ['50%', '90%'],
    center: ['30%', '50%'],
    avoidLabelOverlap: false,
    itemStyle: {
     borderRadius: 10,
     borderColor: '#fff',
     borderWidth: 2
    },
    label: {
     show: false,
     position: 'center'
    },
    emphasis: {
     label: {
      show: true,
      fontWeight: 'bold'
     }
    },
    labelLine: {
     show: false
    },
    data: props.data
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