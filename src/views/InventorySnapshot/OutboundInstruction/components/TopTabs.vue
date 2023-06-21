<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabList" :label="item.lable" :key="item.title" :name="item.name"
            v-loading="loading">
            <slot :name="item.name" v-if="activeName === item.name">
                {{ item.name }}
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'


const props = defineProps({
    tabList: {
        type: Array as any,
        default: () => []
    }
})

const loading = ref(false)
let activeName = ref(props.tabList[0].name)


// 过滤tabList数据
const tabList = computed(() => {
    let data: any = []
    if (props.tabList[0].hasOwnProperty('number')) {
        props.tabList.forEach(item => {
            data.push({
                title: item.title,
                lable: item.title + '（' + item.number + '）',
                name: item.name,
                number: item.number
            })
        });
        return data;
    }
    props.tabList.forEach(item => {
        data.push({
            title: item.title,
            lable: item.title,
            name: item.name
        })
    });
    return data;
})





// 选中的tab触发
const handleClick = (tab) => {
    console.log(tab)
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
