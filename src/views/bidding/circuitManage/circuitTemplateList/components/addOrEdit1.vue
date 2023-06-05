<template>
  <div class="winView">
    <Dialog class="" v-model="dialogVisible" :title="dialogTitle" width="90%" :scroll='true'>
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

        <circuitT/>

      </el-form>


      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="dialogVisible = false">确 定</el-button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" name="PayMerchantForm" setup>
// import * as MerchantApi from '@/api/pay/merchant'
import circuitT from "./circuitList.vue"

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改

const formData = ref({
  templateName : '',
  area:'',
  status:''
})

const formRules = reactive({
  templateName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
  area: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
})



/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  // dialogTitle.value = t('action.' + type)
  dialogTitle.value = '模板设置'
  formType.value = type
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      // formData.value = await MerchantApi.getMerchant(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

</script>

<style lang="scss" scoped>
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

  .dialogView :deep(.el-dialog__body){
    height: 700px;
  }

  :deep(.el-scrollbar){
    height: 100% !important;
  }
}
</style>
