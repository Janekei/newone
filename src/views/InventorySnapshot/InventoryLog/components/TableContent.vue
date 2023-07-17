<template>
    <div>
        <TableK url="/gsc/stock/palletslog/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
          <template #boundType="{ row }">
            <span>{{ row.row.boundType == 1 ? '入库':'出库' }}</span>
          </template>
          <template #exception="{ row }">
            <span>{{ row.row.exception ? '是':'否' }}</span>
          </template>
          <template #createTime="{ row }">
            <span>{{ formatTime(row.row.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>
          </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
import { formatTime } from '@/utils'
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
        prop: 'bl',
        label: '提单号',
        width: '100'
    },
    {
        prop: 'goodsCode',
        label: '物料编码',
        width: '100'
    },
    {
        prop: 'goodsName',
        label: '物料名称',
        width: '100'
    },
    {
        prop: 'containerNo',
        label: '柜号',
        width: '100'
    },
    {
        prop: 'palletNo',
        label: '托盘号',
        width: '100'
    },
    {
        prop: 'goodsType',
        label: '规格型号',
        width: '100'
    },
    {
        prop: 'bsWhareaName',
        label: '区域',
        width: '100'
    },
    {
        prop: 'bsWhAddress',
        label: '仓库地址',
        width: '100'
    },
    {
        prop: 'oldPalletsNumber',
        label: '期初数量',
        width: '100'
    },
    {
        prop: 'palletsNumber',
        label: '当前数量',
        width: '100'
    },
    {
        prop: 'newPalletsNumber',
        label: '期末数量',
        width: '100'
    },
    {
        prop: 'boundType',
        slotName:'boundType',
        label: '出入库类型',
        width: '100'
    },
    {
        prop: 'exception',
        label: '是否异常',
        slotName: 'exception',
        width: '100'
    },
    {
      prop: 'createTime',
      label: '操作时间',
      slotName: 'createTime',
      width: '180'
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
