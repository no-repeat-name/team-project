import axios from '../utils/axios'
class Admin {
  login(payload){
    let url = '/admin/adm/login'
    return axios.post(url,payload)
  }
}

export default new Admin()