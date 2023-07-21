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
    <div class="center-btn-box">
        <ElButton class="btn" type="primary" :icon="Plus" @click="postAdd">增加</ElButton>
        <ElButton class="btn" type="primary" :icon="Upload">上传</ElButton>
        <ElButton class="btn" type="primary" :icon="Download">下载</ElButton>
        <ElButton class="btn" :icon="Refresh" @click="postSearchData">刷新</ElButton>
        <ElButton class="btn" :icon="ZoomIn">全部查找</ElButton>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Plus, Upload, Download, Refresh, ZoomIn, Search } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'
const formOption = reactive(
    [
        {
            type: 'input',
            field: 'transportMode',
            placeholder: '请输入运输方式',
            label: '运输方式：'
        },
        {
            type: 'input',
            field: 'arrivalCountryName',
            placeholder: '请输入目的国',
            label: '目的国：'
        }
    ]
)

let formData = reactive({})
const formRef = ref()
// 查询方法
const emits = defineEmits(['clickSearch', 'update:form-state', 'resetForm', 'AddTimeRules'])
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

// 增加
const postAdd = () => {
    emits('AddTimeRules')
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

.center-btn-box {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3.25rem;
    margin: .625rem 0;
    width: 100%;
    border: 1px solid #dadcdf;
    // background-color: #f5f8ff;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;

    .btn {
        color: #409EFF;
        background-color: #fff;
        border: .0625rem solid #d5d5d5;
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
