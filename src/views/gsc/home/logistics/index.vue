<template>
 <div class="cards">
  <div class="card" v-for="item in list" :key="item.title">
   <div class="title">{{ item.title }}</div>
   <div class="count">{{ item.count }}</div>
   <div class="footer">
    <span>{{ item.footer }}</span>
    <span class="footer-count">{{ item.today }}</span>
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
import { ref, onMounted } from 'vue'
import CenterEcharts from './CenterEcharts/index.vue'
import BottomWarning from './BottomWarning/index.vue'
import { transportStatistics } from '@/api/logisticsInKenno/index'

const textList = [
 '运输需求',
 '运输任务',
 '运输订单',
 '运输调度',
 '运输预警'
]
const list = ref()
const getList = () => {
 transportStatistics({}).then((res: any) => {
  list.value = res.map((item, index) => {
   return {
    title: textList[index],
    count: item.count,
    today: item.today,
    footer: '今日运输需求'
   }
  })
 })
}

onMounted(() => {
 getList()
})
</script>
   
<style scoped lang="scss">
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
   font-size: 2rem;
   color: #1d84f2;
   font-weight: 700;
  }

  .footer {
   font-size: 1rem;
   display: flex;
   justify-content: space-between;

   .footer-count {
    font-size: 1.25rem;
    color: #f59f4d;
    font-weight: 700;
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