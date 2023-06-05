<script setup lang="ts">
import { reactive, ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi } from '@/api/login'
// import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { UserType } from '@/api/login/types'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { required } = useValidator()

const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { wsCache } = useCache()

const { t } = useI18n()

const rules = {
    username: [required()],
    password: [required()]
}

const schema = reactive<FormSchema[]>([
    {
        field: 'title',
        colProps: {
            span: 24
        }
    },
    {
        field: 'username',
        label: t('login.username'),
        value: 'admin',
        component: 'Input',
        colProps: {
            span: 24
        },
        componentProps: {
            placeholder: t('login.usernamePlaceholder')
        }
    },
    {
        field: 'password',
        label: t('login.password'),
        value: 'admin',
        component: 'InputPassword',
        colProps: {
            span: 24
        },
        componentProps: {
            style: {
                width: '100%'
            },
            placeholder: t('login.passwordPlaceholder')
        }
    },
    {
        field: 'tool',
        colProps: {
            span: 24
        }
    },
    {
        field: 'login',
        colProps: {
            span: 24
        }
    },
    {
        field: 'other',
        component: 'Divider',
        label: t('login.otherLogin'),
        componentProps: {
            contentPosition: 'center'
        }
    },
    {
        field: 'otherIcon',
        colProps: {
            span: 24
        }
    }
])

const iconSize = 30

const remember = ref(false)

const { register, elFormRef, methods } = useForm()

const loading = ref(false)

const iconColor = '#999'

const redirect = ref<string>('')

watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {

        redirect.value = route?.query?.redirect as string
    },
    {
        immediate: true
    }
)

// 登录
const signIn = async () => {
    const formRef = unref(elFormRef)
    await formRef?.validate(async (isValid) => {
        if (isValid) {
            loading.value = true
            const { getFormData } = methods
            const formData = await getFormData<UserType>()

            try {
                const res = await loginApi(formData)
                if (res) {
                    wsCache.set(appStore.getUserInfo, res.data)
                    // 是否使用动态路由
                    console.log(res, 135);

                    if (appStore.dynamicRouter) {
                        getRole()
                    } else {
                        await permissionStore.generateRoutes('none').catch(() => { })
                        permissionStore.getAddRouters.forEach((route) => {
                            addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
                        })
                        permissionStore.setIsAddRouters(true)
                        push({ path: '/' })
                    }
                }
            } finally {
                loading.value = false
            }
        }
    })
}

