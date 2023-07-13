<template>
    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="700" center>
        <div ref="refDialog">
            <div>
                <div v-if="formType === '绑定车辆'">
                    <FormK :formOption="formOption" v-model:formState="recordData" labelWidth="6em" ref="formRef" />
                </div>
                <div v-else class="formContent">{{ formData }}</div>
            </div>
        </div>
        <template #footer>
            <el-button type="primary" :disabled="formLoading" @click="submitForm">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </ElDialog>
</template>

<script lang="ts" setup>
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { ref, nextTick } from 'vue'
import * as OutboundInstruction from '@/api/inventorysnapshot/outboundinstruction'

const route = useRoute()
const router = useRouter()
let outboundId = route.query.outboundid || route.query.id;

const props = defineProps({
    ids: {
        type: Array as any,
        default: () => []
    },
    goodsId: {
        type: Number,
        default: 0
    },
    boxGoodsId: {
        type: Array as any,
        default: () => []
    },
    id: {
        type: String,
        default: () => ''
    },
    outIds: {
        type: Array as any,
        default: () => []
    }
})


let recordData = ref({
    id: undefined,
    carNumBefore: undefined,
    carOwnerName: undefined,
    carType: undefined,
    ownerCompany: undefined,
    carLong: undefined
})

// 车辆信息回显
// let carData = ref({
//     id: undefined,
//     carNumBefore: undefined,
//     carOwnerName: undefined,
//     carType: undefined,
//     ownerCompany: undefined,
//     carLong: undefined
// })
const getCartPage = async (carNumBefore) => {
    const res = await OutboundInstruction.getCartPage({ carNumBefore })
    recordData.value = res.list[0]
    console.log(res, 77777)
}


// 绑定车辆表单
const formRef = ref()
var disabled = ref(true)
const formOption = reactive([
    {
        type: 'inputTable',
        field: 'carNumBefore',
        placeholder: '请输入车牌号',
        label: '车牌号',
        rules: [
            { required: true, message: '请输入车牌号', trigger: 'change' }
        ],
        clearData: () => {
            formRef.value.resetFields()
        },
        setFormData: (row) => {
            recordData.value["id"] = row.id;
            recordData.value["carNumBefore"] = row.carNumBefore;
            recordData.value["carOwnerName"] = row.carOwnerName;
            recordData.value["ownerCompany"] = row.ownerCompany;
            recordData.value["carType"] = row.carType;
            recordData.value["carLong"] = row.carLong;
        },
        valueKey: 'carNumBefore',
        tableConfig: {
            params: {},
            url: '/gsc/vehicleEntity/page',
            tableOption: [{
                prop: 'carNumBefore',
                label: '车牌'
            }, {
                prop: 'carOwnerName',
                label: '车主'
            }]
        },
        // disabled: computed(() => {
        //     return disabled.value
        // })
    },
    {
        type: 'input',
        field: 'carOwnerName',
        placeholder: '请输入车主姓名',
        label: '车主姓名',
        disabled: computed(() => {
            return disabled.value
        })
    },
    {
        type: 'input',
        field: 'ownerCompany',
        placeholder: '请输入所属公司',
        label: '所属公司',
        disabled: computed(() => {
            return disabled.value
        })
    },
    {
        type: 'input',
        field: 'carType',
        placeholder: '请输入车辆类型',
        label: '车辆类型',
        disabled: computed(() => {
            return disabled.value
        })
    },
    {
        type: 'input',
        field: 'carLong',
        placeholder: '请输入车长',
        label: '车长',
        disabled: computed(() => {
            return disabled.value
        })
    },
])


// 表单内容区域
let dialogVisible = ref(false) // 弹窗的是否展示
let dialogTitle = ref('') // 弹窗的标题
let formType = ref()
let formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
let formData = ref()    // 表单内容


// 打开弹窗方法
const open = (type: string, title: string, content?: string, carNum?) => {
    if (carNum) {
        let flag = ref(true);
        carNum.forEach(item => {
            carNum.forEach(ele => {
                if (ele !== item) {
                    flag.value = false
                }
            })
        })
        if (flag.value && carNum[0] !== null) {
            getCartPage(carNum[0])
        }
    }
    dialogVisible.value = true
    formType.value = type
    formData.value = content
    dialogTitle.value = title
    reset()
}

const emit = defineEmits(['success'])

const submitForm = async () => {
    if (formType.value === '托拣货') {
        const res = await OutboundInstruction.trayPickGoods({ ids: props.ids, outboundGoodsId: props.goodsId, outboundId })
        if (res) {
            ElMessage.success('拣货成功')
            router.push({ path: '/InventorySnapshot/pickgoods' })
        }
    } else if (formType.value === '箱拣货') {
        const res = await OutboundInstruction.boxPickGoods({ ids: props.ids, outboundId })
        if (res) {
            ElMessage.success('拣货成功')
            router.push({ path: '/InventorySnapshot/pickgoods' })
        }
    } else if (formType.value === '出库') {
        const res = await OutboundInstruction.postOutboundList({ ids: props.outIds })
        if (res) {
            ElMessage.success('出库成功')
        } else {
            ElMessage.success('出库失败')
        }
    } else if (formType.value === '绑定车辆') {
        if (recordData.value.carNumBefore !== undefined) {
            const res = await OutboundInstruction.bindCart({ ids: props.outIds, numberPlate: recordData.value.carNumBefore, driverId: recordData.value.id })
            if (res) {
                ElMessage.success('绑定车辆成功')
            } else {
                ElMessage.success('绑定车辆失败')
            }
        } else {
            ElMessage.error('请输入车辆信息')
        }
    }
    reset()
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
}

defineExpose({
    open
})
const reset = async () => {
    recordData.value = {
        id: undefined,
        carNumBefore: undefined,
        carOwnerName: undefined,
        carType: undefined,
        ownerCompany: undefined,
        carLong: undefined
    }
    await nextTick()
}

</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header,
.el-dialog__header {
    border: none !important;
}

.content {
    width: 100%;
    text-align: center;
    font-size: 1.125rem;
    color: #333;
}

.formContent {
    width: 100%;
    text-align: center;
    margin: 0 auto;
}
</style>