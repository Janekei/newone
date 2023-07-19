<template>
    <hr />
    <div>
        <TableK size="small" :pageSmall="true"
            :headerCellStyle="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }"
            url="/gsc/fee/bill/summary/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #inStockTime="{ row }">
                <span>{{ formatDate(row.row.inStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #outStockTime="{ row }">
                <span>{{ formatDate(row.row.outStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import TableK from '@/components/TableK/index.vue'
const props = defineProps({
    billId: {
        type: Number
    }
})

const formData = ref({ billId: props.billId })
const tableOption = reactive([
    {
        prop: 'bl',
        label: '提单号',
        width: '160'
    },
    {
        prop: 'bsWhName',
        label: '仓库名称'
    },
    {
        prop: 'bsWhereaName',
        label: '区域名称'
    },
    {
        prop: 'arkQty',
        label: '柜数',
        width: '160'
    },
    {
        prop: 'palletQty',
        label: '托盘数',
        width: '160'
    },
    {
        prop: 'qty',
        label: '片数',
        width: '160',
        slotName: 'billDate'
    },
    {
        prop: 'inStockTime',
        label: '入库时间',
        width: '160',
        slotName: 'inStockTime'
    },
    {
        prop: 'outStockTime',
        label: '出库时间',
        width: '160',
        slotName: 'outStockTime'
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
        prop: 'supplierName',
        label: '承运商',
        width: '160'
    },
    {
        prop: 'supplierPrice',
        label: '承运商费用',
        width: '160'
    },
    {
        prop: 'notes',
        label: '备注',
        width: '160'
    }
])

// 刷新列表
const tableRef = ref()
const refresh = () => {
    tableRef.value.refresh()
}

defineExpose({
    refresh
})



</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}

.link {
    margin-right: .625rem;
}
</style>