// 获取角色信息
const getRole = async () => {
    const { getFormData } = methods
    const formData = await getFormData<UserType>()
    const params = {
        roleName: formData.username
    }
    console.log(params);

    // admin - 模拟后端过滤菜单
    // test - 模拟前端过滤菜单
    // const res =
    //  formData.username === 'admin' ? await getAdminRoleApi(params) : await getTestRoleApi(params)
    const res: any = await new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        path: '/overseasWarehouse',
                        component: '/OverseasWarehouse/index',
                        meta: {
                            link: true,
                            title: t('router.overseasWarehouse'),
                            icon: 'ant-design:dashboard-filled'
                        },
                        name: 'overseasWarehouse'
                    },
                    {
                        path: '/standardTime',
                        component: '/StandardTime/index',
                        meta: {
                            link: true,
                            title: t('router.standardTime'),
                            icon: 'ant-design:dashboard-filled'
                        },
                        name: 'standardTime'
                    },
                    {
                        path: '/transportBI',
                        component: '/TransportBI/index',
                        meta: {
                            link: true,
                            title: t('router.TransportBI'),
                            icon: 'ant-design:dashboard-filled'
                        },
                        name: 'transportBI'
                    },
                    {
                        path: '/warehouseinkenno',
                        component: '#',
                        redirect: '/warehouseinkenno/index',
                        name: 'WarehouseInKenno',
                        meta: {},
                        children: [
                            {
                                path: 'index',
                                component: '/WarehouseInKenno/index',
                                name: 'WarehouseInKenno-index',
                                meta: {
                                    title: t('router.warehouseHome'),
                                    icon: 'ant-design:dashboard-filled',
                                    affix: true
                                }
                            }
                        ]
                    },
                    {
                        path: '/logisticslnkenno',
                        component: '#',
                        redirect: '/logisticslnkenno/index',
                        name: 'LogisticsInKenno',
                        meta: {},
                        children: [
                            {
                                path: 'index',
                                component: '/LogisticsInKenno/index',
                                name: 'LogisticsInKenno-index',
                                meta: {
                                    title: t('router.logisticsHome'),
                                    icon: 'ant-design:dashboard-filled',
                                }
                            }
                        ]
                    },
                    {
                        path: '/saleinkenno',
                        component: '#',
                        redirect: '/saleinkenno/index',
                        name: 'SaleInKenno',
                        meta: {},
                        children: [
                            {
                                path: 'index',
                                component: '/SaleInKenno/index',
                                name: 'SaleInKenno-index',
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
                        component: '#',
                        redirect: '/inventorysnapshot/inboundinstruction/index',
                        name: 'InventorySnapshot',
                        meta: {
                            title: t('router.inventorySnapshot'),
                            icon: 'ci:error',
                            alwaysShow: true
                        },
                        children: [
                            {
                                path: 'inboundinstruction',
                                component: '/InventorySnapshot/InboundInstruction/index',
                                name: 'InboundInstruction-index',
                                meta: {
                                    title: t('router.inboundInstruction')
                                }
                            },
                            {
                                path: 'inboundDetail',
                                component: '/InventorySnapshot/InboundInstruction/InboundDetail/index',
                                name: 'inboundDetail-index',
                                meta: {
                                    title: '详情信息',
                                    hidden: true,
                                    breadcrumb: false
                                }
                            },
                            {
                                path: 'outboundinstruction',
                                component: '/InventorySnapshot/OutboundInstruction/index',
                                name: 'OutboundInstruction-index',
                                meta: {
                                    title: t('router.outboundinstruction')
                                }
                            },
                            {
                                path: 'inventoryquery',
                                component: '/InventorySnapshot/InventoryQuery/index',
                                name: 'InventoryQuery-index',
                                meta: {
                                    title: t('router.inventoryQuery')
                                }
                            },
                            {
                                path: 'warehousingquery',
                                component: '/InventorySnapshot/WarehousingQuery/index',
                                name: 'WarehousingQuery-index',
                                meta: {
                                    title: t('router.warehousingquery')
                                }
                            },
                            {
                                path: 'outboundquery',
                                component: '/InventorySnapshot/OutboundQuery/index',
                                name: 'OutboundQuery-index',
                                meta: {
                                    title: t('router.outboundquery')
                                }
                            }
                        ]
                    },
                    {
                        path: '/external-link',
                        component: '#',
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
                        path: '/workcomponents',
                        component: '#',
                        redirect: '/workcomponents/index',
                        name: 'WorkComponents',
                        meta: {},
                        children: [
                            {
                                path: 'index',
                                component: '/WorkComponents/index',
                                name: 'WorkComponents-index',
                                meta: {
                                    title: '组件示例',
                                    icon: 'ant-design:dashboard-filled',
                                }
                            }
                        ]
                    },
                    {
                        path: '/warehousemanage',
                        component: '#',
                        redirect: '/warehousemanage/index',
                        name: 'warehousemanage',
                        meta: {},
                        children: [
                            {
                                path: 'index',
                                component: '/WarehouseManage/index',
                                name: 'WarehouseManage-index',
                                meta: {
                                    title: t('router.warehouseManage'),
                                    icon: 'ant-design:dashboard-filled',
                                }
                            }
                        ]
                    },
                ]
            })
        }, 500)
    })
    if (res) {
        const { wsCache } = useCache()
        const routers = res.data || []
        console.log(routers, 312);

        wsCache.set('roleRouters', routers)
        console.log(routers, 313);

        formData.username === 'admin'
            ? await permissionStore.generateRoutes('admin', routers).catch(() => { })
            : await permissionStore.generateRoutes('test', routers).catch(() => { })

        permissionStore.getAddRouters.forEach((route) => {
            addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
        })
        permissionStore.setIsAddRouters(true)
        push({ path: '/' })
    }
}

// 去注册页面
const toRegister = () => {
    emit('to-register')
}
</script>

<template>
    <Form :schema="schema" :rules="rules" label-position="top" hide-required-asterisk size="large"
        class="dark:(border-1 border-[var(--el-border-color)] border-solid)" @register="register">
        <template #title>
            <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.login') }}</h2>
        </template>

        <template #tool>
            <div class="flex justify-between items-center w-[100%]">
                <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
                <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink>
            </div>
        </template>

        <template #login>
            <div class="w-[100%]">
                <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
                    {{ t('login.login') }}
                </ElButton>
            </div>
            <div class="w-[100%] mt-15px">
                <ElButton class="w-[100%]" @click="toRegister">
                    {{ t('login.register') }}
                </ElButton>
            </div>
        </template>

        <template #otherIcon>
            <div class="flex justify-between w-[100%]">
                <Icon icon="ant-design:github-filled" :size="iconSize" class="cursor-pointer anticon" :color="iconColor" />
                <Icon icon="ant-design:wechat-filled" :size="iconSize" class="cursor-pointer anticon" :color="iconColor" />
                <Icon icon="ant-design:alipay-circle-filled" :size="iconSize" :color="iconColor"
                    class="cursor-pointer anticon" />
                <Icon icon="ant-design:weibo-circle-filled" :size="iconSize" :color="iconColor"
                    class="cursor-pointer anticon" />
            </div>
        </template>
    </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
    &:hover {
        color: var(--el-color-primary) !important;
    }
}
</style>
