
<template>
 <div class="flex-box" :class="showBorder === showBorderId ? 'border-red' : ''">
  <ElIcon class="plus">
   <Plus />
  </ElIcon>
 </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
defineProps({
 showBorderId: {
  type: Number,
  default: 0
 },
 showBorder: {
  type: Number,
  default: 0
 },
 fontSize: {
  type: String,
  default: '15.625rem'
 }
})
</script>

<style lang="scss" scoped>
.flex-box {
 display: flex;
 justify-content: center;
 align-items: center;
 color: #f2f2f2;
 height: 100%;
}

.border-red {
 border: 1px dashed red;
}

.plus {
 font-size: v-bind(fontSize);
}
</style>