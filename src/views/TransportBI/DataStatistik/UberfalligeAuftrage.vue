
<template>
 <div class="echart" :id="id"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
const props = defineProps({
 id: {
  type: String,
  default: 'inventory-statistics'
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
    data: [
     { value: 1048, name: '清关状态' },
     { value: 735, name: '离港-到港' },
     { value: 580, name: '港口-仓库' },
     { value: 484, name: '仓库-客户' },
     { value: 300, name: '工厂-离港' },
     { value: 300, name: '直发客户' }
    ]
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

<style lang="scss" scoped>
.echart {
 width: 100%;
 height: 100%;
}
</style>