<template>
    <div>
        <TableK url="/gsc/outbound/goods/pallet/page" method="get" :params="formData" ref="tableRef"
            :layout="paginationLayout" :tableOption="tableOption" :showIndex="true" @click-this-column="clickThisColumn"
            @selectThisColumn="selectThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" />
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
            </template>
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backOperate">返回</el-button>
        <el-button class="button" type="primary" @click="open">确认拣货</el-button>
    </div>
    <DialogOutbound ref="refDialog" :ids="ids" :goodsId="props.id" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../../../components/SearchOutbound.vue'
import DialogOutbound from '../../../components/DialogOutbound.vue'
const props = defineProps({
    goodsId: {
        type: Number,
        default: 0
    },
    id: {
        type: String,
        default: () => ''
    },
    iscloseTray: {
        type: Boolean,
        default: false
    }
})
let formData = ref({
    goodsId: props.goodsId
})


// 分页样式
const paginationLayout = ""

// 返回部分入库箱维度详情页面
const emits = defineEmits(['update:changeCloseTray', 'backWaybill', 'showTrayList'])
const backOperate = () => {
    const params = !props.iscloseTray
    emits('update:changeCloseTray', params)
}

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
        prop: 'bl',
        label: '提单号',
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
const formOption = reactive([
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
        goodsId: props.goodsId
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

// 多选行
let ids: any = ref([]);
const selectThisColumn = (rows) => {
    ids.value = []
    console.log(rows, 'rows')
    rows.forEach((item) => {
        ids.value.push(item.id)
    })
}

const refDialog = ref()
const open = () => {
    if (ids.value.length === 0) {
        ElMessage.error('请选择行！')
    } else {
        refDialog.value.open('托拣货', '确认拣货', '您确定要拣货吗？')
    }
}


//跳转对应行的详情页信息
const clickThisColumn = (row) => {
    // 获取当前行的id
    emits('showTrayList', row.id)
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
    background-color: #67C23A;
    border: none;
}
</style>
