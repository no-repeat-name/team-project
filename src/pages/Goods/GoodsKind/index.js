import React,{Component} from "react"
import {Card,Table,Popconfirm,Button,Icon,message} from "antd"
import goodsApi from "../../../api/goods"
import style from "./index.module.less"
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', 
      name: record.name,
    }),
  };

class GoodsKind extends Component {
    state = { 
        columns :[
            {
              title: '序号',
              dataIndex: 'number'
            },
            {
              title: '商品类别',
              dataIndex: 'kind',
              width:300
            }
            ,
            {
              title: '备注',
              dataIndex: 'note',
              width:200
            },
            {
              title: '操作',
              dataIndex: 'todo',
              render:(recode)=>{
                return(
                  <div>
                    <Popconfirm title='你确定要删除该商品嘛?'
                      onConfirm={()=>{this.delGodds(recode._id)}}
                      >
                      <Button  type='primary' size='small'><Icon type="delete" /></Button>
                    </Popconfirm>
                  </div>
                )
              }
            }
          ],
        data : [
            {
              key: '1',
              number: '1',
              kind: "热菜",
              note: "111",
              todo:"111"
            }
          ]
     }
    delGodds=async(_id)=>{
      let {data:{msg,err}}= await goodsApi.del(_id)
      if(err){ return message.error(msg)}
      // this.getListData()
    }
    render() {
        let {data,columns} =this.state
        return (
            <div className={style.box}>
                <Card className={style.card}>
                  <Button style={{marginRight:20}} type='primary' onClick={()=>{
                          console.log(this)
                          this.props.history.push('/admin/goodsInfoAdd')
                      }}><Icon type="plus" />添加</Button>
                  <Table rowSelection={rowSelection} columns={columns} dataSource={data}   />   
                </Card>
            </div>
        );
    }
}

export default GoodsKind;