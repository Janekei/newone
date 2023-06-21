import request from '@/config/axios'

export const transportStatistics = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/transportStatistics', data })
}

export const deliveringAmount = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/deliveringAmount', data })
}