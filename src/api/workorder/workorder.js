import axios from '@/libs/api.request'

export const addWorkOrder = (data) => {
  return axios.request({
    url: '/workorder/',
    data,  // 此处必须是要写data， 不能写其他的单词
    method: 'post'
  })
}


export const getorders = (params) => {
  return axios.request({
    url: '/workorder/',
    params,
    method: 'get'
  })
}


export const updateStatus = (row, data) => {

  let id = row.id
  return axios.request({
    url: '/workorder/'+id +'/',
    data:data,
    method: 'patch'
  })
}
