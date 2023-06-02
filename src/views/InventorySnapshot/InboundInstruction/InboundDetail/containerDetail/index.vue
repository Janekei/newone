<template>
  <el-table ref="multipleTableRef" :data="tableData" border style="width: 100%;height:600px">
    <el-table-column property="seqNum" label="序号" width="55" />
    <el-table-column property="boxNo" label="箱号" />
    <el-table-column property="billNo" label="提单号" />
    <el-table-column property="billType" label="箱型" />
    <el-table-column property="lockType" label="锁号" />
    <el-table-column property="number" label="件数" />
    <el-table-column property="weight" label="重量" />
    <el-table-column property="volume" label="体积" />
    <el-table-column property="createPeople" label="创建人" />
    <el-table-column label="创建时间">
      <template #default="scope">{{ scope.row.createTime }}</template>
    </el-table-column>
    <el-table-column property="updatePeople" label="更新人" />
    <el-table-column label="更新时间">
      <template #default="scope">{{ scope.row.updateTime }}</template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

// interface User {
//   date: string
//   name: string
//   address: string
// }

const tableData = reactive(
  [
    {
      seqNum: 1,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 2,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 3,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 4,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 5,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 6,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 7,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 8,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 9,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 10,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 11,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 12,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 13,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 14,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    },
    {
      seqNum: 15,
      boxNo: 'GESU666666666',
      billNo: '177HSDWQ99999A',
      billType: '40HQ',
      lockType: 'FX2233322',
      number: 720,
      weight: 29393,
      volume: 39,
      createPeople: '物流AA',
      createTime: '2023/3/3',
      updatePeople: '物流BB',
      updateTime: '2023/3/3'
    }

  ])
</script>
<style lang="less" scoped>
::v-deep.el-table {
  border: .0625rem solid #d2d2d2;
}

::v-deep .el-table__header .el-table__cell {
  background-color: #efefef !important;

}

::v-deep .el-table__cell {
  font-size: .875rem;
  font-weight: 400;
  text-align: center;
  color: #333;
  height: 1.875rem;
  border: .0625rem solid #d2d2d2;
  background-color: #f6f6f6 !important;
}
</style>
