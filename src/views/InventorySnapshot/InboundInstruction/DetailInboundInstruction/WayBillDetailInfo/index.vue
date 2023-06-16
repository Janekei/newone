<template>
    <TableWayBill />
    <div class="box-btn">
        <el-button class="button" type="primary">异常订单</el-button>
        <el-button class="button" type="primary" @click="AllInbound">整批入库</el-button>
        <el-button class="button" type="primary">部分入库</el-button>
    </div>
    <DialogInbound ref="refDialog" />
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import TableWayBill from '../../components/TableWayBill.vue'
import DialogInbound from '../../components/DialogInbound.vue';

const refDialog = ref()
const AllInbound = () => {
    console.log(refDialog.value)
    refDialog.value.open('消息', '您确定要整批入库吗？')
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
