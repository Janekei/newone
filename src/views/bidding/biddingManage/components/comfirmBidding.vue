<template>
  <PageTitle title="项目名称" @back-to-list="backList"/>

  <ContentWrap>
    <Table
      class="tableView"
      :columns="tableColumns"
      :data="circiutList"
      :selection="true"
      height="600"
      :loading="formLoading"
      :border="true"
    >
      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="openDetail(row.id)"
          v-hasPermi="['system:mail-log:query']"
        >
          报价详细
        </el-button>
      </template>
    </Table>

    <div class="BtnView">
      <div class="tipsView">
        说明：竞价得分越低则排名越高
      </div>
      <el-button>
        二次招标
      </el-button>
      <el-button>
        确认中标
      </el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PayMerchantForm" setup>

const tableColumns =[
  {
    label: '排名',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '竞标得分',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '名称',
    field: 'username'
  },
  {
    label: '承运商编码',
    field: 'password',
    isSearch: true
  },
  {
    label: '技术得分',
    field: 'host',
    isSearch: true
  },
  {
    label: '等级系数',
    field: 'host',
    isSearch: true
  },
  {
    label: '账期系数',
    field: 'host',
    isSearch: true
  },
  {
    label: '账期天数',
    field: 'host',
    isSearch: true
  },
  {
    label: '操作',
    field: 'action',
    isForm: false,
    isDetail: false
  }
]

const circiutList = [
  {
    templateNickname:'1'
  }
]

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list', v: String)
}>()

//回到首页数据列表
const backList = () => {
  emit('back-to-list', 'backPage')
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

.BtnView{
  padding-top: 20px;
  display: flex;
  justify-content: center;
  position:relative;

  .tipsView{
    position:absolute;
    left:0;
    top: 50%;
    transform:translate(0,-50%);
    color:red;
  }
}
</style>
