import axios from '../utils/axios'
// 管理员管理-----
class administartor {

    list(){//获取全部管理员数据哈
        let url = ''//暗号+路由路径
        return axios.post(url)
    }
// ---------------------------------------------------------------------------
    del(_id){//管理员删除
        let url = ''
        return axios.post(url,{_id})
    }
// -----------------------------------------------------------------------------
    add({userName,passWord}){//管理员添加
        let url = ''
        return axios.post(url,{userName,passWord})
    }
// ----------------------------------------------------------------------------------


}

export default new administartor()