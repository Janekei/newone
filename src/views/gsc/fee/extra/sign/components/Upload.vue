<template>
    <div>
        <el-upload ref="uploadRef" style="{font-size: 18px;}" :action="url" :headers="uploadHeaders" :show-file-list="false"
            :limit="1" :auto-upload="true" :on-success="handleSuccess" :on-exceed="handleExceed">{{ props.text }}
        </el-upload>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getTenantId, getAccessToken } from '@/utils/auth'
import type { UploadProps } from 'element-plus'
const props = defineProps({
    text: {
        type: String,
        default: '上传'
    }
})

const url = import.meta.env.VITE_UPLOAD_URL
const uploadHeaders = ref({
    Authorization: 'Bearer ' + getAccessToken(),
    'tenant-id': getTenantId()
})
const uploadRef = ref()

const emits = defineEmits(['getFileUrl', 'uploadSuccess'])



const handleSuccess: UploadProps['onSuccess'] = (response) => {
    // 提交请求
    uploadRef.value!.submit()
    emits('getFileUrl', response.data)
    emits('uploadSuccess')
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    uploadRef.value!.handleStart(files[0])
    uploadRef.value!.submit()
}


</script>
<style scoped></style>
