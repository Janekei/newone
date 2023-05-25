
<template>
 <Card title="库龄情况">
  <template #body>
   <StockAgEchart />
  </template>
 </Card>
</template>

<script setup lang="ts" name="StockAge">
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import StockAgEchart from './StockAgEchart.vue'
</script>

<style lang="less" scoped>
.card[data-v-4002204f] {
 padding: 1rem 1rem 0 1rem;
}
</style>