<template>
    <SearchContent :formOption="formOptionBox" />
    <PartBoxInbound v-if="(showPartInboud && showErrorInboud === false)" />
    <AbnormalInbound v-else-if="(showPartInboud === false && showErrorInboud)" />
    <AllBoxInfo :boxDetailInfo="props.boxDetailInfo" v-else />
</template>

<script lang="ts" setup>
import SearchContent from '../../components/SearchContent.vue'
import AllBoxInfo from './BoxPageSwitching/AllBoxInfo.vue'
import PartBoxInbound from './BoxPageSwitching/PartBoxInbound.vue'
import AbnormalInbound from './BoxPageSwitching/AbnormalInbound.vue'
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
    }
})
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
