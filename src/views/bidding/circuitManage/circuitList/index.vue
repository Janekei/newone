<template>
  <!-- 搜索工作栏 -->
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams">
    <!-- 新增等操作按钮 -->
    <template #action>
      <el-button
        type="primary"
        plain
        v-hasPermi="['system:mail-account:create']"
      >
        <Icon icon="ep:search" class="mr-5px" /> 高级查询
      </el-button>
    </template>
    </Search>

    <InputTableSearch/>
    <el-button @click="openForm()">
      费用项查看
    </el-button>
    <el-button>
      生效
    </el-button>
    <el-button>
      失效
    </el-button>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <Table
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection='true'
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
  <feeItemWin ref="formRef" />
</template>

<script setup lang="ts" name="SystemMailLog">
import { allSchemas } from './tableFrom'
import * as circuitManageApi from '@/api/bidding/circuitManage'
import feeItemWin from "./components/feeItemWin.vue"
// import MailLogDetail from './MailLogDetail.vue'

// tableObject：表格的属性对象，可获得分页大小、条数等属性
// tableMethods：表格的操作对象，可进行获得分页、删除记录等操作
const { tableObject, tableMethods } = useTable({
  getListApi: circuitManageApi.getBiddingLineList, // 分页接口
  // delListApi: circuitManageApi.deleteMailAccount // 删除接口
})
// 获得表格的各种操作
const { getList, setSearchParams } = tableMethods

/** 详情操作 */
const detailRef = ref()
const openDetail = (id: number) => {
  detailRef.value.open(id)
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = () => {
  formRef.value.open()
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
