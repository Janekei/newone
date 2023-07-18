<template>
    <div>
        <TableK url="/gsc/inbound/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showIndex="true" :showExpand="true" @select-this-column="selectRow"
            @click-this-column="clickThisColumn" :selectionPosition="'left'">
            <template #buttons>
                <SearchContent :isShowAllot="true" :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" @allotWshouse="allotWshouse" />
            </template>
            <template #expand="{ expandRow }" >
                <DescriptionInboundList :descList="expandRow" />
            </template>
            <template #estInTime="{ row }">
                <span>{{ formatDate(row.row.estInTime , 'YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
            <template #eta="{ row }">
                <span>{{ formatDate(row.row.eta , 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #atd="{ row }">
                <span>{{ formatDate(row.row.atd , 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #status="{ row }">
              <span v-if="row.row.status == 0">未入库</span>
              <span v-else-if="row.row.status == 1">部分入库</span>
              <span v-else-if="row.row.status == 2">已入库</span>
            </template>
            <template #transportStatus="{ row }">
                <!-- {{ row.row.transportStatus }} -->
                <!-- <span v-if="row.row.transportStatus == 1">{{ row.row.transportStatus }}2</span> -->
                <span v-if="row.row.transportStatus == 1">未到港</span>
                <span v-else-if="row.row.transportStatus == 2">未清关</span>
                <span v-else-if="row.row.transportStatus == 3">清关中</span>
                <span v-else-if="row.row.transportStatus == 4">清关完成</span>
            </template>
        </TableK>
    </div>
    <DialogAllotWharehouse ref="refDialog" :ids="ids" @success="refresh" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import TableK from '@/components/TableK/index.vue'
import SearchContent from '../components/SearchContent.vue'
import DescriptionInboundList from './DescriptionInboundList.vue';
import DialogAllotWharehouse from './DialogAllotWharehouse.vue'
import {formatDate} from "@/utils/formatTime";

const props = defineProps({
    transportStatus: {
        type: Number,
        default: undefined
    }
})
let transportStatus = props.transportStatus === 0 ? undefined : props.transportStatus
let formData = ref({
    transportStatus: transportStatus
})

// const { t } = useI18n()
const router = useRouter()
const tableOption = reactive([
    {
        prop: 'sapDn',
        label: '入库指令单号',
        width: '180'
    },
    {
        prop: 'sapId',
        label: 'SAP运输计划ID',
        width: '180'
    },
    {
        prop: 'bl',
        label: '提单号',
        width: '180'
    },
    {
        prop: 'deliveryNo',
        label: '交货单号',
        width: '180'
    },
    {
      prop: 'bsWhName',
      label: '仓库名称',
      width: '100'
    },
    {
      prop: 'status',
      label: '状态',
      slotName: 'status',
      width: '100'
    },
    {
      prop: 'totalBox',
      label: '柜数',
      width: '100'
    },
    {
        prop: 'estInTime',
        label: '预计入库时间',
        slotName: 'estInTime',
        width: '180'
    },
    {
        prop: 'eta',
        label: '预计到港时间',
        slotName: 'eta',
        width: '180'
    },
    {
        prop: 'atd',
        label: '实际离港时间',
        slotName: 'atd',
        width: '180'
    },
    {
        prop: 'tradeWay',
        label: '贸易条款',
        width: '160'
    },
    {
        prop: 'transportStatus',
        label: '状态',
        slotName: 'transportStatus',
        width: '100'
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
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        transportStatus: transportStatus
    }
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}

// 获得选中行id
let ids: any = ref([])
const selectRow = (rows) => {
    ids.value = []
    rows.forEach(item => {
        ids.value.push(item.id)
    })
}

// 分配仓库
const refDialog = ref()
const allotWshouse = () => {
    if (ids.value.length > 0) {
        refDialog.value.open('分配仓库')
    } else {
        ElMessage.error('请选择行！')
    }

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
