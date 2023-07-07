
<template>
    <Card title="库龄情况">
        <template #body>
            <StockAgEchart :data="stockAgeData" v-if="show" />
        </template>
    </Card>
</template>

<script setup lang="ts" name="StockAge">
import { ref } from 'vue'
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import StockAgEchart from './StockAgEchart.vue'
import { getStockAgeData } from '@/api/overseasWarehouse/index'

const props = defineProps({
    id: {
        type: Number
    }
})


const stockAgeData = ref()
const show = ref(false)
const getStockAge = () => {
    show.value = false
    getStockAgeData({ id: props.id }).then(res => {
        stockAgeData.value = res
        show.value = true
    })
}
getStockAge()
</script>

<style lang="scss" scoped>
.card[data-v-4002204f] {
    padding: 1rem 1rem 0 1rem;
}
</style>