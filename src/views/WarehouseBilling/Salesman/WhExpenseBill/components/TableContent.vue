<template>
    <div>
        <TableK url="/gsc/fee/summary/details/salesmanPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #inStockTime="{ row }">
                <span>{{ formatDate(row.row.inStockTime, 'YYYY-MM-DD hh:mm:ss') }}</span>
            </template>
            <template #outStockTime="{ row }">
                <span>{{ formatDate(row.row.outStockTime, 'YYYY-MM-DD hh:mm:ss') }}</span>
            </template>
            <template #billStartDate="{ row }">
                <span>{{ formatDate(row.row.billStartDate, 'YYYY-MM-DD hh:mm:ss') }}</span>
            </template>
            <template #billEndDate="{ row }">
                <span>{{ formatDate(row.row.billEndDate, 'YYYY-MM-DD hh:mm:ss') }}</span>
            </template>
            <template #priceVariance="{ row }">
                <span>{{ Math.abs(row.row.price - row.row.supplierPrice) }}</span>
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
        prop: 'billName',
        label: '账单名称',
        width: '160'
    },
    {
        prop: 'supplierName',
        label: '供应商',
        width: '160'
    },
    {
        prop: 'bsWhereaName',
        label: '仓库区域',
    },
    {
        prop: 'bsWhName',
        label: '仓库名称',
        width: '160'
    },
    {
        prop: 'totalBox',
        label: '原始集装箱号',
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
        prop: 'billStartDate',
        label: '账单起始日',
        width: '160',
        slotName: 'billStartDate'
    },
    {
        prop: 'billEndDate',
        label: '账单截止日',
        width: '160',
        slotName: 'billEndDate'
    },
    // {
    //     prop: 'totalPallet',
    //     label: '库存状态',
    //     width: '160'
    // },
    {
        prop: 'supplierPrice',
        label: '供应商账单',
        width: '160'
    },
    {
        prop: 'price',
        label: '系统账单',
        width: '160'
    },
    {
        prop: 'priceVariance',
        label: '费用差',
        width: '160',
        slotName: 'priceVariance'
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
