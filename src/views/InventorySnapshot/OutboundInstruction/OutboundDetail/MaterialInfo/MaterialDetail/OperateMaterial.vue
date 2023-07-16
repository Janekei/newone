<template>
    <div>
        <TableK url="/gsc/outbound/goods/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showIndex="true" @selectThisColumn="selectThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #operation="{ operateRow }">
                <ElButton class="edit-btn" type="warning" @click="clickTray(operateRow)">选托</ElButton>
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
            </template>
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backWaybill">返回</el-button>
        <el-button class="button" type="primary" @click="open">确认拣货</el-button>
    </div>
    <DialogOutbound ref="refDialog" :ids="ids" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../../../components/SearchOutbound.vue'
import DialogOutbound from '../../../components/DialogOutbound.vue'
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
        prop: 'bsWhId',
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
        width: '180'
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
const emits = defineEmits(['backWaybill', 'showTrayList'])
const clickTray = (row) => {
    emits('showTrayList', row.goodsId, row.id)
}
const backWaybill = () => {
    emits('backWaybill')
}

// 多选行
let ids: any = ref([]);
const selectThisColumn = (rows) => {
    ids.value = []
    rows.forEach((item) => {
        ids.value.push(item.id)
    })
}

// 确认拣货
const refDialog = ref()
const open = () => {
    if (ids.value.length === 0) {
        ElMessage.error('请选择行！')
    } else {
        refDialog.value.open('箱拣货', '确认拣货', '您确定要拣货吗？')
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
