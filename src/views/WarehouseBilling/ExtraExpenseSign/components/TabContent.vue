<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="新增费用明细" name="add">
            <TabTable />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TabTable from './TabTable.vue';
const activeName = ref('add')

const handleClick = (tab, event: Event) => {
    console.log(tab, event)
}

</script>
<style lang="scss" scoped></style>
