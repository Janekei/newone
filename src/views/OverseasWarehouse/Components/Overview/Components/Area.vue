
<template>
 <div class="area area-top">
  <Header title="各港库存情况" />
  <div class="area-top-detail">
   <div class="detail" v-for="item in 3" :key="item">
    <div class="detail-box">
     <div class="title"><span class="name">北美</span> <span class="date">较上周 3%</span></div>
     <div class="detail-item">在库库存：2354</div>
     <div class="detail-item">在港库存：2354</div>
    </div>
   </div>
  </div>
 </div>
 <div class="area area-bottom">
  <Header title="各供应商库存情况" />
  <div class="area-top-detail">
   <div class="detail" v-for="item in 3" :key="item">
    <div class="detail-box">
     <div class="title"><span class="name">北美</span> <span class="date">较上周 3%</span></div>
     <div class="detail-item">在库库存：2354</div>
     <div class="detail-item">在港库存：2354</div>
    </div>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import Header from '../../Header.vue'
</script>

<style lang="less" scoped>
.area {
 height: 50%;
 display: flex;
 flex-direction: column;
}

.area-top-detail {
 display: flex;
 flex: 1;

 .detail {
  width: calc(100% / 3);
  height: 100%;
  padding: 0.25em;

  &-box {
   display: flex;
   flex-direction: column;
   justify-content: center;
   border: 1px solid #11cca5;
   width: 100%;
   height: 100%;
   padding: 0 .75rem;

   .title {
    font-weight: 700;
   }

   .name {
    font-size: 1.25rem;
   }

   .date {
    font-size: 1rem;
   }
  }
 }
}
</style>