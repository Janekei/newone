<template>
    <Dialog v-model="dialogVisible" :title="dialogTitle" :fullscreen="false" ref="uploadRef" width="500" :scroll='false'>
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖到此处，或 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    仅允许导入xls、xlsx格式文件,
                    <el-link class="link" type="primary">下载模板</el-link>
                </div>
            </template>
        </el-upload>
        <template #footer>
            <div class="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button :disabled="formLoading" type="primary" @click="toClose">确 定</el-button>
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" name="FeeDataWin" setup>
import { ref } from 'vue'


const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改



/** 打开弹窗 */
const open = async (type: string) => {
    dialogVisible.value = true
    dialogTitle.value = '计费规则模板导入'
    formType.value = type
}
defineExpose({ open })

//关闭弹窗时
const toClose = () => {

}
</script>

<style lang="scss" scoped>
.warning-info {
    display: flex;
    justify-content: center;
    align-items: center;

    .warning-icon {
        width: 52px;
        height: 47px;
        margin-right: 20px;
    }

    .warning-text {
        width: 250px;
        font-size: 18px;
        color: red;
    }
}

.update-info {
    display: flex;
    justify-content: center;
    align-items: center;

    .update-template-info {
        margin-top: 30px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .update-template-btn {
        text-decoration: underline;
        color: blue;
        cursor: pointer;
    }

    .update-file-info {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-top: 20px;
    }
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.el-icon--upload) {
    color: #2cace3;
}

:deep(.el-upload__tip) {
    margin-top: .625rem;
    text-align: center;
    vertical-align: bottom;
    color: #333;
    font-size: 14px;
}
</style>