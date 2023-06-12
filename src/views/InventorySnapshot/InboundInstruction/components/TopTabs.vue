<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.lable" :key="item.title" :name="item.name">

            <slot :name="item.name" v-if="(item.name !== 'waybill' || item.name !== 'boxInfo')">
                <div v-if="(item.name !== 'waybill' && item.name !== 'boxInfo')">
                    <SearchContent :formOption="formOptionHome" />
                    <TableContent />
                </div>
                <div v-else-if="item.name === 'waybill'">
                    <WayBillDatailInfo />
                </div>
                <div v-else>
                    <BoxDetailInfo />
                </div>
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import SearchContent from '../components/SearchContent.vue'
import TableContent from '../components/TableContent.vue'
import WayBillDatailInfo from '../DetailInboundInstruction/WayBillDetailInfo/index.vue'
import BoxDetailInfo from '../DetailInboundInstruction/BoxDetailInfo/index.vue'
const props = defineProps({
    tabList: {
        type: Array as any,
        default: () => []
    }
})

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

// 入库指令首页搜索框数据
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入SAP任务号',
        label: 'SAP任务号',
        rules: [
            { required: true, message: '请输入SAP任务号', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入预计入库时间',
        label: '预计入库时间',
        rules: [
            { required: true, message: '请输入预计入库时间', trigger: 'change' }
        ]
    }
])




const emit = defineEmits(['getTabState'])
const activeName = ref(props.tabList[0].name)
const handleClick = (tab) => {
    emit('getTabState', tab.props.name)
    console.log(tab.props.name, 'tab');

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
