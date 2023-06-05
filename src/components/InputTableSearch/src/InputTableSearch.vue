<template>
  <el-input
    v-model="inputText"
    placeholder="请选择日期"
    >
    <template #suffix>
      <el-popover
        placement=""
        width="400"
        :visible="visible"
        trigger="click">
        <div class="searchView">
          <el-input  placeholder="请选择日期" />
          <el-button type="primary">搜索</el-button>
        </div>
        <el-table :data="circiutList" @row-click="editTable">
          <el-table-column align="center" label="编号" prop="templateNickname" />
          <el-table-column align="center" label="表单名" prop="templateNickname" />
        </el-table>
        <div>
          分页区域
        </div>
        <template #reference>
          <Icon icon="fa-solid:globe-americas" class="el-input__icon cursor-pointer" @click="visible = !visible" />
        </template>
      </el-popover>
    </template>

  </el-input>
</template>

<script lang="ts" name="InputTableSearch" setup>
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure

//传入接口接收参数
// const props = defineProps({
//   // 父组件传过来的是否打开弹窗参数
//   visible: {
//     type: Boolean,
//     default: () => false
//   },
// })

//弹窗显示与否赋值
// const visible : Boolean = props.visible

const circiutList = [
  {
    templateNickname:'1'
  }
]

//是否打开弹窗的参数
const visible = ref(false)
const inputText = ref('')

// 选中表格中的某行确定
const editTable = (row : Object) => {
  // console.log('点击的行',row.templateNickname)
  inputText.value = row.templateNickname
  console.log('visible.value',visible.value)
  visible.value = false
}

// 点击打开筛选的表格
const openTable = (row : Object) => {
  visible.value = true
}

</script>

<style lang="scss" scoped>
.searchView{
  display: flex;
}
</style>
