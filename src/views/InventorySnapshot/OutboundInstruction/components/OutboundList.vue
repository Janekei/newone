<template>
    <div>
        <TableK url="/jinko/gsc-wh-outbound/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true" :showExpand="true"
            @click-this-column="clickThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #expand="{ expandRow }">
                <OutboundDescriptionItem :descList="expandRow" />
            </template>
            <template #transportStatus="{ row }">
                <span v-if="row.row.transportStatus === 1">未到港</span>
                <span v-if="row.row.transportStatus === 2">未清关</span>
                <span v-if="row.row.transportStatus === 3">清关中</span>
                <span v-if="row.row.transportStatus === 4">清关完成</span>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from './SearchOutbound.vue'
import OutboundDescriptionItem from './OutboundDescriptionItem.vue'
const props = defineProps({
    transportStatus: {
        type: Number,
        default: 0
    }
})
let formData = ref({
    transportStatus: props.transportStatus
})

// const { t } = useI18n()
const router = useRouter()
const tableOption = reactive([
    {
        prop: 'sapDn',
        label: 'SAP任务号',
    },
    {
        prop: 'bl',
        label: '提单号',
    },
    {
        prop: 'soNo',
        label: 'SO No',
    },
    {
        prop: 'estInTime',
        label: '交货单号',
    },
    {
        prop: 'eta',
        label: '发货方',
    },
    {
        prop: 'etd',
        label: '收货方',
    },
    {
        prop: 'tardeWayConfigWay',
        label: '贸易条款',
    },
    {
        prop: 'tardeWayConfigWay',
        label: '状态',
    }
])
// 入库指令首页搜索框数据
const tableRef = ref()
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'sapDn',
        placeholder: '请输入SAP任务号',
        label: 'SAP任务号'
    },
    {
        type: 'input',
        field: 'bl',
        placeholder: '交货单号',
        label: '请输入交货单号'
    }
])

// 搜索
let searchData = ref({})
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    searchData.value = val
}
const resetForm = () => {
    searchData.value = {}
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
