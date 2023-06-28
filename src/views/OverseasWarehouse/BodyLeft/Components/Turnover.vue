
<template>
    <Card title="库存周转率">
        <template #body>
            <TurnoverEchart v-if="show" :data="turnoverData" />
        </template>
    </Card>
</template>

<script setup lang="ts" name="Turnover">
import { ref } from 'vue'
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import TurnoverEchart from './TurnoverEchart.vue'
import { getTurnoverData } from '@/api/overseasWarehouse/index'

const turnoverData = ref()
const show = ref(false)
const getTurnover = () => {
    getTurnoverData({}).then(res => {
        turnoverData.value = res
        show.value = true
    })
}
getTurnover()
</script>

<style lang="scss" scoped>
.card[data-v-4002204f] {
    padding: 1rem 1rem 0 1rem;
}
</style>