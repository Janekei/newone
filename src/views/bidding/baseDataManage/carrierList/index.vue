<template>
  <!-- 搜索工作栏 -->
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" :showReset="false" @search="setSearchParams" @reset="setSearchParams">
     <!-- 新增等操作按钮 -->
      <template #actionMore>
        <el-button
          type="primary"
          plain
          v-hasPermi="['system:mail-account:create']"
        >
          <Icon icon="ep:search" class="mr-5px" /> 高级查询
        </el-button>
      </template>
    </Search>
  </ContentWrap>

  <ContentWrap>
    <el-button @click="handleQuery">
      新建
    </el-button>
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
import * as BaseDataManageApi from '@/api/bidding/baseDataManage'
// import MailLogDetail from './MailLogDetail.vue'

// tableObject：表格的属性对象，可获得分页大小、条数等属性
// tableMethods：表格的操作对象，可进行获得分页、删除记录等操作
const { tableObject, tableMethods } = useTable({
  getListApi: BaseDataManageApi.getCarrierList, // 分页接口
  // delListApi: BaseDataManageApi.deleteMailAccount // 删除接口
})
// 获得表格的各种操作
const { getList, setSearchParams } = tableMethods

// const loading = ref(true)
// const total = ref(0)

// const queryParams = reactive(
//   {
//     pageSize:10,
//     currentPage:1
//   }
// )

// const tableList = ref([])

/** 详情操作 */
const detailRef = ref()
const openDetail = (id: Number) => {
  detailRef.value.open(id)
}

// const getList = async () => {
//   loading.value = true
//   try {
//     const data = await BaseDataManageApi.getAreaRegionList(queryParams.currentPage,queryParams.pageSize)
//     console.log('获取的接口数据为',data)
//     tableList.value = data.list
//     total.value = data.total
//   } finally {
//     loading.value = false
//   }
// }

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
