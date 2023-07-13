<template>
    <div>
        <TableK url="/gsc/stock/pallets/escPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
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
            <template #exceptionType="{ row }">
                <DictTagK :type="dictType" :value="row.row.exceptionType" />
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatTime } from '@/utils'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
import DictTagK from '@/components/DictTagK/index.vue'

const dictType = ref('wh_inbound_exception')


const formData = ref({})
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
        prop: 'actInTime',
        label: '入库时间',
        slotName: 'actInTime',
        width: '100'
    },
    {
        prop: 'liveTime',
        label: '在库时间',
        slotName: 'liveTime',
        width: '100'
    },
    {
        prop: 'totalCount',
        label: '托盘数量',
        width: '100'
    },
    {
        prop: 'totalMegawatt',
        label: '瓦数',
        width: '100'
    },
    {
        prop: 'exceptionType',
        label: '异常类型',
        width: '100',
        slotName: 'exceptionType'
    },
    {
        prop: 'inventoryType',
        label: '库存状态',
        width: '100'
    },
    {
        prop: 'updater',
        label: '更新人',
        width: '100'
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        width: '100'
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
</style>
