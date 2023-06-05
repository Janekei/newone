<template>
  <div class="templateListView">
      <div class="templateView" v-if="pageType != 'companybidding'" @click="toAE('ae')">
        <div class="addTitle">
          <text>{{pageType =='circuit' ? '新增模板' : '新增项目'}}</text>
        </div>
        <div class="addInfo">
          <img class="addIcon" src="@/assets/imgs/add.png"/>
        </div>
      </div>

      <div class="templateView" v-for="(item,index) in templateList" :key="index">
        <div class="templateTitle">
          <div class="titleL">
            <text>{{item.title}}</text>
          </div>
          <div class="titleR">
            <text>{{item.status}}</text>
          </div>
        </div>

        <div class="templateInfo">
          <div v-if="pageType =='circuit'">
            <div class="templateName_t">
              <text>{{item.name}}</text>
            </div>
          </div>
          <div v-else>
            <div class="templateName_b">
              <text>{{item.name1}}</text>
            </div>
            <div class="templateName_b">
              <text>{{item.name2}}</text>
            </div>
            <div class="templateName_b">
              <text>{{item.name3}}</text>
            </div>
            <div class="templateName_b">
              <text>{{item.name4}}</text>
            </div>
          </div>

          <!--承运商招标按钮操作-->
          <div v-if="pageType =='circuit'">
            <div class="templateBtn">
              <el-button class="btnView" @click="toSeeDetailT()">
                预览
              </el-button>
            </div>
            <div>
              <el-button class="btnView" @click="toAE('ae')">
                编辑
              </el-button>
            </div>
          </div>
          <div v-else-if="pageType =='companybidding'">
            <div class="templateBtn">
              <el-button class="btnView" @click="toAE('see')">
                项目详情
              </el-button>
            </div>
            <div v-if="item.status == '竞标中'">
              <el-button class="btnView" @click="toBiddingOn()">
                竞标
              </el-button>
            </div>
          </div>

          <!-- 项目招投标管理按钮操作 -->
          <div v-else>
            <div class="templateBtn">
              <el-button class="btnView" @click="toAE('see')">
                项目详情
              </el-button>
            </div>
            <div v-if="item.status === '待发布'">
              <el-button class="btnView">
                发布
              </el-button>
            </div>
            <div v-else-if="item.status == '待开标'">
              <el-button class="btnView">
                撤回
              </el-button>
            </div>
            <div v-else-if="item.status == '竞标中'">
              <el-button class="btnView" @click="toBiddingStatus">
                招标监控
              </el-button>
            </div>
            <div v-else-if="item.status == '竞标结束'">
              <el-button class="btnView" @click="toBiddingCompany">
                确认承运商
              </el-button>
            </div>
            <div v-else-if="item.status == '已完成'">
              <el-button class="btnView" @click="toBiddingResult">
                招标结果
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts" name="cardList">
// import addOrEditT from "@/views/circuitManage/circuitTemplateList/components/addOrEdit.vue"
// import addOrEditB from "@/views/biddingManage/components/addOrEdit.vue"
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure

//传入接口接收线路模板列表
const props = defineProps({
  // 父组件传过来的模板对象
  templateList: {
    type: Object,
    default: {}
  },
  // 父组件传过来的页面类型
  pageType: {
    type: String,
    default: ''
  },
})

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'add-edit', v: String),
  (e: 'see-template-detail'),
  (e: 'to-comfirm-page'),
  (e: 'to-bidding-status-page'),
  (e: 'to-bidding-result-page'),
  (e: 'to-bidding-on-page')
}>()

//模板列表赋值
const templateList : Object = props.templateList
//父组件页面类型赋值
const pageType : String = props.pageType

/** 添加/修改模板 */
// const aeWin_t = ref()
// const aeWin_b = ref()
const toAE = (type: string, id?: number) => {
  //若当前页面是线路管理，跳转到线路管理的设置线路页面
  if( pageType == 'circuit'){
    // 向父组件传值
    emit('add-edit', 'biddingAdd')
  }else{
    // aeWin_b.value.open(type, id)
    //传出参数给父组件
    emit('add-edit', type)
  }
}

//预览线路模板详情
const toSeeDetailT = () => {
  emit('see-template-detail')
}

//确认承运商页面
const toBiddingCompany = (type:String) => {
  emit('to-comfirm-page',type)
}

//招标监控页面
const toBiddingStatus = () => {
  emit('to-bidding-status-page')
}

//招标结果页面
const toBiddingResult = () => {
  emit('to-bidding-result-page')
}

//去确认招标页面
const toBiddingOn = () => {
  emit('to-bidding-on-page')
}

</script>

<style lang="scss" scoped>
.templateListView{
  display: flex;
  flex-wrap: wrap;
  // @media (min-width:1586px) {
  //   justify-content: flex-start;
  // }
  // justify-content: space-between;

  .templateView{
    background-color: white;
    width:460px;
    height: 200px;
    box-shadow: 5px 5px 5px #CCCCCC;
    border-radius: 10px;
    // margin:0 20px 20px 0;
    margin: 20px;
    border: solid 1px #CCCCCC;

    .addTitle{
      border-radius: 9px 9px 0 0;
      background-color: #CCCCCC;
      font-size:20px;
      font-weight: 700;
      padding:12px 5px;
    }

    .addInfo{
      width:100%;
      height: 146px;
      position: relative;
      .addIcon{
        width: 80px;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .templateTitle{
      // background-color: #0099CC;
      background-color: var(--el-color-primary);
      border-radius: 9px 9px 0 0;
      font-weight: 700;
      padding:9px 10px;
      color:white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .titleL{
        font-size:18px;
      }

      .titleR{
        font-size:24px;
      }
    }

    .templateInfo{
        padding: 0 30px 0 20px;
        width:100%;
        height: 146px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .templateName_t{
          font-size:34px;
          font-weight: 700;
          max-width: 250px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }

        .templateName_b{
          font-size:18px;
          max-width: 250px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }

        .templateBtn{
          margin-bottom: 20px;
        }

        .btnView{
          width:140px; font-size:18px;
        }
      }
  }
}
</style>
