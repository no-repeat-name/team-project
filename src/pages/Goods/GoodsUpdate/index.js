import React, { Component } from 'react';
import style from  './index.module.less'
import uploadApi from '../../../api/upload'
import goodsApi from '../../../api/goods'
import config from '../../../config'
import {Card,message,Input,Button} from 'antd';
class GoodsUpdate extends Component {
  state = {
    "name":"",
    "desc":'',
    "path":'',
    "stock":0,
    "putaway":0,
    "price":0,
    "unit":"件",
    "type":[] 
  }
 async componentDidMount(){
    // 获取id
    let {id} =  this.props.match.params
    //  获取的是类别列表
    let kindType = (await goodsApi.findOne(id) ).data.data[0].type
    //  通过id 获取修改信息
    let {data:{data}} = await goodsApi.findOne(id) 
    this.setState({type:kindType,...data[0]})
  }
  // // 添加商品
 submit=async()=>{
    let {id} =  this.props.match.params
   if (!this.state.path){return message.info('请先上传图片')}
  //  调用修改的接口
   let {data:{err,msg}} = await goodsApi.update(id,this.state)
   if(err){ return message.error(msg)}
   this.props.history.replace('/admin/goodsInfo')
  }

  // 图片上传
  upload= async ()=>{
    // 1. 获取图片里的内容
    let  file = this.refs.img.files[0]
    if(!file){ return message.error('请先选择一张图片')}
    // 图片的验证
    let {size,type} = file 
    console.log(type)
    let types = ['jpg',"jpeg",'gif','png']
    if(size>1000000){ return message.warning('图片超过1m')}
    if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
      // 将图片转化为formdata 
      let formdata = new FormData()
      formdata.append('hehe',file)
      //"hehe"是key值，"file"是value
      let {data:{path,err,msg}} = await uploadApi.img(formdata)
      if(err){ return message.error(msg)}
      this.setState({path})
  }
  render() { 
    let {name,desc,path,stock,putaway,price,unit,type} = this.state
    // 判断path是不是base64 
    let basePath = path
    if(basePath.indexOf('base64') === -1){ basePath = config.serverIp+path}
    return ( 
      <div className={style.box}>
        <Card title="商品编辑" className={style.card}>
               <Input style={{marginBottom: 10}} addonBefore={'商品名称'} value={name} onChange={(e)=>{
              this.setState({name:e.target.value})}} />
              <Input style={{marginBottom: 10}} addonBefore={' 描述'} value={desc} onChange={(e)=>{
                this.setState({desc:e.target.value})
              }}/>
              <Input style={{marginBottom: 10}} addonBefore={'库存'} value={stock} onChange={(e)=>{
                this.setState({stock:e.target.value})
              }}/> 
               <Input style={{marginBottom: 10}} addonBefore={'价格'}  value={price} onChange={(e)=>{
                this.setState({price:e.target.value})
              }}/>
               <Input style={{marginBottom: 10}} addonBefore={'单位'}  value={unit} onChange={(e)=>{
                this.setState({unit:e.target.value})
              }} /><br/>
               美食分类：<select value={type} style={{ width: 100 , marginRight:50,marginBottom: 20}} onChange={(e)=>{
              this.setState({type:e.target.value})
            }}>
              <option value={'粉'}>美味的粉</option>
              <option value={'面'}>细软的面</option>
              <option value={'粥'}>清香的粥</option>
              <option value={'饭'}>干巴巴的饭</option>
              <option value={'饮料'}>清爽饮品</option>
            </select><br/>
              发布状态: 
              <select value={putaway} style={{ width: 100 , marginRight:50}} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select>
              {/* 缩略图 */}
              缩略图:
                 <input type="file" ref='img'/>
                <Button  style={{marginLeft: 20}} onClick={this.upload}>上传图片</Button>
              <img width='120' height='80' src={basePath} alt=""/><br/>
              <Button type="primary" onClick={this.submit}>修改</Button>
            </Card>
      </div>
     );
  }
}
 
export default GoodsUpdate;
