import React,{Component} from "react"
import {Card,message,Input,Select,Button} from "antd"
import config from '../../../config'
import uploadApi from "../../../api/upload"
import goodsApi from "../../../api/goods"
import style from './index.module.less'
const { Option } = Select;
class goodsInfoAdd extends Component {
    state = { 
      "name":"",
      "desc":'',
      "path":null,
      "stock":"",
      "putaway":0,
      "price":0,
      "unit":"份",
      "type":'面', 
     }
    //上传图片
    upload=async()=>{
      //通过非受控组件方法获取图片的相关信息
      let file = this.refs.img.files[0]
      // console.log(file);
      if(!file){ return message.error('请先选择一张图片')}
      //图片的验证
      let {size,type} = file 
      // console.log(type)
      let types = ['jpg',"jpeg",'gif','png']
      if(size>1000000){ return message.warning('图片超过1m')}
      if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
      // 调用接口
      // 将图片转化为formdata 
      let formdata = new FormData()
      formdata.append('hehe',file)
      //"hehe"是key值，"file"是value
      let {data:{path,err,msg}} = await uploadApi.img(formdata)
      if(err){ return message.error(msg)}
      this.setState({path})
    }
    //添加商品
    submit=async()=>{
      if (!this.state.path){return message.info('请先上传图片')}
      let {err,msg}  = await goodsApi.add(this.state)
      // let result = await goodsApi.add(this.state)
      // console.log(result);
      if(err){ return message.error(msg)}
      console.log(this.state)
      this.props.history.replace('/admin/goodsInfo')
    }
    render() {
      let {name,desc,path,link,stock,putaway,price,unit,type,kind} = this.state
        return (
          <div className={style.box}>
          <Card title="商品添加" className={style.card}>
               <Input style={{marginBottom: 10}} addonBefore={'商品名称'} value={name} onChange={(e)=>{
              this.setState({name:e.target.value})}} />
              <Input style={{marginBottom: 10}} addonBefore={' 描述'} value={desc} onChange={(e)=>{
                this.setState({desc:e.target.value})
              }}/>
              <Input style={{marginBottom: 10}} addonBefore={'库存'} value={stock} onChange={(e)=>{
                this.setState({stock:Number(e.target.value)})
              }}/> 
               <Input style={{marginBottom: 10}} addonBefore={'价格'}  value={price} onChange={(e)=>{
                this.setState({price:Number(e.target.value)})
              }}/>
               {/* <Input style={{marginBottom: 10}} addonBefore={'单位'}  value={unit} onChange={(e)=>{
                this.setState({unit:e.target.value})
              }} /><br/> */}

          单位：<select value={unit} style={{ width: 100 , marginRight:50,marginBottom: 20}} onChange={(e)=>{
              this.setState({unit:e.target.value})
            }}>
              <option value={'碗'}>碗</option>
              <option value={'份'}>份</option>
              <option value={'个'}>个</option>
              <option value={'杯'}>杯</option>
            </select><br/>
               {/* <Input style={{marginBottom: 10}} addonBefore={'类别'}  value={type} onChange={(e)=>{
                this.setState({type:e.target.value})
              }} /><br/> */}
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
                <Button  style={{marginLeft: 10}} onClick={this.upload}>上传图片</Button>
              <img width='120' height='80' src={config.serverIp+path} alt=""/><br/>
              <Button type="primary" onClick={this.submit}>添加</Button>
            </Card>
          </div>
         );
      }
}

export default goodsInfoAdd;