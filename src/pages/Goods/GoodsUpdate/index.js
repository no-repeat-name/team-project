import React, { Component } from 'react';
import style from  './index.module.less'
import uploadApi from '../../../api/upload'
import goodsApi from '../../../api/goods'
import config from '../../../config'
import {Card,message,Input,Button} from 'antd';
class GoodsUpdate extends Component {
  state = {
    "name":"默认名字",
    "desc":'超好吃,是真的超好吃不是假的超好吃',
    "path":'heheheda',
    "stock":0,
    "putaway":0,
    "price":0,
    "unit":"件",
    "type":[] 
  }
  // async componentDidMount(){
  //   // 获取id
  //   let {id} =  this.props.match.params
  //   //  获取的是类别列表
  //   let result= await goodsApi.kindlist() 
  //   //  通过id 获取修改信息
  //   let {code,info} = await goodsApi.findOne(id) 
  //   console.log(result.list,info[0])
  //   this.setState({types:result.list,...info[0]})
    
  // }
  // // 添加商品
  // submit=async()=>{
  //   let {id} =  this.props.match.params
  //  if (!this.state.path){return message.info('请先上传图片')}
  // //  调用修改的接口
  //  let {code,msg}  = await goodsApi.update(id,this.state)
  //  if(code){ return message.error(msg)}
  //  console.log(this)
  //  this.props.history.replace('/admin/goodsInfo')

  // }

  render() { 
    let {name,desc,path,stock,putaway,price,unit,type} = this.state
    // 判断path是不是base64 
    // let basePath = path
    // if(basePath.indexOf('base64') === -1){ basePath = config.serverIp+path}
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
               <Input style={{marginBottom: 10}} addonBefore={'类别'}  value={type} onChange={(e)=>{
                this.setState({type:e.target.value})
              }} /><br/>
              发布状态: 
              <select value={putaway} style={{ width: 100 , marginRight:50}} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select>
              {/* 渲染类别 */}
              {/* <Select showSearch style={{ width: 100 ,marginRight: 50}} 
                value={type} onChange={(e)=>{
                  this.setState({type:e.target.value})
              }}>
                <Option value={1}>类别</Option>
                <Option value={2}>类别</Option>
                <Option value={3}>类别</Option>
                {type.map((item,index)=>{
                  return( <option value={item._id} key={item._id}>{item.kindName}</option>)
                })}
              </Select> */}
              {/* 缩略图 */}
              缩略图:
                 <input type="file" ref='img'/>
                <Button  style={{marginLeft: 20}} onClick={this.upload}>上传图片</Button>
              <img width='120' height='80' src={config.serverIp+path} alt=""/><br/>
              <Button type="primary" onClick={this.submit}>添加</Button>
            </Card>
      </div>
     );
  }
}
 
export default GoodsUpdate;
