<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" :width="formType == '删除' ? 400 : 1400">
        <div class="form-box">
            <FormK v-if="formType != '删除'" :formOption="formOption" v-model:formState="formData" labelWidth="13rem"
                ref="formRef" @update:formState="updateFormData" />
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
import { ref, reactive, watch } from 'vue'
import { getIntDictOptions } from '@/utils/dict'
import FormK from '@/components/FormK/index.vue'
import * as standardTimeRulesApi from '@/api/standardtimerules/standardtimerules'

let formData = ref({
    departureCountryName: undefined,
    departureCountryId: undefined,
    departurePortName: undefined,
    departurePortId: undefined,
    arrivalCountryName: undefined,
    arrivalCountryId: undefined,
    arrivalPortName: undefined,
    arrivalPortId: undefined,
})

// 数据字典获取运输方式,直达/中转
const transferPort = ref()
const directTransfer = ref()
const getExceptionType = () => {
    const res = getIntDictOptions('standard_time_rules')
    transferPort.value = res
    const data = getIntDictOptions('direct_transfer')
    directTransfer.value = data

}
onMounted(() => {
    getExceptionType()
})



// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用


// 监听国家/港口的变化
watch(() => [
    formData.value.departureCountryName,
    formData.value.departurePortName,
    formData.value.arrivalCountryName,
    formData.value.arrivalPortName
],
    (newVal) => {
        if (newVal[0] !== undefined) {
            findDepartureCountry(newVal[0], 'dc')
        }
        if (newVal[1] !== undefined) {
            findDepartureCountry(newVal[1], 'dp')
        }
        if (newVal[2] !== undefined) {
            findDepartureCountry(newVal[2], 'ac')
        }
        if (newVal[3] !== undefined) {
            findDepartureCountry(newVal[3], 'ap')
        }
    })
// 获取起运国id
const findDepartureCountry = async (name, type) => {
    let data = {
        name,
        pageNo: 1,
        pageSize: 5
    }
    const res = await standardTimeRulesApi.findCountry(data)
    let id = res.list[0].id
    switch (type) {
        case 'dc':
            formData.value.departureCountryId = id;
            break;
        case 'dp':
            formData.value.departurePortId = id;
            break;
        case 'ac':
            formData.value.arrivalCountryId = id;
            break;
        case 'ap':
            formData.value.arrivalPortId = id;
            break;
    }
}


// var disabled = ref(true)
const formOption = reactive([
    {
        type: 'inputTable',
        field: 'departureCountryName',
        placeholder: '请输入起运国',
        label: '起运国',
        rules: [
            { required: true, message: '请输入起运国', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            method: 'post',
            data: {
                pageNo: 1,
                pageSize: 5
            },
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
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
        field: 'departurePortName',
        placeholder: '请输入起运港',
        label: '起运港',
        rules: [
            { required: true, message: '请输入起运港', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            method: 'post',
            params: {
                pageNo: 1,
                pageSize: 5
            },
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '港口名'
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
        field: 'arrivalCountryName',
        placeholder: '请输入目的国',
        label: '目的国',
        rules: [
            { required: true, message: '请输入目的国', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            method: 'post',
            params: {
                pageNo: 1,
                pageSize: 5
            },
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
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
        field: 'arrivalPortName',
        placeholder: '请输入目的港',
        label: '目的港',
        rules: [
            { required: true, message: '请输入目的港', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            method: 'post',
            params: {
                pageNo: 1,
                pageSize: 5
            },
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '港口名'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'select',
        field: 'transportMode',
        placeholder: '请选择',
        label: '运输方式',
        options: transferPort,
        rules: [
            { required: true, message: '请选择运输方式', trigger: 'blur' }
        ]
    },
    {
        type: 'select',
        field: 'transferPort',
        placeholder: '请选择',
        label: '直达/中转',
        options: directTransfer,
        rules: [
            { required: true, message: '请选择', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'factoryDeapport',
        placeholder: '请输入天数',
        label: '工厂PGI未进港（天）',
    },
    {
        type: 'input',
        field: 'deapportDeaprture',
        placeholder: '请输入天数',
        label: '进港未离港（天）',
    },
    {
        type: 'input',
        field: 'departureArrport',
        placeholder: '请输入天数',
        label: '离港未到港（天）',
    },
    {
        type: 'input',
        field: 'departureTransport',
        placeholder: '请输入天数',
        label: '离港未到中转港（天）',
    },
    {
        type: 'input',
        field: 'transportDeapport',
        placeholder: '请输入天数',
        label: '中转港未离港（天）',
    },
    {
        type: 'input',
        field: 'deapportArrport',
        placeholder: '请输入天数',
        label: '中转港离港未到目的地（天）',
    },
    {
        type: 'input',
        field: 'arrportBl',
        placeholder: '请输入天数',
        label: '到港未提货（天）',
    },
    {
        type: 'input',
        field: 'blArrival',
        placeholder: '请输入天数',
        label: '提货未送达（天）',
    },
    {
        type: 'input',
        field: 'arrivalPod',
        placeholder: '请输入天数',
        label: '送达未POD（天）',
    },
    {
        type: 'input',
        field: 'cycle',
        placeholder: '请输入天数',
        label: '标准运输周期（天）',
    }
])

const updateFormData = (val) => {
    formData.value = val
}




// 表单Ref
const formRef = ref()

// 打开弹窗方法
const deleteId = ref()
const open = async (type: string, id?: number) => {
    resetForm()
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '标准时间规则'
    formLoading.value = true
    if (id && formType.value === '编辑') {
        const res = await standardTimeRulesApi.searchTimeRules({ id })
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
    if (formType.value === '增加') {
        if (formData.value.departureCountryName == formData.value.departurePortName
            && formData.value.arrivalCountryName == formData.value.arrivalPortName
            && formData.value.departurePortName == formData.value.arrivalCountryName) {
            ElMessage.error('国家/港口不能全部选择相同！')
            return;
        }
        const res = await standardTimeRulesApi.addTimeRules(formData.value)
        if (res) {
            ElMessage.success('新增标准时间规则成功')
            resetForm()
        } else {
            ElMessage.error('新增标准时间规则失败')
        }
        resetForm()
    } else if (formType.value === '编辑') {
        const res = await standardTimeRulesApi.updateTimeRules(formData.value)
        if (res) {
            ElMessage.success('修改标准时间规则成功')
            resetForm()
        } else {
            ElMessage.error('修改标准时间规则失败')
        }
        resetForm()
    } else {
        console.log(deleteId)
        const res = await standardTimeRulesApi.deleteTimeRules({ id: deleteId.value })
        if (res) {
            ElMessage.success('删除成功')
        } else {
            ElMessage.success('删除失败')
        }
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
}


// 重置表单数据
/** 重置表单 */
const resetForm = () => {
    formData.value = {
        departureCountryName: undefined,
        departureCountryId: undefined,
        departurePortName: undefined,
        departurePortId: undefined,
        arrivalCountryName: undefined,
        arrivalCountryId: undefined,
        arrivalPortName: undefined,
        arrivalPortId: undefined,
    }
}


</script>

<style lang="scss" scoped></style>