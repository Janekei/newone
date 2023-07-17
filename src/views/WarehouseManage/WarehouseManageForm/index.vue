<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="1200">
        <div class="form-box">
            {{ formData }}
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="9rem" ref="formRef"
                   @update:formState="updateFormData" >
              longitude
              <template #longitude>
                <el-input
                  type="number"
                  oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(value >90) value = 90;  if(!/^[0-9]+$/.test(value)) if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                  v-model="formData.longitude"
                  placeholder=""/>
              </template>
              <template #latitude>
                <el-input
                  type="number"
                  oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(value >180) value = 180;  if(!/^[0-9]+$/.test(value)) if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                  v-model="formData.latitude"
                  placeholder=""/>
              </template>
            </FormK>
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
let disProvince = ref(true)
let cityId = ref()
let disCity = ref(true)

// var disabled = ref(true)
const formOption = reactive([
    {
        type: 'inputTable',
        field: 'countryName',
        placeholder: '请输入国家',
        label: '国家',
        modelValue: 'name',
        rules: [
            { required: true, message: '请输入国家', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
            formData.value['countryName'] = undefined
            formData.value['countryId'] = undefined
            provinceId.value = undefined
            disProvince.value = true
        },
        setFormData: (row) => {
            formData.value['countryName'] = row.name
            formData.value['countryId'] = row.id
            provinceId.value = row.id
            setProvinceId()
            disProvince.value = false
        },
        tableConfig: {
            params: { id: 0 },
            url: '/bidding/area/location/findCountry',
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
      field: 'provinceName',
      placeholder: '请输入省份',
      label: '省份',
      rules: [
        { required: true, message: '请输入省份', trigger: 'change' }
      ],
      valueKey: 'name',
      clearData: () => {
        formData.value['provinceName'] = undefined
        formData.value['provinceId'] = undefined
        formData.value['cityName'] = undefined
        formData.value['cityId'] = undefined
        cityId.value = undefined
        disCity.value = true
      },
      setFormData: (row) => {
        formData.value['provinceName'] = row.name
        formData.value['provinceId'] = row.id
        cityId.value = row.id
        setCityId()
        disCity.value = false
      },
      tableConfig: {
        params: { id: provinceId.value ? provinceId.value : 1 },
        url: '/bidding/area/location/findCountry',
        tableOption: [
          {
            prop: 'name',
            label: '省份'
          },
          {
            props: 'id',
            label: 'Code'
          }
        ]
      },
      disabled: computed(() => {
        return disProvince.value
      })
    },
    {
        type: 'inputTable',
        field: 'tableCity',
        placeholder: '请输入城市',
        label: '城市',
        clearData: () => {
            formData.value['cityName'] = undefined
            formData.value['cityId'] = undefined
        },
        rules: [
            { required: true, message: '请输入城市', trigger: 'change' }
        ],
        valueKey: 'name',
        setFormData: (row) => {
            formData.value['cityName'] = row.name
            formData.value['cityId'] = row.id
        },
        tableConfig: {
            params: { id: cityId.value ? cityId.value : 1 },
            url: '/bidding/area/location/findCountry',
            tableOption: [
              {
                prop: 'name',
                label: '城市'
              },
              {
                props: 'id',
                label: 'Code'
              }
            ]
        },
        disabled: computed(() => {
            return disCity.value
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
        // type: 'input',
        // field: 'longitude',
        // placeholder: `${t('warehousemanage.inputLongitude')}`,
        label: `${t('warehousemanage.longitude')}`,
        slotName: 'longitude',
        // oninput: "if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);",
        rules: [
            { required: true, message: `${t('warehousemanage.inputLongitude')}`, trigger: 'change' }
        ]
    },
    {
        // type: 'input',
        // field: 'latitude',
        // placeholder: `${t('warehousemanage.inputLatitude')}`,
        label: `${t('warehousemanage.latitude')}`,
        slotName: 'latitude',
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

//设置省份的params
const setProvinceId = () => {
  formOption[1].tableConfig.params = {id: provinceId.value}
}

//设置城市的params
const setCityId = () => {
  formOption[2].tableConfig.params = {id: cityId.value}
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
            formData.value = res
            provinceId.value = formData.value.countryId
            cityId.value = formData.value.provinceId
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

watch(
  () => formOption,
  (newProvinceId) => {
    console.log('provinceId.value',newProvinceId)
  },
  {
    deep: true,
    immediate: true
  }
)

</script>

<style lang="scss" scoped></style>