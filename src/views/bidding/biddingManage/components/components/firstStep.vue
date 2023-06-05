<template>
    <el-form
      ref="formRef"
      v-loading="formLoading"
      :model="formData"
      :rules="formRules"
      label-width="110px"
    >

      <div class="titleText">项目信息</div>

      <el-row class="projectForm" :gutter="20">
        <el-col :span="6">
          <el-form-item label="项目编号" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售合同号" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目区域" prop="area">
            <el-tree-select
              v-model="formData.area"
              :data="deptList"
              :props="defaultProps"
              check-strictly
              node-key="id"
              placeholder="请选择区域"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目总量" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目有效期" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="FOB协议选项" prop="area">
            <el-tree-select
              v-model="formData.area"
              :data="deptList"
              :props="defaultProps"
              check-strictly
              node-key="id"
              placeholder="请选择协议"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目负责人" prop="area">
            <el-tree-select
              v-model="formData.area"
              :data="deptList"
              :props="defaultProps"
              check-strictly
              node-key="id"
              placeholder="请选择负责人"
            />
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>

      <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="130px"
      >

      <div class="titleText">项目信息</div>

      <el-row class="biddingForm" :gutter="20">
        <el-col :span="6">
          <el-form-item label="开标时间" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入开标时间" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截标时间" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入截标时间" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中标服务商数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入中标服务商数" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="币种" prop="area">
            <el-tree-select
              v-model="formData.area"
              :data="deptList"
              :props="defaultProps"
              check-strictly
              node-key="id"
              placeholder="请选择币种"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="技术占比" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入技术占比" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最多可出价次数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入最多可出价次数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div></div>
        </el-col>

        <el-col :span="5">
          <el-form-item label="同评分延迟" prop="templateName">
            <el-switch
              v-model="formData.status"
              active-text="是"
              inactive-text="否"
              inline-prompt
              @change="handleCheckedTreeExpand"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最多可延迟次数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入最多可延迟次数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单次延迟分钟数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入单次延迟分钟数" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="同评分延迟" prop="templateName">
            <el-switch
              v-model="formData.status"
              active-text="是"
              inactive-text="否"
              inline-prompt
              @change="handleCheckedTreeExpand"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最多可延迟次数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入最多可延迟次数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单次延迟分钟数" prop="templateName">
            <el-input v-model="formData.templateName" placeholder="请输入单次延迟分钟数" />
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

    <div class="btnView">
      <el-button type="primary" @click="toNext">保存，下一步</el-button>
      <el-button @click="backToList">返回项目首页</el-button>
    </div>
</template>

<script lang="ts" name="PayMerchantForm" setup>

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

// const dialogVisible = ref(false) // 弹窗的是否展示
// const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
// const formType = ref('') // 表单的类型：create - 新增；update - 修改

// 步骤1基础资料传给新增页面
const emit = defineEmits<{
  (e: 'to-next'),(e:'back-to-list')
}>()

const formData = ref({
  templateName : '',
  area:'',
  status:''
})

const formRules = reactive({
  templateName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
  area: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
})

//点击保存进入下一步
const toNext = () => {
    emit('to-next')
}

//点击返回列表
const backToList = () => {
    emit('back-to-list')
}

</script>

<style lang="scss" scoped>
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
  margin-top:50px;
  display:flex;
  justify-content: center;
}
</style>
