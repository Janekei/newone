<template>
 <div>
  <HeaderCards :cards="list" />
 </div>
 <div class="center">
  <POD class="left" />
  <div class="right">
   <div class="right-box">
    <header style="font-size: 1.5rem;">订单超期末POD</header>
    <div class="right-box-center">
     <div>为POD单数</div>
     <div class="count">23票</div>
    </div>
    <div style="text-align: right; color: #f59a24; font-size: 1.25rem; cursor: pointer;">查看更多</div>
   </div>
  </div>
 </div>
 <div class="bottom">
  <div class="bottom-left">
   <div class="left-title">发货量
    <ElIcon>
     <calendar />
    </ElIcon>
    <ElDatePicker v-model="date" type="date" placeholder="选择日期" style="margin-left: .5rem; width: 7.5rem;" />
   </div>
   <div class="echart1">
    <DeliveringAmount />
   </div>
  </div>
  <div class="bottom-center">
   <div class="center-1">
    <div class="top-title">已交付 <ElIcon>
      <calendar />
     </ElIcon>
     <ElDatePicker v-model="date" type="date" placeholder="选择日期" style="margin-left: .5rem; width: 7.5rem;" />
    </div>
    <div class="delivered">
     <Delivered />
    </div>
   </div>
   <div class="center-2">
    <div class="top-title">未交付 <ElIcon>
      <calendar />
     </ElIcon>
     <ElDatePicker v-model="date" type="date" placeholder="选择日期" style="margin-left: .5rem; width: 7.5rem;" />
    </div>
    <div class="delivered">
     <Undelivered />
    </div>
   </div>
  </div>
  <div class="bottom-right">
   <header style="font-size: 1.5rem;">单据超期末上传</header>
   <div class="right-box-center">
    <div>缺失单据数量</div>
    <div class="count">23票</div>
   </div>
   <div style="text-align: right; color: #f59a24; font-size: 1.25rem; cursor: pointer;">查看更多</div>

  </div>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElIcon, ElDatePicker } from 'element-plus'
import HeaderCards from './HeaderCards/index.vue'
import POD from './POD/index.vue'
import DeliveringAmount from './BottmoCards/DeliveringAmount.vue'
import Delivered from './BottmoCards/Delivered.vue'
import Undelivered from './BottmoCards/Undelivered.vue'

const list = reactive([
 {
  title: '待处理任务单',
  count: 367,
  curCount: 25,
  footer: '今日待处理任务单'
 },
 {
  title: '异常出库单',
  count: 367,
  curCount: 25,
  footer: '今日异常审核单'
 },
 {
  title: '异常入库单',
  count: 367,
  curCount: 25,
  footer: '今日异常审核单'
 },
 {
  title: '异常运输单',
  count: 367,
  curCount: 25,
  footer: '今日异常审核单'
 }
])

const date = ref('')
</script>

<style scoped lang="scss">
.center {
 margin-top: 1rem;
 display: flex;

 .left {
  margin-right: .5rem;
  flex: 3;
 }

 .right {
  margin-left: .5rem;
  flex: 1;
  background-color: #fff;
  border-radius: 3px;
 }

 .right-box {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-center {
   flex: 1;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   font-size: 1.25rem;

   .count {
    font-size: 2.5rem;
    font-weight: 700;
    color: #6226f5;
   }
  }
 }
}

.bottom {
 margin-top: 1rem;
 display: flex;
 height: 320px;

 &-left,
 &-center,
 &-right {
  background-color: #fff;
  padding: 1rem;
 }

 &-left {
  flex: 1;
  margin-right: .5rem;
  display: flex;
  flex-direction: column;
 }

 &-center {
  flex: 2;
  margin: 0 .5rem;
  display: flex;

  .center-1,
  .center-2 {
   flex: 1;
   display: flex;
   flex-direction: column;

   .delivered {
    flex: 1;
   }
  }

  .top-title {
   display: flex;
   align-items: center;
   font-size: 1.5rem;
  }
 }

 &-right {
  flex: 1;
  margin-left: .5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 }
}

.left-title {
 font-size: 1.5rem;
 display: flex;
 align-items: center;
}

.echart1 {
 flex: 1;
}

.right-box-center {
 flex: 1;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 font-size: 1.25rem;

 .count {
  font-size: 2.5rem;
  font-weight: 700;
  color: #6226f5;
 }
}
</style>
