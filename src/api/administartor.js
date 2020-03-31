import axios from '../utils/axios'
// 管理员管理-----
class administartor {

    list(){//获取全部管理员数据哈
        let url = '/hehe/adm/find'
        return axios.post(url)
    }
// ---------------------------------------------------------------------------
    del(_id){//管理员删除
        let url = '/hehe/adm/del'
        return axios.post(url,{_id})
    }
// -----------------------------------------------------------------------------
    add(admin,passWord){//管理员添加
        let url = '/hehe/adm/add'
        return axios.post(url,{admin,passWord})
    }
// ----------------------------------------------------------------------------------

}

export default new administartor()