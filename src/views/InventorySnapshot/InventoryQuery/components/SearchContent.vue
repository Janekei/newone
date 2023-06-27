<template>
    <div class="header">
        <FormK :formOption="formOption" v-model:formState="formData" labelWidth="7rem" :marginBottom="false" ref="formRef"
            @update:form-state="UpdateFormState" />
        <div class="btn-box">
            <el-button type="primary">新增查询条件</el-button>
            <el-button type="primary" :icon="Search" @click="postSearchData">查询</el-button>
            <el-button type="default" @click="resetform">重置</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'
const formOption = reactive(
    [
        {
            type: 'input',
            field: 'goodsCode',
            placeholder: '请输入货品编码',
            label: '货品编码：'
        },
        {
            type: 'input',
            field: 'goodsName',
            placeholder: '请输入货品名称',
            label: '货品名称：'
        }
    ]
)
let formData = reactive({})
const formRef = ref()
// 查询方法
const emits = defineEmits(['clickSearch', 'update:form-state', 'resetForm'])
const postSearchData = () => {
    emits('clickSearch')
}
const UpdateFormState = () => {
    emits('update:form-state', formData)
}
const resetform = () => {
    formRef.value.resetFields()
    formData = {}
    setTimeout(() => {
        postSearchData()
    }, 10);
}
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #dadcdf;
    border-radius: 10px;
    background-color: #f5f8ff;
    padding: 16px;

    .btn-box {
        display: inline-flex;
        margin-left: 7.125rem;
    }
}

.form-box>.el-form-item {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1.25rem;
    margin-bottom: 0;
}

::v-deep .el-form-item--default .el-form-item__label {
    font-weight: 700 !important;
    color: #333;
    font-size: .875rem;
    font-family: "黑体";
}
</style>
