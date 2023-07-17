<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1200">
        <div class="form-box">
            <div>
                <FormK ref="formRef" :formOption="formOption" v-model:formState="formData" labelWidth="8em" />
            </div>
        </div>
        <div class="header-bottom-btn">
            <ElButton @click="saveBaseInfo" :disabled="disabled" type="primary">保存</ElButton>
        </div>
        <div>
            <TabContent :basicData="formData" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref } from 'vue'
import TabContent from './TabContent.vue';
import * as ExtraExpenseApi from '@/api/warehousebill/extrabillsign'

const formRef = ref()
const formData = ref({})
const formOption = reactive([
    {
        type: 'input',
        field: 'bl',
        placeholder: '',
        label: '提单号：',
        // disabled: true
    },
    {
        type: 'inputTable',
        field: 'supplierName',
        placeholder: '',
        label: '供应商：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['supplierId'] = row.id
            formData.value['supplierName'] = row.name
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
        field: 'bsWhName',
        placeholder: '',
        label: '仓库名称：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['bsWhId'] = row.id
            formData.value['bsWhName'] = row.name
            formData.value['bsWhareaName'] = row.bsWhareaName
        },
        tableConfig: {
            url: '/gsc/baseWarehouse/getWarehousePage',
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
        type: 'input',
        field: 'bsWhareaName',
        placeholder: '',
        label: '仓库区域：',
        disabled: true
    },
    {
        type: 'input',
        field: 'arkQty',
        placeholder: '',
        label: '柜数：',
        // disabled: true
    },
    {
        type: 'input',
        field: 'palletQty',
        placeholder: '',
        label: '托盘数量：',
        // disabled: true
    },
    {
        type: 'input',
        field: 'qty',
        placeholder: '',
        label: '组片数量：',
        // disabled: true
    },
    {
        type: 'date',
        field: 'inStockTime',
        placeholder: '',
        label: '入仓日期：',
        // disabled: true
    },
    {
        type: 'date',
        field: 'outStockTime',
        placeholder: '',
        label: '出仓日期：',
        // disabled: true
    },
    {
        type: 'inputTable',
        field: 'feeCyName',
        placeholder: '',
        label: '币种：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['feeCyId'] = row.id
            formData.value['feeCyName'] = row.name
        },
        tableConfig: {
            url: '/gsc/currency/page',
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
])

let getId = ref()
let disabled = ref(true)
const saveBaseInfo = async () => {
    formData.value['inStockTime'] = Date.parse(formData.value['inStockTime'])
    formData.value['outStockTime'] = Date.parse(formData.value['outStockTime'])
    if (getId.value) {
        Object.assign(formData.value, { id: getId.value })
        // let data = await TemplateRulesApi.updateTempDetail(cloneData.value)
        // if (data) {
        //     ElMessage.success('更新成功！')
        // } else {
        //     ElMessage.error('更新失败！')
        // }
    } else {
        let data = await ExtraExpenseApi.createAddition(formData.value)
        if (data) {
            getId.value = data
            ElMessage.success('创建成功！')
        } else {
            ElMessage.error('创建失败！')
        }
    }
}



// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    dialogVisible.value = true
    disabled.value = false
    dialogTitle.value = '基本信息'
    resetForm()
}

watch(() => dialogVisible.value, (newVal) => { if (newVal === false) emits('success') })
// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
// const submitForm = () => {
//     dialogVisible.value = false
//     // 发送操作成功的事件
//     emits('success')
// }

// const success = () => {
//     dialogVisible.value = false
//     emits('success')
// }


defineExpose({
    open
})

// 重置表单
const resetForm = () => {
    formRef.value.resetFields()
}

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

.header-bottom-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 25px 25px 0;
}
</style>
