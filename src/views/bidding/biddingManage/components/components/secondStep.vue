<template>
  <div class="titleText">线路信息</div>
  <div class="importView">
    <el-button @click="openForm()">
      选择线路
    </el-button>
    <el-button @click="toUpdateExcel()">
      Excel导入
    </el-button>
    <el-button>
      模板导入
    </el-button>
    <el-button>
      引入历史标
    </el-button>
  </div>

  <div class="circuitView">
    <circuitList/>
  </div>

  <div class="btnView">
    <el-button type="primary" @click="toNext('AEsecondStep')">保存，下一步</el-button>
    <el-button type="primary" @click="backLastStep">返回上一步</el-button>
    <el-button @click="backToList">返回项目首页</el-button>
  </div>
</template>

<script lang="ts" name="PayMerchantForm" setup>
import circuitList from "@/views/bidding/circuitManage/circuitTemplateList/components/circuitList.vue"
// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

// const dialogVisible = ref(false) // 弹窗的是否展示
// const dialogTitle = ref('') // 弹窗的标题
// const formType = ref('') // 表单的类型：create - 新增；update - 修改

// 步骤2传给新增页面
const emit = defineEmits<{
  (e: 'to-next'),
  (e:'back-to-list'),
  (e:'back-last-step'),
  (e:'check-bidding-info',type:String),
  (e:'to-open-UpdateExcelWin')
}>()

// const formData = ref({
//   templateName : '',
//   area:'',
//   status:''
// })

// const formRules = reactive({
//   templateName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
//   area: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
// })

//点击保存进入下一步
const toNext = (type:String) => {
  //向addOrEdit传输需要打开线路明细及费用项确认
  emit('check-bidding-info',type)
  // emit('to-next')
}

//点击返回列表
const backToList = () => {
    emit('back-to-list')
}

//返回上一步
const backLastStep = () => {
    emit('back-last-step')
}

//打开Excel导入表格
const toUpdateExcel = () => {
  emit('to-open-UpdateExcelWin')
}


</script>

<style lang="scss" scoped>
.titleText{
  padding:20px 0 0 0;
  font-weight:700;
  font-size: large;
}

.importView{
  padding-top: 20px;
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
  height: 400px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
