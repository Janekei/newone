<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="费用明细" name="add">
            <TabTable :tableRef="props.tableRef" @successApr="successApr" @sendDetail="sendDetail" />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TabTable from './TabTable.vue';
const props = defineProps({
    tableRef: {
        type: Object
    }
})

const emits = defineEmits(['successApr', 'sendDetail'])
const successApr = () => {
    emits('successApr')
}
const sendDetail = (data) => {
    emits('sendDetail', data)
}
const activeName = ref('add')

const handleClick = (tab, event: Event) => {
    console.log(tab, event)
}

</script>
<style lang="scss" scoped></style>
