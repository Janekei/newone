import request from '@/config/axios'

export const getEarthData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/earthdata', params })
}

export const getOutBoundData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/outbound', params })
}

export const getInventoryData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/inventory', params })
}

export const getTurnoverData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/turnover', params })
}

export const getStockAgeData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/stockAge', params })
}

export const getSituationData = (params) => {
    return request.get({ url: '/lcdp/biwarehoue/situation', params })
}