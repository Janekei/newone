import request from '@/config/axios'

// 获取库存查询分页信息
export const getTabNumber = async () => {
    return await request.get({ url: '/gsc/stock/pallets/getTabNumber' })
}

