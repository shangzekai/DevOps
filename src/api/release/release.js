import axios from '@/libs/api.request'



// 获取工单列表
export const getDeployList = (params) => {
  return axios.request({
    url: '/deploy/',
    method: 'get',
    params
  })
}

// 创建工单
export const createDeploy = (data) => {
  return axios.request({
    url: '/deploy/',
    method: 'post',
    data
  })
}

// 修改工单
export const updateDeploy = (id, status,name) => {
  console.log(id, status)

  return axios.request({
    url: '/deploy/' + id + '/',
    //method: 'put',
    method: 'patch',
    data:{'status':status,'name':name}
  })
}

// 删除工单
export const deleteDeploy = (id) => {
  return axios.request({
    url: '/deploy/' + id + '/',
    method: 'delete'
  })
}
