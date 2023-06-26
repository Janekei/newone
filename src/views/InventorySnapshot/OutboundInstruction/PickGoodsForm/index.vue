<template>
    <div>
        <TableK url="/jinko/gscwhoutboundpallets/getPalletsList" method="post" :layout="layout" :data="formData"
            ref="tableRef" :firstPages="10" :tableOption="tableOption" :showIndex="true"
            @selectThisColumn="selectThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
            </template>
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backWaybill">返回</el-button>
        <el-button class="button" type="primary" @click="open('绑定车辆')">绑定车辆</el-button>
        <el-button class="button" type="primary" @click="open('出库')">出库</el-button>
    </div>
    <DialogOutbound ref="refDialog" :outIds="outIds" @success="refresh" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../components/SearchOutbound.vue'
import DialogOutbound from '../components/DialogOutbound.vue'
const route = useRoute()
let id = route.query.outboundid;
let formData = ref({
    outboundId: id
    // id
})

// const { t } = useI18n()
const layout = ""
const tableOption = reactive([
    {
        prop: 'goodCode',
        label: '货品编码',
    },
    {
        prop: 'goodsName',
        label: '货品名称',
    },
    {
        prop: 'bl',
        label: '提单号',
    },
    {
        prop: 'bsWhId',
        label: '仓库名称',
    },
    {
        prop: 'bsWhAddress',
        label: '仓库地址',
    },
    {
        prop: 'goodsNumber',
        label: '数量',
    },
    {
        prop: 'palletQuantity',
        label: '托盘数量',
    },
    {
        prop: 'totalWeight',
        label: '重量',
    },
    {
        prop: 'totalVolume',
        label: '体积',
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
        outboundId: id
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
const emits = defineEmits(['backWaybill', 'showTrayList'])

const backWaybill = () => {
    emits('backWaybill')
}

// 多选行
let outIds: any = ref([]);
const selectThisColumn = (rows) => {
    outIds.value = []
    rows.forEach((item) => {
        outIds.value.push(item.id)
    })
}

// 确认拣货
const refDialog = ref()
let isShow = ref(false)
const open = (type) => {
    if (type === '出库') {
        isShow.value = true
        refDialog.value.open('出库', '确认出库', '您确认要出库吗')
    } else if (type === '绑定车辆') {
        isShow.value = true
        refDialog.value.open('绑定车辆', '绑定车辆', '您确认要绑定车辆吗')
    }

}

defineExpose({
    refresh
})
</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}

.box-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    width: 100%;
    margin: 1.25rem 0;

    .button {
        margin-right: 1.25rem;
    }
}

.edit-btn {
    font-weight: 700;
    border: none;
}
</style>
