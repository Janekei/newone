<template>
 <div class="cards">
  <div class="card" v-for="item in list" :key="item.title">
   <div class="title">{{ item.title }}</div>
   <div class="count">{{ item.count }}</div>
   <div class="footer">
    <span>{{ item.footer }}</span>
    <span class="footer-count">{{ item.heute }}</span>
   </div>
  </div>
 </div>
 <div class="echarts">
  <CenterEcharts />
 </div>
 <div class="bottom">
  <BottomWarning />
 </div>
</template>
 
<script lang="ts" setup>
import { reactive } from 'vue'
import CenterEcharts from './CenterEcharts/index.vue'
import BottomWarning from './BottomWarning/index.vue'

const list = reactive([
 {
  title: '运输需求',
  count: 234,
  footer: '今日运输需求',
  heute: 23
 },
 {
  title: '运输任务',
  count: 234,
  footer: '今日运输需求',
  heute: 23
 },
 {
  title: '运输订单',
  count: 234,
  footer: '今日运输需求',
  heute: 23
 },
 {
  title: '运输调度',
  count: 234,
  footer: '今日运输需求',
  heute: 23
 },
 {
  title: '运输预警',
  count: 234,
  footer: '待处理预警信息',
  heute: 23
 },
])
</script>

<style scoped lang="less">
.cards {
 display: flex;

 .card {
  flex: 1;
  margin: 0 .5rem;
  border: 1px solid #2decb3;
  border-radius: .5rem;
  box-shadow: 3px 3px 10px #909090;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 9.375rem;

  .title {
   font-size: 1rem;
  }

  .count {
   font-size: 1.5rem
  }

  .footer {
   font-size: 1rem;
   display: flex;
   justify-content: space-between;

   .footer-count {
    font-size: 1.25rem;
   }
  }
 }

 .card:first-child {
  margin: 0 .5rem 0 0;
 }

 .card:last-child {
  margin: 0 0 0 .5rem;
  border-color: #dd2323;
 }
}

.echarts {
 margin-top: 1rem;
}

.bottom {
 margin-top: 1rem;
}
</style>
