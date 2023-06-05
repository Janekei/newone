<template>
 <div class="list-box">
  <div class="titles">
   <div>全部订单</div>
   <div>超期订单</div>
  </div>
  <div class="list">
   <div class="list-i" v-for="(item, index) in list" :key="item.title"
    :class="index === 6 ? 'end-of' : index === 5 ? 'end-of-2' : ''">
    <div class="title">
     {{ item.title }}
    </div>
    <div class="detail">
     <div class="detail-top">
      <div>运单：{{ item.a }}</div>
      <div>柜数：{{ item.b }}</div>
      <div>兆瓦：{{ item.c }}</div>
     </div>
     <div class="detail-bottom" style="color: #de4053;">
      <div>运单：{{ item.d }}</div>
      <div>柜数：{{ item.e }}</div>
      <div>兆瓦：{{ item.f }}</div>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
// import { reactive } from 'vue'

defineProps({
 list: {
  type: Array as any,
  default: () => [
   {
    title: '工厂至离港',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '离港至到港',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '提箱状态',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '直发客户',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '港口至仓库',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '仓库至客户',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
   {
    title: '合计',
    a: 23,
    b: 49,
    c: '1.2MW',
    d: 23,
    e: 49,
    f: '1.2MW'
   },
  ]
 }
})
</script>

<style scoped lang="scss">
.list-box {
 margin-top: 55px;
 display: flex;

 .titles {
  border-top-left-radius: .5em;
  border-bottom-left-radius: .5rem;
  background-color: #d3e4ee;
  height: 200px;
  padding-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-lr;

  div {
   flex: 1;
   text-align: center;
  }
 }

 .list {
  height: 200px;

  display: flex;
  flex: 1;

  &-i {
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   background-color: #d3e4ee;

   .title {
    position: absolute;
    top: -44px;
    padding: .3125rem 2.25rem;
    background-color: #e8e8e8;
   }
  }
 }
}

.detail {
 display: flex;
 flex-direction: column;
 height: 100%;

 .detail-top,
 .detail-bottom {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
   width: 100%;
  }
 }
}

.end-of {
 margin-left: 1rem;
 border-radius: .5rem;
}

.end-of-2 {
 border-top-right-radius: .5em;
 border-bottom-left-radius: .5rem;
}
</style>
