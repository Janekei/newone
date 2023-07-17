<template>
    <div>
        <TableK url="/gsc/fee/details/examineAdditionalPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :limit="true" @selectOneColumn="selectOneColumn" :showIndex="true">
            <template #buttons>
                <SearchContent :id="selectId" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" @success="refresh" />
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
            <template #voucherStatus="{ row }">
                <span class="statusText" v-if="row.row.voucherStatus">已上传</span>
                <span class="statusFText" v-else>未上传</span>
            </template>
            <template #status="{ row }">
                <DictTagK type="wh_fee_details_status" :value="row.row.status" />
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'


const formData = ref({})
const tableOption = reactive([
    {
        prop: 'feeBillName',
        label: '费用名称',
        width: '160'
    },
    {
        prop: 'bsWhareaName',
        label: '供应商',
        width: '160'
    },
    {
        prop: 'bl',
        label: '提单号',
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
        prop: 'bsWhType',
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
        prop: 'feeTime',
        label: '费用生成时间',
        width: '160',
        slotName: 'feeTime'
    },
    {
        prop: 'price',
        label: '金额',
        width: '160'
    },
    {
        prop: 'feeCyName',
        label: '币值',
        width: '160'
    },
    {
        prop: 'voucherStatus',
        label: '凭证',
        width: '160',
        slotName: 'voucherStatus'
    },
    {
        prop: 'notes',
        label: '备注',
        width: '160'
    },
    {
        prop: 'status',
        label: '状态',
        width: '160',
        slotName: 'status'
    }
])

const selectId = ref()
const selectOneColumn = (row) => {
    selectId.value = undefined
    if (row) {
        selectId.value = row.id
    }
    console.log(selectId.value, 999)
}

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

.statusText {
    color: #1d4fd8;
}

.statusFText {
    color: #e21717;
}

.link {
    margin-right: .625rem;
}
</style>
