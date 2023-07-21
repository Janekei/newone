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
        tooltip: {},
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: props.data['PRODUCT']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.data['TOTAL'],
                type: 'bar'
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
