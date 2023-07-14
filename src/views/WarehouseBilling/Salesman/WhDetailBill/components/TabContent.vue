<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="费用明细" name="add">
            <TabTable :id="props.id" @successApr="successApr" />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TabTable from './TabTable.vue';

const props = defineProps({
    id: {
        type: Number
    }
})

const activeName = ref('add')

const emits = defineEmits(['successApr'])
const successApr = () => {
    emits('successApr')
}

const handleClick = (tab, event: Event) => {
    console.log(tab, event)
}

</script>
<style lang="scss" scoped></style>
