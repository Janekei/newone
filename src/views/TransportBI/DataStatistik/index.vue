<template>
 <div class="flex-div">
  <div class="flex-div-item">
   <Card title="正常订单分布">
    <NormaleAuftrage :data="normaleAuftrageData" v-if="showNormaleAuftrage" />
   </Card>
  </div>
  <div class="flex-div-item">
   <Card title="正常供应商分布">
    <Normalversorgung id="normalversorgung" />
   </Card>
  </div>
  <div class="flex-div-item" style="margin-top: 2rem">
   <Card title="超期订单分布">
    <UberfalligeAuftrage id="uberfallige-auftrage" />
   </Card>
  </div>
  <div class="flex-div-item" style="margin-top: 2rem">
   <Card title="超期订单-供应商">
    <UberfalligeAuftrageG id="uberfallige-auftrage-g" />
   </Card>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from '../Components/Card.vue'
import NormaleAuftrage from './NormaleAuftrage.vue'
import Normalversorgung from './Normalversorgung.vue'
import UberfalligeAuftrage from './UberfalligeAuftrage.vue'
import UberfalligeAuftrageG from './UberfalligeAuftrageG.vue'
import { normaleAuftrage } from '@/api/transportBI/index'

const normaleAuftrageData = ref()
const showNormaleAuftrage = ref(false)
const getNormaleAuftrageData = () => {
 normaleAuftrage({}).then(res => {
  showNormaleAuftrage.value = true
  normaleAuftrageData.value = res
 })
}

onMounted(() => {
 getNormaleAuftrageData()
})

</script>

<style lang="scss">
#app {
 overflow: auto;
}

.flex-div {
 display: flex;
 flex-wrap: wrap;

 &-item {
  width: 50%;
  height: 270px;
 }
}
</style>
