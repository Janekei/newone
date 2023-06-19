<template>
  <ElDialog v-model="dialogVisible" :title="dialogTitle" width="400" center>
    <div ref="refDialog" class="content">
      {{ formData }}
    </div>
    <div class="formContent">
      <slot name="formError"></slot>
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
import * as InboundInstruction from '@/api/inventorysnapshot/inboundinstruction'

const props = defineProps({
  inboundID: {
    type: Number,
    default: 0
  },
  inboundIdsBox: {
    type: Array,
    required: true,
    default: () => []
  }
})

watch(() => props.inboundIdsBox, (val, preVal) => { console.log("message", val, preVal) }, { immediate: true })

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref()    // 表单内容


// 打开弹窗方法
const open = async (type: string, title: string, content: string) => {
  dialogVisible.value = true
  formType.value = type
  formData.value = content
  dialogTitle.value = title
}

const submitForm = async () => {
  if (formType.value === '整批入库') {
    const res = await InboundInstruction.postAllInbound({ id: props.inboundID })
    console.log(res)
  } else if (formType.value === '箱部分入库') {
    console.log(props, 'props')
    console.log(props.inboundIdsBox, 'props.inboundIdsBox')
    // const res = await InboundInstruction.postPartInboundBox({ ids: props.inboundIdsBox })
    // console.log(res, '箱部分入库')
  }
  dialogVisible.value = true
}
defineExpose({
  open
})


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
  margin: 0 auto;
}
</style>