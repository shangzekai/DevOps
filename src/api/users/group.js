import axios from '@/libs/api.request'

export const getGroupList = ({page, page_size}) => {
  return axios.request({
    url: '/Groups/',
    params: {
      page,
      page_size
    },
    method: 'get'
  })
}


export const getSaMembers = (id) => {
  return axios.request({
    url: '/Groups/'+id+'/',
    method: 'get'
  })
}

export const getCurGroupPerm = (id) => {
  return axios.request({
    url: '/GroupPermission/'+id+'/',
    method: 'get'
  })
}

export const updateGroupPower = (data) => {

  // console.log(data)
  let id = data.id
  // console.log(id)
  return axios.request({
    url: '/GroupPermission/'+id +'/' ,
    data,
    method: 'put'
  })
}


