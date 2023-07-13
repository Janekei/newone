<template>
    <div>
        <TableK url="/jinko/fee/details/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { formatTime } from '@/utils'
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
        width: '160'
    },
    {
        prop: 'outStockTime',
        label: '出仓日期',
        width: '160'
    },
    {
        prop: 'feeTime',
        label: '费用生成时间',
        width: '160'
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
    },
    {
        prop: 'rental',
        label: '租赁费',
        width: '160'
    },
    {
        prop: 'customCharges',
        label: '报关费',
        width: '160'
    },
    {
        prop: 'specialRegulatoryVehicles',
        label: '特殊监管车辆',
        width: '160'
    },
    {
        prop: 'removalFee',
        label: '搬移费',
        width: '160'
    },
    {
        prop: 'managementExpense',
        label: '管理费',
        width: '160'
    },
    {
        prop: 'packingCharge',
        label: '打包费',
        width: '160'
    },
    {
        prop: 'totalExpense',
        label: '合计',
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
