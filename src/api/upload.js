import axios from '../utils/axios'
class Upload {
  img(payload){
    let url ='/admin/upload/img'
    return axios.post(url,payload)
  }
}

export default new Upload()