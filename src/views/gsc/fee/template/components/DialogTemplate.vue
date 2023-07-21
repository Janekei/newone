<template>
    <Dialog v-model="dialogVisible" ref="downloadRef" :title="dialogTitle" width="400">
        <div class="form-box">
            <WarningFilled style="display:inline;width: 2em; height: 2em; margin-right: 8px;color:#E6A23C" />
            <span class="text">是否确认导出当前页面数据？</span>
        </div>
        <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { WarningFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    dialogVisible.value = true
    dialogTitle.value = '系统提示'

}

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
const submitForm = () => {
    dialogVisible.value = false
    // 发送操作成功的事件
    emits('success')
}



defineExpose({
    open
})



</script>
<style lang="scss" scoped>
.form-box {
    display: flex;
    justify-content: center;
}

.text {
    display: inline-block;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
}
</style>
