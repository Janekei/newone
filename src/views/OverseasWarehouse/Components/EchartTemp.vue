
<template>
 <div class="form" :draggable="!showEchart1" @dragstart="dragstart(1)" @dragend="dragend">拖动我id === 1</div>
 <div class="form" :draggable="!showEchart2" @dragstart="dragstart(2)" @dragend="dragend">拖动我id === 2</div>
 <div class="form" :draggable="!showEchart3" @dragstart="dragstart(3)" @dragend="dragend">拖动我id === 3</div>
 <div class="form" :draggable="!showEchart4" @dragstart="dragstart(4)" @dragend="dragend">拖动我id === 4</div>
 <div class="form" :draggable="!showEchart5" @dragstart="dragstart(5)" @dragend="dragend">拖动我id === 5</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
const emit = defineEmits(['dragstart', 'dragend'])
const props = defineProps({
 echartIdList: {
  type: Array,
  default: () => []
 },
})

const dragstart = id => {
 emit('dragstart', id)
}
const dragend = () => {
 emit('dragend')
}
const showEchart1 = computed(() => {
 return props.echartIdList.includes(1)
})
const showEchart2 = computed(() => {
 return props.echartIdList.includes(2)
})
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
.form {
 background-color: pink;
}
</style>

 
import {defineEmits} from "vue"
 
const childValue = '我是子组件的值'
const emit = defineEmits(['exportValue'])
const exportValue = () =>{
    emit('exportValue',childValue)
}
 