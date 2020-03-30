//分析页api
import axios from '../utils/axios'

class analysis {
    kindList() {
        let url = '/admin/shop/findall'
        return axios.post(url)
    }
}

export default new analysis()