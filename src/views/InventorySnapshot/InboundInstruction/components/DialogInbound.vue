<template>
  <ElDialog v-model="dialogVisible" :title="dialogTitle" width="400" center>
    <div ref="refDialog">
      <div>
        <div v-if="formType === '异常登记'">
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
import { ElButton, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { getIntDictOptions } from '@/utils/dict'
import * as InboundInstruction from '@/api/inventorysnapshot/inboundinstruction'

// 数据字典获取异常类型
const dictList = ref()
const getExceptionType = () => {
  dictList.value = getIntDictOptions('wh_inbound_exception')
}

onMounted(() => {
  getExceptionType()
})

const props = defineProps({
  inboundID: {
    type: String,
    default: ''
  },
  inboundIdsBox: {
    type: Array as any,
    default: () => []
  }
})

let recordData = ref({
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
    options: dictList,
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

// watch(() => props.inboundIdsBox, (val, preVal) => { console.log("message", val, preVal) }, { immediate: true })

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref()    // 表单内容



// 打开弹窗方法
const open = (type: string, title: string, content: string) => {
  reset()
  dialogVisible.value = true
  formType.value = type
  formData.value = content
  dialogTitle.value = title
}

const emit = defineEmits(['success'])

const submitForm = async () => {
  if (formType.value === '整批入库') {
    const res = await InboundInstruction.postAllInbound({ id: props.inboundID })
    if (res) {
      ElMessage.success('入库成功')
    } else {
      ElMessage.error('入库失败')
    }
  } else if (formType.value === '箱部分入库') {
    let ids = props.inboundIdsBox
    const res = await InboundInstruction.postPartInboundBox({ ids })
    if (res) {
      ElMessage.success('入库成功')
    } else {
      ElMessage.error('入库失败')
    }
  } else if (formType.value === '托部分入库') {
    let ids = props.inboundIdsBox
    const res = await InboundInstruction.postPartInboundTray({ ids })
    if (res) {
      ElMessage.success('入库成功')
    } else {
      ElMessage.error('入库失败')
    }
  } else if (formType.value === '异常登记' && formData.value === '箱') {
    let params = {
      ids: props.inboundIdsBox,
      exceptionId: recordData.value.exception,
      exceptionStatus: recordData.value.exceptionStatus
    }
    const res = await InboundInstruction.recordErrorTray(params)
    if (res) {
      ElMessage.success('异常登记成功')
    } else {
      ElMessage.error('异常登记失败')
    }
  } else if (formType.value === '异常登记' && formData.value === '托') {
    let params = {
      ids: props.inboundIdsBox,
      exceptionId: recordData.value.exception,
      exceptionStatus: recordData.value.exceptionStatus
    }
    const res = await InboundInstruction.recordErrorTray(params)
    if (res) {
      ElMessage.success('入库成功')
    } else {
      ElMessage.error('入库失败')
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