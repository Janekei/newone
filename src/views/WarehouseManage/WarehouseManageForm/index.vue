<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="1200">
        <div class="form-box">
            {{ formData }}
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="9rem" ref="formRef"
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
// import * as ZoneManageApi from '@/api/zonemanage'
import * as WarehouseManageApi from '@/api/warehousemanage'

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用

// 省份、城市下拉框的id获取
let provinceId = ref()
let cityId = ref()

const formOption = reactive([
    {
        type: 'select',
        field: 'countryId',
        placeholder: '请选择国家',
        requestOptions: {
            url: '/bidding/area/location/findCountry',
            method: 'get',
            params: { id: 0 },
            handleOptions: (res: any) => {
                return res.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },
        label: '国家',
        rules: [
            { required: true, message: '请选择国家', trigger: 'blur' }
        ]
    },
    {
        type: 'select',
        field: 'provinceId',
        placeholder: '请选择省份',
        requestOptions: {
            url: '/bidding/area/location/findCountry',
            method: 'get',
            params: { id: provinceId },
            handleOptions: (res: any) => {
                return res.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },
        label: '省份',
        rules: [
            { required: true, message: '请选择省份', trigger: 'blur' }
        ]
    },
    {
        type: 'select',
        field: 'cityId',
        placeholder: '请选择城市',
        requestOptions: {
            url: '/bidding/area/location/findCountry',
            method: 'get',
            params: { id: cityId },
            handleOptions: (res: any) => {
                return res.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },
        label: '城市',
        rules: [
            { required: true, message: '请选择城市', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'address',
        placeholder: '请输入具体地址',
        label: '具体地址',
        rules: [
            { required: true, message: '请输入ID', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'longitude',
        placeholder: '请输入经度',
        label: '经度',
        rules: [
            { required: true, message: '请输入经度', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'latitude',
        placeholder: '请输入纬度',
        label: '纬度',
        rules: [
            { required: true, message: '请输入纬度', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'zipCode',
        placeholder: '请输入zip code',
        label: 'zip code',
        rules: [
            { required: true, message: '请输入zip code', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入仓库名称',
        label: '仓库名称',
        rules: [
            { required: true, message: '请输入仓库名称', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'area',
        placeholder: '请输入仓库面积',
        label: '仓库面积（m²）',
        rules: [
            { message: '请输入仓库面积', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'storageCapacity',
        placeholder: '请输入仓库库容',
        label: '仓库库容（托）',
        rules: [
            { message: '请输入仓库库容', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'supplierName',
        placeholder: '请输入归属供应商',
        label: '归属供应商',
        rules: [
            { message: '请输入归属供应商', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'loadingCapacity',
        placeholder: '请输入装货能力',
        label: '装货能力',
        rules: [
            { message: '请输入装货能力', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'unloadingCapacity',
        placeholder: '请输入卸货能力',
        label: '卸货能力',
        rules: [
            { message: '请输入卸货能力', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'shippingCapacity',
        placeholder: '请输入出货能力',
        label: '出货能力',
        rules: [
            { message: '请输入出货能力', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'contactName',
        placeholder: '请输入仓库联系人姓名',
        label: '仓库联系人姓名',
        rules: [
            { message: '请输入仓库联系人姓名', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'contactPhone',
        placeholder: '请输入仓库联系人电话',
        label: '仓库联系人电话',
        rules: [
            { message: '仓库联系人电话', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'contactEmail',
        placeholder: '请输入仓库联系人邮箱',
        label: '仓库联系人邮箱',
        rules: [
            { message: '请输入仓库联系人邮箱', trigger: 'change' }
        ]
    },
    // {
    //     type: 'select',
    //     field: 'bsWhareaId',
    //     placeholder: '请选择仓库区域',
    //     requestOptions: {
    //         url: '/jinkotms/baseWharea/page',
    //         method: 'get',
    //         params: {
    //             pageInfo: {
    //                 pageSize: 100,
    //                 pageNo: 1
    //             }
    //         },
    //         handleOptions: (res: any) => {
    //             return res.list.map((item: any) => {
    //                 return {
    //                     label: item.name,
    //                     value: item.id
    //                 }
    //             })
    //         }
    //     },
    //     label: '仓库区域',
    //     rules: [
    //         { required: true, message: '请选择区域', trigger: 'blur' }
    //     ]
    // }
])

const updateFormData = (val) => {
    console.log(val, 9999)
    formData.value = val
    provinceId.value = val.countryId
    cityId.value = val.provinceId
    // 过滤区域选择器的数据
    // zoneList.forEach(item => {
    //     if (item.id == formData.value.bsWhareaId) {
    //         formData.value.bsWhareaCode = item.code
    //         formData.value.bsWhareaName = item.name
    //     }
    // })
}

//获取下拉框数据
// let zoneList: any = reactive([])
// const getZoneList = async () => {
//     // 获取区域数据
//     const pageInfo = {
//         pageNo: 1,
//         pageSize: 100
//     }
//     const res = await ZoneManageApi.getZoneList(pageInfo)
//     zoneList = res.list
//     console.log(zoneList, 'zoneList')

// }




// 表单Ref
const formRef = ref()

// 打开弹窗方法
const open = async (type: string, id?: number) => {
    resetForm()
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '仓库信息'
    // getZoneList()
    if (id) {
        formLoading.value = true
        try {
            formData.value = await WarehouseManageApi.getWarehouseList({ id })
            // 过滤区域选择器的数据
            // zoneList.forEach(item => {
            //     if (item.id == formData.value.bsWhareaId) {
            //         formData.value.bsWhareaCode = item.code
            //         formData.value.bsWhareaName = item.name
            //     }
            // })
        } finally {
            formLoading.value = false
        }
    }
}
defineExpose({
    open
})

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emit = defineEmits(['success'])
const submitForm = async () => {
    // 处理下拉框数据
    // zoneList.forEach(item => {
    //     if (item.id == formData.value.bsWhareaId) {
    //         formData.value.bsWhareaCode = item.code
    //         formData.value.bsWhareaName = item.name
    //     }
    // })
    if (formType.value === '增加') {
        await WarehouseManageApi.addWarehouseItem(formData.value)
        ElMessage.success('新增仓库信息成功')
        resetForm()
    } else {
        await WarehouseManageApi.changeWarehouseItem(formData.value)
        ElMessage.success('修改仓库信息成功')
        resetForm()

    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
}

let formData = ref({
    id: undefined,
    code: undefined,
    name: undefined,
    longitude: undefined,
    latitude: undefined,
    bsWhareaCode: undefined,
    bsWhareaName: undefined,
    bsWhareaId: undefined
})

// 重置表单数据
/** 重置表单 */
const resetForm = () => {
    formData.value = {
        id: undefined,
        code: undefined,
        name: undefined,
        longitude: undefined,
        latitude: undefined,
        bsWhareaCode: undefined,
        bsWhareaName: undefined,
        bsWhareaId: undefined
    }
}


</script>

<style lang="scss" scoped></style>