import axios from '@/libs/api.request'

export const getPublisher = ({page, page_size}) => {
  return axios.request({
    url: '/Publish/',
    params: {
      page,
      page_size
    },
    method: 'get'
  })
}

export const updatePublish = (data) => {

  console.log(data)
  let id = data.id
  console.log(id)
  return axios.request({
    url: '/Publish/'+id +'/' ,
    data:{'name':data.name, 'city':data.city, 'address':data.address},
    method: 'put'
  })
}


