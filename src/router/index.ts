import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
// import { useCache } from '@/hooks/web/useCache'

// const { wsCache } = useCache()

const { t } = useI18n()
// const roleRouters = wsCache.get('roleRouters')
// console.log(roleRouters, 12);

export const constantRouterMap: AppRouteRecordRaw[] = [
 // 不同角色路由初次重定向解决方式
 // {
 //  path: '/',
 //  component: Layout,
 //  redirect: '/warehouseinkenno/index',
 //  name: 'Root',
 //  meta: {
 //   hidden: true
 //  }
 // },
 {
  path: '/redirect',
  component: Layout,
  name: 'Redirect',
  children: [
   {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/Redirect/Redirect.vue'),
    meta: {}
   }
  ],
  meta: {
   hidden: true,
   noTagsView: true
  }
 },
 {
  path: '/login',
  component: () => import('@/views/Login/Login.vue'),
  name: 'Login',
  meta: {
   hidden: true,
   title: t('router.login'),
   noTagsView: true
  }
 },
 {
  path: '/404',
  component: () => import('@/views/Error/404.vue'),
  name: 'NoFind',
  meta: {
   hidden: true,
   title: '404',
   noTagsView: true
  }
 }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
 {
  path: '/warehouseinkenno',
  component: Layout,
  redirect: '/warehouseinkenno/index',
  name: 'WarehouseInKenno',
  meta: {},
  children: [
   {
    path: 'index',
    component: () => import('@/views/WarehouseInKenno/index.vue'),
    name: 'WarehouseInKenno',
    meta: {
     title: t('router.warehouseHome'),
     icon: 'ant-design:dashboard-filled',
    }
   }
  ]
 },
 {
  path: '/logisticslnkenno',
  component: Layout,
  redirect: '/logisticslnkenno/index',
  name: 'LogisticsInKenno',
  meta: {},
  children: [
   {
    path: 'index',
    component: () => import('@/views/LogisticsInKenno/index.vue'),
    name: 'LogisticsInKenno',
    meta: {
     title: t('router.logisticsHome'),
     icon: 'ant-design:dashboard-filled',
    }
   }
  ]
 },
 {
  path: '/saleinkenno',
  component: Layout,
  redirect: '/saleinkenno/index',
  name: 'SaleInKenno',
  meta: {},
  children: [
   {
    path: 'index',
    component: () => import('@/views/SaleInKenno/index.vue'),
    name: 'SaleInKenno',
    meta: {
     title: t('router.saleHome'),
     icon: 'ant-design:dashboard-filled',
    }
   }
  ]
 },
 // 库存快照
 {
  path: '/inventorysnapshot',
  component: Layout,
  redirect: '/inventorysnapshot/inboundinstruction',
  name: 'InventorySnapshot',
  meta: {
   title: t('router.inventorySnapshot'),
   icon: 'ci:error',
   alwaysShow: true
  },
  children: [
   {
    path: 'inboundinstruction',
    component: () => import('@/views/InventorySnapshot/InboundInstruction/index.vue'),
    name: 'InboundInstruction',
    meta: {
     title: t('router.inboundInstruction')
    }
   },
   {
    path: 'outboundinstruction',
    component: () => import('@/views/InventorySnapshot/OutboundInstruction/index.vue'),
    name: 'OutboundInstruction',
    meta: {
     title: t('router.outboundinstruction')
    }
   },
   {
    path: 'inventoryquery',
    component: () => import('@/views/InventorySnapshot/InventoryQuery/index.vue'),
    name: 'InventoryQuery',
    meta: {
     title: t('router.inventoryQuery')
    }
   },
   {
    path: 'warehousingquery',
    component: () => import('@/views/InventorySnapshot/WarehousingQuery/index.vue'),
    name: 'WarehousingQuery',
    meta: {
     title: t('router.warehousingquery')
    }
   },
   {
    path: 'outboundquery',
    component: () => import('@/views/InventorySnapshot/OutboundQuery/index.vue'),
    name: 'OutboundQuery',
    meta: {
     title: t('router.outboundquery')
    }
   }
  ]
 },
 // _______________________________________________________________________-
 {
  path: '/external-link',
  component: Layout,
  meta: {},
  name: 'ExternalLink',
  children: [
   {
    path: 'https://element-plus-admin-doc.cn/',
    name: 'DocumentLink',
    meta: {
     title: t('router.document'),
     icon: 'clarity:document-solid'
    }
   }
  ]
 },
 {
  path: '/components',
  component: Layout,
  name: 'ComponentsDemo',
  meta: {
   title: t('router.component'),
   icon: 'bx:bxs-component',
   alwaysShow: true
  },
  children: [
   {
    path: 'form',
    component: getParentLayout(),
    redirect: '/components/form/default-form',
    name: 'Form',
    meta: {
     title: t('router.form'),
     alwaysShow: true
    },
    children: [
     {
      path: 'default-form',
      component: () => import('@/views/Components/Form/DefaultForm.vue'),
      name: 'DefaultForm',
      meta: {
       title: t('router.defaultForm')
      }
     },
     {
      path: 'use-form',
      component: () => import('@/views/Components/Form/UseFormDemo.vue'),
      name: 'UseForm',
      meta: {
       title: 'UseForm'
      }
     },
     {
      path: 'ref-form',
      component: () => import('@/views/Components/Form/RefForm.vue'),
      name: 'RefForm',
      meta: {
       title: 'RefForm'
      }
     }
    ]
   },
   {
    path: 'table',
    component: getParentLayout(),
    redirect: '/components/table/default-table',
    name: 'TableDemo',
    meta: {
     title: t('router.table'),
     alwaysShow: true
    },
    children: [
     {
      path: 'default-table',
      component: () => import('@/views/Components/Table/DefaultTable.vue'),
      name: 'DefaultTable',
      meta: {
       title: t('router.defaultTable')
      }
     },
     {
      path: 'use-table',
      component: () => import('@/views/Components/Table/UseTableDemo.vue'),
      name: 'UseTable',
      meta: {
       title: 'UseTable'
      }
     },
     {
      path: 'ref-table',
      component: () => import('@/views/Components/Table/RefTable.vue'),
      name: 'RefTable',
      meta: {
       title: 'RefTable'
      }
     }
    ]
   },
   {
    path: 'editor-demo',
    component: getParentLayout(),
    redirect: '/components/editor-demo/editor',
    name: 'EditorDemo',
    meta: {
     title: t('router.editor'),
     alwaysShow: true
    },
    children: [
     {
      path: 'editor',
      component: () => import('@/views/Components/Editor/Editor.vue'),
      name: 'Editor',
      meta: {
       title: t('router.richText')
      }
     }
    ]
   },
   {
    path: 'search',
    component: () => import('@/views/Components/Search.vue'),
    name: 'Search',
    meta: {
     title: t('router.search')
    }
   },
   {
    path: 'descriptions',
    component: () => import('@/views/Components/Descriptions.vue'),
    name: 'Descriptions',
    meta: {
     title: t('router.descriptions')
    }
   },
   {
    path: 'image-viewer',
    component: () => import('@/views/Components/ImageViewer.vue'),
    name: 'ImageViewer',
    meta: {
     title: t('router.imageViewer')
    }
   },
   {
    path: 'dialog',
    component: () => import('@/views/Components/Dialog.vue'),
    name: 'Dialog',
    meta: {
     title: t('router.dialog')
    }
   },
   {
    path: 'icon',
    component: () => import('@/views/Components/Icon.vue'),
    name: 'Icon',
    meta: {
     title: t('router.icon')
    }
   },
   {
    path: 'count-to',
    component: () => import('@/views/Components/CountTo.vue'),
    name: 'CountTo',
    meta: {
     title: t('router.countTo')
    }
   },
   {
    path: 'qrcode',
    component: () => import('@/views/Components/Qrcode.vue'),
    name: 'Qrcode',
    meta: {
     title: t('router.qrcode')
    }
   },
   {
    path: 'highlight',
    component: () => import('@/views/Components/Highlight.vue'),
    name: 'Highlight',
    meta: {
     title: t('router.highlight')
    }
   },
   {
    path: 'infotip',
    component: () => import('@/views/Components/Infotip.vue'),
    name: 'Infotip',
    meta: {
     title: t('router.infotip')
    }
   },
   {
    path: 'input-password',
    component: () => import('@/views/Components/InputPassword.vue'),
    name: 'InputPassword',
    meta: {
     title: t('router.inputPassword')
    }
   },
   {
    path: 'sticky',
    component: () => import('@/views/Components/Sticky.vue'),
    name: 'Sticky',
    meta: {
     title: t('router.sticky')
    }
   }
  ]
 },
 {
  path: '/authorization',
  component: Layout,
  redirect: '/authorization/user',
  name: 'Authorization',
  meta: {
   title: t('router.authorization'),
   icon: 'eos-icons:role-binding',
   alwaysShow: true
  },
  children: [
   {
    path: 'user',
    component: () => import('@/views/Authorization/User.vue'),
    name: 'User',
    meta: {
     title: t('router.user')
    }
   },
   {
    path: 'role',
    component: () => import('@/views/Authorization/Role.vue'),
    name: 'Role',
    meta: {
     title: t('router.role')
    }
   }
  ]
 }
]

const router = createRouter({
 history: createWebHashHistory(),
 strict: true,
 routes: constantRouterMap as RouteRecordRaw[],
 scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
 const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
 router.getRoutes().forEach((route) => {
  const { name } = route
  if (name && !resetWhiteNameList.includes(name as string)) {
   router.hasRoute(name) && router.removeRoute(name)
  }
 })
}

export const setupRouter = (app: App<Element>) => {
 app.use(router)
}

export default router
