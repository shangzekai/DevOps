import axios from '@/libs/api.request'

export const getAuthorList = ({page, page_size}) => {
  return axios.request({
    url: '/Author/',
    params: {
      page_size
    },
    method: 'get'
  })
}


