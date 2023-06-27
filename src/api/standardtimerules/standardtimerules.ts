import request from '@/config/axios'

// 获取国家/港口信息
export const findCountry = async (params) => {
    return await request.get({ url: '/jinko/standardTime/findCountry', params })
}

// 新增标准时间规则
export const addTimeRules = async (data) => {
    return await request.post({ url: '/jinko/standardTime/create', data })
}