<template>
    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="400" center>
        <div ref="refDialog">
            <div>
                <div v-if="formType === '绑定车辆'">
                    绑定车辆
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
import { ElButton, ElDialog } from 'element-plus'
import { ref } from 'vue'

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
        type: Number,
        default: 0
    }
})


// 表单内容区域
let dialogVisible = ref(false) // 弹窗的是否展示
let dialogTitle = ref('') // 弹窗的标题
let formType = ref()
let formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
let formData = ref()    // 表单内容


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
        // const res = await OutboundInstruction.trayPickGoods({ ids: props.ids, goodsId: props.goodsId, outboundId })
        // if (res) {
        //     console.log('托维度物料信息拣货', res)
        router.push({ path: '/InventorySnapshot/pickgoods', query: { outboundid: outboundId } })
        // }
    } else if (formType.value === '箱拣货') {
        const res = await OutboundInstruction.boxPickGoods({ goodsId: props.ids, outboundId })
        if (res) {
            console.log('托维度物料信息拣货', res)
            router.push({ path: '/InventorySnapshot/pickgoods', query: { outboundid: outboundId } })
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