<template>
  <PageTitle title="基础资料" :ifShowClose="false" @back-to-list="backList"/>

  <ContentWrap>
      <div class="winView">

        <!-- <el-steps finish-status="success" :active="stepActive" simple style="margin-top: 20px">
          <el-step :title="'基础资料'+stepActive" >{{stepActive}}</el-step>
          <el-step title="线路维护" >2</el-step>
          <el-step title="承运商邀请" >3</el-step>
        </el-steps> -->

        <div class="stepView">
          <div class="stepsBg" :class="index > 0 ? 'stepsBgPosition':''" v-for="(item,index) in stepList" :key="index">
            <div class="numView" :class="stepActive >= item.step ? 'setStep':'notSetStep'"></div>
            <div class="num">{{item.step}}</div>
            <div class="textView" :class="stepActive >= item.step ? 'setText':'notSetText'">
              <div class="textPosition">
                <div class="text" :class="stepActive >= item.step ? 'setTextColor':''">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>

        <el-carousel ref="carouselStep" :autoplay="false">
          <el-carousel-item>
            <firstStep @to-next="switchNext" @back-to-list="backList" @back-last-step="lastStep"/>
          </el-carousel-item>
          <el-carousel-item>
            <!--   使用v-if判断当前走马灯位置，以防改变窗口大小第一步走马灯页面能够看到第二步走马灯页面   -->
            <div v-if="stepActive == 1">
              <secondStep @to-next="switchNext" @back-to-list="backList" @back-last-step="lastStep" @check-bidding-info="(type) => toOpenBI(type)" @to-open-UpdateExcelWin="toOpenUpdateExcelWin"/>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <!--   使用v-if判断当前走马灯位置，以防改变窗口大小第二步走马灯页面能够看到第三步走马灯页面   -->
            <div v-if="stepActive == 2">
              <thirdStep @back-last-step="lastStep" @back-to-list="backList"/>
            </div>
          </el-carousel-item>
        </el-carousel>

    </div>
  </ContentWrap>

  <!-- 导入Excel表格窗口 -->
  <UpdateExcelWin ref="UpdateExcelWinRef"/>
</template>

<script lang="ts" name="PayMerchantForm" setup>
import firstStep from "./components/firstStep.vue"
import secondStep from "./components/secondStep.vue"
import thirdStep from "./components/thirdStep.vue"
// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

// const dialogVisible = ref(false) // 弹窗的是否展示
// const dialogTitle = ref('') // 弹窗的标题
// const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
// const formType = ref('') // 表单的类型：create - 新增；update - 修改
const carouselStep = ref()
const stepActive = ref(0)

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list', v: String),
  (e:'check-bidding-info',type:String),
  (e:'to-open-UpdateExcelWin')
}>()

const stepList = reactive([
  {
    name:'基础资料',
    step:1
  },
  {
    name:'线路维护',
    step:2
  },
  {
    name:'承运商邀请',
    step:3
  }
])

//回到首页数据列表
const backList = () => {
  carouselStep.value.setActiveItem(0)
  stepActive.value = 0
  emit('back-to-list', 'backPage')
}

//跳转到下一步
const switchNext = () => {
  if(stepActive.value !=3 ){
    carouselStep.value.next()
    stepActive.value++
  }
}

//返回上一步操作
const lastStep = () => {
  carouselStep.value.prev()
  stepActive.value--
}

//打开上级index中的项目明细页面
const toOpenBI = (type:String) => {
  console.log('ae中的type',type)
  emit('check-bidding-info',type)
}

/** 继续进入第三步 */
const toThrid = async () => {
  console.log('步骤页')
  switchNext()
}
defineExpose({ toThrid }) // 提供 open 方法，用于打开弹窗


//打开外层index.vue中的 Excel导入表格
const toOpenUpdateExcelWin = () => {
  emit('to-open-UpdateExcelWin')
}

</script>

<style lang="scss" scoped>
.titleText{
  padding:20px 0 0 0;
  font-weight:700;
  font-size: large;
}

.stepView{
  display: flex;
  justify-content: center;
  margin-left: -190px;
  padding: 20px 0;

  .stepsBg{
    position: relative;
    z-index: 20;
    .numView{
      position: relative;
      width:80px;
      height: 80px;
      border-radius: 50px;
      z-index:10;
    }

    .setStep{
      // background-color:#0000FF;
      background-color: var(--el-color-primary);
      box-shadow: 2px 2px 5px #000000;
    }

    .notSetStep{
      background-color:#CCCCCC;
      box-shadow: 2px 2px 5px #b9b9b9;
    }

    .num{
      position: absolute;
      top: 40px;
      left: 40px;
      transform: translate(-50%, -50%);
      z-index: 20;
      font-size: 48px;
      font-weight: 700;
      color: white;
    }

    .textView{
      position: absolute;
      top:50%;
      left: 70%;
      transform: translate(0, -50%);
      width:240px;
      height: 35px;
      .textPosition{
        position: relative;
        width:240px;
        height: 35px;
        .text{
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          z-index: 20;
          font-size: 18px;
          font-weight: 700;
        }

        .setTextColor{
          color:white;
        }
      }
    }

    .setText{
      // background-color:#0000FF;
      background-color: var(--el-color-primary);
      box-shadow: 2px 2px 5px #000000;
    }

    .notSetText{
      background-color:#CCCCCC;
      box-shadow: 2px 2px 5px #b9b9b9;
    }
  }

  .stepsBgPosition{
    margin-left: 190px;
  }
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
</style>
