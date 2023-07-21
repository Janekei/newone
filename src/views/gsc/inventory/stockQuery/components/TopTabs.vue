<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in props.tabList" :label="item.title + '(' + item.number + ')'" :key="item.title"
            :name="item.title">
            <slot :name="item.title" v-if="activeName === item.title">
                <TableContent :stockStatus="index" />
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import TableContent from '../components/TableContent.vue'
const props = defineProps({
    tabList: {
        type: Array as any,
        default: () => []
    }
})

onMounted(() => {
    console.log(props.tabList, 9090)
})

let activeName = ref(props.tabList[0].title)

const handleClick = (tab) => {
    activeName.value = tab.props.name
}


</script>
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 1.75rem;

    background-color: #6b778c;
}
</style>
