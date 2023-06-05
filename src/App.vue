<script lang="ts" name="APP" setup>
import { isDark } from '@/utils/is'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import routerSearch from '@/components/RouterSearch/index.vue'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('app')
const appStore = useAppStore()
const currentSize = computed(() => appStore.getCurrentSize)
const greyMode = computed(() => appStore.getGreyMode)
const { wsCache } = useCache()

// 根据浏览器当前主题设置系统主题色
const setDefaultTheme = () => {
 let isDarkTheme = wsCache.get(CACHE_KEY.IS_DARK)
 if (isDarkTheme === null) {
  isDarkTheme = isDark()
 }
 appStore.setIsDark(isDarkTheme)
}
setDefaultTheme()
</script>
<template>
 <ConfigGlobal :size="currentSize">
  <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  <routerSearch />
 </ConfigGlobal>
</template>
<style lang="scss">
$prefix-cls: #{$namespace}-app;

.size {
 width: 100%;
 height: 100%;
}

html,
body {
 padding: 0 !important;
 margin: 0;
 overflow: hidden;
 // background-color: #F2F2F2;

 @extend .size;

 #app {
  @extend .size;
 }
}

.#{$prefix-cls}-grey-mode {
 filter: grayscale(100%);
}

.el-input__wrapper {
 border-radius: 50px;
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
