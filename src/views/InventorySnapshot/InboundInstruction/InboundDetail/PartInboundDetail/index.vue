<template>
    <div class="waybillBox">
        <table class="waybillTable">
            <tr>
                <td>
                    <div class="item">
                        <span class="left">订单编号：</span><span class="right">{{ data.billNo }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">承运商：</span><span class="right">{{ data.carrier }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">ETD：</span><span class="right">{{ data.etd }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">ETA：</span><span class="right">{{ data.eta }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item">
                        <span class="left">入库日期：</span><span class="right">{{ data.inboundTime }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">指示日期：</span><span class="right">{{ data.instructionTime }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">发票编号：</span><span class="right">{{ data.invoiceNo }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">指示日期：</span><span class="right">{{ data.instructionTime }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item">
                        <span class="left">型号：</span><span class="right">{{ data.type }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">集装箱号：</span><span class="right">{{ data.containerType }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">箱数：</span><span class="right">{{ data.containerNum }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">托盘数：</span><span class="right">{{ data.trayNum }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item">
                        <span class="left">瓦数：</span><span class="right">{{ data.wattage }}</span>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <span class="left">总瓦数：</span><span class="right">{{ data.allWattage }}</span>
                    </div>
                </td>
            </tr>
        </table>

    </div>
    <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" border
            style="width: 100%;height:250px">
            <el-table-column type="selection" width="55" />
            <el-table-column property="boxNo" label="箱号" />
            <el-table-column property="billNo" label="提单号" />
            <el-table-column property="billType" label="箱型" />
            <el-table-column property="lockType" label="锁号" />
            <el-table-column property="number" label="件数" />
            <el-table-column property="weight" label="重量" />
            <el-table-column property="volume" label="体积" />
            <el-table-column property="createPeople" label="创建人" />
        </el-table>
    </div>
    <div class="btnContent">
        <DetailButton class="lastBtn" title="确认入库" @click="confirmInbound" />
    </div>
    <!-- <DetailDialog :isShow="isShow" /> -->
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import DetailButton from '../../components/DetailButton.vue'
// import DetailDialog from '../../components/DetailDialog.vue';
import { ElTable, ElTableColumn } from 'element-plus'

// 运单信息数据
const data = reactive({
    billNo: 'XXXX7777777',
    preinboundTime: '2023-3-3 10:10:10',
    orderNo: 'TD20230505000013',
    carrier: '江苏飞力达国际物流股份有限公司',
    etd: '2023-05-06',
    eta: '2023-05-19',
    inboundTime: '2023-05-10',
    instructionTime: '2023-5-19',
    invoiceNo: '10097853',
    warehouse: '宁波',
    containerType: '4353456344',
    type: '40HQ',
    containerNum: 40,
    trayNum: 26,
    wattage: 28,
    allWattage: 184
})

const tableData = reactive([
    {
        seqNum: 1,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    },
    {
        seqNum: 2,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    },
    {
        seqNum: 3,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    },
    {
        seqNum: 4,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    },
    {
        seqNum: 5,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    },
    {
        seqNum: 6,
        boxNo: 'GESU666666666',
        billNo: '177HSDWQ99999A',
        billType: '40HQ',
        lockType: 'FX2233322',
        number: 720,
        weight: 29393,
        volume: 39,
        createPeople: '物流AA',
        createTime: '2023/3/3',
        updatePeople: '物流BB',
        updateTime: '2023/3/3'
    }
])
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
    multipleSelection.value = val
    console.log(val)
}
const confirmInbound = () => {
    
}

</script>
<style lang="scss" scoped>
.waybillBox {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // background-color: #fff;
    // height: 37.5rem;
    width: 100%;
    border-radius: .375rem;

    .waybillTable {
        // border: .0625rem solid #333;
        border-collapse: separate;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5625rem;
            font-size: .875rem;
            // background-color: aquamarine;

            .right {
                display: inline-block;
                width: 14.375rem;
                height: 1.875rem;
                text-align: center;
                line-height: 1.875rem;
                background-color: #e5e5e5;
                border-radius: 1rem;
            }
        }

    }

}

.btnContent {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 6.25rem;
    // background-color: aquamarine;

    .lastBtn {
        margin-right: 6.25rem;
        padding: 0.625rem 2.5rem;
        box-shadow: none;
    }
}

::v-deep.el-table {
    border: .0625rem solid #d2d2d2;
}

::v-deep .el-table__header .el-table__cell {
    background-color: #efefef !important;

}

::v-deep ::v-deep.el-table {
    border: .0625rem solid #d2d2d2;
}

::v-deep .el-table__header .el-table__cell {
    background-color: #efefef !important;

}

::v-deep .el-table__cell {
    font-size: .875rem;
    font-weight: 400;
    text-align: center;
    color: #333;
    height: 1.875rem;
    border: .0625rem solid #d2d2d2;
    background-color: #f6f6f6 !important;
}
</style>
  