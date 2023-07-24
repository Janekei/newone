<template>
 <div class="flex-box">
  <div class="filter-form item">
   <FilterForm />
  </div>
  <div class="item">
   <Warehousing />
  </div>
  <div class="item">
   <Outbound />
  </div>
  <div class="item">
   <BottomEcharts />
  </div>
 </div>
</template>

<script setup lang="ts">
import FilterForm from './Components/FilterForm.vue'
import Warehousing from './Warehousing/index.vue'
import Outbound from './Outbound/index.vue'
import BottomEcharts from './BottomEcharts/index.vue'
</script>

<style lang="scss" scoped>
.flex-box {
 display: flex;
 flex-direction: column;
 font-size: 0.875rem;
 height: 100%;

 .item {
  margin-bottom: 1rem;
 }
}
</style>
