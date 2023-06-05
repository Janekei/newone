<template>
 <Card title="出库指令">
  <template #card-body>
   <div class="list">
    <div class="list-cu">
     <div class="node-item node1"></div>
     <div>
      海外仓发货（运输计划下达时间）
     </div>
    </div>
    <div class="list-cu line-box">
     <div class="count-detail">
      待出库：<span>12</span>
     </div>
     <div class="count-zw"></div>
    </div>
    <div class="list-cu">
     <div class="node-item node2"></div>
     <div>
      海外仓发货（出库时间）
     </div>
    </div>
    <div class="list-cu line-box">
     <div class="count-detail">
      待签收：<span>12</span>
     </div>
     <div class="count-zw"></div>
    </div>
    <div class="list-cu">
     <div class="node-item node3"></div>
     <div>
      到达项目地POD时间
     </div>
    </div>
   </div>
  </template>
 </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue'
</script>

<style scoped lang="scss">
.line-box {
 display: flex;
 flex-direction: column;

 .count-detail,
 .count-zw {
  flex: 1;
 }

 .count-detail {
  border-bottom: .3125rem solid #413fb9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;

  span {
   color: red;
   font-weight: 700;
   font-size: 1.125rem;
  }
 }

 .count-zw {
  border-top: .3125rem solid #413fb9;
 }
}

.list {
 display: flex;
 padding: 0 1.875rem;

 &-cu {
  flex: 1;
  text-align: center;
 }
}

.node-item {
 height: 3.75rem;
 background-color: pink;
}

.node1 {
 background: url(../../../assets/imgs/home/chuan.png) no-repeat;
 background-size: contain;
 background-position: center;
}

.node2 {
 background: url(../../../assets/imgs/home/fang.png) no-repeat;
 background-size: contain;
 background-position: center;
}

.node3 {
 background: url(../../../assets/imgs/home/tu.png) no-repeat;
 background-size: contain;
 background-position: center;
}
</style>
