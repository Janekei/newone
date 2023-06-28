import request from '@/config/axios'

// 获取国家/港口信息
export const findCountry = async (data) => {
    return await request.post({ url: '/jinko/standardTime/findCountry', data })
}

// 新增标准时间规则
export const addTimeRules = async (data) => {
    return await request.post({ url: '/jinko/standardTime/create', data })
}

// 查询时间规则
export const searchTimeRules = async (params) => {
    return await request.get({ url: '/jinko/standardTime/get', params })
}

// 更新时间规则
export const updateTimeRules = async (data) => {
    return await request.put({ url: '/jinko/standardTime/update', data })
}