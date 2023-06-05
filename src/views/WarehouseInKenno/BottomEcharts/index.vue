<template>
 <div class="flex-boxs">
  <div class="flex-item">
   <Card title="7月入库统计">
    <template #card-body>
     <BarMap id="ruku" />
    </template>
   </Card>
  </div>
  <div class="flex-item margin-left-right">
   <Card title="7月出库统计">
    <template #card-body>
     <BarMap1 id="chuku" />
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
