<template>
  <el-carousel class="swiperView" ref="carousel" :autoplay="false" :class="carouselPosition == 'child' ? 'carouselHeight':''">
    <el-carousel-item style="height: 100%;">
    <ContentWrap>
      <!-- 搜索工作栏 -->
      <el-form
        class="-mb-15px"
        :model="queryParams"
        ref="queryFormRef"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入项目名称"
            clearable
            @keyup.enter="handleQuery"
            class="!w-240px"
          />
        </el-form-item>
        <el-form-item label="项目编码" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入项目编码"
            clearable
            @keyup.enter="handleQuery"
            class="!w-240px"
          />
        </el-form-item>
        <el-form-item label="项目区域" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择项目区域" clearable class="!w-240px">
            <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
          <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
          <el-button
            type="primary"
            plain
            @click="openForm('create')"
            v-hasPermi="['bpm:user-group:create']"
          >
            <Icon icon="ep:plus" class="mr-5px" /> 新增
          </el-button>
        </el-form-item>
      </el-form>
    </ContentWrap>

    <!-- 数据展示 -->
    <ContentWrap>
          <div>
            <el-tabs v-model="activeName" tab-position="top" type="card" class="biddingStatus">
              <el-tab-pane label="全部" name="first">全部</el-tab-pane>
              <el-tab-pane label="待发布" name="second">待发布</el-tab-pane>
              <el-tab-pane label="待开标" name="third">待开标</el-tab-pane>
              <el-tab-pane label="竞标中" name="fourth">竞标中</el-tab-pane>
              <el-tab-pane label="竞标结束" name="fifth">竞标结束</el-tab-pane>
              <el-tab-pane label="审批中" name="sixth">审批中</el-tab-pane>
              <el-tab-pane label="已完成" name="seventh">已完成</el-tab-pane>
              <el-tab-pane label="已过期" name="eighth">已过期</el-tab-pane>
            </el-tabs>

            <!-- 列表展示 -->
            <LineList v-if="showType == 'line'" :templateList='templateList' pageType="bidding"/>

            <!-- 九宫格展示 -->
            <CardList v-else :templateList='templateList' pageType="bidding"  @add-edit="(fun) => toAE(fun)"  @to-comfirm-page="switchComfirmPage" @to-bidding-status-page="biddingStatusPage" @to-bidding-result-page="biddingResultPage"/>

            <!-- 分页 -->
            <div class="bottomView">
              <div class="paginationView">
                <Pagination
                  :total="total"
                  v-model:page="queryParams.pageNo"
                  v-model:limit="queryParams.pageSize"
                  @pagination="getList"
                />
              </div>
              <div class="switchViewBtn">
                <div class="switchBtnL" @click="switchShow('card' )">
                  <img class="switchBtnL" src="@/assets/imgs/list.png"/>
                </div>
                <div class="switchBtnR" @click="switchShow('line')">
                  <img class="switchBtnR" src="@/assets/imgs/card.png"/>
                </div>
              </div>
            </div>
          </div>
    </ContentWrap>

    </el-carousel-item>
    <el-carousel-item>
      <!--   使用v-if判断当前走马灯位置，以防改变窗口大小能够看到子走马灯页面   -->
      <div v-if="carouselPosition == 'child'">
        <addOrEditB ref="addEditB" v-if="chrildPageType == 'ae'" @back-to-list="(fun) => backList(fun)" @check-bidding-info="(type) => openDetail(type)" @to-open-UpdateExcelWin="toOpenUpdateExcelWin"/>
        <biddingD v-else-if="chrildPageType == 'see'" @back-to-list="(fun) => backList(fun)" @to-edit="switchEdit"/>
        <comfirmBidding v-else-if="chrildPageType == 'comfirmCompany'" @back-to-list="(fun) => backList(fun)"/>
        <biddingStatus v-else-if="chrildPageType == 'biddingStatus'" @back-to-list="(fun) => backList(fun)" @to-fee-detail="openDetail"/>
        <biddingResult v-else-if="chrildPageType == 'biddingResult'" @back-to-list="(fun) => backList(fun)"/>
      </div>
    </el-carousel-item>
  </el-carousel>

  <FeeDataWin ref="feeDataW" @to-next="toAEThird"/>

  <!-- 导入Excel表格窗口 -->
  <UpdateExcelWin ref="UpdateExcelWinRef"/>
</template>

