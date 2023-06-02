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
      </tr>
      <tr>
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
      </tr>
      <tr>
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
      </tr>
      <tr>
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
  <div class="btnContent">
    <DetailButton title="异常订单" />
    <DetailButton @click="centerDialogVisible = true" title="整批入库" />
    <DetailButton class="lastBtn" title="部分入库" :data="data" @click="goToPartInbound" />
  </div>
  <el-dialog v-model="centerDialogVisible" width="30%" title="消息" destroy-on-close center>
    <span class="dialogContent">确认整批入库</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返回</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import DetailButton from '../../components/DetailButton.vue'

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

//整批入库功能
const isOpen = ref(false)
const dialogInfo = reactive({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: '确认是否入库'
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '返回'
  }
})
const centerDialogVisible = ref(false)

// 跳转部分入库详情信息
const emits = defineEmits(['goToPartInbound'])
const goToPartInbound = () => {
  emits('goToPartInbound', true)
}


</script>
<style lang="less" scoped>
.waybillBox {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #fff;
  height: 37.5rem;
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
    margin-right: 25rem;
  }
}

.dialogContent {
  display: inline-block;
  width: 100%;
  height: 2.5rem;
  font-size: 1.125rem;
  text-align: center;
  color: #333;
  // font-weight: 700;
  // background-color: #9f2a2a;
}
</style>
