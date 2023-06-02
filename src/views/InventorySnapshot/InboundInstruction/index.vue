<template>
    <TypeChoose @getTabState="getStateName">
        <template v-slot:[name]>
            <InboundInstructionList :name="name" />
        </template>
        <!-- <template #wdg>
            <InboundInstructionList :name="name"/>
        </template>
        <template #wqg>
            <InboundInstructionList :name="name"/>
        </template>
        <template #qgz>
            <InboundInstructionList :name="name"/>
        </template>
        <template #qgwc>
            <InboundInstructionList :name="name"/>
        </template> -->
    </TypeChoose>
</template>

<script lang="ts" setup>
import TypeChoose from './TypeChoose/index.vue'
import InboundInstructionList from './InboundInstructionList/index.vue'
import { ref } from 'vue'
let name = ref('all')
const getStateName = (state) => {
    name.value = state
}


</script>
<style scoped></style>
  