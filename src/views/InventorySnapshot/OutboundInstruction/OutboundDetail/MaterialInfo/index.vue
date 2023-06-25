<template>
    <div>
        <OperateMaterial v-if="(showPickPart === true && isShowTray === false) && iscloseTray" @showTrayList="showTrayList"
            @backWaybill="backWaybill" />
        <AllMaterial v-else-if="(showPickPart === false && isShowTray === false) && iscloseTray" />
        <TrayMaterial v-else :goodsId="goodsId" @update:changeCloseTray="changeCloseTray" />
    </div>
</template>

<script lang="ts" setup>
import AllMaterial from './MaterialDetail/AllMaterial.vue'
import OperateMaterial from './MaterialDetail/OperateMaterial.vue'
import TrayMaterial from './MaterialDetail/TrayMaterial.vue'
const props = defineProps({
    showPickPart: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['back', 'changeShowPickPart'])

// 深拷贝showPickPart
let showPickPart = ref(props.showPickPart)

// 获取到所点击选托按钮行的物料id
// 显示托纬度物料，隐藏其余两个信息
let goodsId = ref()
let isShowTray = ref(false)
let iscloseTray = ref(true)  // 是否隐藏选托页面
const showTrayList = (val) => {
    goodsId.value = val
    emits('changeShowPickPart')
    showPickPart.value = false
    isShowTray.value = false
    iscloseTray.value = false
}

const changeCloseTray = () => {
    showPickPart.value = true
    isShowTray.value = false
    iscloseTray.value = true
}

// 返回到运单信息页面
const backWaybill = () => {
    emits('back')
}
</script>
<style lang="scss" scoped></style>
