<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle" width="1000" :scroll='true'>
    <Table
      class="tableViewCompany"
      :columns="tableColumns2"
      :data="circiutList3"
      row-key="id"
      align="left"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :loading="formLoading"
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

const tableColumns2 = [
  {
    label: '线路',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '线路权重',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '费用项',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '计费工具',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '计费单位',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '费用项权重',
    field: 'templateNickname2',
    isSearch: false
  },
  {
    label: '报价',
    field: 'templateNickname2',
    isSearch: false
  }
]

const circiutList3 = [
  {
    templateNickname:'上海--宁波',
    id:1,
    children: [
      {
              templateNickname2:'1'
            }, {
              templateNickname2: '上海市普陀区金沙江路 1519 弄'
          }]
  },
  {
    id:2,
    templateNickname:'1',
    children: [
      {
              templateNickname2:'X'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
  },
  {
    id:3,
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  },
  {
    templateNickname:'1'
  }
]

// 步骤2传给新增页面
const emit = defineEmits<{
  (e: 'to-next')
}>()


/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  // dialogTitle.value = t('action.' + type)
  dialogTitle.value = '上海XX物流报价明细'
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
  //若是在新增，编辑项目中点击确定按钮时，进入编辑项目的第三步
  if(formType.value == 'AEsecondStep'){
    emit('to-next')
    dialogVisible.value = false
  }
}
</script>
