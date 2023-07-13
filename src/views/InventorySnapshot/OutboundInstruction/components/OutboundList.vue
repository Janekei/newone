<template>
    <div>
        <TableK url="/jinko/gscwhoutbound/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true" :showExpand="true"
            @click-this-column="clickThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #expand="{ expandRow }">
                <OutboundDescriptionItem :descList="expandRow" />
            </template>
            <template #status="{ row }">
                <DictTagK type="outbound_status" :value="row.row.status" />
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import TableK from '@/components/TableK/index.vue'
import DictTagK from '@/components/DictTagK/index.vue'
import SearchOutbound from './SearchOutbound.vue'
import OutboundDescriptionItem from './OutboundDescriptionItem.vue'
const props = defineProps({
    status: {
        type: Number,
        default: 0
    }
})
let status = props.status === 0 ? undefined : props.status
let formData = ref({
    status: status
})

// const { t } = useI18n()
const router = useRouter()
const tableOption = reactive([
    {
        prop: 'sapNo',
        label: '出库指令单号',
        width: '150'
    },
    {
        prop: 'sapId',
        label: 'SAP运输计划ID',
        width: '150'
    },
    {
        prop: 'bl',
        label: '提单号',
        width: '150'
    },
    {
        prop: 'deliveryNo',
        label: '交货单号',
        width: '150'
    },
    {
        prop: 'sapNo',
        label: '销售订单号',
        width: '150'
    },
    {
        prop: 'departureLocationName',
        label: '发货方',
        width: '140'
    },
    {
        prop: 'arrivalLocationName',
        label: '收货方',
        width: '140'
    },
    {
        prop: 'tradeWay',
        label: '贸易条款',
        width: '140'
    },
    {
        prop: 'status',
        label: '状态',
        slotName: 'status'
    }
])
// 入库指令首页搜索框数据
const tableRef = ref()
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'sapDn',
        placeholder: '请输入SAP任务号',
        label: 'SAP任务号：'
    },
    {
        type: 'input',
        field: 'bl',
        placeholder: '请输入交货单号',
        label: '交货单号：'
    }
])

// 搜索
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        status: status
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


//跳转对应行的详情页信息
const clickThisColumn = (row) => {
    // 获取当前行的id
    let id = row.id
    router.push({ path: '/InventorySnapshot/outbounddetail', query: { id } })
}

defineExpose({
    refresh
})
</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}
</style>
