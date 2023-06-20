<template>
    部分
    {{ formData }}
    <TableK class="pagination" url="/jinko/gsc-wh-inbound-container/page" method="get" :params="formData" :showIndex="true"
        :showFixedOperation="true" :firstPages="20" :tableOption="tableOption" @selectThisColumn="selectThisColumn"
        @clickThisColumn="clickThisColumn">
        <template #operation>
            <ElButton class="edit-btn" type="warning" @click="clickTray">托</ElButton>
        </template>
    </TableK>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="back">返回</el-button>
        <el-button class="button" type="primary" @click="partInbound">确认入库</el-button>
    </div>
    <DialogInbound :inboundIdsBox="inboundIdsBox" ref="refDialog" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';
// table表格列数据
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'boxNo',
        label: '箱号',
    },
    {
        prop: 'billNo',
        label: '提单号',
    },
    {
        prop: 'boxType',
        label: '箱型',
    },
    {
        prop: 'lockNo',
        label: '锁号',
    },
    {
        prop: 'boxNumber',
        label: '件数',
    },
    {
        prop: 'weight',
        label: '重量',
    },
    {
        prop: 'volumn',
        label: '体积',
    },
    {
        prop: 'createPeople',
        label: '创建人',
    },
    {
        prop: 'createTime',
        label: '创建时间',
    },
    {
        prop: 'updatePeople',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
    }
])

// 选中当前行
// 保存当前行的id
let inboundIdsBox: any = ref([]);
const selectThisColumn = (rows) => {
    inboundIdsBox.value = []
    rows.forEach((item) => {
        inboundIdsBox.value.push(item.inboundId)
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
