<template>
  <div class="table-box">
    <RightClickCard style="background-color: #fff;">
      <slot name="buttons" :selectRow="selectAll"></slot>
      <!-- tableData.slice((page - 1) * limit, page * limit) -->
      <div class="table-header">
        <ElPopover placement="bottom" title="列排序" trigger="click">
          <template #reference>
            <ElIcon class="pointer" style="font-size: 20px;" title="列排序">
              <DCaret />
            </ElIcon>
          </template>
          <template #default>
            <ColumnSort :tableOption="tableOption" />
          </template>
        </ElPopover>
      </div>
      <ElTable :data="tableData" style="width: 100%" border v-loading="loading" element-loading-text="数据加载中" :size="size"
        ref="elTable" @selection-change="handleSelectionChange" @row-click="rowClick" @row-dblclick="rowDblclick"
        @row-contextmenu="rowContextmenu" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }">
        <ElTableColumn type="selection" width="55" v-if="showCheckBox" />
        <ElTableColumn label="序号" type="index" width="100" align="center" v-if="showIndex" />
        <ElTableColumn :show-overflow-tooltip="true" :prop="item.prop" :label="item.label" :width="item.width"
          v-for="(item, index) in tableOption" :key="index + 'a'">
          <template v-if="item.multiColoumn">
            <ElTableColumn v-for="(ele, idx) in item.multiColoumn" :prop="ele.prop" :label="ele.label" :width="ele.width"
              :key="idx + 'b'" />
          </template>
          <template #default="{ row }" v-if="item.slotName">
            <slot :name="item.slotName" :row="{ row }">{{ index }}</slot>
          </template>
        </ElTableColumn>
        <ElTableColumn type="expand" v-if="showExpand">
          <template #default="{ row }">
            <slot name="expand" :expandRow="row"></slot>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="150" v-if="showFixedOperation">
          <template #default="{ row }">
            <slot name="operation" :operateRow="row"></slot>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="pagination">
        <PaginationK @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
          :disabled="disabledPage" :firstPages="firstPages" :total="total" ref="pagination" :small="pageSmall" />
      </div>
    </RightClickCard>
  </div>
</template>
 
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { ElTable, ElTableColumn, ElIcon, ElPopover } from 'element-plus'
import { cloneDeep } from 'lodash-es'
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
  data: {
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
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  showExpand: {
    type: Boolean,
    default: false
  },
  showFixedOperation: {
    type: Boolean,
    default: false
  },
  staticData: {
    type: [Array, Object] as any,
    default: null
  },
  pageSmall: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: () => "total, sizes, prev, pager, next, jumper"
  }
})

const tableData = ref([])
const loading = ref(false)
const loaded = ref(false)
const total = ref(0)
const pageParams = reactive({
  pageNo: 1,
  pageSize: props.firstPages
})
const disabledPage = ref(false)

// 发送请求获取数据
const getData = () => {
  console.log(props.staticData, 122);

  if (props.staticData) {
    console.log(props.staticData, '125');
    const cloneTableData = cloneDeep(props.staticData)
    total.value = cloneTableData.length
    tableData.value = cloneTableData.slice((pageParams.pageNo - 1) * pageParams.pageSize, pageParams.pageNo * pageParams.pageSize)
    return
  }


  const { method, url, params, data } = props
  const parameter = Object.assign({}, pageParams, params)
  const datater = Object.assign({}, pageParams, data)

  loading.value = true
  loaded.value = false
  disabledPage.value = true
  request[method]({ url, params: parameter, data: datater }).then((res: any) => {
    // console.log(res, 111)
    tableData.value = res.list || res
    total.value = res.total
    loading.value = false
  }).catch(() => {
    loaded.value = true
    loading.value = false
  }).finally(() => {
    loaded.value = true
    loading.value = false
    disabledPage.value = false
  })
}

onMounted(() => {
  getData()
})

// 页码改变
const handleCurrentChange = (value: number) => {
  pageParams.pageNo = value

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
  pageParams.pageNo = 1
  pageParams.pageSize = props.firstPages
  // 刷新分页器
  pagination.value.refreshView(pageParams.pageSize)
  getData()
}

// 选中项
const elTable = ref()
const selectAll = ref([])
const emits = defineEmits(['clickThisColumn', 'selectThisColumn'])
const handleSelectionChange = (rows) => {
  selectAll.value = rows
  emits('selectThisColumn', rows)
}
const rowClick = (row) => {
  emits('clickThisColumn', row)
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
  padding: 8px 0;
  // padding: 1rem;
}
</style>
