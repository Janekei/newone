<template>
  <ContentWrap>
    <div :class="ifShowClose ? 'titleView':''">
      <div>
        {{title}}
      </div>
      <div v-if="ifShowClose" @click="backList">
        <img class="closeIcon" src="@/assets/imgs/close.png"/>
      </div>
    </div>
  </ContentWrap>
</template>

<script lang="ts" name="PageTitle" setup>
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure

// import { defineProps } from 'vue'

//传入接口接收线路模板列表
const props = defineProps({
  //标题名称
  title: {
    type: String,
    default: () => '模板编辑'
  },
  //是否显示关闭按钮
  ifShowClose:{
    type: Boolean,
    default: () => true
  }
})

//父组件页面类型赋值
const title : String = props.title

//子组件传给父组件的数值
const emit = defineEmits<{
  (e: 'back-to-list', v: String)
}>()

//回到首页数据列表
const backList = () => {
  emit('back-to-list', 'backPage')
}

</script>

<style lang="scss" scoped>
.titleView{
  display: flex;
  justify-content: space-between;
  //font-size: 23px;
  color:#333333;
  align-items: center;

  .closeIcon{
    width: 25px;
    height: 25px;
  }
}
</style>
