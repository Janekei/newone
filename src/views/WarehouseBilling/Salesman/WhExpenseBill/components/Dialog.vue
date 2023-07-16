<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="800">
        <div class="form-box">
            <FormK :formOption="formOption" ref="refForm" v-model:formState="formData" labelWidth="9em" />
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref, reactive } from 'vue'
import { formatTime } from '@/utils'
import FormK from '@/components/FormK/index.vue'
import * as ExpenseBillApi from '@/api/warehousebill/supplier/expensebill'


const formData = ref({})
const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: '',
        label: '账单名称：',
        rules: [
            { required: true, message: '请输入账单名称', trigger: 'change' }
        ]
    },
    {
        type: 'inputTable',
        field: 'supplierName',
        placeholder: '',
        label: '供应商：',
        rules: [
            { required: true, message: '请输入供应商', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
            formData.value['supplierName'] = undefined
            formData.value['supplierId'] = undefined
        },
        setFormData: (row) => {
            formData.value['supplierName'] = row.name
            formData.value['supplierId'] = row.id
        },
        tableConfig: {
            url: '/gsc/carrier/page',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '',
        label: '仓库区域：',
        rules: [
            { required: true, message: '请输入仓库区域', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
            formData.value['bsWhareaName'] = undefined
            formData.value['bsWhareaId'] = undefined
        },
        setFormData: (row) => {
            formData.value['bsWhareaName'] = row.name
            formData.value['bsWhareaId'] = row.id
        },
        tableConfig: {
            url: '/gsc/wharea/page',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'date',
        field: 'billDate',
        placeholder: '',
        label: '账单生成日期：',
        rules: [
            { required: true, message: '请输入账单生成日期', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'price',
        placeholder: '',
        label: '供应商总金额：',
        rules: [
            { required: true, message: '请输入账单生成日期', trigger: 'change' }
        ]
    }
])

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const refForm = ref()

let id = ref()
const open = async (type: string, id?: number) => {
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '总费用对账'
    if (id) {
        const res = await ExpenseBillApi.getExpense({ id })
        formData.value = res
        formData.value['billDate'] = formatTime(formData.value['billData'], 'YYYY-MM-DD')
    }
}

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
const submitForm = () => {
    refForm.value.validate(async (valid) => {
        if (valid) {
            let params = {
                name: formData.value['name'],
                supplierId: formData.value['supplierId'],
                bsWhareaId: formData.value['bsWhareaId'],
                billDate: Date.parse(formData.value['billDate']),
                price: formData.value['price']
            }
            if (formType.value === '新增') {
                const res = await ExpenseBillApi.createExpense(params)
                if (res) {
                    ElMessage.success('新增成功')
                    dialogVisible.value = false
                    emits('success')
                } else {
                    ElMessage.success('新增失败')
                }
            } else if (formType.value === '编辑') {
                let params1 = Object.assign({}, params, { id: id.value })
                const res = await ExpenseBillApi.updateExpense(params1)
                if (res) {
                    ElMessage.success('修改成功')
                    dialogVisible.value = false
                    emits('success')
                } else {
                    ElMessage.success('修改失败')
                }
            }
        }
    })
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
