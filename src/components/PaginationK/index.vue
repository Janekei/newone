<template>
 <ElPagination v-model:current-page="pageIndex" v-model:page-size="pageSize" :page-sizes="pageSizes" :small="small"
  :disabled="disabled" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
  @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
import { ElPagination } from 'element-plus'

const props = defineProps({
 pageSizes: {
  type: Array as any,
  default: () => [10, 20, 30, 50, 100]
 },
 small: {
  type: Boolean,
  default: false
 },
 disabled: {
  type: Boolean,
  default: false
 },
 firstPages: {
  type: Number,
  default: 10
 }
})
const emits = defineEmits(['handleCurrentChange', 'handleSizeChange'])

const pageIndex = ref(1)
const pageSize = ref(props.firstPages)
const total = ref(400)

// 当前页码改变
const handleCurrentChange = (value: number) => {
 emits('handleCurrentChange', value)
}

// 每页条数改变
const handleSizeChange = (value: number) => {
 emits('handleSizeChange', value)
}

// 刷新方法
const refreshView = (page: number) => {
 pageSize.value = page
 pageIndex.value = 1
}

defineExpose({
 refreshView
})
</script>

<style scoped lang="less"></style>
