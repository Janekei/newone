<template>
    异常
    <TableK url="/jinkotms/baseWarehouse" method="get" :params="formData" :firstPages="20" :tableOption="tableOption" />
    <div class="box-btn">
        <el-button class="button" type="primary">返回</el-button>
        <el-button class="button" type="primary" @click="errorRecord">异常登记</el-button>
    </div>
    <DialogInbound ref="refDialog">
        <template #formError>
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="6em" ref="formRef" />
        </template>
    </DialogInbound>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';
import FormK from '@/components/FormK/index.vue'

const formOption = reactive([
    {
        type: 'select',
        field: 'region',
        placeholder: '请选择异常类型',
        label: '异常类型',
        options: [
            { label: '货量破损', value: 0 },
            { label: '数量短缺', value: 1 },
            { label: '型号不符', value: 2 }
        ],
        rules: [
            { required: true, message: '请选择异常类型', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入内容',
        label: '其他类型'
    },
])

// ref弹窗
const refDialog = ref()

// 确认异常登记
const errorRecord = () => {
    refDialog.value.open('异常类型确认')
}

// table表格列数据
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'No',
        label: '序号',
    },
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
</style>
