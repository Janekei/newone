<template>
    <div>
        <TableK url="/jinko/gsc-wh-inbound/page" method="get" :params="formData" ref="tableRef" :firstPages="20"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true" :showExpand="true"
            @click-this-column="clickThisColumn">
            <template #buttons>
                <SearchContent :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #expand="{ expandRow }">
                <DescriptionInboundList :descList="expandRow" />
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
import SearchContent from '../components/SearchContent.vue'
import DescriptionInboundList from './DescriptionInboundList.vue';
const props = defineProps({
    transportStatus: {
        type: Number,
        default: 0
    }
})
let formData = ref({
    transportStatus: props.transportStatus,
    status: 0
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
        prop: 'containerNumber',
        label: '柜量',
    },
    {
        prop: 'estInTime',
        label: '预计入库时间',
    },
    {
        prop: 'eta',
        label: '预计到港时间',
    },
    {
        prop: 'etd',
        label: '实际离港时间',
    },
    {
        prop: 'tardeWayConfigWay',
        label: '贸易条款',
    },
    {
        prop: 'transportStatus',
        label: '状态',
        soltName: 'transportStatus'
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
        type: 'date',
        field: 'estInTime',
        placeholder: '请选择预计入库时间',
        label: '预计入库时间'
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
    router.push({ path: '/InventorySnapshot/detailinboundinstruction', query: { id } })
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
