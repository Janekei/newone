import request from '@/config/axios'

export const createTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/create', data})
}