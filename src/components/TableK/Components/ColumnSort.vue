<template>
 <Draggable :list="tableOption" ghost-class="ghost" animation="300">
  <template #item="{ element }">
   <div class="list-items">
    <ElIcon>
     <Sort />
    </ElIcon>
    {{ element.label }}
   </div>
  </template>
 </Draggable>
</template>
 
<script lang="ts" setup>
import Draggable from "vuedraggable"
import { ElIcon } from 'element-plus'

defineProps({
 tableOption: {
  type: Array as any,
  default: () => []
 }
})
</script>

<style scoped lang="scss">
.list-items {
 border-top: 1px solid #f0f2f5;
 padding: .25rem;
}
</style>
