<template>
 <div class="center-echarts">
  <div class="list-s">
   <div class="list-i">
    <List title="超期运单">
     <template #seeMore>
      <div class="flex" @click="goNewPage">
       <span> {{ list1.length }}票</span>
       <ElIcon>
        <DArrowRight />
       </ElIcon>
      </div>
     </template>
     <div class="row-item" v-for="item in  list1 " :key="item.name">
      <div class="row-item-left">
       <span class="icon" :style="{ 'background-color': getRandomColor() }"></span>
       <span>{{ item.name }}</span>
      </div>
      <div class="row-item-right">{{ item.count }}</div>
     </div>
    </List>
   </div>
   <div class="list-i">
    <List title="船期变动">
     <template #seeMore>
      <div class="flex">
       <span> {{ list2.length }}票</span>
       <ElIcon>
        <DArrowRight />
       </ElIcon>
      </div>
     </template>
     <div class="row-item-1" v-for="(item, index) in  list2" :key="index + 'a'">
      <div class="row-item-left" :style="{ background: item.name === 'ETD' ? '#96d5e8' : '#a5a4e6' }">
       <span>{{ item.name }}</span>
      </div>
      <div class="row-item-right">{{ item.count }}</div>
     </div>
    </List>
   </div>
   <div class="list-i">
    <!-- 晶科咨询 -->
    <SeekAdviceFrom />
   </div>
  </div>
 </div>
</template>
 
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElIcon } from 'element-plus'
import List from '../Components/List.vue'
import { getRandomColor } from '@/utils/color'
import SeekAdviceFrom from './seekAdviceFrom.vue'

const router = useRouter()

const list1 = reactive([
 {
  name: '欧洲区',
  count: '68%'
 },
 {
  name: '马来西亚',
  count: '68%'
 },
 {
  name: '意大利',
  count: '68%'
 },
 {
  name: '罗马',
  count: '68%'
 },
 {
  name: '上海',
  count: '68%'
 },
 {
  name: '北美',
  count: '68%'
 },
])
const list2 = reactive([
 {
  name: 'ETD',
  count: 'vue3项目打包附带混淆js'
 },
 {
  name: 'ETD',
  count: 'vue3项目打包附带混淆js'
 },
 {
  name: 'ETD',
  count: 'vue3项目打包附带混淆js'
 },
 {
  name: 'ETA',
  count: 'vue3项目打包附带混淆js'
 },
 {
  name: 'ETA',
  count: 'vue3项目打包附带混淆js'
 },
 {
  name: 'ETA',
  count: 'vue3项目打包附带混淆js'
 },
])

const goNewPage = () => {
 const url = router.resolve({
  path: '/transportbi-!3'
 })
 window.open(url.href, '_blank');
}
</script>

<style scoped lang="scss">
.flex {
 display: flex;
 align-items: center;
 color: #f5a300;
 font-size: 1.5rem;
}

.title {
 border-radius: .5rem;
 background-color: #eec3c3;
 padding: .625rem;
 width: 15%;
 font-size: 1.25rem;
}

.list-s {
 margin-top: 1rem;
 display: flex;
 height: 280px;

 .list-i {
  flex: 1;
  margin: 0 .5rem;
  background-color: #fff;
  height: 100%;

  .list-it {
   height: 100%;
  }
 }

 .list-i:first-child {
  margin: 0 .5rem 0 0;
 }

 .list-i:last-child {
  margin: 0 0 0 .5rem;
 }
}

.row-item {
 display: flex;
 font-size: .875rem;
 padding: .1875rem .375rem;
 background-color: #f2f2f2;
 border-radius: .5rem;
 margin-top: .5rem;

 &-left {
  flex: 1;
  display: flex;
  align-items: center;
 }

 &-right {
  flex: 2;
  text-align: center;
 }
}

.icon {
 width: 1rem;
 height: 1rem;
 border-radius: 50%;
 margin-right: 1.25rem;
}

.row-item-1 {
 display: flex;
 font-size: 0.875rem;
 padding: 0.1875rem 0.375rem;
 border-radius: 0.5rem;
 margin-top: 0.5rem;

 .row-item-left {
  padding: 0 .8rem;
  background-color: pink;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: .5rem;
  color: #fff;
 }

 .row-item-right {
  flex: 3;
 }
}
</style>
