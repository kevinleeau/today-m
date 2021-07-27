// 封装本地存储操作模块 获取数据 保存数据 删除数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 使用try and catch防止读取的本地存储的数据源不符合json格式
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
