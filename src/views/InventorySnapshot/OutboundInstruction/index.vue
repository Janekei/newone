<template>
    <div>
        <TopOutboundTabs :tabList="tabList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopOutboundTabs from './components/TopOutboundTabs.vue'
const tabList = reactive([
    { title: '全部', name: 'all', number: 30 },
    { title: '待出库', name: 'dck', number: 12 },
    { title: '待签收', name: 'dqs', number: 12 },
])
</script>

<style lang="scss" scoped></style>
