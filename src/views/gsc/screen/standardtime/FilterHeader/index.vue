<template>
 <div class="top-box">
  <div class="top-top">
   <div class="filter-text">筛选</div>
   <div class="filter">
    <div class="filter-item">销售区域</div>
    <div class="filter-item">发运区域</div>
    <div class="filter-item">时间</div>
    <div class="filter-item">运抵区域</div>
    <div class="filter-item">线路始发港</div>
    <div class="filter-item">线路目的港</div>
    <div class="filter-item">贸易条款</div>
    <div class="filter-item">操作人</div>
    <div class="filter-item">承运商</div>
   </div>
  </div>
  <div class="top-bottom">
   <div class="title">销售区域</div>
   <div class="cur-list">
    <span>中国</span>
    <span>北亚</span>
    <span>ROA</span>
    <span>拉美</span>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.filter-text {
 color: #333333;
 font-size: 1.125rem;
}

.top-top {
 display: flex;
 // justify-content: center;
 align-items: center;
}

.top-bottom {
 display: flex;
 background-color: #e8e8e8;
 padding: .375rem .5rem;
 margin-top: .75rem;
 font-size: .875rem;

 .title {
  color: #2f54b6
 }

 .cur-list {
  margin-left: 2.8rem;
  display: flex;
  justify-content: space-between;
  flex: 1;
 }
}

.filter {
 padding: 0.5rem .625rem;
 border-radius: 8px;
 background-color: #d3e4ee;
 display: flex;
 justify-content: space-between;
 flex: 1;
 margin-left: 2rem;
 font-size: 1rem;
 color: #525757;
}
</style>
