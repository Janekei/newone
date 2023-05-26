<template>
 <div class="echart">
  <div class="title">{{ title }}</div>
  <div class="echart">
   <slot></slot>
  </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 title: {
  typee: String,
  default: ''
 }
})
</script>

<style scoped lang="less">
.echart {
 display: flex;
 justify-content: space-between;
 height: 14.375rem;
 // height: 25rem;

 .title {
  background-color: #e8e8e8;
  border-radius: .5rem;
  font-size: 1.5rem;
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-align: center;
  padding: 1rem;
 }

 .echart {
  flex: 1;
 }
}
</style>
