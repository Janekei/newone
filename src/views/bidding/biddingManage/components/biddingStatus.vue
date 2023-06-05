<template>

  <PageTitle title="项目名称" @back-to-list="backList"/>

  <ContentWrap>
    <CountDown/>

    <Table
      class="biddingStatusView"
      :columns="tableColumns"
      :data="circiutList"
      height="460"
      :loading="formLoading"
    >
      <template #progress="{ row }">
        <div class="borderL"></div>
        <div class="progressView">
          {{row}}
        </div>
      </template>

      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="backOpenDW('biddingStatus',row.id)"
          v-hasPermi="['system:mail-log:query']"
        >
          详细
        </el-button>
      </template>
    </Table>

    <div class="BtnView">
      <div class="tipsView">
        说明：竞价得分越低则排名越高
      </div>
      <el-button >
        返回项目首页
      </el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PayMerchantForm" setup>

const tableColumns =[
  {
    label: '标题',
    field: 'templateNickname',
    width:250,
    align:'right',
    isSearch: false
  },
  {
    label: '进度',
    field: 'progress',
    isSearch: false
  },
  {
    label: '操作',
    field: 'action',
    isForm: false,
    width:100,
    isDetail: false
  }
]

const circiutList = [
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  }
]

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list', v: String),(e:'to-fee-detail',type:String)
}>()

//回到首页数据列表
const backList = () => {
  emit('back-to-list', 'backPage')
}

//点击详情按钮打开父组件的中的费用详情窗口
const backOpenDW = (type:String) => {
  emit('to-fee-detail',type)
}

</script>

<style lang="scss" scoped>
.titleView{
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color:#333333;
}

.titleText{
  padding:20px 0 0 0;
  font-weight:700;
  font-size: large;
}

.projectForm{
  padding:20px 0;
  border-bottom:1px solid #333333 ;
}

.biddingForm{
  padding:20px 0;
}

.btnView{
  display:flex;
  justify-content: center;
}

.biddingStatusView{
  position: relative;
  :deep(th){
    display:none !important;
  }

  .borderL{
    width:2px;
    height:49px;
    background-color: black;
    position:absolute;
    left: 12px;
    top:0;
  }

  .progressView{
      width:50%;
      height: 100%;
      background-color: red;
      border-radius: 0 50px 50px 0;
      padding:0;
      font-size: 18px;
      font-weight: 700;
      color: white;
    }
}

.BtnView{
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tipsView{
    color:red;
  }
}
</style>
