
<template>
 <div id="map"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import _ from 'lodash'
const emits = defineEmits(['toggleMapFlagFn'])
let myChart = ref()
const setOption = function (name: string) {
 let option = {
  tooltip: {
   trigger: 'item',
   show: true,
   formatter: function () {
    var showHtml = `<div>测试</div>`
    return showHtml
   }
  },

  //左侧小导航图标
  visualMap: {
   show: false,
   type: 'continuous',
   left: 16,
   bottom: 16,
   itemWidth: '8',
   itemHeight: '50',
   color: ['#394ACB', '#5A85F8', '#8FAFFF', '#C1D3FF', '#E9EFFC'],
   text: ['高', '低']
  },
  //配置属性
  series: [
   {
    name: '数据',
    type: 'map',
    map: name,
    zoom: 1.9,
    // aspectScale: 0.9,
    roam: true,
    layoutCenter: ['50%', '50%'], //地图位置
    layoutSize: '100%',
    label: {
     normal: {
      show: false, //省份名称
      fontSize: 8,
      fontWeight: 400,
      color: 'rgba(41, 36, 66, 0.85)'
     },
     emphasis: {
      show: true, //省份名称
      fontSize: 8,
      fontWeight: 400,
      color: 'rgba(41, 36, 66, 1)'
     }
    },
    itemStyle: {
     normal: {
      borderColor: 'rgba(51, 31, 153, 0.15)' //省份边界颜色
     },
     emphasis: {
      areaColor: '#F6A740' //选中省份颜色
     }
    },
    data: [
     { name: '中国', value: 100 },
     { name: 'United States', value: 80 },
     { name: 'India', value: 60 },
     { name: 'Brazil', value: 40 },
     { name: 'Russia', value: 20 }
    ] //数据
   }
  ]
 }
 return option
}
const initChart = async function (name: string) {
 let world = await import(`../../../assets/js/mapData/${name}.json`)
 var chartDom = document.getElementById('map')
 if (chartDom) {
  let chart = echarts.init(chartDom) //
  echarts.registerMap(name, world.default)
  // 绘制图表
  chart.setOption(setOption(name), true)
  chart.on('click', function () {
   initChart('china')
   emits('toggleMapFlagFn')
  })
  myChart.value = markRaw(chart)
 }
}
const resizeHandle = _.debounce(function () {
 myChart.value.resize()
}, 100)
onMounted(() => {
 initChart('world')
 window.addEventListener('resize', resizeHandle)
})
onUnmounted(() => {
 window.removeEventListener('resize', resizeHandle)
})

</script>

<style lang="less" scoped>
#map {
 width: 100%;
 height: 100%;
}
</style>