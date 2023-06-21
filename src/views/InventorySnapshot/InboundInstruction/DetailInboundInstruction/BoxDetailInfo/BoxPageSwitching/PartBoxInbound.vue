<template>
    <div class="table">
        <TableK class="pagination" url="/jinko/inbound-container/page" method="get" :params="formData" ref="tableRef"
            :showIndex="true" :showFixedOperation="true" :firstPages="10" :tableOption="tableOption"
            @selectThisColumn="selectThisColumn" @clickThisColumn="clickThisColumn">
            <template #createTime="{ row }">
                <span>{{ formatTime(row.row.estInTime, 'yyyy-MM-dd') }}</span>
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatTime(row.row.estInTime, 'yyyy-MM-dd') }}</span>
            </template>
            <template #buttons>
                <SearchContent :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData" />
            </template>
            <template #operation>
                <ElButton class="edit-btn" type="warning" @click="clickTray">托</ElButton>
            </template>
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="back">返回</el-button>
        <el-button class="button" type="primary" @click="partInbound">确认入库</el-button>
    </div>
    <DialogInbound :inboundIdsBox="inboundIdsBox" ref="refDialog" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchContent from '../../../components/SearchContent.vue';
import DialogInbound from '../../../components/DialogInbound.vue';
const props = defineProps({
    inboundId: {
        type: Number,
        default: 1
    }
})
// table表格列数据
const formData = ref({
    inboundId: props.inboundId
})
const tableOption = reactive([
    {
        prop: 'cabinetTypeNo',
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
    },
    {
        prop: 'updater',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
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
const updateSearchData = async (val) => {
    formData.value = {
        inboundId: props.inboundId
    }
    await Object.assign(formData.value, val)
}
// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}


// 选中当前行
// 保存当前行的id
let inboundIdsBox: any = ref([]);
const selectThisColumn = (rows) => {
    inboundIdsBox.value = []
    rows.forEach((item) => {
        inboundIdsBox.value.push(item.id)
    })
}

// ref弹窗
const refDialog = ref()

// 确认部分入库
const partInbound = () => {
    if (inboundIdsBox.value.length > 0) {
        refDialog.value.open('箱部分入库', '消息', '您确定要入库？')
    } else {
        ElMessage.error('请选择所需要入库的箱！')
    }
}

const emits = defineEmits(['backWaybill', 'showTrayList'])

const clickThisColumn = (row) => {
    emits('showTrayList', row.id)
}
// 选托
const clickTray = () => {
    // 
}

// 返回运单信息
const back = () => {
    emits('backWaybill')
}
</script>
<style lang="scss" scoped>
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
