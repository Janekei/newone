<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { isDark } from '@/utils/is'
import { useDesign } from '@/hooks/web/useDesign'
import { useCache } from '@/hooks/web/useCache'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('app')

const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)

const greyMode = computed(() => appStore.getGreyMode)

const { wsCache } = useCache()

// 根据浏览器当前主题设置系统主题色
const setDefaultTheme = () => {
 if (wsCache.get('isDark') !== null) {
  appStore.setIsDark(wsCache.get('isDark'))
  return
 }
 const isDarkTheme = isDark()
 appStore.setIsDark(isDarkTheme)
}

setDefaultTheme()
</script>

<template>
 <ConfigGlobal :size="currentSize">
  <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
 </ConfigGlobal>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
 width: 100%;
 height: 100%;
}

html,
body {
 padding: 0 !important;
 margin: 0;
 overflow: hidden;
 .size;

 #app {
  .size;
 }
}

.@{prefix-cls}-grey-mode {
 filter: grayscale(100%);
}

@media (max-width: 1024px) {
 html {
  font-size: 12px
 }
}

@media (min-width: 1024px) {
 html {
  font-size: 12px
 }
}

/*>=1024的设备*/

@media (min-width: 1100px) {
 html {
  font-size: 14px
 }
}

/*>=1100的设备*/
@media (min-width: 1280px) {
 html {
  font-size: 14px;
 }
}

/*>=1280的设备*/

@media (min-width: 1366px) {

 html {
  font-size: 16px;
 }
}

@media (min-width: 1440px) {
 html {
  font-size: 16px !important;
 }
}

@media (min-width: 1680px) {
 html {
  font-size: 18x;
 }
}

@media (min-width: 1920px) {
 html {
  font-size: 20px;
 }
}
</style>
