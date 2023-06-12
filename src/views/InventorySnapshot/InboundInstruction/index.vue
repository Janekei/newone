<template>
    <TopTabs :tabList="tabList"/>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopTabs from './components/TopTabs.vue'

const tabList = reactive([
    { title: '全部', name: 'all', number: 30 },
    { title: '未到港', name: 'wdg', number: 12 },
    { title: '未清关', name: 'wqg', number: 6 },
    { title: '清关中', name: 'qgz', number: 13 },
    { title: '清关完成', name: 'qgwc', number: 13 }
])
</script>

<style scoped ></style>