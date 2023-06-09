<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle">
        <div class="form-box">
            {{ formData }}
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="5rem" ref="formRef"
                @update:formState="updateFormData" />
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ElButton, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import * as WarehouseManageApi from '@/api/warehousemanage'

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formOption = reactive([
    {
        type: 'input',
        field: 'id',
        placeholder: '请输入ID',
        label: 'ID',
        rules: [
            { required: true, message: '请输入ID', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入编码',
        label: '编码',
        rules: [
            { required: true, message: '请输入ID', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入名称',
        label: '名称',
        rules: [
            { required: true, message: '请输入ID', trigger: 'change' }
        ]
    }
])

const updateFormData = (val) => {
    formData.value = val
}



// 表单Ref
const formRef = ref()

// 打开弹窗方法
const open = async (type: string, id?: number) => {
    resetForm()
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '区域信息'
    if (id) {
        formLoading.value = true
        try {
            formData.value = await WarehouseManageApi.getWarehouseList({ id })
        } finally {
            formLoading.value = false
        }
    }
}
defineExpose({
    open
})

// 提交表单

const submitForm = async () => {
    if (formType.value === ' ') {
        const res = await WarehouseManageApi.addWarehouseItem(formData.value)
        if (res.code === 0) {
            ElMessage.success('新增仓库信息成功')
            resetForm()
        } else {
            ElMessage.error(res.msg)
        }
    } else {
        const res = await WarehouseManageApi.changeWarehouseItem(formData.value)
        if (res.code === 0) {
            ElMessage.success('修改仓库信息成功')
            resetForm()
        } else {
            ElMessage.error(res.msg)
        }
    }
}

let formData = ref({
    id: undefined,
    code: undefined,
    name: undefined
})

// 重置表单数据
/** 重置表单 */
const resetForm = () => {
    formData.value = {
        id: undefined,
        code: undefined,
        name: undefined
    }
}


</script>

<style lang="scss" scoped></style>