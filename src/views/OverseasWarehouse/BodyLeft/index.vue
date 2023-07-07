
<template>
    <Draggable :list="rightList" ref="bodyLeftRef" ghost-class="ghost" animation="300" class="flex">
        <template #item="{ element }">
            <div v-if="show" class="box-item" @dragover="dragover($event, element.id)" @drop="drop($event, element.id)">
                <span style="font-size: 1rem" class="close" @click="close(element.id)" v-if="element.showEchart">
                    <el-icon>
                        <circle-close />
                    </el-icon>
                </span>
                <component :is="element.id === 3 ? StorageCapacity : element.id === 4 ? Turnover : StockAge"
                    v-if="element.showEchart" :id="mapId" />
                <Occupy fontSize="10.625rem" v-else :showBorderId="element.id" :showBorder="showBorder" />
            </div>
        </template>
    </Draggable>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ElIcon } from 'element-plus'
import Draggable from "vuedraggable"
import StorageCapacity from './Components/StorageCapacity.vue'
import Turnover from './Components/Turnover.vue'
import StockAge from './Components/StockAge.vue'
import Occupy from '@/views/OverseasWarehouse/Components/Occupy.vue'

const props = defineProps({
    echartIdList: {
        type: Array,
        default: () => []
    },
    showBorder: {
        type: Number
    }
})

const emit = defineEmits(['dragover', 'drop', 'close'])

const close = (id: number) => {
    emit('close', id)
}

const dragover = (e: any, id: number) => {
    emit('dragover', e, id)
}
const drop = (e: any, id: number) => {
    if (e.target.nodeName !== 'svg') return
    emit('drop', id)
}

const showEchart3 = computed(() => {
    return props.echartIdList.includes(3)
})
const showEchart4 = computed(() => {
    return props.echartIdList.includes(4)
})
const showEchart5 = computed(() => {
    return props.echartIdList.includes(5)
})

const rightList = reactive([
    {
        id: 3,
        showEchart: showEchart3
    },
    {
        id: 4,
        showEchart: showEchart4
    },
    {
        id: 5,
        showEchart: showEchart5
    }
])

// 获取地图
const mapId = ref()
let show = ref(true)
const loading = ref()
watch(() => mapId.value, () => {
    show.value = false
    setTimeout(() => {
        loading.value = false
        show.value = true
    }, 1000)
})


defineExpose({
    mapId
})
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .box-item {
        height: 32%;
        background-color: #fff;
        position: relative;

        .close {
            position: absolute;
            right: 0;
            cursor: pointer;
        }
    }
}
</style>