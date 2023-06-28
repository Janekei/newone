
<template>
    <div id="map2"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'

const props = defineProps({
    data: {
        type: Object as any,
        default: null
    }
})

let myChart = ref()
const setOption = function () {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            left: 'center', // 图例水平居中
            top: 'bottom', // 图例垂直底部对齐
            orient: 'horizontal'
        },
        grid: {
            left: 0,
            right: 0,
            bottom: '15%',
            top: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    rotate: 20,
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                position: 'right'
            },
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                position: 'left'
            }
        ],
        series: [
            {
                name: '库存周转率(天)',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#42cecf'
                },
                label: {
                    show: true,
                    position: 'top'
                }
            },
            {
                name: '库存周转率(次)',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#bcaadd'
                },

                label: {
                    show: true,
                    position: 'top'
                }
            },
            {
                name: '库存',
                type: 'bar',
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

        ],
        dataset: props.data
    };
    return option
}
const initChart = async function () {
    var chartDom = document.getElementById('map2')
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
#map2 {
    width: 100%;
    height: 100%;
}
</style>