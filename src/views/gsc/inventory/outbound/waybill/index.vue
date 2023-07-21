<template>
    <TopOutboundTabs :tabList="tabList" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopOutboundTabs from '../components/TopOutboundTabs.vue'

const tabList = reactive([
    { title: '运单信息', name: 'waybill' },
    { title: '物料信息', name: 'materialInfo' },
])

</script>
<style lang="scss" scoped></style>
