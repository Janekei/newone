<template>
 <el-tabs v-model="activeName" type="card" class="demo-tabs tab" @tab-click="handleClick">
  <el-tab-pane v-for="(item, index) in tabList" :label="item.lable" :key="item.title" :name="item.name"
   v-loading="loading">
   <slot :name="item.name" v-if="activeName === item.name">
    <div v-if="(item.name !== 'waybill' && item.name !== 'boxInfo')">
     <TableContent ref="tableRef" :transportStatus="index" @totalList="totalList" />
    </div>
    <div v-else-if="item.name === 'waybill'">
     <WayBillDatailInfo :boxDetailInfo="props.boxDetailInfo" @clickPart="swicthPartInboud"
      @clickError="swicthErrorOrder" />
    </div>
    <div v-else>
     <BoxDetailInfo ref="trayRef" :boxDetailInfo="props.boxDetailInfo" :showPartInboud="showPartInboud"
      :showErrorInboud="showErrorInboud" :isClickPartInboundBtn="isClickPartInboundBtn"
      :isClickErrorBtn="isClickErrorBtn" :errorInboundID="errorInboundID" @backWay="backWay" />
    </div>
   </slot>
  </el-tab-pane>
 </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import TableContent from '../components/TableContent.vue'
import WayBillDatailInfo from '../DetailInboundInstruction/WayBillDetailInfo/index.vue'
import BoxDetailInfo from '../DetailInboundInstruction/BoxDetailInfo/index.vue'

const props = defineProps({
 tabList: {
  type: Array as any,
  default: () => []
 },
 boxDetailInfo: {
  type: Array as any,
  default: () => []
 },
 totalNumber: {
  type: Array as any,
  default: () => []
 }
})

const loading = ref(false)
let activeName = ref(props.tabList[0].name)
onMounted(() => {
 loading.value = true
 setTimeout(() => {
  loading.value = false
 }, 800);
})

// 当前列表总条数
let total = ref(0)
const totalList = (val) => {
 total.value = val
}

// 过滤tabList数据
onBeforeMount(() => {
 console.log(props.totalNumber[0], 'list')
})
const tabList = computed(() => {

 let data: any = []
 if (props.tabList[0].hasOwnProperty('number')) {
  props.tabList.forEach((item) => {
   props.totalNumber.forEach(ele => {
    if (ele.name === item.name) {
     data.push({
      title: item.title,
      lable: item.title + '(' + ele.total + ')',
      name: item.name
     })
    }
   })
  });
  return data;
 }
 props.tabList.forEach(item => {
  data.push({
   title: item.title,
   lable: item.title,
   name: item.name
  })
 });
 return data;
})


const trayRef = ref()



// 接收点击部分入库按钮状态
let isClickPartInboundBtn = ref(false)
let isClickErrorBtn = ref(false)
let showPartInboud = ref(false)
let showErrorInboud = ref(false)
const swicthPartInboud = (val) => {
 console.log(val, 'clickswicthPartInboud')
 activeName.value = 'boxInfo'
 showPartInboud.value = true
 isClickPartInboundBtn.value = true
}

// 接收点击异常订单按钮状态
let errorInboundID = ref(0)
const swicthErrorOrder = (val) => {
 console.log(val, 'clickswicthErrorOrder')
 errorInboundID.value = val
 activeName.value = 'boxInfo'
 showErrorInboud.value = true
 isClickErrorBtn.value = true
}

// 搜索
// const tableRef = ref()
// let searchData = reactive({})
// const clickSearch = () => {
//     tableRef.value[0].refresh()
// }
// const updateFormState = (val) => {
//     console.log(1, val)
//     searchData = val
// }
// const resetForm = () => {
//     searchData = {}
//     clickSearch()
// }


// 选中的tab触发
const handleClick = (tab) => {
 trayRef.value[0].switchChooseTray()
 activeName.value = tab.props.name
 if (tab.props.name === 'waybill') {
  showPartInboud.value = false
  showErrorInboud.value = false
  isClickPartInboundBtn.value = false
  isClickErrorBtn.value = false
 }
}

// 触发异常订单、部分入库的返回按钮，返回到运单信息页面
const backWay = () => {
 activeName.value = 'waybill'
 showPartInboud.value = false
 showErrorInboud.value = false
 isClickPartInboundBtn.value = false
 isClickErrorBtn.value = false
}



</script>
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
 padding: 32px;
 color: #6b778c;
 font-size: 1.75rem;

 background-color: #6b778c;
}

::v-deep .el-tabs__nav>.el-tabs__item {
 color: #409EFF;
 background-color: #fff;
 font-family: "PingFang SC";
 border: none;
 border-top: .125rem solid #409EFF !important;
}

::v-deep .el-tabs__header .el-tabs__nav {
 border: none;
}

::v-deep .el-tabs__header {
 border: none !important;
}

::v-deep .el-tabs__nav>.is-active {
 border: 0.0625rem solid #409EFF !important;
 border-top: .375rem solid #409EFF !important;
}
</style>
