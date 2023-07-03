import request from '@/config/axios'

export const phaseTime = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/phaseTime', data })
}

export const deliveringAmount = (data: any): Promise<IResponse> => {
    return request.post({ url: '/lcdp/standardTime/deliveringAmount', data })
}

export const timelinessRate = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/timelinessRate', data })
}

export const punctuality = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/punctuality', data })
}

export const transportationCycle = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/standardTime/transportationCycle', data })
}