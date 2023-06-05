<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle" width="1000" :scroll='true'>
    <el-row>
      <el-col :span="4">
        <div class="CTitle">
          <text>线路</text>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="CTitle">
          <text>权重</text>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="CTitle">
          <text>运输方式</text>
        </div>
      </el-col>
    </el-row>

    <div v-for="(item,index) in circiutList" :key="index">
      <el-row style="padding:20px 0 0 0;">
        <el-col :span="4">
          <div style="text-align: center; margin: 0 10px;">
            123
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: center; margin: 0 10px;">
            123
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: center; margin: 0 10px;">
            123
          </div>
        </el-col>
      </el-row>

      <div style="width:100%; display: flex; justify-content: center;">
        <Table
          style="width: 80%; margin-top: 10px;"
          :columns="tableColumns"
          :data="templateList"
          :loading="formLoading"
          :border="true"
        >
          <template #action="{ row }">
            <el-button
              link
              type="primary"
              @click="openDetail(row.id)"
              v-hasPermi="['system:mail-log:query']"
            >
              详情
            </el-button>
          </template>
        </Table>
      </div>
    </div>

    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="toCloseWin()">确 定</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" name="PayMerchantForm" setup>

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'

// const { t } = useI18n() // 国际化

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改


const circiutList = [
  {
    name:'1'
  }
]
// const tableObject = []

const tableColumns =[
  {
    label: '费用项',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '计费工具',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '计费工具',
    field: 'username'
  },
  {
    label: '币种',
    field: 'password',
    isSearch: true
  },
  {
    label: '费用项权重',
    field: 'host',
    isSearch: true
  },
  {
    label: '报价下限',
    field: 'host',
    isSearch: true
  },
  {
    label: '报价上限',
    field: 'host',
    isSearch: true
  }
]

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list')
}>()

/** 打开弹窗 */
const open = async (type:String) => {
  dialogVisible.value = true
  // dialogTitle.value = t('action.' + type)
  dialogTitle.value = '模板详情'
  formType.value = type
  console.log(formType.value,type)
  // // 修改时，设置数据
  // if (id) {
  //   formLoading.value = true
  //   try {
  //     formData.value = await MerchantApi.getMerchant(id)
  //   } finally {
  //     formLoading.value = false
  //   }
  // }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const toCloseWin = () => {
  if(formType.value == 'ae'){
    //关闭设置窗口并回到列表也买你
    dialogVisible.value = false
    emit('back-to-list')
  }else{
    dialogVisible.value = false
  }
}

</script>

<style lang="scss" scoped>
  .CTitle{
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }
</style>
