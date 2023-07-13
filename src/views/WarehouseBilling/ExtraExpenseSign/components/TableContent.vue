<template>
    <div>
        <TableK url="/gsc/fee/details/additionalPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption"  :showCheckBox="false" :showIndex="true">
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
        prop: 'feeBillName',
        label: '费用名称',
        width:'160'
    },
    {
        prop: 'supplierName',
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
        prop: 'price',
        label: '金额',
        width: '160'
    },
    {
        prop: 'bsWhType',
        label: '币值',
        width: '160'
    },
    {
        prop: 'voucherUrl',
        label: '凭证',
        width: '160'
    },
    {
        prop: 'bsWhType',
        label: '备注',
        width: '160'
    },
    {
        prop: 'status',
        label: '状态',
        width: '160'
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

.link {
    margin-right: .625rem;
}
</style>
