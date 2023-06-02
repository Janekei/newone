<template>
    <div class="header">
        <div class="content">SAP任务号：&nbsp;{{ props.title.sapId }}</div>
        <div class="content">提单号：&nbsp;{{ props.title.billNo }}</div>
        <div class="content">预计入库时间：&nbsp;{{ props.title.inboundTime }}</div>
    </div>
</template>

<script lang="ts" setup>
// import { defineProps } from 'vue'
const props = defineProps({
    title: {
        type: Object,
        default: () => { }
    }
})

</script>
<style lang="less" scoped>
.header {
    display: flex;
    align-items: center;
    height: 3.125rem;
    width: 100%;
    border: .0625rem solid #c6c6c6;
    border-radius: .375rem;
    padding-left: .3125rem;
    margin-bottom: .625rem;

    .content {
        margin-left: 1.875rem;
    }
}
</style>
