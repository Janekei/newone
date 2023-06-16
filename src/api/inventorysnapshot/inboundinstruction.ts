import request from '@/config/axios'


// 获取入库指令信息 ----传入参数id
export const getInboundList = async (params) => {
    return await request.get({ url: '/jinkotms-moduule-core-biz/gsc-wh-inbound/page', params })
}

// 获取运单信息、柜信息 ----传入参数id
export const getListItemDetail = async (params) => {
    return await request.get({ url: '/jinkotms-moduule-core-biz/gsc-wh-inbound/getInformation', params })
}