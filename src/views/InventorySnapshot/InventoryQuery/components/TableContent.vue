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
      <template #actTime="{ row }">
        <span>{{ formatTime(row.row.actTime, 'yyyy-MM-dd') }}</span>
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
  code: {
    type: String,
    default: ''
  }
})

const formData = ref({
  code: props.code
})
const tableOption = reactive([
  {
    prop: 'goodsCode',
    label: '货品编码',
  },
  {
    prop: 'goodsName',
    label: '货物名称',
  },
  {
    prop: 'goodsCode',
    label: '规格型号',
  },
  {
    prop: 'bsWhareaName',
    label: '区域',
  },
  {
    prop: 'Whaddress',
    label: '仓库地址',
  },
  {
    prop: 'actInTime',
    label: '入库时间',
    slotName: 'actInTime'
  },
  {
    prop: 'liveTime',
    label: '在库时间',
    slotName: 'liveTime'
  },
  {
    prop: 'totalCount',
    label: '托盘数量',
  },
  {
    prop: 'totalMegawatt',
    label: '瓦数',
  },
  {
    prop: 'updater',
    label: '更新人'
  },
  {
    prop: 'updateTime',
    label: '更新时间'
  }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
  refresh()
}
const updateSearchData = (val) => {
  formData.value = {
    code: props.code
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
