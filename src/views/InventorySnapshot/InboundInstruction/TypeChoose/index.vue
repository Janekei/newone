<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.title + '（' + item.number + '）'" :key="item.title"
            :name="item.name">
            <slot :name="item.name">{{ item.name }}</slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'

const tabList = reactive([
    { title: '全部', name: 'all', number: 30 },
    { title: '未到港', name: 'wdg', number: 12 },
    { title: '未清关', name: 'wqg', number: 6 },
    { title: '清关中', name: 'qgz', number: 13 },
    { title: '清关完成', name: 'qgwc', number: 6 },
])

const emit = defineEmits(['getTabState'])

const activeName = ref(tabList[0].name)
// console.log(tabList)


const handleClick = (tab) => {
    // console.log(tab.props.name, event)
    emit('getTabState', tab.props.name)
}
</script>
<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 1.75rem;
    font-weight: 600;
    background-color: #6b778c;
}

::v-deep .el-tabs__nav {
    background-color: #fff;
    border: 0.0625rem solid #02A7F0 !important;
}

::v-deep .is-active {
    background-color: #CEEEFC;
    // border: 0.0625rem solid #02A7F0 !important;
    border: none !important;
}
</style>
