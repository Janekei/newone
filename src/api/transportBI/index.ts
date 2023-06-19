import request from '@/config/axios'

export const normaleAuftrage = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/normaleAuftrage', data })
}

export const stageOrderDetails = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/stageOrderDetails', data })
}