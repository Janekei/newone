
<template>
 <Card title="库存库容情况（单位：㎡）">
  <template #body>
   <StorageCapacityEchart />
  </template>
 </Card>
</template>

<script setup lang="ts" name="StorageCapacity">
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import StorageCapacityEchart from './StorageCapacityEchart.vue'
</script>

<style lang="less" scoped>
.card[data-v-4002204f] {
 padding: 1rem 1rem 0 1rem;
}
</style>