import React, { Component } from "react"
import { Pagination, Card, message, Table, Tag, Button, Popconfirm, Select } from 'antd'
import goodsApi from "../../../api/goods"
import style from './index.module.less'
let rootPath = 'http://47.92.229.63:3555'
const { Option, OptGroup } = Select;
class GoodsList extends Component {
  state = {
    page: 1,//页码数
    pageSize: 2,//每页显示的条数
    data: [], //列表数据
    count: 0, //总数量
    kindList: [],
    columns: [
      { title: '_id', dataIndex: '_id', key: '_id', width: 120, fixed: 'left' },
      { title: '名称', dataIndex: 'name', key: 'name', width: 120 },
      { title: '库存', dataIndex: 'stock', key: 'stock', width: 80 },
      { title: '价格', dataIndex: 'price', key: 'price', width: 120 },
      {
        title: '类别', dataIndex: 'type', key: 'type', width: 120, render(type) {
          return (<span>{type ? type : '暂无类别'}</span>)
        }
      },
      {
        title: '缩略图', dataIndex: 'path', key: 'path', render(path) {
          return (<img width='100' height='80' src={rootPath + path} />)
        }, width: 150
      },
      { title: '描述', dataIndex: 'desc', key: 'desc', width: 100 },
      { title: '单位', dataIndex: 'unit', key: 'unit', width: 80 },
      {
        title: '状态', dataIndex: 'putaway', key: 'putaway', render(putaway) {
          let obj = { '-1': { color: 'red', msg: '已下架' }, '0': { color: 'yellow', msg: '未上架' }, '1': { color: 'green', msg: '已上架' } }
          return (<Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>)
        }, width: 120
      },
      {
        title: '操作', key: 'action', width: 120, fixed: 'right', render: (recode) => {
          return (
            <div>
              <Popconfirm title='你确定要删除该商品嘛?'
                onConfirm={() => { this.delGodds(recode._id) }}
              >
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
              <Popconfirm title='你确定要修改该商品的状态嘛?'
                onConfirm={() => { this.putAwayGoods(recode._id, recode.putaway) }}
              >
                <Button type='warn' size='small'>上架</Button>
              </Popconfirm>
              <Button type='primary' size='small' onClick={() => {
                // 跳转到修改页面 传递要修改的id 
                this.props.history.replace('/admin/goodsUpdate/' + recode._id)
              }}>修改</Button>
            </div>
          )
        }
      }
    ]
  }
  //修改商品状态
  putAwayGoods = async (_id, putaway) => {
    if (putaway === 0 || putaway === -1) {
      putaway = 1
    } else {
      putaway = -1
    }
    let { data: { err, msg } } = await goodsApi.putAway(_id, putaway);
    if (err) {
      return message.error(msg);
    }
    this.getListData()
  }
  // 删除商品
  delGodds = async (_id) => {
    let { data: { msg, err } } = await goodsApi.del(_id);
    if (err) { return message.error(msg) }
    this.getListData()
  }
  //获取商品数据
  getListData = async () => {
    // let {page,pageSize} = this.state;
    // let {type} = this.state;
    let { data, msg, err } = await goodsApi.findall();
    if (err == 0) {
      return message.error(msg)
    }
    let { kindList } = this.state
    let shopList = data.data
    shopList.map((item, index) => {
      if (kindList.indexOf(item.type) === -1) { kindList.push(item.type) }
      return index
    })
    this.setState(kindList)
    //查询成功就返回列表数据
    this.setState(data)
  }

  // 选择类型改变
  handleChange = async (value) => {
    let shopList = (await goodsApi.findall()).data.data
    let result = []
    if (value === '全部') {
      result = shopList
    } else {
      shopList.map((item, index) => {
        if (item.type === value) { result.push(shopList[index]) }
        return index
      })
    }
    this.setState({ data: result })
  }

  //发送请求数据
  componentDidMount() {
    this.getListData()
  }

  render() {
    let { data, columns, count, pageSize, page, kindList } = this.state

    return (
      <div className={style.box}>
        <Card title='商品列表' className={style.card}>
          <Button style={{ marginRight: 20 }} type='primary' onClick={() => {
            // console.log(this)
            this.props.history.push('/admin/goodsInfoAdd')
          }}>商品添加</Button>
          类别：
          <Select defaultValue="全部" style={{ width: 200 }} onChange={this.handleChange}>
            <OptGroup label="类型选择">
              <Option value="全部" key={-1}>全部</Option>
              {kindList.map((item, index) => {
                return (<option value={item} key={index}>{item}</option>)
              })}
            </OptGroup>
          </Select>
          {/* 表格内容 */}
          <Table style={{ marginTop: 20 }}
            scroll={{ y: 300, x: 840 }}
            pagination={false}
            columns={columns}
            dataSource={data}
            rowKey='_id'>
          </Table>
          {/* 分页器 */}
          <Pagination current={page} total={count} showQuickJumper pageSize={pageSize}
            onChange={(page, pageSize) => {
              this.setState({ page }, () => {
                this.getListData()
              })
            }}
          />
        </Card>
      </div>
    );
  }
}

export default GoodsList;