<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1200">
        <div v-loading="loading">
            <div class="form-box">
                <FormK :formOption="formOption" v-model:form-state="formData" labelWidth="9em" />
            </div>
            <TabContent :tableRef="props.tableRef" @successApr="success" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import FormK from '@/components/FormK/index.vue'
import TabContent from './TabContent.vue';
import * as ExpenseDetailApi from '@/api/warehousebill/supplier/expensedetail'
const props = defineProps({
    tableRef: {
        type: Object
    }
})

const formOption = reactive([
    {
        type: 'input',
        field: 'billName',
        placeholder: '-',
        label: '账单名称：',
        disabled: true
    },
    {
        type: 'input',
        field: 'supplierName',
        placeholder: '-',
        label: '供应商：',
        disabled: true
    },
    {
        type: 'input',
        field: 'bsWhereaName',
        placeholder: '-',
        label: '仓库区域：',
        disabled: true
    },
    {
        type: 'input',
        field: 'bsWhName',
        placeholder: '-',
        label: '仓库名称：',
        disabled: true
    },
    // {
    //     type: 'input',
    //     field: 'goodsCode',
    //     placeholder: '',
    //     label: '原集装箱号：',
    //     disabled: true
    // },
    {
        type: 'input',
        field: 'palletQty',
        placeholder: '-',
        label: '托盘数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'arkQty',
        placeholder: '-',
        label: '组片数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'inStockTime',
        placeholder: '-',
        label: '入仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'outStockTime',
        placeholder: '-',
        label: '出仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'billStartDate',
        placeholder: '-',
        label: '账单起始日：',
        disabled: true
    },
    {
        type: 'input',
        field: 'billEndDate',
        placeholder: '-',
        label: '账单截止日：',
        disabled: true
    },
    {
        type: 'input',
        field: 'cycleDay',
        placeholder: '-',
        label: '计费时间（天）：',
        disabled: true
    },
    {
        type: 'input',
        field: 'cycleWeek',
        placeholder: '-',
        label: '计费时间（周）：',
        disabled: true
    },
    {
        type: 'input',
        field: 'cycleMonth',
        placeholder: '',
        label: '计费时间（月）：',
        disabled: true
    },
    // {
    //     type: 'input',
    //     field: 'goodsCode',
    //     placeholder: '',
    //     label: '库存状态：',
    //     disabled: true
    // },
])

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    if (props.tableRef?.selectAll.length === 0) {
        ElMessage.warning('请选择行再点击！')
        return;
    } else if (props.tableRef?.selectAll.length > 1) {
        ElMessage.warning('不允许多选行，请双击清空多选项即可单选成功！')
        return;
    }
    dialogVisible.value = true
    dialogTitle.value = '基本信息'
    if (props.tableRef?.selectAll[0].id) getExpenseDetail()
}

// 获取明细信息
const formData = ref()
const loading = ref(false)
const getExpenseDetail = async () => {
    loading.value = true
    const data = await ExpenseDetailApi.getExpenseDetail({ id: props.tableRef?.selectAll[0].id })
    formData.value = data
    formData.value['inStockTime'] = formatDate(formData.value['inStockTime'], 'YYYY-MM-DD HH:mm:ss')
    formData.value['outStockTime'] = formatDate(formData.value['outStockTime'], 'YYYY-MM-DD HH:mm:ss')
    formData.value['billStartDate'] = formatDate(formData.value['billStartDate'], 'YYYY-MM-DD HH:mm:ss')
    formData.value['billEndDate'] = formatDate(formData.value['billEndDate'], 'YYYY-MM-DD HH:mm:ss')
    loading.value = false
}


// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
// const submitForm = () => {
//     dialogVisible.value = false
//     // 发送操作成功的事件
//     emits('success')
// }

const success = () => {
    dialogVisible.value = false
    // 发送操作成功的事件
    emits('success')
}




defineExpose({
    open
})



</script>
<style lang="scss" scoped>
.form-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.text {
    display: inline-block;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
}
</style>
