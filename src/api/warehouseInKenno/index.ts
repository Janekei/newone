// http://jinko3.s.itcat.fun/lcdp/homeWarehouse/outtabs
import request from '@/config/axios'

export const outtabs = (params: any): Promise<IResponse> => {
    return request.get({ url: '/lcdp/homeWarehouse/outtabs', params })
}

export const intabs = (params: any): Promise<IResponse> => {
    return request.get({ url: '/lcdp/homeWarehouse/intabs', params })
}

export const day7in = (params: any): Promise<IResponse> => {
    return request.get({ url: '/lcdp/homeWarehouse/day7in', params })
}

export const day7out = (params: any): Promise<IResponse> => {
    return request.get({ url: '/lcdp/homeWarehouse/day7out', params })
}