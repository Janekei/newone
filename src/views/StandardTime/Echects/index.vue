<template>
 <div class="echarts-list">
  <div class="item">
   <ListTemp title="发货量">
    <DeliveringAmount />
   </ListTemp>
  </div>
  <div class="item">
   <ListTemp title="POD及时率">
    <POD />
   </ListTemp>
  </div>
  <div class="item">
   <ListTemp title="准时交付率">
    <OnTime />
   </ListTemp>
  </div>
  <div class="item">
   <ListTemp title="运输周期">
    <Cycle />
   </ListTemp>
  </div>
 </div>
</template>

<script setup lang="ts">
import ListTemp from './Components/ListTemp.vue'
import DeliveringAmount from './MapList/DeliveringAmount.vue'
import POD from './MapList/POD.vue'
import OnTime from './MapList/OnTime.vue'
import Cycle from './MapList/Cycle.vue'
</script>

<style lang="scss">
#app {
 overflow: scroll;
}

.echarts-list {
 margin: 0 1.25rem .5rem 1.25rem;

 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;

 .item {
  width: calc(50% - 0.75rem);
  background-color: #fff;
  padding: .5rem 3rem;
  border-radius: .5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

  .item:nth-child(odd) {
   margin-right: .75rem;
  }

  .item:nth-child(even) {
   margin-left: .75rem;
  }


 }

 .item:nth-child(1) {
  margin-bottom: 1.25rem;
 }

 .item:nth-child(2) {
  margin-bottom: 1.25rem;
 }
}
</style>
