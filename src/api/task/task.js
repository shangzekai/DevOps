import axios from '@/libs/api.request'

export const createTask = (data) => {
  return axios.request({
    url: '/task/',
    data,  // 此处必须是要写data， 不能写其他的单词
    method: 'post'
  })
}





export const gettasks = (params) => {
  return axios.request({
    url: '/task/',
    params,
    method: 'get'
  })
}

export const exectask = (data) => {
  let id = data.id
  return axios.request({
    url: '/task/'+id+'/',
    data: {"detail_result":''},
    method: 'patch'
  })
}

export const getresult = (id) => {

  return axios.request({
    url: '/task/'+id+'/',
    method: 'get'
  })
}


