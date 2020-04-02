import React, { Component } from 'react';
import { Card, Button, Table, Popconfirm, message, Spin, Modal, notification } from 'antd'
import administartorapi from '../../api/administartor'
// 111111122222g
class Administartor extends Component {

    state = {
        dataSource: [
            { _id: 1, admin: 'zxz', }
        ],
        columns: [
            { title: 'id', dataIndex: '_id', key: '_id' },
            { title: '管理员', dataIndex: 'admin', key: 'admin' },
            {
                title: '操作', key: 'cz', render: (item) => {
                    return (<div>
                        <Popconfirm
                            title="你确定要删除这个用户吗?"
                            onConfirm={() => {
                                this.del(item._id)
                            }}
                            onCancel={() => {
                                message.error('取消删除');
                            }}
                        >
                            {item._id === localStorage.getItem('admin') || <Button type='danger' size='small'>删除</Button>}
                        </Popconfirm>
                    </div>)
                }
            }
        ],
        spinning: false, //加载小转圈
        visible: false, //添加拟态框
    }

    // ---------------------------------------------------------------------------------------------------------
    del = async (_id) => {//删除管理员函数
        let result = await administartorapi.del(_id)
        if (result.err) { return false }
        this.refreshList();
    }
    // --------------------------------------------------------------------------------------------------------------
    refreshList = async () => {//管理员列表渲染函数
        this.setState({ spinning: true })
        let result = await administartorapi.list()
        // console.log(result.data.list);

        this.setState({ dataSource: result.data.list, spinning: false })
    }
    // ---------------------------------------------------------------------------------------------------------------
    componentDidMount() {//一挂载就渲染管理员列表
        this.refreshList()
    }
    // -------------------------------------------------------------------------------------------------------------------
    handleCancel = () => { this.setState({ visible: false }) } //关闭添加管理员拟态框

    // -----------------------------------------------------------------------------------------------------------
    handleOk = async () => {//管理员添加函数
        let admin = this.refs.us.value
        let passWord = this.refs.ps.value
        let result = await administartorapi.add(admin, passWord)
        console.log(result);

        if (result.err) { return notification.error({ description: '管理员添加失败，请详细检查传输', message: '错误', duration: 1.5 }) }
        notification.success({ description: '管理员添ok，模态框即将关闭', message: '成功', duration: 1.5 })
        this.setState({ visible: false })
        this.refreshList()
    }
    // --------------------------------------------------------------------------------------------------------------
    render() {
        let { dataSource, columns, spinning, visible } = this.state
        return (<div>
            <Card title='管理员列表'>
                <Button type='primary' icon="plus" onClick={() => {
                    this.setState({ visible: true })
                }}>添加管理员</Button>
                <Spin spinning={spinning}>
                    <Table dataSource={dataSource} columns={columns} rowKey='_id'></Table>
                </Spin>

            </Card>
            {/* ---------------Modal添加管理员拟态框 */}
            <Modal
                title="管理员添加"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                admin:<input type="text" ref='us' /><br />
          passWord:<input type="text" ref='ps' /><br />
            </Modal>


        </div>)
    }
    // ---------------------------------------------------------------------------------------
}
export default Administartor;