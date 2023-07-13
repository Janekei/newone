<template>
    <div>
        <TableK url="/jinko/fee/template/bill/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
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
        prop: 'name',
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
    },
    {
        prop: 'bsWhName',
        label: '账单生成日期',
        width: '160'
    },
    {
        prop: 'totalBox',
        label: '状态',
        width: '160'
    },
    {
        prop: 'totalPallet',
        label: '供应商总金额',
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
