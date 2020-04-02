import axios from "../utils/axios"

class Goods {
    findall(){
        let url = '/admin/shop/findall'
        return axios.post(url)
    }
    add({name,stock,price,path,desc,unit,putaway,type}){
        let url = '/admin/shop/add'
        return axios.post(url,{name,stock,price,path,desc,unit,putaway,type})
    }
    del(_id){
        let url = '/admin/shop/del'
        return axios.post(url,{_id})
    }
    putAway(_id,putaway){
        let url = '/admin/shop/putaway'
        return axios.post(url,{_id,putaway})
    }
}

export default new Goods();