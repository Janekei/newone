
<template>
 <div id="map6"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'

const props = defineProps({
 data: {
  type: Object as any,
  defaul: () => ({})
 }
})

let myChart = ref()
const setOption = function () {
 const option = {
  title: {
   text: '运输调度量和订舱及时率',
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
  xAxis: [
   {
    type: 'category',
    data: props.data.date
   }
  ],
  yAxis: [
   {
    type: 'value',
    splitLine: {
     show: false
    }
   },
   {
    type: 'value',
    splitLine: {
     show: false
    }
   }
  ],
  series: [
   {
    name: '平均运输周期',
    type: 'bar',
    yAxisIndex: 1,
    data: props.data.list,
    itemStyle: {
     color: '#3fb1e3',
     borderRadius: [10, 10, 10, 10]
    },
    barWidth: 18,
    label: {
     show: true,
     position: 'top',
     formatter(value: any) {
      return value.data * 100 + '%'
     }
    }
   },
   {
    name: '订舱及时率',
    type: 'line',
    data: [
     25, 33, 14, 7, 66, 78
    ],
    itemStyle: {
     color: '#93edd2'
    },
    label: {
     show: true,
     position: 'top'
    }
   }

  ]
 };
 return option
}
const initChart = async function () {
 var chartDom = document.getElementById('map6')
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
#map6 {
 width: 100%;
 height: 100%;
}
</style>