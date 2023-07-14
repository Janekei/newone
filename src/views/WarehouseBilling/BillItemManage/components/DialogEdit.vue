<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="600">
        <div class="form-box">
            <FormK v-if="formType != '删除'" :formOption="formOption" v-model:formState="formData" labelWidth="13rem"
                ref="formRef" />
            <div style="text-align: center;" v-else>你确定要删除吗？</div>
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ElButton, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
import * as billItemmanageApi from '@/api/warehousebill/billitemmanage'

let formData = ref({})



// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用


// var disabled = ref(true)
const formOption = reactive([
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入编码',
        label: '编码',
    },
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入名字',
        label: '计费项名字',
    },
    {
        type: 'input',
        field: 'notes',
        placeholder: '请输入备注',
        label: '备注',
    }
])


// 表单Ref
const formRef = ref()

// 打开弹窗方法
const deleteId = ref()
const open = async (type: string, id?: number) => {
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '计费项'
    formLoading.value = true
    if (id && formType.value === '编辑') {
        const res = await billItemmanageApi.getItem({ id })
        formData.value = res
    } else {
        deleteId.value = id
    }
}

defineExpose({
    open
})

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emit = defineEmits(['success'])
const submitForm = async () => {
    if (formType.value === '删除') {
        const res = await billItemmanageApi.deleteItem({ id: deleteId.value })
        if (res) {
            ElMessage.success('删除成功')
            dialogVisible.value = false
            // 发送操作成功的事件
            emit('success')
        } else {
            ElMessage.success('删除失败')
        }
        return;
    }
    formRef.value.validate(async (valid) => {
        if (valid) {
            if (formType.value === '增加') {
                const res = await billItemmanageApi.createItem(formData.value)
                if (res) {
                    ElMessage.success('新增计费项成功')
                    resetForm()
                } else {
                    ElMessage.error('新增计费项失败')
                }
            } else if (formType.value === '编辑') {
                const res = await billItemmanageApi.updateItem(formData.value)
                if (res) {
                    ElMessage.success('修改计费项成功')
                    resetForm()
                } else {
                    ElMessage.error('修改计费项失败')
                }
            }
            dialogVisible.value = false
            // 发送操作成功的事件
            emit('success')
        }
    })
}


// 重置表单数据
/** 重置表单 */
const resetForm = () => {
    formRef.value.resetFields()
}


</script>

<style lang="scss" scoped></style>