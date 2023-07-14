<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1300">
        <div class="form-box">
            <EditForm />
        </div>
        <TabContent />
        <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref } from 'vue'
import EditForm from './EditForm.vue';
import TabContent from './TabContent.vue';

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    dialogVisible.value = true
    dialogTitle.value = '基本信息'
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
    align-items: center;
}

.text {
    display: inline-block;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
}
</style>
