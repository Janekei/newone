import request from '@/config/axios'

//  创建模板
export const createTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/create', data})
}

// 获取模板信息---参数id
export const getTemplate = (params) => {
    return request.get({ url: '/jinko/fee/template/findById', params })
}

// 更新模板信息---参数id
export const updateTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/update', data })
}