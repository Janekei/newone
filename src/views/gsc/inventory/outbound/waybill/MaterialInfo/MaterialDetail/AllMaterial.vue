<template>
    <div>
        <TableK url="/gsc/outbound/goods/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true" @click-this-column="clickThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatDate(row.row.updateTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../../../components/SearchOutbound.vue'
// const props = defineProps({
//     transportStatus: {
//         type: Number,
//         default: 0
//     }
// })


const route = useRoute()
let id = route.query.id;
let formData = ref({
    // outboundId: id
    id
})

// const { t } = useI18n()
const tableOption = reactive([
    {
        prop: 'goodCode',
        label: '货品编码',
        width: '180'
    },
    {
        prop: 'goodsName',
        label: '货品名称',
        width: '180'
    },
    {
        prop: 'containerNumber',
        label: '集装箱号',
        width: '180'
    },
    {
        prop: 'bsWhName',
        label: '仓库名称',
        width: '180'
    },
    {
        prop: 'bsWhAddress',
        label: '仓库地址',
        width: '180'
    },
    {
        prop: 'goodsNumber',
        label: '数量',
        width: '120'
    },
    {
        prop: 'palletQuantity',
        label: '托盘数量',
        width: '180'
    },
    {
        prop: 'totalWeight',
        label: '重量',
        width: '180'
    },
    {
        prop: 'totalVolume',
        label: '体积',
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
        slotName: 'updateTime',
        width: '180'
    }
])
// 入库指令首页搜索框数据
const tableRef = ref()
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'goodCode',
        placeholder: '请输入货品编号',
        label: '货品编号：'
    },
    {
        type: 'input',
        field: 'goodsName',
        placeholder: '请输入货品名称',
        label: '货品名称：'
    }
])

// 搜索
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        // outboundId: id
        id
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
    console.log(id);
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
