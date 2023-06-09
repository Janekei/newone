<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.title + '（' + item.number + '）'" :key="item.title"
            :name="item.name">
            <slot :name="item.name">
                <SearchContent />
                <TableContent />
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import SearchContent from '../components/SearchContent.vue'
import TableContent from '../components/TableContent.vue'

const tabList = reactive([
    { title: '全部', name: 'all', number: 30 },
    { title: '7日内库存', name: 'wdg', number: 12 },
    { title: '7到30日内库存', name: 'wqg', number: 6 },
    { title: '30日外库存', name: 'qgz', number: 13 }
])


const emit = defineEmits(['getTabState'])

const activeName = ref(tabList[0].name)
// console.log(tabList)


const handleClick = (tab) => {
    // console.log(tab.props.name, event)
    emit('getTabState', tab.props.name)
}
</script>
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 1.75rem;

    background-color: #6b778c;
}

::v-deep .el-tabs__nav>.el-tabs__item {
    color: #409EFF;
    background-color: #fff;
    font-family: "PingFang SC";
    border: none;
    border-top: .125rem solid #409EFF !important;
}

::v-deep .el-tabs__header .el-tabs__nav {
    border: none;
}

::v-deep .el-tabs__header {
    border: none !important;
}

::v-deep .el-tabs__nav>.is-active {
    border: 0.0625rem solid #409EFF !important;
    border-top: .375rem solid #409EFF !important;
}
</style>
