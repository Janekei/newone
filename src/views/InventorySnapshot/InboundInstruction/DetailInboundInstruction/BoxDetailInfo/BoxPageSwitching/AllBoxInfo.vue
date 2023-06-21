<template>
    <TableK url="/jinko/inbound-container/page" method="get" :params="formData" ref="tableRef" :firstPages="20"
        :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
        <template #createTime="{ row }">
            <span>{{ formatTime(row.row.estInTime, 'yyyy-MM-dd') }}</span>
        </template>
        <template #updateTime="{ row }">
            <span>{{ formatTime(row.row.estInTime, 'yyyy-MM-dd') }}</span>
        </template>
        <template #buttons>
            <SearchContent :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData" />
        </template>
    </TableK>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils'
import { useRoute } from 'vue-router'
import TableK from '@/components/TableK/index.vue'
import SearchContent from '../../../components/SearchContent.vue';


// listItemId：入库指令列表传过来的参数
const route = useRoute()
let listItemId: number = parseInt(JSON.parse(route.query.id as any));
// table表格列数据
let formData = ref({
    id: listItemId
})
const tableOption = reactive([
    {
        prop: 'cabinetTypeId',
        label: '箱号',
    },
    {
        prop: 'bl',
        label: '提单号',
    },
    {
        prop: 'cabinetTypeName',
        label: '箱型',
    },
    {
        prop: 'lockNo',
        label: '锁号',
    },
    {
        prop: 'totalQuantity',
        label: '件数',
    },
    {
        prop: 'totalWeight',
        label: '重量',
    },
    {
        prop: 'totalVolumn',
        label: '体积',
    },
    {
        prop: 'creator',
        label: '创建人',
    },
    {
        prop: 'createTime',
        label: '创建时间',
        slotName: 'createTime'
    },
    {
        prop: 'updater',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        slotName: 'updateTime'
    }
])

// 搜索
const tableRef = ref()
const formOption = reactive([
    {
        type: 'input',
        field: 'containerNo',
        placeholder: '请填写箱号',
        label: '箱号'
    },
    {
        type: 'input',
        field: 'lockNo',
        placeholder: '请输入锁号',
        label: '锁号'
    }
])
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        id: listItemId
    }
    Object.assign(formData.value, val)
}
// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}
</script>
<style lang="scss" scoped></style>
