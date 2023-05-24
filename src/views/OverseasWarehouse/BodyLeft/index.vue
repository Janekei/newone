
<template>
 <div class="flex">
  <div class="box-item" @dragover="dragover($event, 3)" @drop="drop(3)">
   <span style="font-size: 1rem" class="close" @click="close(3)" v-if="showEchart3">
    <el-icon>
     <circle-close />
    </el-icon>
   </span>
   <StorageCapacity v-if="showEchart3" />
   <Occupy fontSize="10.625rem" v-else :showBorderId="3" :showBorder="showBorder" />
  </div>
  <div class="box-item" @dragover="dragover($event, 4)" @drop="drop(4)">
   <span style="font-size: 1rem" class="close" @click="close(4)" v-if="showEchart4">
    <el-icon>
     <circle-close />
    </el-icon>
   </span>
   <Turnover v-if="showEchart4" />
   <Occupy fontSize="10.625rem" v-else :showBorderId="4" :showBorder="showBorder" />
  </div>
  <div class="box-item" @dragover="dragover($event, 5)" @drop="drop(5)">
   <span style="font-size: 1rem" class="close" @click="close(5)" v-if="showEchart5">
    <el-icon>
     <circle-close />
    </el-icon>
   </span>
   <StockAge v-if="showEchart5" />
   <Occupy fontSize="10.625rem" v-else :showBorderId="5" :showBorder="showBorder" />
  </div>
 </div>
</template>

<script setup lang="ts">
import Occupy from '@/views/OverseasWarehouse/Components/Occupy.vue'
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import StorageCapacity from './Components/StorageCapacity.vue'
import Turnover from './Components/Turnover.vue'
import StockAge from './Components/StockAge.vue'
const props = defineProps({
 echartIdList: {
  type: Array,
  default: () => []
 },
 showBorder: {
  type: Number
 }
})
const emit = defineEmits(['dragover', 'drop', 'close'])

const close = (id: number) => {
 emit('close', id)
}

const dragover = (e: any, id: number) => {
 emit('dragover', e, id)
}
const drop = (id: number) => {
 emit('drop', id)
}

const showEchart3 = computed(() => {
 return props.echartIdList.includes(3)
})
const showEchart4 = computed(() => {
 return props.echartIdList.includes(4)
})
const showEchart5 = computed(() => {
 return props.echartIdList.includes(5)
})
</script>

<style lang="less" scoped>
.flex {
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 height: 100%;

 .box-item {
  height: 32%;
  background-color: #fff;
  position: relative;

  .close {
   position: absolute;
   right: 0;
   cursor: pointer;
  }
 }
}
</style>