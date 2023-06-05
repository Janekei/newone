<template>
  <!-- 搜索工作栏 -->
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />
  </ContentWrap>

  <ContentWrap>
    <el-button @click="handleQuery">
      查看
    </el-button>
    <el-button @click="handleQuery">
      生效
    </el-button>
    <el-button @click="handleQuery">
      失效
    </el-button>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <Table
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection="true"
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
  </ContentWrap>

  <!-- 表单弹窗：详情 -->
  <!-- <mail-log-detail ref="detailRef" /> -->
</template>

<script setup lang="ts" name="SystemMailLog">
// import { allSchemas } from './config/tableFrom'
import { allSchemas } from './tableFrom'
import * as MailLogApi from '@/api/system/mail/log'
// import MailLogDetail from './MailLogDetail.vue'

// tableObject：表格的属性对象，可获得分页大小、条数等属性
// tableMethods：表格的操作对象，可进行获得分页、删除记录等操作
const { tableObject, tableMethods } = useTable({
  getListApi: MailLogApi.getMailLogPage // 分页接口
})

// const list = {
//   list:[
//     {
//       mail:'1'
//     }
//   ],
//   total:1
// }

// 获得表格的各种操作
const { getList, setSearchParams } = tableMethods

/** 详情操作 */
const detailRef = ref()
const openDetail = (id: number) => {
  detailRef.value.open(id)
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
