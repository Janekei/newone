
<template>
 <div class="header">
  {{ props.title }}
 </div>
</template>

<script setup lang="ts">
const props = defineProps({
 title: {
  type: String
 },
 fontSize: {
  type: String,
  default: '1.25rem'
 }
})
</script>

<style lang="scss" scoped>
.header {
 background-color: #caefe8;
 border-radius: 5px;
 text-align: center;
 font-weight: 700;
 padding: 6px 0;
 font-size: v-bind(fontSize);
}
</style>