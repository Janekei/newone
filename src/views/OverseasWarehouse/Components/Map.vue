
<template>
    <div id="map"></div>
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
                data: props.data.data, //数据
                markPoint: { //图标标注。
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) { //标签内容       如果只显示图片则隐藏
                                return params.name;
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: 'none'
                        },
                    },
                    data: props.data.markPointData
                }
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
        chart.on('click', function (params: any) {
            console.log(params, 88);

            initChart(params.name)
            emits('toggleMapFlagFn')
        })
        myChart.value = markRaw(chart)
    }
}
const resizeHandle = debounce(function () {
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

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>