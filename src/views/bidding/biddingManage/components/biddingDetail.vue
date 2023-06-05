<template>
  <PageTitle title="项目详情" :ifShowClose="false" @back-to-list="backList"/>

  <ContentWrap>
    <div class="firstTitleText">项目基础信息</div>
    <Table
      class="tableView"
      :columns="tableColumns"
      :data="circiutList"
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
          详情
        </el-button>
      </template>
    </Table>

    <div class="titleText">线路信息</div>
    <Table
      class="tableViewCompany"
      :columns="tableColumns2"
      :data="circiutList3"
      height="180"
      row-key="id"
      align="left"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :loading="formLoading"
    >
      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="openDetail(row.id)"
          v-hasPermi="['system:mail-log:query']"
        >
          详情
        </el-button>
      </template>
    </Table>

    <div class="titleText">受邀承运商</div>
    <Table
      class="tableViewCompany"
      :columns="tableColumns3"
      :data="circiutList3"
      height="180"
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
          详情
        </el-button>
      </template>
    </Table>

    <div class="BtnView">
      <el-button @click="openForm()">
        下载到Excel
      </el-button>
      <el-button @click="toEdit">
        编辑
      </el-button>
      <el-button @click="backToList">
        返回项目首页
      </el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PayMerchantForm" setup>

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'

// const { t } = useI18n() // 国际化
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
// const formType = ref('') // 表单的类型：create - 新增；update - 修改


const circiutList = [
  {
    templateNickname:'1'
  }
]

const tableColumns2 = [
  {
    label: '线路名称',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '线路权重',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '运输方式',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '费用项',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '计费工具',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '计费单位',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '币种',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '费用项权重',
    field: 'templateNickname2',
    isSearch: false
  },
   {
    label: '报价下限',
    field: 'templateNickname2',
    isSearch: false
  },
   {
    label: '报价上限',
    field: 'templateNickname2',
    isSearch: false
  },
]

const circiutList3 = [
  {
    templateNickname:'上海--宁波',
    id:1,
    children: [
      {
              templateNickname2:'1'
            }, {
              templateNickname2: '上海市普陀区金沙江路 1519 弄'
          }]
  },
  {
    id:2,
    templateNickname:'1',
    children: [
      {
              templateNickname2:'X'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
  },
  {
    id:3,
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
  },
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
// const tableObject = []

const tableColumns =[
  {
    label: '项目编号',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '项目名称',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '销售合同号',
    field: 'username'
  },
  {
    label: '项目区域',
    field: 'password',
    isSearch: true
  },
  {
    label: '项目总量',
    field: 'host',
    isSearch: true
  },
  {
    label: '项目有效期',
    field: 'host',
    isSearch: true
  },
  {
    label: '开标时间',
    field: 'host',
    isSearch: true
  },
  {
    label: '截标时间',
    field: 'host',
    isSearch: true
  },
  {
    label: '中标服务商数',
    field: 'host',
    isSearch: true
  },
  {
    label: '币种',
    field: 'host',
    isSearch: true
  },
  {
    label: '技术占比',
    field: 'host',
    isSearch: true
  },
  {
    label: '最多可出价次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '最多可出价次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '最多可出价次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '最多可出价次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '同评分是否延迟',
    field: 'host',
    isSearch: true
  },
  {
    label: '同评分延迟次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '延迟分钟数',
    field: 'host',
    isSearch: true
  },
  {
    label: '排名更新延是否延迟',
    field: 'host',
    isSearch: true
  },
  {
    label: '排名更新延迟次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '同评分延迟次数',
    field: 'host',
    isSearch: true
  },
  {
    label: '延迟分钟数',
    field: 'host',
    isSearch: true
  },
  {
    label: '创建人',
    field: 'host',
    isSearch: true
  },
  {
    label: '创建时间',
    field: 'host',
    isSearch: true
  },
  {
    label: '更新人',
    field: 'host',
    isSearch: true
  },
  {
    label: '更新时间',
    field: 'host',
    isSearch: true
  },
  {
    label: '项目负责人',
    field: 'host',
    isSearch: true
  }

]

const tableColumns3 = [
  {
    label: '序号',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '承运商名称',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '承运商编码',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '技术得分',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '等级系数',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '账期系数',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '账期天数',
    field: 'templateNickname',
    isSearch: false
  }
]

//详情子页面传给父页面
const emit = defineEmits<{
  (e:'back-to-list'),(e:'to-edit')
}>()

//点击返回列表
const backToList = () => {
    emit('back-to-list')
}

//请求父组件跳转到编辑页面
const toEdit = () => {
  emit('to-edit')
}

</script>

<style lang="scss" scoped>
  .firstTitleText{
    padding:0 0 20px 0;
    font-weight:700;
    font-size: large;
  }

  .titleText{
    padding:20px 0;
    font-weight:700;
    font-size: large;
  }

  .tableViewCompany{
    // height:400px;
    // overflow: hidden;
    // overflow-y: auto;
  }

  .BtnView{
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
