<template>
 <div class="seek">
  <div class="title">
   <span>晶科咨询</span>
   <img src="../../../assets/imgs/jinko-logo.png" alt="" />
  </div>
  <div class="body">
   <vue3-seamless-scroll class="table tableH" :list="data_1" :hover="true" :step="0.5">
    <table class="w-full" cellpadding="5px">
     <tbody>
      <tr v-for="(item, index) in data_1" :key="index">
       <th>{{ item.v0 }}</th>
       <th>{{ item.v1 }}</th>
       <th>{{ item.v2 }}</th>
       <th>{{ item.v3 }}</th>
      </tr>
     </tbody>
    </table>
   </vue3-seamless-scroll>
  </div>
 </div>
</template>
 
<script lang="ts" setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

let data_1 = [{
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}, {
 v0: 1,
 v1: '湘C7Z9G0',
 v2: '16:12',
 v3: '30分钟'
}]
</script>

<style scoped lang="scss">
.seek {
 background-color: #fff;
 border: 1px solid #60ffcf;
 border-radius: 0.5rem;
 height: 100%;
 display: flex;
 flex-direction: column;

 .title,
 .body {
  padding: 1rem;

 }

 .title {
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: .5rem 1rem 0 1rem;
  color: #1da63b;
  font-weight: 700;
  height: 67px;

  img {
   transform: scale(0.8);
   transform-origin: 0 0;
   margin-left: 1rem;
  }
 }

 .body {
  height: calc(100% - 67px);
  overflow: hidden;
 }
}
</style>
