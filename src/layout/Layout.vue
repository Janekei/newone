<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { Backtop } from '@/components/Backtop'
import { Setting } from '@/layout/components/Setting'
import { useRenderLayout } from './components/useRenderLayout'
import { useDesign } from '@/hooks/web/useDesign'
import OverseasWarehouse from '@/views/OverseasWarehouse/index.vue'
import StandardTime from '@/views/StandardTime/index.vue'
import TransportBI from '@/views/TransportBI/index.vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('layout')

const appStore = useAppStore()

// 是否是移动端
const mobile = computed(() => appStore.getMobile)

// 菜单折叠
const collapse = computed(() => appStore.getCollapse)

const layout = computed(() => appStore.getLayout)

const handleClickOutside = () => {
 appStore.setCollapse(true)
}

const renderLayout = () => {
 switch (unref(layout)) {
  case 'classic':
   const { renderClassic } = useRenderLayout()
   return renderClassic()
  case 'topLeft':
   const { renderTopLeft } = useRenderLayout()
   return renderTopLeft()
  case 'top':
   const { renderTop } = useRenderLayout()
   return renderTop()
  case 'cutMenu':
   const { renderCutMenu } = useRenderLayout()
   return renderCutMenu()
  default:
   break
 }
}

// 外联路由
const newPageRoute: string[] = ['/overseaswarehouse-!1', '/standardtime-!2', '/transportbi-!3']

// 判断是否为外联路由
const isNewPage = (path: string) => {
 return newPageRoute.includes(path)
}

// 获取页面id
const getPageId = (path: string) => {
 const pathArr = path.split('-')
 return pathArr[1]
}

export default defineComponent({
 name: 'Layout',
 setup() {
  const { currentRoute } = useRouter()
  const bool = isNewPage(currentRoute.value.path)
  const id = getPageId(currentRoute.value.path)
  return () => {
   if (bool) {
    return (id === '!1' ? <OverseasWarehouse /> : id === '!2' ? <StandardTime /> : <TransportBI />)
   } else {
    return (<section class={[prefixCls, `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']}>
     {mobile.value && !collapse.value ? (
      <div
       class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
       onClick={handleClickOutside}
      ></div>
     ) : undefined}

     {renderLayout()}

     <Backtop></Backtop>

     <Setting></Setting>
    </section>)
   }

  }

 }
})
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-layout;

.#{$prefix-cls} {
 background-color: var(--app-content-bg-color);

 :deep(.#{$elNamespace}-scrollbar__view) {
  height: 100% !important;
 }
}
</style>
