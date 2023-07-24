
<template>
    <Card title="库存库容情况（单位：㎡）">
        <template #body>
            <StorageCapacityEchart v-if="showEcahrt" :data="inventoryData" />
        </template>
    </Card>
</template>

<script setup lang="ts" name="StorageCapacity">
import { ref } from 'vue'
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import StorageCapacityEchart from './StorageCapacityEchart.vue'
import { getInventoryData } from '@/api/overseasWarehouse/index'

const props = defineProps({
    id: {
        type: Number
    }
})

const inventoryData = ref()
const showEcahrt = ref(false)
const getInventory = () => {
    getInventoryData({ id: props.id }).then(res => {
        inventoryData.value = res
        showEcahrt.value = true
    })
}
getInventory()
</script>

<style lang="scss" scoped>
.card[data-v-4002204f] {
    padding: 1rem 1rem 0 1rem;
}
</style>