import request from '@/config/axios'

// 获取基础数据列表
export const getTableList = async () => {
    return await request.get({ url: '/jinkotms/BaseWharea/page' })
}