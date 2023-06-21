import request from '@/config/axios'

export const normaleAuftrage = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/normaleAuftrage', data })
}

export const stageOrderDetails = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/stageOrderDetails', data })
}

export const normalversorgung = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/normalversorgung', data })
}
export const uberfalligeAuftrage = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/uberfalligeAuftrage', data })
}

export const supplierForOverdueOrders = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/bitms/supplierForOverdueOrders', data })
}