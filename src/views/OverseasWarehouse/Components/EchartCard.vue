
<template>
 <div class="card">
  <div class="card-header">
   {{ title }}
  </div>
  <div class="card-body">
   <slot name="body"></slot>
  </div>
 </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
 title: {
  type: String,
  default: ''
 }
})
</script>

<style lang="less" scoped>
.card {
 background-color: #fff;
 border-radius: .3125rem;
 padding: 1rem;
 height: 100%;
 display: flex;
 flex-direction: column;

 &-header {
  font-size: 1.125rem;
 }

 &-body {
  flex: 1;
 }
}
</style>