<template>
    <div>
        <TableK url="/jinko/gscwhstockpallets/escPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
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


const formData = ref({})
const tableOption = reactive([
    {
        prop: 'bl',
        label: '提单号',
        width: '180'
    },
    {
        prop: 'goodsCode',
        label: '货品编码',
        width: '180'
    },
    {
        prop: 'goodsName',
        label: '货物名称',
        width: '180'
    },
    {
        prop: 'goodsCode',
        label: '规格型号',
        width: '180'
    },
    {
        prop: 'bsWhareaName',
        label: '区域',
        width: '180'
    },
    {
        prop: 'Whaddress',
        label: '仓库地址',
        width: '180'
    },
    {
        prop: 'actInTime',
        label: '入库时间',
        slotName: 'actInTime',
        width: '180'
    },
    {
        prop: 'liveTime',
        label: '在库时间',
        slotName: 'liveTime',
        width: '180'
    },
    {
        prop: 'totalCount',
        label: '托盘数量',
        width: '180'
    },
    {
        prop: 'totalMegawatt',
        label: '瓦数',
        width: '180'
    },
    {
        prop: 'totalMegawatt',
        label: '异常类型',
        width: '180'
    },
    {
        prop: 'totalMegawatt',
        label: '库存状态',
        width: '180'
    },
    {
        prop: 'updater',
        label: '更新人',
        width: '180'
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        width: '180'
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
