<template>
 <div class="flex">
  <div class="card-item" v-for="item in cards" :key="item.title">
   <div class="item-title">
    {{ item.title }}
   </div>
   <div class="item-count">
    {{ item.count }}票
   </div>
   <div class="item-footer">
    {{ item.footer }}
    <span>{{ item.curCount }}</span>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
defineProps({
 cards: {
  type: Array as any,
  default: () => []
 },
})
</script>

<style scoped lang="scss">
.flex {
 display: flex;
}

.card-item {
 display: flex;
 flex: 1;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 background-color: #fff;
 padding: 1rem;
 border-radius: 3px;
}

.item-title {
 font-size: .875rem;
}

.item-count {
 font-size: 2rem;
 color: #1d84f2;
 font-weight: 700;
 margin: .625rem 0;
}

.item-footer {
 font-size: .875rem;
 color: #969696;

 span {
  color: #f59a23;
  font-size: 1.25rem;
  font-weight: 700;
 }
}

.card-item:nth-child(1) {
 margin-right: .5rem;
}

.card-item:nth-child(4) {
 margin-left: .5rem;
}

.card-item:nth-child(2) {
 margin: 0 .5rem;
}

.card-item:nth-child(3) {
 margin: 0 .5rem;
}
</style>
