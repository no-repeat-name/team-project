// 会员管理
import axios from '../utils/axios'

class vip {
    list() {
        let url = '/admin/adm/find'
        return axios.post(url)
    }
    del(_id) {
        let url = '/admin/adm/del'
        return axios.post(url, {
            _id
        })
    }
}

export default new vip()