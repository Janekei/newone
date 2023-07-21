<template>
 <div class="list-it">
  <div class="title">
   <div>
    <span>{{ title }}&nbsp;&nbsp;</span>
   </div>
   <div style="font-size: .75rem; cursor: pointer;">
    <slot name="seeMore"></slot>
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

<style scoped lang="scss">
.list-it {
 padding: 1rem;
 border: 1px solid v-bind(borderColor);
 border-radius: .5rem;

 .title {
  font-size: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
 }

 .list-detail {
  margin-top: .5rem;
 }
}
</style>
