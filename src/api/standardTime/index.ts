import request from '@/config/axios'

export const saveTableApi = (data: any): Promise<IResponse> => {
 return request.post({ url: '/example/save', data })
}