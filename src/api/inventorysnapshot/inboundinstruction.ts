import request from '@/config/axios'


// 获取仓库信息 ----传入参数id
export const getInboundList = async (params) => {
    return await request.get({ url: '/jinkotms-moduule-core-biz/gsc-wh-inbound/page', params })
}