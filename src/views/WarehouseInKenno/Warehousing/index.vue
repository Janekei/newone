<template>
 <Card title="入库指令">
  <template #card-body>
   <div class="process">
    <div class="process-item" v-for="(item, index) in processList" :key="item.processItem"
     :style="{ flex: index === 4 ? 'unset' : 1 }">
     <div class="round" :class="item.iconClassName">
      <div class="round-text">{{ item.processItem }}</div>
     </div>
     <div class="line-box" v-if="index !== 4">
      <div class="count">
       <span class="count-num">{{ item.count }}</span>
       <span class="count-text">{{ item.countText }}</span>

      </div>
      <div class="line"></div>
     </div>
    </div>
   </div>
  </template>
 </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import { reactive } from 'vue';

const processList = reactive([
 {
  iconClassName: 'qs',
  processItem: '起始港出发（ATB）',
  countText: '未到港',
  count: 12
 },
 {
  iconClassName: 'dd',
  processItem: '到达目的港（ATA）',
  countText: '未清关',
  count: 12
 },
 {
  iconClassName: 'qgz',
  processItem: '清关中',
  countText: '清关中',
  count: 12
 },
 {
  iconClassName: 'qgwc',
  processItem: '清关完成',
  countText: '清关完成',
  count: 12
 },
 {
  iconClassName: 'ruku',
  processItem: '海外仓入库',
  count: 12
 }
])
</script>

<style scoped lang="scss">
.process {
 display: flex;
 justify-content: center;
 padding: 0 2rem;
 margin-bottom: 1rem;

 &-item {
  display: flex;

  .round {
   position: relative;
   width: 3.75rem;
   height: 3.75rem;
   border-radius: 50%;
   text-align: center;
   background-color: #403fb9;

   &-text {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    white-space: nowrap;
   }
  }
 }
}

.line-box {
 display: flex;
 flex-direction: column;
 flex: 1;

 .count,
 .line {
  height: 50%;
 }

 .line {
  border-top: 1.5px solid #3b3ab7;
 }

 .count {
  border-bottom: 1.5px solid #3b3ab7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-num {
   color: red;
   font-weight: 700;
   font-size: 1.125rem;
  }

  &-text {
   margin-bottom: 0.75rem;
  }
 }
}

.qs {
 background: url(../../../assets/imgs/home/qs.png) no-repeat;
 background-size: 80%;
 background-position: center;
}

.dd {
 background: url(../../../assets/imgs/home/dd.png) no-repeat;
 background-size: 80%;
 background-position: center;
}

.qgz {
 background: url(../../../assets/imgs/home/qgz.png) no-repeat;
 background-size: 80%;
 background-position: center;
}

.qgwc {
 background: url(../../../assets/imgs/home/qgwc.png) no-repeat;
 background-size: 80%;
 background-position: center;
}

.ruku {
 background: url(../../../assets/imgs/home/ruku.png) no-repeat;
 background-size: 80%;
 background-position: center;
}
</style>
