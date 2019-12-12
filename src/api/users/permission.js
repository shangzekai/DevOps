import axios from '@/libs/api.request'

export const getPermInfo = () => {
  return axios.request({
    url: '/Permission/',
    params: {
      page_size:100
    },
    method: 'get'
  })
}





