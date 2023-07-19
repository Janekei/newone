<template>
    <div class="header">
        <div class="form-box">
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="7rem" :marginBottom="false"
                ref="formRef" @update:form-state="UpdateFormState" :showButton="true">
                <template #buttons>
                    <!-- <el-button class="btn" type="primary">搜索条件设置</el-button> -->
                    <el-button class="btn" type="primary" :icon="Search" @click="postSearchData">查询</el-button>
                    <el-button class="btn" type="default" :icon="Setting" @click="resetform">重置</el-button>
                </template>
            </FormK>
        </div>
    </div>
    <!-- <div class="center-btn-box">
        <ElButton class="btn" type="primary" :icon="Plus" @click="open">增加</ElButton>
        <ElButton class="btn" type="primary" :icon="Edit">修改</ElButton>
        <ElButton class="btn" type="primary" :icon="DocumentAdd">导入</ElButton>
        <ElButton class="btn" type="primary" :icon="Document">导出</ElButton>
    </div> -->
    <Dialog ref="dialogRef" @success="postSearchData" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search, Setting } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'
import Dialog from './Dialog.vue'

const formOption = reactive(
    [
        {
            type: 'input',
            field: 'goodsCode',
            placeholder: '请输入账单名称',
            label: '账单名称：'
        },
        {

            type: 'select',
            field: 'warehouse',
            placeholder: '',
            label: '供应商',
            requestOptions: {
                url: '/gsc/carrier/page',
                method: 'get',
                params: {},
                handleOptions: (res: any) => {
                    return res.data.map((item: any) => {
                        return {
                            label: item.name,
                            value: item.code
                        }
                    })
                }
            }
        }
    ]
)
let formData = reactive({})
const formRef = ref()
// 查询方法
const emits = defineEmits(['clickSearch', 'update:form-state', 'resetForm', 'addTemplate', 'success'])
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


// 弹窗
// const dialogRef = ref()
// const open = () => {
//     dialogRef.value.open('新增')
// }






</script>
<style lang="scss" scoped>
.header {
    display: flex;
    padding: 20px;
    border: 1px solid #dadcdf;
    background-color: #f5f8ff;
    border-radius: 10px;

    .form-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn {
        margin-left: .625rem;
        display: inline-block;
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

:deep(.el-form-item) {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding: .625rem;
    margin-bottom: 0;
}

::v-deep .el-form-item--default .el-form-item__label {
    font-weight: 700 !important;
    color: #333;
    font-size: .875rem;
    font-family: "黑体";
}
</style>
