<template>
    <SearchContent :formOption="formOptionBox" />
    <AllBoxInfo />
    <!-- <PartBoxInbound />
    <AbnormalInbound /> -->
</template>

<script lang="ts" setup>
import SearchContent from '../../components/SearchContent.vue'
import AllBoxInfo from './BoxPageSwitching/AllBoxInfo.vue'
// import PartBoxInbound from './BoxPageSwitching/PartBoxInbound.vue'
// import AbnormalInbound from './BoxPageSwitching/AbnormalInbound.vue'
// 柜信息搜索框数据
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
