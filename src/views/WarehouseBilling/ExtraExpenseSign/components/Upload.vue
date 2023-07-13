<template>
    <div>
        <el-upload ref="uploadRef" style="{font-size: 18px;}" :action="url" :headers="uploadHeaders" :show-file-list="false"
            :limit="1" :auto-upload="true" :on-success="handleSuccess">上传
        </el-upload>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getTenantId, getAccessToken } from '@/utils/auth'
import type { UploadProps } from 'element-plus'

const url = import.meta.env.VITE_UPLOAD_URL
const uploadHeaders = ref({
    Authorization: 'Bearer ' + getAccessToken(),
    'tenant-id': getTenantId()
})
const uploadRef = ref()

const emits = defineEmits(['getFileUrl'])

const handleSuccess: UploadProps['onSuccess'] = (response) => {
    // 提交请求
    console.log(response, 9988)
    unref(uploadRef)?.submit()
    emits('getFileUrl', response.data)
}
</script>
<style scoped></style>
