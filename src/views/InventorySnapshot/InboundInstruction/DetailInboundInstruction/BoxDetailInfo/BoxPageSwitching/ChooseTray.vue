<template>
    <TableK url="/jinko/gscwhinboundpallets/page" method="get" :params="formData" ref="tableRef" :firstPages="20"
        :tableOption="tableOption" :showCheckBox="true" @selectThisColumn="selectThisColumn">
        <template #createTime="{ row }">
            <span>{{ formatTime(row.row.createTime, 'yyyy-MM-dd') }}</span>
        </template>
        <template #updateTime="{ row }">
            <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
        </template>
        <template #buttons>
            <SearchContent :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData" />
        </template>
    </TableK>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backPartInbound">返回</el-button>
        <el-button v-if="props.isClickPartInboundBtn" class="button" type="primary" @click="partInbound">确认入库</el-button>
        <el-button v-else-if="props.isClickErrorBtn" class="button" type="primary" @click="errorRecord">异常登记</el-button>
    </div>
    <DialogInbound :inboundIdsBox="inboundIdsBox" ref="refDialog" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';
import SearchContent from '../../../components/SearchContent.vue';
const props = defineProps({
    iscloseTray: {
        type: Boolean,
        default: true
    },
    isClickPartInboundBtn: {
        type: Boolean,
        default: false
    },
    isClickErrorBtn: {
        type: Boolean,
        default: false
    },
    containerId: {
        type: Number,
        default: 0
    },
    searchData: {
        type: Object,
        default: () => { }
    }
})

// 保存当前行的id
let inboundIdsBox: any = ref([]);
const selectThisColumn = (rows) => {
    inboundIdsBox.value = []
    rows.forEach((item) => {
        inboundIdsBox.value.push(item.id)
    })
}

// 搜索
const formData = ref({
    containerId: props.containerId
})
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
        containerId: props.containerId
    }
    await Object.assign(formData.value, val)
}
// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}



// ref弹窗
const refDialog = ref()

// 确认整批入库
const partInbound = () => {
    if (inboundIdsBox.value.length > 0) {
        refDialog.value.open('托部分入库', '消息', '您确定要入库？')
    } else {
        ElMessage.error('请选择所需要入库的托！')
    }
}

// 确认异常登记
const errorRecord = () => {
    if (inboundIdsBox.value.length > 0) {
        refDialog.value.open('异常登记', '异常类型确认', '托')
    } else {
        ElMessage.error('请选择所需要异常登记的托！')
    }
}

// 返回部分入库箱维度详情页面
const emits = defineEmits(['update:changeCloseTray'])
const backPartInbound = () => {
    const params = !props.iscloseTray
    emits('update:changeCloseTray', params)
}
// table表格列数据
const tableOption = reactive([
    {
        prop: 'palletNo',
        label: '托盘号',
        width: '180'
    },
    {
        prop: 'qty',
        label: '数量',
        width: '180'
    },
    {
        prop: 'specifications',
        label: '规格',
        width: '180'
    },
    {
        prop: 'material',
        label: '材料',
        width: '180'
    },
    {
        prop: 'weight',
        label: '重量',
        width: '180'
    },
    {
        prop: 'volume',
        label: '体积',
        width: '180'
    },
    {
        prop: 'creator',
        label: '创建人',
        width: '180'
    },
    {
        prop: 'createTime',
        label: '创建时间',
        slotName: 'createTime',
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
    background-color: #67C23A;
    border: none;
}
</style>
