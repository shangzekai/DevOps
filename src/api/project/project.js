import axios from '@/libs/api.request'



// 获取当前用户任务列表
export const  getProjectList = () => {
  return axios.request({
    url: '/projects/list/',
    method: 'get',
  })
}

// 获取当前项目tag列表
export const getProjectTag = (data) => {
  return axios.request({
    url: '/projects/tag/',
    method: 'get',
    data
  })
}
