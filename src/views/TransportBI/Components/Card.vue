<template>
 <div class="flex-card">
  <div class="title">{{ title }}</div>
  <div class="body-map">
   <slot>123</slot>
  </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 title: {
  type: String,
  default: ''
 }
})
</script>

<style scoped lang="scss">
.flex-card {
 display: flex;
 width: 100%;
 height: 100%;

 .title {
  writing-mode: vertical-rl;
  font-size: 1.125rem;
  padding: .625rem;
  background-color: #e8e8e8;
  border-radius: .5rem;
  text-align: center;
 }

 .body-map {
  flex: 1;
 }
}
</style>