<script setup lang="ts" name="BpmUserGroup">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { dateFormatter } from '@/utils/formatTime'
import { ref } from 'vue'
import * as UserGroupApi from '@/api/bpm/userGroup'
import * as UserApi from '@/api/system/user'
import addOrEditB from "./components/addOrEdit.vue"
import biddingD from "./components/biddingDetail.vue"
import comfirmBidding from "./components/comfirmBidding.vue"
import biddingResult from "./components/biddingResult.vue"
import biddingStatus from "./components/biddingStatus.vue"
// import addEdit from './components/addOrEdit.vue'
import { UserVO } from '@/api/system/user'

// const { t } = useI18n() // 国际化


const AERef = ref<String>();

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据

const activeName = ref() // 项目状态字段
const chrildPageType = ref() // 需要滚动的页面状态

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  name: null,
  status: null,
  createTime: []
})

const showType = ref('card')

const templateList = reactive(
  [
    {
      title:'成都天府100万兆瓦',
      status:'待发布',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'成都天府100万兆瓦',
      status:'待开标',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'成都天府100万兆瓦',
      status:'竞标中',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'成都天府100万兆瓦',
      status:'竞标结束',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'成都天府100万兆瓦',
      status:'已完成',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'成都天府100万兆瓦',
      status:'审批中',
      name1:'项目总量：1',
      name2:'未发运量：2',
      name3:'开标时间：3',
      name4:'有效日期：4'
    },
    {
      title:'测试',
      status:'生效',
      name:'测试一区'
    }
  ]
)
const queryFormRef = ref() // 搜索的表单
const userList = ref<UserVO[]>([]) // 用户列表
const carousel = ref() //走马灯

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await UserGroupApi.getUserGroupPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}


/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}


/** 初始化 **/
onMounted(async () => {
  await getList()
  // 加载用户列表
  userList.value = await UserApi.getSimpleUserList()
})

//切换数据展示方式
const switchShow = (type:string) => {
  if(type == 'line'){
    showType.value = 'card'
  }else{
    showType.value = 'line'
  }
  console.log('showType',showType)
}

//打开设置项目页面
const carouselPosition = ref('main')
const toAE = (type:String) => {
  console.log('需要跳转的页面',type)
  chrildPageType.value = type
  carousel.value.next()
  carouselPosition.value = 'child'
}

//子组件请求返回到列表页面
const backList = (val:String) => {
  AERef.value = val;
  console.log('子组件传过来的值',AERef.value,carousel)
  carousel.value.prev()
  carouselPosition.value = 'main'
}

//打开编辑页面
const switchEdit = () => {
  chrildPageType.value = 'ae'
}

//打开确认承运商页面
const switchComfirmPage = () => {
  chrildPageType.value = 'comfirmCompany'
  carousel.value.next()
  carouselPosition.value = 'child'
}

//打开确认招标监控
const biddingStatusPage = () => {
  chrildPageType.value = 'biddingStatus'
  carousel.value.next()
  carouselPosition.value = 'child'
}

//打开确认招标结果
const biddingResultPage = () => {
  chrildPageType.value = 'biddingResult'
  carousel.value.next()
  carouselPosition.value = 'child'
}

//打开报价详细
const feeDataW = ref()
const openDetail = (type:String) => {
  feeDataW.value.open(type)
  // carouselPosition.value = 'child'
}

//打开设置步骤3
const addEditB = ref()
const toAEThird = () =>{
  addEditB.value.toThrid()
}


const UpdateExcelWinRef = ref()
//打开Excel导入表格
const toOpenUpdateExcelWin = () => {
  UpdateExcelWinRef.value.open()
}

</script>

<style lang="scss" scoped>
.bottomView{
  padding-top: 20px;
  position: relative;

  .paginationView{
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-pagination){
      display: contents !important;
    }
  }

  .switchViewBtn{
    position: absolute;
    display: flex;
    bottom: 0;
    right: 20px;
    .switchBtnL{
      width: 40px;
      height: 30px;
      margin-right: 20px;
    }
    .switchBtnR{
      width: 40px;
      height: 30px;
    }
  }
}

.biddingStatus{
  .el-tab-pane{
    display: none;
  }
}

.swiperView{
  :deep(.el-carousel__container){
    @media (min-width: 1282px){
      height: 1255px;
    }
    @media (min-width: 1646px){
      // height: 1105px;
      height: 950px;
    }
    height: 2255px;
  }

  :deep(.el-carousel__indicators){
    display: none;
  }

  :deep(.el-carousel__arrow--left){
    display: none;
  }

  :deep(.el-carousel__arrow--right){
    display: none;
  }
}

.carouselHeight{
  height: 830px;
  overflow: hidden;
}

</style>
