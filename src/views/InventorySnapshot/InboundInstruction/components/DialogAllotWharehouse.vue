<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" width="700" center>
        <div ref="refDialog">
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="6em" ref="formRef" />
        </div>
        <template #footer>
            <el-button type="primary" :disabled="formLoading" @click="submitForm">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { Dialog } from '@/components/Dialog'
import { ref } from 'vue'
// import * as InboundInstruction from '@/api/inventorysnapshot/inboundinstruction'


defineProps({

})

let formData = ref({})
const formOption = reactive([
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '请输入仓库名称',
        label: '仓库名称',
        rules: [
            { required: true, message: '请输入起运国', trigger: 'change' }
        ],
        valueKey: 'name',
        tableConfig: {
            url: '/jinko/baseWarehouse/page',
            tableOption: [
                {
                    prop: 'name',
                    label: '仓库名'
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
        field: 'countryName',
        placeholder: '',
        label: '国家',
        disabled: true
    },
    {
        type: 'input',
        field: 'provinceName',
        placeholder: '',
        label: '省份',
    },
    {
        type: 'input',
        field: 'cityName',
        placeholder: '',
        label: '城市',
    },
    {
        type: 'input',
        field: 'address',
        placeholder: '',
        label: '具体地址',
    },
    {
        type: 'input',
        field: 'zipCode',
        placeholder: '',
        label: 'zip code',
    },
])


// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用



// 打开弹窗方法
const open = (title: string) => {
    reset()
    dialogVisible.value = true
    dialogTitle.value = title
}

const emit = defineEmits(['success'])

const submitForm = async () => {

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