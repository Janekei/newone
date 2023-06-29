<template>
    <div>
        <TableK url="/jinko/gscwhstockpalletslog/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
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
        prop: 'bl',
        label: '提单号',
        width: '100'
    },
    {
        prop: 'goodsCode',
        label: '货品编码',
        width: '100'
    },
    {
        prop: 'goodsName',
        label: '货物名称',
        width: '100'
    },
    {
        prop: 'goodsCode',
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
        label: '出入库类型',
        width: '100'
    },
    {
        prop: 'goodsCode',
        label: '是否异常',
        width: '100'
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
