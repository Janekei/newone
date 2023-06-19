<template>
    <div>
        <SearchContent :formOption="formOptionBox" />
        <PartBoxInbound v-if="(showPartInboud && showErrorInboud === false && isShowTray === false) && iscloseTray"
            @backWaybill="backWaybill" @showTrayList="showTrayList" />
        <AbnormalInbound v-else-if="(showPartInboud === false && showErrorInboud && isShowTray === false) && iscloseTray"
            @backWaybill="backWaybill" @showTrayList="showTrayList" />
        <AllBoxInfo :boxDetailInfo="props.boxDetailInfo"
            v-else-if="(showPartInboud === false && showErrorInboud === false && isShowTray === false) && iscloseTray" />
        <ChooseTray v-else :isClickPartInboundBtn="props.isClickPartInboundBtn" :isClickErrorBtn="props.isClickErrorBtn"
            @update:changeCloseTray="closeChooseTray" :iscloseTray="iscloseTray" :containerId="containerId" />
    </div>
</template>

<script lang="ts" setup>
import SearchContent from '../../components/SearchContent.vue'
import AllBoxInfo from './BoxPageSwitching/AllBoxInfo.vue'
import PartBoxInbound from './BoxPageSwitching/PartBoxInbound.vue'
import AbnormalInbound from './BoxPageSwitching/AbnormalInbound.vue'
import ChooseTray from './BoxPageSwitching/ChooseTray.vue'
// 柜信息搜索框数据
const props = defineProps({
    boxDetailInfo: {
        type: Array as any,
        default: () => []
    },
    showPartInboud: {
        type: Boolean,
        default: false
    },
    showErrorInboud: {
        type: Boolean,
        default: false
    },
    isClickPartInboundBtn: {
        type: Boolean,
        default: false
    },
    isClickErrorBtn: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['backWay'])

// 返回运单信息页面
const backWaybill = () => {
    emits('backWay', true)
}

// 显示对应箱的托盘纬度的列表
let isShowTray = ref(false)
let iscloseTray = ref(true)  // 是否隐藏选托页面
// 获取到所获取到的箱ID
let containerId = ref()
const showTrayList = (val) => {
    console.log(val, 'show')
    containerId = val
    isShowTray.value = true
    iscloseTray.value = false
}

// 关闭部分入库的托盘列表页面
const closeChooseTray = (val) => {
    isShowTray.value = false
    iscloseTray.value = val
}

const switchChooseTray = () => {
    isShowTray.value = false
    iscloseTray.value = true
}
defineExpose({
    iscloseTray,
    switchChooseTray,
    closeChooseTray
})

// 表格列
const formOptionBox = reactive([
    {
        type: 'input',
        field: 'boxNo',
        placeholder: '请填写箱号',
        label: '箱号',
        rules: [
            { required: true, message: '请填写箱号', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入锁号',
        label: '锁号',
        rules: [
            { required: true, message: '请填写锁号', trigger: 'change' }
        ]
    }
])


</script>
<style lang="scss" scoped></style>
