<template>
  <div class="titleText">承运商信息</div>
  <div class="importView">
    <el-button>
      Excel导入
    </el-button>
  </div>

  <el-row>
    <el-col :span="6">
      <div class="CTitle">
        <text>承运商名称</text>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="CTitle">
        <text>承运商编码</text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="CTitle">
        <text>技术总分</text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="CTitle">
        <text>技术得分</text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="CTitle">
        <text>等级系数</text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="CTitle">
        <text>账期天数</text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="CTitle">
        <text>账期系数</text>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="CTitle">
        <text>操作</text>
      </div>
    </el-col>
  </el-row>

  <div style="height: 360px; overflow: hidden; overflow-y: auto;">
    <div v-for="(item,index) in circiutList" :key="index">
      <el-row style="padding:20px 0 0 0;">
        <el-col :span="6">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input placeholder="请输入承运商名称" />
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入承运商编码" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入技术总分" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入技术得分" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入等级系数" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入账期天数" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="text-align: center; margin: 0 10px 0 0;">
            <el-input   placeholder="请输入账期系数" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="circiutToolView">
            <div v-if="circiutList.length != 1" @click="delCircuit(index)">
              <img class="itemSubIcon" src="@/assets/imgs/itemSub.png"/>
            </div>
            <div @click="addCircuit()">
              <img class="itemAddIcon" src="@/assets/imgs/itemAdd.png"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

  <div class="btnView">
    <el-button @click="backLastStep">返回上一步</el-button>
    <el-button @click="backToList" type="primary">保存，返回项目首页</el-button>
    <el-button type="primary">保存，立即发布</el-button>
  </div>
</template>

<script lang="ts" name="PayMerchantForm" setup>
// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

// const dialogVisible = ref(false) // 弹窗的是否展示
// const dialogTitle = ref('') // 弹窗的标题
// const formType = ref('') // 表单的类型：create - 新增；update - 修改

// 步骤3传给新增页面
const emit = defineEmits<{
  (e: 'back-last-step'),(e: 'back-to-list')
}>()

//点击返回列表
const backToList = () => {
    emit('back-to-list')
}

const circiutList = reactive([
  {
    name:'1',
    ifShow:false,
    list:[
      {
        t:'1'
      }
    ]
  }
])

//点击添加路线
const addCircuit = () => {
  circiutList.push({
    name:'1',
    ifShow:false,
    list:[
      {
        t:'1'
      }
    ]
  })
  // console.log('circiutList',circiutList)
}

//点击删除某个线路
const delCircuit = (CRElementIndex : Number) => {
  circiutList.splice(CRElementIndex,1)
}

//点击保存进入下一步
const backLastStep = () => {
    emit('back-last-step')
}

</script>

<style lang="scss" scoped>
.titleText{
  padding:20px 0 0 0;
  font-weight:700;
  font-size: large;
}

.importView{
  padding: 20px 0;
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
  padding: 20px 0;
}

.circuitView{
  height: 550px;
  overflow: hidden;
  overflow-y: auto;
}

.circiutToolView{
  display:flex;
  align-items: center;
  .itemSubIcon{
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }
  .itemAddIcon{
    width: 30px;
    height: 30px;
    margin: 0 10px 0 0;
  }
}
</style>
