
<template>
  <div class="global-background box">
    <ElDrawer title="我是标题" v-model="showDrawer" :with-header="false" direction="ltr" size="20%">
      <!-- <div class="form" draggable="true" @dragstart="dragstart" @dragend="dragend">拖动我</div> -->
      <EchartTemp @dragstart="dragstart" @dragend="dragend" :echartIdList="echartIdList" />
    </ElDrawer>
    <Header :title="toggleMapFlag ? '海外库存监控' : '地区库存监控'" />
    <!-- 主体 -->
    <div class="main-body">
      <div class="main-body-left" @dragover="dragover($event, 1)" @drop="drop(1)">
        <Card title="出入库量统计">
          <template #body>
            <InventoryStatistics :echartIdList="echartIdList" :showBorder="showBorder" @close="closeCur"
              ref="inventoryRef" />
          </template>
        </Card>
      </div>
      <div class="main-body-center">
        <div class="main-body-center-top">
          <el-button class="back-btn" @click="back" v-if="showBackbtn" plain :icon="DArrowLeft" circle />
          <Map @toggleMapFlagFn="toggleMapFlagFn" v-if="showMap" :data="earthData" />
        </div>
        <div class="main-body-center-bottom" @dragover="dragover($event, 2)" @drop="drop(2)">
          <Overview :echartIdList="echartIdList" ref="overviewRef"  :showBorder="showBorder" @close="closeCur"
            :toggleMapFlag="toggleMapFlag" />
        </div>
      </div>
      <div class="main-body-right">
        <BodyLeft @dragover="dragover" @drop="drop" @close="closeCur" :echartIdList="echartIdList"
          :showBorder="showBorder" ref="bodyLeftRef" />
      </div>
    </div>
    <div class="toggle" @click="toggleDrawe" :style="{ left: showDrawer ? '20%' : '0%' }">
      <el-icon style="color: #fff">
        <arrow-right-bold v-if="!showDrawer" />
        <arrow-left-bold v-else />
      </el-icon>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElDrawer, ElIcon } from 'element-plus'
import { DArrowLeft } from '@element-plus/icons-vue'
import Header from './Components/Header.vue'
import Map from './Components/Map.vue'
import Card from './Components/EchartCard.vue'
import InventoryStatistics from './Components/InventoryStatistics.vue'
import EchartTemp from './Components/EchartTemp.vue'
import Overview from '@/views/OverseasWarehouse/Components/Overview/index.vue'
import BodyLeft from '@/views/OverseasWarehouse/BodyLeft/index.vue'
import { getEarthData } from '@/api/overseasWarehouse/index'

const back = () => {
  showMap.value = false
  showBackbtn.value = false
  toggleMapFlag.value = true
  bodyLeftRef.value.mapId = undefined
  setTimeout(() => {
    showMap.value = true
  });
}

// 拖动实现
const toggleMapFlag = ref(true)
const echartIdList: any = reactive([1, 2, 3, 4, 5])
const showBorder = ref(0)
const showDrawer = ref(false)

const dragstart = num => {
  showBorder.value = num
  showDrawer.value = false
}
const dragend = () => {
  showBorder.value = 0
}
const dragover = (e, id) => {
  if (showBorder.value === id) {
    e.preventDefault()
  }
}
const drop = id => {
  if (echartIdList.includes(id)) return
  echartIdList.push(id)
  showDrawer.value = true
}

// 关闭当前echart
const closeCur = (id: number) => {
  for (let i = 0; i <= echartIdList.length; i++) {
    let item = echartIdList[i]
    if (item === id) {
      echartIdList.splice(i, 1)
      showDrawer.value = true
      break
    }
  }
}

const toggleDrawe = () => {
  showDrawer.value = !showDrawer.value
}

const inventoryRef = ref()
const bodyLeftRef = ref()
const overviewRef = ref()
const showBackbtn = ref(false)
const toggleMapFlagFn = (id) => {
  showBackbtn.value = true
  toggleMapFlag.value = false
  // 传递所点击的地图id
  inventoryRef.value.getOutBound(id)
  bodyLeftRef.value.mapId = id
  overviewRef.value.mapId = id
}

const earthData = ref()
const showMap = ref(false)
const getEarth = () => {
  getEarthData({}).then(res => {
    res.data.forEach((item, index) => {
      item.id = index
    })
    console.log(res, 9999)
    earthData.value = res
    showMap.value = true
  })
}
getEarth()
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .main-body {
    display: flex;
    flex: 1;
    margin-top: 1rem;
    height: 100%;

    &-left,
    &-right {
      width: 23%;
      height: 100%;
    }

    &-center {
      width: 54%;
      display: flex;
      flex-direction: column;

      &-top {
        height: 55%;
      }

      &-bottom {
        flex: 45%;
      }
    }
  }
}

.back-btn {
  background-color: #caefe8;
}

.back-btn:hover {
  border-color: #8ee7d7;
  color: #505153;
  font-weight: 700;
}

.toggle {
  display: flex;
  width: .7rem;
  height: 3rem;
  background-color: #3e90f1;
  position: absolute;
  top: 50%;
  transform: translate(-50% -50%);
  z-index: 9999;
  border-radius: 0 .1875rem .1875rem 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
</style>