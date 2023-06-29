<template>
    <div class="flex-boxs">
        <div class="flex-item">
            <Card title="7月入库统计">
                <template #card-body>
                    <BarMap id="ruku" :data="dayIn" v-if="showDay7in" />
                </template>
            </Card>
        </div>
        <div class="flex-item margin-left-right">
            <Card title="7月出库统计">
                <template #card-body>
                    <BarMap1 id="chuku" :data="dayOut" v-if="showDay7out" />
                </template>
            </Card>
        </div>
        <div class="flex-item">
            <Card title="库存状态">
                <template #card-body>
                    <PieMap id="饼图" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import BarMap from '../Components/BarMap.vue'
import BarMap1 from '../Components/BarMap1.vue'
import PieMap from '../Components/PieMap.vue'
import { day7in, day7out } from '@/api/warehouseInKenno/index'

const dayIn = ref({

})
// PRODUCT TOTAL
const showDay7in = ref(false)
const getDay7inData = () => {
    day7in({}).then((res: any) => {
        dayIn.value['PRODUCT'] = res.map(item => {
            return item['PRODUCT']
        })
        dayIn.value['TOTAL'] = res.map(item => {
            return item['TOTAL']
        })
        console.log(dayIn, 47);

        showDay7in.value = true
    })
}
getDay7inData()


const dayOut = ref({})
const showDay7out = ref(false)
const getDay7outData = () => {
    day7out({}).then((res: any) => {
        dayOut.value['PRODUCT'] = res.map(item => {
            return item['PRODUCT']
        })
        dayOut.value['TOTAL'] = res.map(item => {
            return item['TOTAL']
        })
        showDay7out.value = true
    })
}
getDay7outData()
</script>

<style scoped lang="scss">
.flex-boxs {
    display: flex;

    .flex-item {
        flex: 1;
        height: 240px;
    }
}
</style>
