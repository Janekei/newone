<template>
 <div style="height: 100%; overflow: auto;">
  <div class="global-background big-box">
   <FilterHeader />
   <List />
   <div class="statistik">
    <DataStatistik />
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import FilterHeader from '@/views/StandardTime/FilterHeader/index.vue'
import List from './Components/List.vue'
import DataStatistik from './DataStatistik/index.vue'
</script>

<style scoped lang="scss">
.big-box {
 display: flex;
 flex-direction: column;
 padding: 1rem;
}

.statistik {
 margin-top: 1rem;
}
</style>
