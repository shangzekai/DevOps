import axios from '@/libs/api.request'

export const getBookInfo = ({page, page_size}) => {
  return axios.request({
    url: '/Book/',
    params: {
      page,
      page_size
    },
    method: 'get'
  })
}

export const addBookInfo = (data) => {
  return axios.request({
    url: '/Book/',
    data,
    method: 'post'
  })
}

export const updateBook = (data) => {

  console.log(data)
  let id = data.id
  console.log(id)
  return axios.request({
    url: '/Book/'+id +'/' ,
    data: data,
    method: 'put'
  })
}


