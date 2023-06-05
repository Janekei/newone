<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle" width="1000" :scroll='true'>
    <Table
      :columns="tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
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
      <el-button :disabled="formLoading" type="primary" @click="dialogVisible = false">确 定</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" name="PayMerchantForm" setup>
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

const tableObject = []

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

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  // dialogTitle.value = t('action.' + type)
  dialogTitle.value = '查看费用项'
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

</script>
