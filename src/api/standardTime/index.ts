import request from '@/config/axios'

// 各阶段时间
export const phaseTime = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/phaseTime', data })
}

// 发货量
export const deliveringAmount = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/standardTime/deliveringAmount', data })
}

// POD及时率
export const timelinessRate = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/timelinessRate', data })
}

// 准时交付率
export const punctuality = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/punctuality', data })
}

// 运输周期
export const transportationCycle = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/transportationCycle', data })
}