import request from '@/config/axios'

// 获取出库指令运单信息详情
export const getOutboundDetail = async (params) => {
    return await request.get({ url: '/jinko/gscwhoutbound/getOutboundInformation', params })
}

// 物料信息托维度拣货功能
export const trayPickGoods = async (data) => {
    return await request.post({ url: '/jinko/outbound-goods/pickingQuery', data })
}

// 出库指令列表tab标题的条数
export const getOutboundListTotal = async (params) => {
    return await request.get({ url: '/jinko/gscwhoutbound/getOutboundNumber',params })
}