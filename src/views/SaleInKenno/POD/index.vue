<template>
 <div class="pod">
  <div class="title">
   POD完成量/完成率
   <ElIcon>
    <calendar />
   </ElIcon>
   <ElDatePicker v-model="date" type="date" placeholder="选择日期" style="margin-left: .5rem" />
  </div>
  <div class="pod-echart">
   <PodEchart />
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElIcon, ElDatePicker } from 'element-plus'
import PodEchart from './PodEchart.vue'

const date = ref('')
</script>

<style scoped lang="less">
.pod {
 background-color: #fff;
 border-radius: 3px;
 padding: 1rem;

 .title {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
 }

 .pod-echart {
  height: 270px;
 }
}
</style>
