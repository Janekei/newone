<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.lable" :key="item.title" :name="item.name" v-loading="loading">
            <slot :name="item.name">
                <div v-if="(item.name !== 'waybill' && item.name !== 'boxInfo')">
                    <SearchContent :formOption="formOptionHome" />
                    <TableContent />
                </div>
                <div v-else-if="item.name === 'waybill'">
                    <WayBillDatailInfo :boxDetailInfo="props.boxDetailInfo" @clickPart="swicthPartInboud"
                        @clickError="swicthErrorOrder" />
                </div>
                <div v-else>
                    <BoxDetailInfo ref="trayRef" :boxDetailInfo="props.boxDetailInfo" :showPartInboud="showPartInboud"
                        :showErrorInboud="showErrorInboud" :isClickPartInboundBtn="isClickPartInboundBtn"
                        :isClickErrorBtn="isClickErrorBtn" @backWay="backWay" />
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
    },
    boxDetailInfo: {
        type: Array as any,
        default: () => []
    }
})

const loading = ref(false)
let activeName = ref(props.tabList[0].name)
onMounted(() => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 800);
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

const trayRef = ref()



// 接收点击部分入库按钮状态
let isClickPartInboundBtn = ref(false)
let isClickErrorBtn = ref(false)
let showPartInboud = ref(false)
let showErrorInboud = ref(false)
const swicthPartInboud = (val) => {
    console.log(val, 'clickswicthPartInboud')
    activeName.value = 'boxInfo'
    showPartInboud.value = true
    isClickPartInboundBtn.value = true
}

// 接收点击异常订单按钮状态
const swicthErrorOrder = (val) => {
    console.log(val, 'clickswicthErrorOrder')
    activeName.value = 'boxInfo'
    showErrorInboud.value = true
    isClickErrorBtn.value = true
}


// 选中的tab触发
const handleClick = (tab) => {
    trayRef.value[0].switchChooseTray()
    activeName.value = tab.props.name
    if (tab.props.name === 'waybill') {
        showPartInboud.value = false
        showErrorInboud.value = false
        isClickPartInboundBtn.value = false
        isClickErrorBtn.value = false
    }
}

// 触发异常订单、部分入库的返回按钮，返回到运单信息页面
const backWay = () => {
    activeName.value = 'waybill'
    showPartInboud.value = false
    showErrorInboud.value = false
    isClickPartInboundBtn.value = false
    isClickErrorBtn.value = false
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
