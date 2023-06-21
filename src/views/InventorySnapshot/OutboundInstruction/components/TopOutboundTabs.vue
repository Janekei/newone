<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.lable" :key="item.title" :name="item.name" v-loading="loading">
            <slot :name="item.name" v-if="activeName === item.name">
                <OutboundList />
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import OutboundList from './OutboundList.vue';


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
const handleClick = () => {
    // console.log(tab)
}

</script>
<style lang="scss" scoped></style>
