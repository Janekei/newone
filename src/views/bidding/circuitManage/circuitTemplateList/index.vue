<template>
  <el-carousel class="swiperView" ref="carousel" :autoplay="false" :class="carouselPosition == 'child' ? 'carouselHeight':''">
    <el-carousel-item>
      <ContentWrap>
        <!-- 搜索工作栏 -->
        <el-form
          class="-mb-15px"
          :model="queryParams"
          ref="queryFormRef"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="模板名称" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入模板名称"
              clearable
              @keyup.enter="handleQuery"
              class="!w-240px"
            />
          </el-form-item>
          <el-form-item label="模板编码" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入模板编码"
              clearable
              @keyup.enter="handleQuery"
              class="!w-240px"
            />
          </el-form-item>
          <el-form-item label="模板区域" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择模板区域" clearable class="!w-240px">
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
        <!-- 列表展示 -->
        <LineList v-if="showType == 'line'" :templateList='templateList' pageType="circuit"/>

        <!-- 九宫格展示 -->
        <CardList v-else :templateList='templateList' pageType="circuit" @add-edit="(fun) => toAE(fun)" @see-template-detail="toSeeDetail"/>

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
      </ContentWrap>
    </el-carousel-item>
    <el-carousel-item>
    <!--   使用v-if判断当前走马灯位置，以防改变窗口大小能够看到子走马灯页面   -->
      <div v-if="carouselPosition == 'child'">
        <addOrEditT @back-to-list="(fun) => backList(fun)" @to-see-detail="(type) => toSeeDetail(type)"/>
      </div>
    </el-carousel-item>
  </el-carousel>

  <templateDetail ref="tdWin" @back-to-list="(fun) => backList(fun)"/>
  <!-- 表单弹窗：添加/修改 -->
  <!-- <cardList ref="formRef" @success="getList" /> -->
</template>

<script setup lang="ts" name="BpmUserGroup">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { dateFormatter } from '@/utils/formatTime'
import * as UserGroupApi from '@/api/bpm/userGroup'
import * as UserApi from '@/api/system/user'
import addOrEditT from "./components/addOrEdit.vue"
import templateDetail from "./components/templateDetail.vue"
import { UserVO } from '@/api/system/user'

// const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const carousel = ref() //走马灯

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
      title:'测试',
      status:'生效',
      name:'测试一区'
    },
    {
      title:'测试',
      status:'失效',
      name:'测试二区'
    },
    {
      title:'测试',
      status:'失效',
      name:'测试二区'
    },
    {
      title:'测试',
      status:'生效',
      name:'测试一区'
    },
    {
      title:'测试',
      status:'生效',
      name:'测试一区'
    },
    {
      title:'测试',
      status:'生效',
      name:'测试一区'
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
const toAE = () => {
  carousel.value.next()
  carouselPosition.value = 'child'
}

//子组件请求返回到列表页面
const backList = () => {
  carousel.value.prev()
  carouselPosition.value = 'main'
}

//预览
const tdWin = ref()
const toSeeDetail = (type: string, id?: number) => {
  tdWin.value.open(type, id)
}

//设置模板时点击确定，打开模板详情进行查看
// const comfirmDetail = (type) => {
//   toSeeDetail()
// }

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

.swiperView{
  justify-content: center;

  :deep(.el-carousel__container){
    @media (min-width: 1282px){
      height: 1200px;
    }
    @media (min-width: 1646px){
      height: 920px;
    }
    height: 2200px;
    // height: calc(100vh + 60px);
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
