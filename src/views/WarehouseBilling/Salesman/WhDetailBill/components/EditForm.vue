<template>
    <div>
        <FormK :formOption="formOption" labelWidth="9em" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
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
</script>
<style lang="scss" scoped>
:deep(.el-form-item) {
    margin: .625rem 1.625rem;
}
</style>
