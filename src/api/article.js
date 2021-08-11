// 文章list details请求模块
import request from '@/utils/request'
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: params
  })
}
export const getArticlesById = (articlesId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articlesId}`
  })
}
// collect article
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
// remove collect article
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// like article
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
// remove like article
export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
