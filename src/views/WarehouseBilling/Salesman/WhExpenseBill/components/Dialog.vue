<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1200">
        <div class="form-box">
            <FormK :formOption="formOption" labelWidth="9em" />
        </div>
        <TabContent />
        <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
import TabContent from './TabContent.vue';

const formOption = reactive([
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '账单名称：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '供应商：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '仓库区域：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '仓库名称：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '原集装箱号：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '托盘数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '组片数量：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '入仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '出仓日期：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '账单起始日：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '账单截止日：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '计费时间（天）：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '计费时间（周）：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '计费时间（月）：',
        disabled: true
    },
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '',
        label: '库存状态：',
        disabled: true
    },
])

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    dialogVisible.value = true
    dialogTitle.value = '基本信息'
}

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
const submitForm = () => {
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
