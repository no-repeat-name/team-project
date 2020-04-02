//分析页api
import axios from '../utils/axios'

class monitoring {
    kindList() {
        let url = '/admin/shop/findall'
        return axios.post(url)
    }

    random() {
        let url = '/admin/shop/monitoring'
        return axios.post(url)
    }
}

export default new monitoring()