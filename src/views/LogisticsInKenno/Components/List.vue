<template>
 <div class="list-it">
  <div class="title">
   <div>
    <span>{{ title }}&nbsp;&nbsp;</span>
    <span style="font-size: 20px;">10</span>
   </div>
   <div style="font-size: .75rem; cursor: pointer;">
    更多>>
   </div>
  </div>
  <div class="list-detail">
   <slot></slot>
  </div>
 </div>
</template>
 
<script lang="ts" setup>
defineProps({
 borderColor: {
  type: String,
  default: '#60ffcf'
 },
 list: {
  type: Array,
  default: () => []
 },
 title: {
  type: String,
  default: '不符合标准时间'
 }
})
</script>

<style scoped lang="less">
.list-it {
 padding: 1rem;
 border: 1px solid v-bind(borderColor);
 border-radius: .5rem;

 .title {
  font-size: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
 }

 .list-detail {
  margin-top: .5rem;
 }
}
</style>
