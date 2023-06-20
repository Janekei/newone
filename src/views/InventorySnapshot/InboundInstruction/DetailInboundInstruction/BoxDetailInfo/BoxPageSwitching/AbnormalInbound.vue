<template>
    异常
    <TableK url="/jinko/gsc-wh-inbound-container/page" method="get" :params="formData" :firstPages="20"
        :showFixedOperation="true" :showIndex="true" :tableOption="tableOption" @selectThisColumn="selectThisColumn">
        <template #operation="{ operateRow }">
            <ElButton class="edit-btn" type="warning" @click="clickTray(operateRow)">托</ElButton>
        </template>
    </TableK>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="back">返回</el-button>
        <el-button class="button" type="primary" @click="errorRecord">异常登记</el-button>
    </div>
    <DialogInbound v-if="flag" :inboundIdsBox="inboundIdsBox" ref="refDialog">
        <!-- <template #formError>
            {{ recordData }}
            <FormK :formOption="formOption" v-model:formState="recordData" labelWidth="6em" ref="formRef" />
        </template> -->
    </DialogInbound>
</template>

<script lang="ts" setup>
import { ElButton, ElMessage } from 'element-plus'
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';
// import FormK from '@/components/FormK/index.vue'

const props = defineProps({
    errorInboundID: {
        type: Number,
        default: 0
    }
})

// 保存当前行的id
let inboundIdsBox: any;
let flag = ref(false)
const selectThisColumn = (rows) => {
    inboundIdsBox = []
    rows.forEach((item) => {
        inboundIdsBox.push(item.inboundId)
    })
    if (inboundIdsBox.length > 0) {
        flag.value = true
    } else {
        flag.value = true
    }
}


// ref弹窗
const refDialog = ref()

// 确认异常登记
const errorRecord = () => {
    if (flag.value) {
        refDialog.value.open('异常类型确认', '异常类型确认')

    } else {
        ElMessage.error('请选择所需要入库的箱！')
    }
}


// 选托
const emits = defineEmits(['backWaybill', 'showTrayList'])
const clickTray = (row) => {
    emits('showTrayList', row.id)
}

// 返回运单信息
const back = () => {
    emits('backWaybill')
}

// table表格列数据
const formData = ref({
    id: props.errorInboundID
})
const tableOption = reactive([
    {
        prop: 'cabinetTypeId',
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
</script>
<style lang="scss" scoped>
.box-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    width: 100%;
    // background-color: aqua;
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
