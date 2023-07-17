<template>
    <div>
        <TableK url="/gsc/fee/summary/details/carrierPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :limit="true" @selectOneColumn="selectOneColumn" :editData="editTableData"
            :showIndex="true">
            <template #buttons>
                <SearchContent :id="selectId" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" />
            </template>
            <template #inStockTime="{ row }">
                <span>{{ formatDate(row.row.inStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #outStockTime="{ row }">
                <span>{{ formatDate(row.row.outStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #billStartDate="{ row }">
                <span>{{ formatDate(row.row.billStartDate, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #billEndDate="{ row }">
                <span>{{ formatDate(row.row.billEndDate, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #priceVariance="{ row }">
                <span>{{ Math.abs(row.row.price - row.row.supplierPrice) }}</span>
            </template>
            <!-- <template #status="{ row }">
                <DictTagK type="wh_fee_details_status" :value="row.row.status" />
            </template> -->
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatDate } from '@/utils/formatTime'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
import { getFeeItem } from '@/api/warehousebill/supplier/expensedetail'

const formData = ref({

})
const tableOption = ref([
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
    },
    // {
    //     prop: 'status',
    //     label: '状态',
    //     width: '160',
    //     slotName: 'stauts'
    // }
])

// 改写获取到的表格数据形式
const editTableData = (val) => {
    val.forEach((item) => {
        item.detailsList.forEach((element) => {
            item[`${element.itemCode}price`] = element.price
        })
    })
    return val
}

// 获取计费项
const getFeeList = async () => {
    const res = await getFeeItem({})
    res.forEach(item => {
        tableOption.value.push({
            prop: item.code + 'price',
            label: item.name,
            width: '160'
        })
    })
    addTotal()
}
// 增加合计列
const addTotal = async () => {
    tableOption.value.push({
        prop: 'total',
        label: '合计',
        width: '160'
    })
}

onBeforeMount(() => {
    getFeeList()
})

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

const selectId = ref()
const selectOneColumn = (row) => {
    selectId.value = undefined
    if (row) {
        selectId.value = row.id
    }
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
