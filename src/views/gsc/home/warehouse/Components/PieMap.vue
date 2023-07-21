<template>
    <div :id="id" class="echart"></div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'
const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    data: {
        type: Object as any
    }
})

let myChart = ref()
const setOption = function () {
    const option = {
        color: ['#bb69c5', '#2b5eef', '#133595'],
        legend: {
            left: 'center', // 图例水平居中
            top: 'bottom', // 图例垂直底部对齐
            orient: 'horizontal'
        },
        tooltip: {},
        series: [
            {
                type: 'pie',
                center: ['50%', '40%'],
                radius: ['20%', '60%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                label: {
                    formatter(value: any) {

                        return value.name + ':' + value.value
                    }
                },
                data: props.data
            }
        ]
    };
    return option
}
const initChart = async function () {
    var chartDom = document.getElementById(props.id)
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

<style scoped lang="scss">
.echart {
    height: 100%;
}
</style>
