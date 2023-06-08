<template>
 <div class="table-box">
  <div class="table-header">
   <ElPopover placement="bottom" title="列排序" trigger="click">
    <template #reference>
     <ElIcon class="pointer">
      <Tools />
     </ElIcon>
    </template>
    <template #default>
     <ColumnSort :tableOption="tableOption" />
    </template>
   </ElPopover>
  </div>
 </div>
 <RightClickCard style="background-color: #fff;">
  <ElTable :data="tableData" style="width: 100%" border v-loading="loading" element-loading-text="数据加载中" :size="size"
   ref="elTable" @selection-change="handleSelectionChange" @row-click="rowClick" @row-dblclick="rowDblclick"
   @row-contextmenu="rowContextmenu">
   <ElTableColumn type="expand">
    <template #default="props">
     {{ props.row }}
    </template>
   </ElTableColumn>
   <ElTableColumn type="selection" width="55" v-if="showCheckBox" />
   <ElTableColumn :prop="item.prop" :label="item.label" :width="item.width" v-for="(item, index) in tableOption"
    :key="index + 'a'">
    <template #default="{ row }" v-if="item.slotName">
     <slot :name="item.slotName" :row="{ row }"></slot>
    </template>
   </ElTableColumn>
  </ElTable>
  <div class="pagination">
   <PaginationK @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :disabled="disabledPage"
    :firstPages="firstPages" ref="pagination" />
  </div>
 </RightClickCard>
</template>
 
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { ElTable, ElTableColumn, ElIcon, ElPopover } from 'element-plus'
import PaginationK from '@/components/PaginationK/index.vue'
import ColumnSort from '@/components/TableK/Components/ColumnSort.vue'
import RightClickCard from '@/components/TableK/Components/RightClickCard.vue'
import request from '@/config/axios'

const props = defineProps({
 method: {
  type: String,
  default: 'get'
 },
 url: {
  type: String,
  default: ''
 },
 params: {
  type: Object as any,
  default: () => ({})
 },
 firstPages: {
  type: Number,
  default: 10
 },
 size: {
  type: String as any,
  default: 'default'
 },
 tableOption: {
  type: Array as any,
  default: () => []
 },
 showCheckBox: {
  type: Boolean,
  default: true
 }
})

const tableData = ref([])
const loading = ref(false)
const loaded = ref(false)
const pageParams = reactive({
 pageIndex: 1,
 pageSize: props.firstPages
})
const disabledPage = ref(false)

// 发送请求获取数据
const getData = () => {
 const { method, url, params } = props
 const parameter = Object.assign(pageParams, params)
 loading.value = true
 loaded.value = false
 disabledPage.value = true
 request[method]({ url, parameter }).then((res: any) => {
  res.list =
   tableData.value = res.list
  loading.value = false
 }).catch(() => {
  loaded.value = true
  loading.value = false
 }).finally(() => {
  loaded.value = true
  loading.value = false
  disabledPage.value = false
  tableData.value = [
   {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
   },
   {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
   },
   {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
   },
   {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
   },
  ]
 })
}

onMounted(() => {
 getData()
})

// 页码改变
const handleCurrentChange = (value: number) => {
 pageParams.pageIndex = value
 getData()
}

// 每页条数改变
const handleSizeChange = (value: number) => {
 pageParams.pageSize = value
 getData()
}

// 刷新方法
const pagination = ref()
const refresh = () => {
 pageParams.pageIndex = 1
 pageParams.pageSize = props.firstPages
 // 刷新分页器
 pagination.value.refreshView(pageParams.pageSize)
 getData()
}

// 选中项
const elTable = ref()
const selectAll = ref([])
const handleSelectionChange = (rows) => {
 selectAll.value = rows
}
const rowClick = (row) => {
 elTable.value!.toggleRowSelection(row, undefined)
}
const rowDblclick = (row) => {
 elTable.value!.clearSelection()
 elTable.value!.toggleRowSelection(row, undefined)
}

// 鼠标右击面板
const rowContextmenu = (row, column, event) => {
 console.log(row, column, event);
}

defineExpose({
 refresh,
 selectAll
})
</script>

<style scoped lang="scss">
.table-box {
 background-color: #fff;


}

.pagination {
 display: flex;
 justify-content: end;
 margin-top: 1rem;
 background-color: #fff;
 padding-bottom: 1rem;
}

.table-header {
 display: flex;
 justify-content: end;
 padding: 1rem;
}
</style>
