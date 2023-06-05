<template>
  <PageTitle title="项目名称" @back-to-list="backList"/>

  <ContentWrap>
    <el-row class="projectForm" :gutter="20">
      <el-col :span="6">
        <el-form-item label="开标时间">
          <el-input :disabled="true" v-model="formData.templateName"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="截标时间">
          <el-input :disabled="true" v-model="formData.templateName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="项目有效期">
          <el-input :disabled="true" v-model="formData.templateName"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="中标服务商数">
          <el-input :disabled="true" v-model="formData.templateName"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="项目总量">
          <el-input :disabled="true" v-model="formData.templateName"/>
        </el-form-item>
      </el-col>

      <div class="biddingStatus">
        竞标中
      </div>
    </el-row>

    <Table
      class="tableViewCompany"
      :columns="tableColumns2"
      :data="circiutList3"
      height="550"
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

    <div class="BtnView">
      <div class="tipsView">
        说明：每提交一次则参与一次竞价
      </div>
      <el-button @click="backList">
        返回
      </el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PayMerchantForm" setup>

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'

// const { t } = useI18n() // 国际化
// const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
// const formType = ref('') // 表单的类型：create - 新增；update - 修改

const formData = reactive({
  templateName:'1'
})

const tableColumns2 = [
  {
    label: '起运地',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '目的地',
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
    label: '可报价区间',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '报价',
    field: 'templateNickname2',
    isSearch: false
  }
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
  .titleText{
    padding:20px 0;
    font-weight:700;
    font-size: large;
  }

  .projectForm{
    position:relative;

    .biddingStatus{
      position: absolute;
      right:0;
      bottom:0;
      font-size: 36px;
      font-weight: 700;
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
