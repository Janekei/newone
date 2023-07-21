<template>
    <div>
        <TableK url="/gsc/fee/details/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #inStockTime="{ row }">
                <span>{{ formatDate(row.row.inStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #outStockTime="{ row }">
                <span>{{ formatDate(row.row.outStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #feeTime="{ row }">
                <span>{{ formatDate(row.row.feeTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'


const formData = ref({

})
const tableOption = reactive([
    {
        prop: 'feeBillName',
        label: '账单名称',
        width: '160'
    },
    {
        prop: 'supplierName',
        label: '供应商',
        width: '160'
    },
    {
        prop: 'bsWhareaName',
        label: '仓库区域',
        width: '160'
    },
    {
        prop: 'bsWhName',
        label: '仓库名称',
        width: '160'
    },
    {
        prop: 'arkQty',
        label: '柜数',
        width: '160'
    },
    {
        prop: 'palletQty',
        label: '托盘数量',
        width: '160'
    },
    {
        prop: 'qty',
        label: '组片数量',
        width: '160'
    },
    {
        prop: 'inStockTime',
        label: '入仓日期',
        width: '160',
        slotName: 'inStockTime'
    },
    {
        prop: 'outStockTime',
        label: '出仓日期',
        width: '160',
        slotName: 'outStockTime'
    },
    {
        prop: 'feeTime',
        label: '费用生成时间',
        width: '160',
        slotName: 'feeTime'
    },
    {
        prop: 'cycleDay',
        label: '计费时间（天）',
        width: '160'
    },
    {
        prop: 'cycleWeek',
        label: '计费时间（周）',
        width: '160'
    },
    {
        prop: 'cycleMonth',
        label: '计费时间（月）',
        width: '160'
    }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {}
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

.link {
    margin-right: .625rem;
}
</style>
