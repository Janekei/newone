import request from '@/config/axios'

// 正常订单分布
export const normaleAuftrage = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/bitms/normaleAuftrage', data })
}

// 各阶段订单详情
export const stageOrderDetails = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/bitms/stageOrderDetails', data })
}

// 正常供应商分布
export const normalversorgung = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/bitms/normalversorgung', data })
}

// 超期订单分布
export const uberfalligeAuftrage = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/bitms/uberfalligeAuftrage', data })
}

// 超期订单供应商
export const supplierForOverdueOrders = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/bitms/supplierForOverdueOrders', data })
}