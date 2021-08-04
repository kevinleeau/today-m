import request from '@/utils/request.js'
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 添加用户频道请求
export const addUserChannels = (item) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [item]
    }
  })
}
// 删除用户频道请求
export const deleteUserChannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
