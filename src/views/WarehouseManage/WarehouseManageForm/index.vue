<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="1200">
        <div class="form-box">
            {{ formData }}
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="9rem" ref="formRef"
                @update:formState="updateFormData" />
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary" :disabled="formLoading">{{ t('warehousemanage.confirmButton')
            }}</el-button>
            <el-button @click="dialogVisible = false">{{ t('warehousemanage.cancleButton') }}</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ElButton, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
// import * as ZoneManageApi from '@/api/zonemanage'
import * as WarehouseManageApi from '@/api/warehousemanage'

// 国际化
const { t } = useI18n()

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用

// 省份、城市下拉框的id获取
let provinceId = ref()
let cityId = ref()

var disabled = ref(true)
const formOption = reactive([
    {
        type: 'inputTable',
        field: 'countryId',
        placeholder: '请输入国家',
        label: '国家',
        modelValue: 'name',
        rules: [
            { required: true, message: '请输入国家', trigger: 'change' }
        ],
        valueKey: 'name',
        formKey: 'id',
        replaceKey: 'countryId',
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
        field: 'tableProvince',
        placeholder: '请输入省份',
        label: '省份',
        rules: [
            { required: true, message: '请输入省份', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            params: { id: 1 },
            url: '/bidding/area/location/findCountry'
        },
        disabled: computed(() => {
            return disabled.value
        })
    },
    {
        type: 'inputTable',
        field: 'tableCity',
        placeholder: '请输入城市',
        label: '城市',
        rules: [
            { required: true, message: '请输入城市', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            params: { id: 3 },
            url: '/bidding/area/location/findCountry'
        },
        disabled: computed(() => {
            return disabled.value
        })
    },
    {
        type: 'input',
        field: 'address',
        placeholder: `${t('warehousemanage.inputAddress')}`,
        label: `${t('warehousemanage.address')}`,
        rules: [
            { required: true, message: `${t('warehousemanage.inputAddress')}`, trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'longitude',
        placeholder: `${t('warehousemanage.inputLongitude')}`,
        label: `${t('warehousemanage.longitude')}`,
        rules: [
            { required: true, message: `${t('warehousemanage.inputLongitude')}`, trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'latitude',
        placeholder: `${t('warehousemanage.inputLatitude')}`,
        label: `${t('warehousemanage.latitude')}`,
        rules: [
            { required: true, message: `${t('warehousemanage.inputLatitude')}`, trigger: 'change' }
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
        placeholder: `${t('warehousemanage.inputName')}`,
        label: `${t('warehousemanage.name')}`
    },
    {
        type: 'input',
        field: 'area',
        placeholder: `${t('warehousemanage.inputArea')}`,
        label: `${t('warehousemanage.area')}`,
    },
    {
        type: 'input',
        field: 'storageCapacity',
        placeholder: `${t('warehousemanage.inputStorageCapacity')}`,
        label: `${t('warehousemanage.storageCapacity')}`,
    },
    {
        type: 'input',
        field: 'supplierName',
        placeholder: `${t('warehousemanage.inputSupplierName')}`,
        label: `${t('warehousemanage.supplierName')}`
    },
    {
        type: 'input',
        field: 'loadingCapacity',
        placeholder: `${t('warehousemanage.inputLoadingCapacity')}`,
        label: `${t('warehousemanage.loadingCapacity')}`,
    },
    {
        type: 'input',
        field: 'unloadingCapacity',
        placeholder: `${t('warehousemanage.inputUnloadingCapacity')}`,
        label: `${t('warehousemanage.unloadingCapacity')}`,
    },
    {
        type: 'input',
        field: 'shippingCapacity',
        placeholder: `${t('warehousemanage.inputShippingCapacity')}`,
        label: `${t('warehousemanage.shippingCapacity')}`,
    },
    {
        type: 'input',
        field: 'contactName',
        placeholder: `${t('warehousemanage.inputContactName')}`,
        label: `${t('warehousemanage.contactName')}`,
    },
    {
        type: 'input',
        field: 'contactPhone',
        placeholder: `${t('warehousemanage.inputContactPhone')}`,
        label: `${t('warehousemanage.contactPhone')}`
    },
    {
        type: 'input',
        field: 'contactEmail',
        placeholder: `${t('warehousemanage.inputContactEmail')}`,
        label: `${t('warehousemanage.contactEmail')}`,
    },
])

const updateFormData = (val) => {
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
        try {
            const res = await WarehouseManageApi.getWarehouseList({ id })
            const country = await WarehouseManageApi.getAreaData({ id: 0 })
            if (res.countryId !== null) {
                let targetCountry = country.filter(item => item.id === res.countryId)
                // 国家名字
                let countryName = targetCountry[0].name
                console.log(countryName)
            }
            if (res.cityId !== null) {
                // 获取该国家下的所有城市
                const city = await WarehouseManageApi.getAreaData({ id: res.countryId })
                let targetCity = city.filter(item => item.id === res.cityId)
                // 国家名字
                // let cityName = targetCity[0].name
                console.log(city, targetCity, 'city')
            }
            formData.value = res
            console.log(formData.value, 'res')
            provinceId.value = formData.value.countryId
            cityId.value = formData.value.provinceId
            console.log(provinceId.value, cityId.value, 888)

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
    country: undefined,
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
        country: undefined,
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