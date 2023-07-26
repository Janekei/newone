import request from '@/config/axios'

// 获取入库指令分页信息
export const getInboundListTotal = async (params) => {
    return await request.get({ url: '/gsc/inbound/getInboundTabNumber', params })
}

// 获取入库指令信息 ----传入参数id
export const getInboundList = async (params) => {
    return await request.get({ url: '/gsc/inbound/page', params })
}

// 获取运单信息 ----传入参数id
export const getListItemDetail = async (params) => {
    return await request.get({ url: '/gsc/inbound/getInformation', params })
}

// 整批入库功能
export const postAllInbound = async (params) => {
    return await request.get({ url: '/gsc/stock/pallets/warehousingOperation', params })
}

// 获取箱列表信息
export const getPartInboundBox = async (params) => {
    return await request.get({ url: '/gsc/inbound/container/page', params })
}

// 部分入库功能----箱纬度
export const postPartInboundBox = async (params) => {
    // console.log(params.ids, 'box')
    return await request.post({ url: '/gsc/stock/pallets/warehousingWithBox', data: params })
}

// 获取托列表信息
export const getPartInboundTray = async (params) => {
    return await request.get({ url: '/gsc/inbound/pallets/page', params })
}

// 部分入库功能----托纬度
export const postPartInboundTray = async (params) => {
    return await request.post({ url: '/gsc/stock/pallets/warehousingWithTray', data: params })
}

// 异常登记----箱纬度
export const recordErrorBox = async (params) => {
    return await request.post({ url: '/gsc/stock/pallets/boxAndException', data: params })
}

// 异常登记----托纬度
export const recordErrorTray = async (params) => {
    return await request.post({ url: '/gsc/stock/pallets/trayAndException', data: params })
}

// 分配仓库
export const allotWhareahouse = async (data) => {
    return await request.post({ url: '/gsc/inbound/allocateWarehouse', data })
}
// 获取仓库信息
export const getWhareaInfo = async (params) => {
    return await request.get({ url: '/gsc/baseWarehouse/page', params })
}