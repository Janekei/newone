<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="1300">
        <div class="form-box">
            <!-- {{ formData }} -->
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="10rem" ref="formRef"
                @update:formState="updateFormData" />
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary" :disabled="formLoading">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ElButton, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
// import * as ZoneManageApi from '@/api/zonemanage'


// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用

// 省份、城市下拉框的id获取
let provinceId = ref()
let cityId = ref()

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
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    props: 'id',
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
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    props: 'id',
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
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    props: 'id',
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
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    props: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'inputTable',
        field: 'transportMode',
        placeholder: '请输入运输方式',
        label: '运输方式',
        rules: [
            { required: true, message: '请输入运输方式', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    props: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'select',
        field: 'transferPort',
        placeholder: '请选择',
        label: '直达/中转',
        options: [
            { label: '直达', value: 0 },
            { label: '中转', value: 1 }
        ],
        rules: [
            { required: true, message: '请选择区域', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'factoryDeapport',
        placeholder: '请输入工厂PGI未进港',
        label: '工厂PGI未进港',
    },
    {
        type: 'input',
        field: 'deapportDeaprture',
        placeholder: '请输入请输入进港未离港',
        label: '进港未离港',
    },
    {
        type: 'input',
        field: 'departureArrport',
        placeholder: '请输入离港未到港',
        label: '离港未到港',
    },
    {
        type: 'input',
        field: 'departureTransport',
        placeholder: '请输入离港未到中转港',
        label: '离港未到中转港',
    },
    {
        type: 'input',
        field: 'transportDeapport',
        placeholder: '请输入中转港未离港',
        label: '中转港未离港',
    },
    {
        type: 'input',
        field: 'deapportArrport',
        placeholder: '中转港离港未到目的地',
        label: '中转港离港未到目的地',
    },
    {
        type: 'input',
        field: 'arrportBl',
        placeholder: '请输入到港未提货',
        label: '到港未提货',
    },
    {
        type: 'input',
        field: 'blArrival',
        placeholder: '请输入提货未送达',
        label: '提货未送达',
    },
    {
        type: 'input',
        field: 'arrivalPod',
        placeholder: '请输入送达未POD',
        label: '送达未POD',
    },
    {
        type: 'input',
        field: 'arrivalPod',
        placeholder: '请输入标准运输周期',
        label: '标准运输周期',
    }
])

const updateFormData = (val) => {
    console.log(val, 9999)
    formData.value = val
    provinceId.value = val.countryId
    cityId.value = val.provinceId
}




// 表单Ref
const formRef = ref()

// 打开弹窗方法
const open = async (type: string, id?: number) => {
    resetForm()
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '仓库信息'
    if (id) {
        formLoading.value = true
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

        ElMessage.success('新增仓库信息成功')
        resetForm()
    } else {

        ElMessage.success('修改仓库信息成功')
        resetForm()

    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
}

let formData = ref({
    countryId: undefined,
    provinceId: undefined,
    cityId: undefined,
    address: undefined,
    latitude: undefined,
    longitude: undefined,
    zipCode: undefined,
    name: undefined,
    storageCapacity: undefined,
    area: undefined,
    supplierName: undefined,
    loadingCapacity: undefined,
    shippingCapacity: undefined,
    unloadingCapacity: undefined,
    contactName: undefined,
    contactPhone: undefined,
    contactEmail: undefined
})

// 重置表单数据
/** 重置表单 */
const resetForm = () => {
    formData.value = {
        countryId: undefined,
        provinceId: undefined,
        cityId: undefined,
        address: undefined,
        latitude: undefined,
        longitude: undefined,
        zipCode: undefined,
        name: undefined,
        storageCapacity: undefined,
        area: undefined,
        supplierName: undefined,
        loadingCapacity: undefined,
        shippingCapacity: undefined,
        unloadingCapacity: undefined,
        contactName: undefined,
        contactPhone: undefined,
        contactEmail: undefined
    }
}


</script>

<style lang="scss" scoped></style>