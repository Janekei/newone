import request from '@/config/axios'

//  创建模板
export const createTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/create', data })
}

// 获取模板信息基础信息
export const getTemplate = (params) => {
    return request.get({ url: '/jinko/fee/template/findById', params })
}

// 获得模板明细分页
export const getTemplateDetail = (params) => {
    return request.get({ url: '/jinko/fee/template/page', params })
}

// 更新模板信息---参数id
export const updateTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/update', data })
}