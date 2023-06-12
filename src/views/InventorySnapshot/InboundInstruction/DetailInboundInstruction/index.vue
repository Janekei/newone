<template>
  <TopTabs :tabList="tabList" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopTabs from '../components/TopTabs.vue'

const tabList = reactive([
  { title: '运单信息', name: 'waybill' },
  { title: '柜信息', name: 'boxInfo' },
])
</script>
<style lang="scss" scoped></style>
