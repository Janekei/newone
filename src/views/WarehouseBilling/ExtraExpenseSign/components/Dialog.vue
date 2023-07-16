<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="1200">
        <div class="form-box">
            <EditForm @success="success" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref } from 'vue'
import EditForm from './EditForm.vue';


// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题

const open = async () => {
    dialogVisible.value = true
    dialogTitle.value = '基本信息'
}

watch(() => dialogVisible.value, (newVal) => { if (newVal === false) emits('success') })
// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
// const submitForm = () => {
//     dialogVisible.value = false
//     // 发送操作成功的事件
//     emits('success')
// }

const success = () => {
    dialogVisible.value = false
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
