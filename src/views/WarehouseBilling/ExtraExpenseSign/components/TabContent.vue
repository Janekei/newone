<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="新增费用明细" name="add">
            <TabTable :basicData="props.basicData" @success="success" />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TabTable from './TabTable.vue';
const props = defineProps({
    basicData: {
        type: Object,
        default: () => { }
    }
})

const activeName = ref('add')

const handleClick = (tab, event: Event) => {
    console.log(tab, event)
}

const emits = defineEmits(['success'])
const success = () => {
    emits('success')
}
</script>
<style lang="scss" scoped></style>
