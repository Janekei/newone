<template>
 <div class="card">
  <div class="card-title">
   {{ title }}
  </div>
  <div class="card-body">
   <slot name="card-body"></slot>
  </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 title: {
  type: String,
  default: '头部区域'
 }
})
</script>

<style scoped lang="scss">
.card {
 width: 100%;
 height: 100%;
 border-radius: .625rem;
 padding: 1rem 1.5rem;
 background-color: #fff;
 box-shadow: 0 10px 20px rgba(0, 0, 0, .15);
 display: flex;
 flex-direction: column;

 &-title {
  font-size: 1rem;
  font-weight: 700;
 }

 &-body {
  margin-top: .5rem;
  flex: 1;
 }
}
</style>
