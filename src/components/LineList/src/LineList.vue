<template>
  <!-- 有分页 -->
  <!-- <Table
    :columns="tableColumns"
    :data="templateList"
    :loading="tableObject.loading"
    :pagination="{
      total: tableObject.total
    }"
    v-model:pageSize="tableObject.pageSize"
    v-model:currentPage="tableObject.currentPage"
  > -->
  <div class="btnView">
    <el-button>
      新建
    </el-button>
    <el-button>
      预览
    </el-button>
    <el-button>
      编辑
    </el-button>
    <el-button>
      删除
    </el-button>
  </div>

  <!-- 无分页 -->
  <Table
    :columns="pageType == 'circuit' ? tableColumns_t : tableColumns_b"
    :data="templateList"
    :loading="tableObject.loading"
    height="680"
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
</template>

<script setup lang="ts" name="LineList">
import { dateFormatter } from '@/utils/formatTime'
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure

const tableObject = []

const tableColumns_t =[
  {
    label: '编码',
    field: 'title',
    isSearch: false
  },
  {
    label: '名称',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '状态',
    field: 'username'
  },
  {
    label: '区域',
    field: 'password',
    isSearch: true
  },
  {
    label: '创建人',
    field: 'host',
    isSearch: true
  },
  {
    label: '创建时间',
    field: 'host',
    isSearch: true
  },
  {
    label: '更新人',
    field: 'host',
    isSearch: true
  },
  {
    label: '更新时间',
    field: 'host',
    isSearch: true
  }
]

const tableColumns_b =[
  {
    label: '项目编号',
    field: 'mail',
    isSearch: false
  },
  {
    label: '项目名称',
    field: 'username',
    isSearch: true
  },
  {
    label: '状态',
    field: 'password',
    isSearch: true
  },
  {
    label: '销售合同号',
    field: 'host'
  },
  {
    label: '项目区域',
    field: 'host'
  },
  {
    label: '项目总量',
    field: 'host'
  },
  {
    label: '项目有效期',
    field: 'host'
  },
  {
    label: '开标时间',
    field: 'createTime',
    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '截标时间',
    field: 'createTime',
    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '中标服务商',
    field: 'host'
  },
  {
    label: '币种',
    field: 'host'
  },
  {
    label: '技术占比',
    field: 'host'
  },
  {
    label: '最多可出价次数',
    field: 'host'
  }
]

//接口接收线路模板列表
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

//模板列表赋值
const templateList : Object = props.templateList

const pageType : String = props.pageType

/** 删除按钮操作 */
// const handleDelete = async (id: number) => {
//   try {
//     // 删除的二次确认
//     await message.delConfirm()
//     // 发起删除
//     await UserGroupApi.deleteUserGroup(id)
//     message.success(t('common.delSuccess'))
//     // 刷新列表
//     await getList()
//   } catch {}
// }

</script>

<style lang="scss" scoped>
.btnView{
  padding-bottom: 20px;
}
</style>
