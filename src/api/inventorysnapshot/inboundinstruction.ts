import request from '@/config/axios'

// 获取入库指令分页信息
export const getInboundListTotal = async (params) => {
    return await request.get({ url: '/jinko/gscwhinbound/getInboundNumber', params })
}

// 获取入库指令信息 ----传入参数id
export const getInboundList = async (params) => {
    return await request.get({ url: '/jinko/gscwhinbound/page', params })
}

// 获取运单信息 ----传入参数id
export const getListItemDetail = async (params) => {
    return await request.get({ url: '/jinko/gscwhinbound/getInformation', params })
}

// 整批入库功能
export const postAllInbound = async (params) => {
    return await request.get({ url: '/jinko/gscwhstockpallets/warehousingOperation', params })
}

// 获取箱列表信息
export const getPartInboundBox = async (params) => {
    return await request.get({ url: '/jinko/gscwhinboundcontainer/page', params })
}

// 部分入库功能----箱纬度
export const postPartInboundBox = async (params) => {
    console.log(params.ids, 'box')
    return await request.post({ url: '/jinko/gscwhstockpallets/warehousingWithBox', data: params })
}

// 获取托列表信息
export const getPartInboundTray = async (params) => {
    return await request.get({ url: '/jinko/gscwhinboundpallets/page', params })
}

// 部分入库功能----托纬度
export const postPartInboundTray = async (params) => {
    return await request.post({ url: '/jinko/gscwhstockpallets/warehousingWithTray', data: params })
}

// 异常登记----箱纬度
export const recordErrorBox = async (params) => {
    return await request.post({ url: '/jinko/gscwhstockpallets/boxAndException', data: params })
}

// 异常登记----托纬度
export const recordErrorTray = async (params) => {
    return await request.post({ url: '/jinko/gscwhstockpallets/trayAndException', data: params })
}