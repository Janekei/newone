<template>
    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="400" center>
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
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import * as OutboundInstruction from '@/api/inventorysnapshot/outboundinstruction'

const route = useRoute()
const router = useRouter()
let outboundId: number = parseInt(JSON.parse(route.query.id as any));

const props = defineProps({
    ids: {
        type: Array as any,
        default: () => []
    },
    goodsId: {
        type: Number,
        default: 0
    }
})

const recordData = ref({
    ids: undefined,
    exception: undefined,
    exceptionStatus: undefined
})
const formOption = reactive([
    {
        type: 'select',
        field: 'exception',
        placeholder: '请选择异常类型',
        label: '异常类型',
        options: [
            { label: '货量破损', value: 0 },
            { label: '数量短缺', value: 1 },
            { label: '型号不符', value: 2 }
        ],
        rules: [
            { required: true, message: '请选择异常类型', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'exceptionStatus',
        placeholder: '请输入内容',
        label: '其他类型'
    },
])


// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref()    // 表单内容


// 打开弹窗方法
const open = (type: string, title: string, content?: string) => {
    reset()
    dialogVisible.value = true
    formType.value = type
    formData.value = content
    dialogTitle.value = title
}

const emit = defineEmits(['success'])

const submitForm = async () => {
    if (formType.value === '托拣货') {
        const res = await OutboundInstruction.trayPickGoods({ ids: props.ids, goodsId: props.goodsId, outboundId })
        if (res) {
            console.log('托维度物料信息拣货', res)
            router.push({ path: '/InventorySnapshot/pickgoods' })
        }
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
}

defineExpose({
    open
})

const reset = () => {
    recordData.value = {
        ids: undefined,
        exception: undefined,
        exceptionStatus: undefined
    }
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