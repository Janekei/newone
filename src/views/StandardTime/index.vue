<template>
 <div class="global-background big-box">
  <FilterHeader />
  <Cards />
 </div>
</template>

<script setup lang="ts">
import FilterHeader from './FilterHeader/index.vue'
import Cards from './BodyEcharts/Cards.vue'
</script>

<style scoped lang="scss">
.big-box {
 display: flex;
 flex-direction: column;
 padding: 1rem;
}
</style>
