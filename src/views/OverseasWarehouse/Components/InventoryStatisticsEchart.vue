
<template>
  <div class="echart" id="inventory-statistics"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'
const props = defineProps({
  title: {
    type: Array,
    default: () => []
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
      axisPointer: {
        type: 'shadow'
      },
      formatter(value: any) {
        console.log(value, 30);

        return `
             <div style="font-weight: 700">${value.name}</div>
             <div>${value.seriesName}    ${value.seriesName === '入库数量' ? value.data.data1 : value.data.data2 * -1}</div>
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
        }
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
        barWidth: 20,
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
      },
      {
        name: '出库数量',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'bottom',
          formatter(value: any) {
            return value.data.data2 * -1
          }
        },
        emphasis: {
          focus: 'series'
        },
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
      }
    ],
    dataset: props.data,
  };
}
const initChart = () => {
  console.log('initinitinitinitinitinitinitinitinitinitinitinitinit');
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

defineExpose({
  initChart
})
</script>

<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>