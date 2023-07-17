<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1300">
        <div class="form-box">
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="9em" />
        </div>
        <TabContent :id="props.id" @successApr="successApr" @sendDetail="sendDetail" />
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref } from 'vue'
import TabContent from './TabContent.vue';
import { formatDate } from '@/utils/formatTime'
const props = defineProps({
    id: {
        type: Number
    }
})

const formOption = reactive([
    {
        type: 'input',
        field: 'feeBillName',
        placeholder: '',
        label: '账单名称：',
        disabled: true
    },
    {
        type: 'input',
        field: 'supplierName',
        placeholder: '',
        label: '供应商：',
        disabled: true
    },
    {
        type: 'input',
        field: 'bsWhareaName',
        placeholder: '',
        label: '仓库区域：',
        disabled: true
    },
    {
        type: 'input',
        field: 'bsWhName',
        placeholder: '',
        label: '仓库名称：',
        disabled: true
    },
    {
        type: 'input',
        field: 'palletQty',
        placeholder: '',
        label: '托盘数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'qty',
        placeholder: '',
        label: '组片数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'inStockTime',
        placeholder: '',
        label: '入仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'outStockTime',
        placeholder: '',
        label: '出仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'feeTime',
        placeholder: '',
        label: '费用生成日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'feeCyName',
        placeholder: '',
        label: '币种：',
        disabled: true
    },
])

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    if (props.id === undefined) {
        ElMessage.warning('请选择行再点击！')
        return;
    }
    dialogVisible.value = true
    dialogTitle.value = '基本信息'
}

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success', 'sendDetail'])
const successApr = () => {
    dialogVisible.value = false
    // 发送操作成功的事件
    emits('success')
}

const formData = ref()
const sendDetail = (data) => {
    formData.value = data
    formData.value.inStockTime = formatDate(formData.value.inStockTime, 'YYYY-MM-DD HH:mm:ss')
    formData.value.outStockTime = formatDate(formData.value.outStockTime, 'YYYY-MM-DD HH:mm:ss')
    formData.value.feeTime = formatDate(formData.value.feeTime, 'YYYY-MM-DD HH:mm:ss')
}



defineExpose({
    open
})



</script>
<style lang="scss" scoped>
.form-box {
    display: flex;
    width: 100%;
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
