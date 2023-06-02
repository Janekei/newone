<template>
    <el-dialog v-model="state" :title="props.title" width="30%" destroy-on-close center>
        <span>{{ content }} </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state = false">{{ props.cancleText }}</el-button>
                <el-button type="primary" @click="state = false">
                    {{ props.confirmText }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    title: {
        type: String
    },
    content: {
        type: String
    },
    confirmText: {
        type: String
    },
    cancleText: {
        type: String
    },
    isOpen: {
        type: Boolean
    }
})

const state = JSON.parse(JSON.stringify(props.isOpen))
const centerDialogVisible = ref(false)
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>