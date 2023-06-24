import request from '@/config/axios'

// 获取出库指令运单信息详情
export const getOutboundDetail = async (params) => {
    return await request.get({ url: '/jinko/gsc-wh-outbound/getOutboundInformation', params })
}