<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle" :fullscreen="false" width="500" :scroll='false'>
    <div class="warning-info">
      <img class="warning-icon" src=""/>
      <div class="warning-text">
        从Excel表格完整导入，将清除当前设置线路，请谨慎操作
      </div>
    </div>
    <div class="update-info">
      <div>
        <div class="update-template-info">
          <div>
            模板下载：
          </div>
          <div class="update-template-btn">
            招投标线路导入模板.xlsx
          </div>
        </div>
        <div class="update-file-info">
          <div>
            导入文件：
          </div>
          <div>
            <el-button type="primary">选择文件</el-button>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="toClose">确 定</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" name="FeeDataWin" setup>
// import * as MerchantApi from '@/api/pay/merchant'

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
// const formData = ref({
//   id: undefined,
//   name: '',
//   shortName: '',
//   status: CommonStatusEnum.ENABLE,
//   remark: ''
// })


/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  // dialogTitle.value = t('action.' + type)
  dialogTitle.value = '线路信息导入'
  formType.value = type
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    // try {
    //   formData.value = await MerchantApi.getMerchant(id)
    // } finally {
    //   formLoading.value = false
    // }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

//关闭弹窗时
const toClose = () => {

}
</script>

<style lang="scss" scoped>
.warning-info{
  display: flex;
  justify-content: center;
  align-items: center;

  .warning-icon{
    width:52px;
    height: 47px;
    margin-right: 20px;
  }

  .warning-text{
    width: 250px;
    font-size: 18px;
    color: red;
  }
}

.update-info{
  display: flex;
  justify-content: center;
  align-items: center;

  .update-template-info{
    margin-top:30px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .update-template-btn{
    text-decoration:underline;
    color:blue;
    cursor:pointer;
  }

  .update-file-info{
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>