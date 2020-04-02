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
    findOne(_id){
        let url ='/admin/shop/idfind'
        return axios.post(url,{_id})
    }
    update(_id,payload){
        let url = '/admin/shop/update'
        return axios.post(url,payload)
    }
    pagefind(page=1,pageSize=2){
        let url = '/admin/shop/pagefind'
        return axios.post(url,{page,pageSize})
    }
}

export default new Goods();