<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.lable" :key="item.title" :name="item.name" v-loading="loading">
            <slot :name="item.name" v-if="activeName === item.name">
                <div v-if="(item.name !== 'waybill' && item.name != 'materialInfo')">
                    <OutboundList />
                </div>
                <div v-else-if="item.name === 'waybill'">
                    <WayBillInfo />
                </div>
                <div v-else>
                    <MaterialInfo />
                </div>
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import OutboundList from './OutboundList.vue';
import WayBillInfo from '../OutboundDetail/WayBillInfo/index.vue'
import MaterialInfo from '../OutboundDetail/MaterialInfo/index.vue'


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
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
}
