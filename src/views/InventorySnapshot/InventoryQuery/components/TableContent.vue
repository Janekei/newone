<template>
  <div>
    <TableK url="/jinko/gscwhstockpallets/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
      :tableOption="tableOption" :showCheckBox="false" :showIndex="true" :showExpand="true">
      <template #buttons>
        <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
      </template>
      <template #expand="{ expandRow }">
        <ExpandDescription :descList="expandRow" />
      </template>
      <template #actInTime="{ row }">
        <span>{{ formatTime(row.row.actInTime, 'yyyy-MM-dd') }}</span>
      </template>
      <template #liveTime="{ row }">
        <span>{{ formatTime(row.row.liveTime, 'yyyy-MM-dd') }}</span>
      </template>
    </TableK>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatTime } from '@/utils'
import ExpandDescription from './ExpandDescription.vue'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
const props = defineProps({
  stockStatus: {
    type: Number,
    default: 0
  }
})

let formData = ref({
  stockStatus: props.stockStatus
})
const tableOption = reactive([
  {
    prop: 'goodsCode',
    label: '物料编码',
    width: '280'
  },
  {
    prop: 'goodsName',
    label: '物料名称',
    width: '280'
  },
  {
    prop: 'type',
    label: '物料类型',
    width: '280'
  },
  {
    prop: 'bl',
    label: '提单号',
    width: '280'
  },
  {
    prop: 'containerNo',
    label: '集装箱号',
    width: '270'
  },
  {
    prop: 'totalCount',
    label: '托盘数量',
    width: '140'
  }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
  refresh()
}
const updateSearchData = (val) => {
  formData.value = {
    stockStatus: props.stockStatus
  }
  Object.assign(formData.value, val)
}
const resetForm = () => {
  refresh()
}


// 刷新列表
const refresh = () => {
  tableRef.value.refresh()
}


</script>
<style lang="scss" scoped>
.table {
  margin-top: .625rem;
}
</style>
