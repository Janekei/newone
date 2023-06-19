<template>
    <TableWayBill />
    <div class="box-btn">
        <el-button class="button" type="primary" @click="errorOrder">异常订单</el-button>
        <el-button class="button" type="primary" @click="allInbound">整批入库</el-button>
        <el-button class="button" type="primary" @click="partInbound">部分入库</el-button>
    </div>
    <DialogInbound ref="refDialog" />
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import TableWayBill from '../../components/TableWayBill.vue'
import DialogInbound from '../../components/DialogInbound.vue';

// ref弹窗
const refDialog = ref()

// 确认整批入库
const allInbound = () => {
    refDialog.value.open('消息', '您确定要整批入库吗？')
}
// 发送所点击的按钮类型----部分入库---异常订单
const emits = defineEmits(['clickPart', 'clickError'])
// 部分入库
const partInbound = () => {
    emits('clickPart', true)
}

// 异常订单
const errorOrder = () => {
    emits('clickError', true)
}

</script>
<style lang="scss" scoped>
.box-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3.125rem;
    width: 100%;
    // background-color: aqua;
    margin: 1.25rem 0;

    .button {
        margin-right: 1.25rem;
    }
}
</style>
