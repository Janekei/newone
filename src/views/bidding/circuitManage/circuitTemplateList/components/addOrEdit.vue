<template>
  <PageTitle title="模板编辑" @back-to-list="backList"/>

  <ContentWrap>
    <div class="winView">
        <el-form
          ref="formRef"
          v-loading="formLoading"
          :model="formData"
          :rules="formRules"
          label-width="80px"
        >
          <el-row class="titleForm" style="width:100%; background-color: white; z-index: 1000; position: absolute;">
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="formData.templateName" placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item label="选择区域" prop="area">
              <el-tree-select
                v-model="formData.area"
                :data="deptList"
                :props="defaultProps"
                check-strictly
                node-key="id"
                placeholder="请选择区域"
              />
            </el-form-item>
            <el-form-item label="是否生效" class="switchView">
              <el-switch
                v-model="formData.status"
                active-text="是"
                inactive-text="否"
                inline-prompt
                @change="handleCheckedTreeExpand"
              />
            </el-form-item>
          </el-row>

          <div class="circuitListView">
            <circuitT/>
          </div>

        </el-form>
    </div>
    <div class="btnView">
      <el-button type="primary" @click="toComfirm('ae')">确定</el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PayMerchantForm" setup>
// import * as MerchantApi from '@/api/pay/merchant'
import circuitT from "./circuitList.vue"

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化
// const formType = ref('') // 表单的类型：create - 新增；update - 修改

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list', v: String),(e:'to-see-detail')
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

//回到首页数据列表
const backList = () => {
  emit('back-to-list', 'backPage')
}

const toComfirm = (type:String) => {
  emit('to-see-detail',type)
}

</script>

<style lang="scss" scoped>
.titleView{
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color:#333333;
}

.winView{
  position: relative;
  .switchView{
    position: absolute;
    right: 0;
    top: 0;
  }

  .cardView{
    box-shadow: 5px 5px 5px #CCCCCC;
    margin:10px 20px 20px 0;
    border: solid 1px #CCCCCC;
  }

  :deep(.el-scrollbar){
    height: 100% !important;
  }

  .circuitListView{
    height: 630px;
    overflow: hidden;
    overflow-y: auto;
  }
}

.btnView{
  padding:20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
