<template>
 <div style="height: 100%; overflow: auto;">
  <div class="global-background big-box">
   <FilterHeader />
   <List :list="list" />
   <div class="statistik">
    <DataStatistik />
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FilterHeader from '@/views/StandardTime/FilterHeader/index.vue'
import List from './Components/List.vue'
import DataStatistik from './DataStatistik/index.vue'
import { stageOrderDetails } from '@/api/transportBI/index'

const list = ref()

const getStageOrderDetails = () => {
 stageOrderDetails({}).then(res => {
  list.value = res
 })
}

onMounted(() => {
 getStageOrderDetails()
})

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
