
<template>
 <Card title="库存周转率">
  <template #body>
   <TurnoverEchart />
  </template>
 </Card>
</template>

<script setup lang="ts" name="Turnover">
import Card from '@/views/OverseasWarehouse/Components/EchartCard.vue'
import TurnoverEchart from './TurnoverEchart.vue'
</script>

<style lang="scss" scoped>
.card[data-v-4002204f] {
 padding: 1rem 1rem 0 1rem;
}
</style>