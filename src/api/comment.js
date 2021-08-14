import request from '@/utils/request.js'
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/api/v1_0/comments',
    params: params
  })
}
// like and unlike comments
export const likeComment = (target) => {
  return request({
    method: 'POST',
    url: '/api/v1_0/comment/likings',
    data: {
      target: target
    }
  })
}
export const unlikeComment = (target) => {
  return request({
    method: 'DELETE',
    url: `/api/v1_0/comment/likings/${target}`
  })
}
// post comment or reply comment, params include id, content
export const addComment = (params) => {
  return request({
    method: 'POST',
    url: '/api/v1_0/comments',
    params: params
  })
}
