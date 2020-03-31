import React, { Component } from 'react'
import { Card, Table, Button, Spin, Popconfirm, message, Input } from 'antd'
import Api from '../../api/vip'

const { Search } = Input;

class Vip extends Component {
    state = {
        spinning: false,
        dataSource: [],
        columns: [
            {
                title: '会员id',   //显示
                dataIndex: '_id',//数据索引字段
                key: '_id', //key值
            },
            {
                title: '账号',
                dataIndex: 'admin',
                key: 'admin',
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => {
                    return (
                        <div>
                            <Popconfirm
                                title="你确定要删除这个用户吗?"
                                onConfirm={() => {
                                    this.del(record._id)
                                }}
                                onCancel={() => {
                                    message.error('取消删除');
                                }}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                },
            }
        ]
    }

    search = async (value) => {
        this.setState({ spinning: true })
        let list = (await Api.list()).data.list
        let result = []
        list.map((item, index) => {
            if (JSON.stringify(item._id + ' ' + item.admin).indexOf(value.trim()) !== -1) {
                result.push(list[index])
            }
            return index
        })
        this.setState({ dataSource: result, spinning: false })
    }

    del = async () => {
        this.setState({ spinning: true })
        let result = await Api.list()
        this.setState({ dataSource: result.data.list, spinning: false })
    }

    refreshList = async () => {
        this.setState({ spinning: true })
        let result = await Api.list()
        this.setState({ dataSource: result.data.list, spinning: false })
    }

    componentDidMount() {
        this.refreshList()
    }

    render() {
        let { dataSource, spinning, columns } = this.state
        return (
            <Card title='会员列表'>
                <Search
                    placeholder="输入相关信息查找"
                    onSearch={value => this.search(value)}
                    style={{ width: 500, margin: 20 }}
                />
                <Spin spinning={spinning}>
                    <Table dataSource={dataSource} columns={columns} rowKey='_id' />
                </Spin>
            </Card>
        )
    }
}

export default Vip