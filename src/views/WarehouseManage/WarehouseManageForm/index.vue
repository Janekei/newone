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
import * as ZoneManageApi from '@/api/zonemanage'
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
    }, {
        type: 'select',
        field: 'bsWhareaId',
        placeholder: '请选择仓库区域',
        requestOptions: {
            url: '/jinkotms/baseWharea/page',
            method: 'get',
            params: {
                pageInfo: {
                    pageSize: 100,
                    pageNo: 1
                }
            },
            handleOptions: (res: any) => {
                return res.list.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },
        label: '仓库区域',
        rules: [
            { required: true, message: '请选择区域', trigger: 'blur' }
        ]
    }
])

const updateFormData = (val) => {
    formData.value = val
    // 过滤区域选择器的数据
    zoneList.forEach(item => {
        if (item.id == formData.value.bsWhareaId) {
            formData.value.bsWhareaCode = item.code
            formData.value.bsWhareaName = item.name
        }
    })
}

//获取下拉框数据
let zoneList: any = reactive([])
const getZoneList = async () => {
    // 获取区域数据
    const pageInfo = {
        pageNo: 1,
        pageSize: 100
    }
    const res = await ZoneManageApi.getZoneList(pageInfo)
    zoneList = res.list
    console.log(zoneList, 'zoneList')

}


// 表单Ref
const formRef = ref()

// 打开弹窗方法
const open = async (type: string, id?: number) => {
    resetForm()
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '仓库信息'
    getZoneList()
    if (id) {
        formLoading.value = true
        try {
            formData.value = await WarehouseManageApi.getWarehouseList({ id })
            // 过滤区域选择器的数据
            zoneList.forEach(item => {
                if (item.id == formData.value.bsWhareaId) {
                    formData.value.bsWhareaCode = item.code
                    formData.value.bsWhareaName = item.name
                }
            })
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
    if (formType.value === '增加') {
        // 处理下拉框数据
        zoneList.forEach(item => {
            if (item.id == formData.value.bsWhareaId) {
                formData.value.bsWhareaCode = item.code
                formData.value.bsWhareaName = item.name
            }
        })
        const res = await WarehouseManageApi.addWarehouseItem(formData.value)
        if (res.code === 0) {
            ElMessage.success('新增仓库信息成功')
            resetForm()
        } else {
            ElMessage.error(res.msg)
        }
    } else {

    }
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