import axios from '@/libs/api.request'

export const getUsers = ({page,page_size}) => {
  return axios.request({
    url: '/Users/',
    params: {
      page,
      page_size
    },
    method: 'get'
  })
}

export const updateUser = (data) => {

  // console.log(data)
  let id = data.id
  // console.log(id)
  return axios.request({
    url: '/Users/'+id +'/' ,
    data,
    method: 'put'
  })
}

export const updateUserGroup = (data) => {

  console.log(data)
  let id = data.id
  console.log(id)
  return axios.request({
    url: '/UserGroup/'+id +'/' ,
    data,
    method: 'put'
  })
}

export const createUser = (data) => {
  return axios.request({
    url: '/Users/',
    data,
    method: 'post'
  })
}




