import request from '@/config/axios'

// 获取出库指令运单信息详情
export const getOutboundDetail = async (params) => {
    return await request.get({ url: '/gsc/outbound/getOutboundInformation', params })
}

// 物料信息托维度拣货功能
export const trayPickGoods = async (data) => {
    return await request.post({ url: '/gsc/outbound/goods/pickingQuery', data })
}

// 物料信息箱维度拣货功能
export const boxPickGoods = async (data) => {
    return await request.post({ url: '/gsc/outbound/goods/pickingQueryWithBox', data })
}

// 出库指令列表tab标题的条数
export const getOutboundListTotal = async (params) => {
    return await request.get({ url: '/gsc/outbound/getOutboundNumber', params })
}

// 出库指令拣货单出库功能
export const postOutboundList = async (data) => {
    return await request.post({ url: '/gsc/outbound/goods/confirmPicking', data })
}

// 绑定车辆功能
export const bindCart = async (data) => {
    return await request.post({ url: '/gsc/outbound/pallets/licensePlateNumberBinding', data })
}

// 获取车辆信息
export const getCartPage = async (params) => {
    return await request.get({ url: '/gsc/vehicleEntity/page', params })
}