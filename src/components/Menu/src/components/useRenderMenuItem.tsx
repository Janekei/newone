import { ElSubMenu, ElMenuItem } from 'element-plus'
import type { RouteMeta } from 'vue-router'
import {useRouter } from 'vue-router'
import { hasOneShowingChild } from '../helper'
import { isUrl } from '@/utils/is'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { useDesign } from '@/hooks/web/useDesign'
import { pathResolve } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { Icon } from '@/components/Icon'

const { t } = useI18n()

export const useRenderMenuItem = (
  // allRouters: AppRouteRecordRaw[] = [],
  menuMode: 'vertical' | 'horizontal'
) => {
 const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = '/') => {
  console.log(routers, 14);
  const router = useRouter()
  function onClick(route) {
   const href = router.resolve({ //使用resolve
      name:'overseasWarehouse',    //这里是跳转页面的name
      path: route.path,
   })
   console.log(href, 26);
   window.open(href.href, '_blank')
  }
    return routers.map((v) => {
      const meta = (v.meta ?? {}) as RouteMeta
      if (!meta.hidden) {
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)
        const fullPath = isUrl(v.path) ? v.path : pathResolve(parentPath, v.path) // getAllParentPath<AppRouteRecordRaw>(allRouters, v.path).join('/')
        const { renderMenuTitle } = useRenderMenuTitle()
        if (
          oneShowingChild &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
          !meta?.alwaysShow
        ) {
         if (meta.link) {
          return (
           <ElMenuItem onClick={() => { onClick(v) }}>
            <Icon icon={meta.icon}></Icon>
            <span class="v-menu__title">
              {t(v.meta.title)}
            </span>
           </ElMenuItem>
          )
         } else {
          return (
            <ElMenuItem index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}>
              {{
                default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
              }}
            </ElMenuItem>
          )
          }

        } else {
          const { getPrefixCls } = useDesign()

          const preFixCls = getPrefixCls('menu-popper')
          return (
            <ElSubMenu
              index={fullPath}
              popperClass={
                menuMode === 'vertical' ? `${preFixCls}--vertical` : `${preFixCls}--horizontal`
              }
            >
              {{
                title: () => renderMenuTitle(meta),
                default: () => renderMenuItem(v.children!, fullPath)
              }}
            </ElSubMenu>
          )
        }
      }
    })
  }

  return {
    renderMenuItem
  }
}
