import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from 'antd';
import { withRouter, Router } from 'react-router-dom'
import menuList from './menuList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function handleClick(e) {
    let { path } = e.item.props
    this.props.history.replace(path)
}

class Admin extends Component {
    state = {
        collapsed: false,
        iconLoading: false
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        this.setState({ iconLoading: false });
        this.props.history.replace('../login')
    };

    renderMenu(data) {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                        path={item.path}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} path={item.path}>
                        {!item.icon || <Icon type={item.icon} />}
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClick.bind(this)}>
                        {this.renderMenu(menuList)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, textAlign: "right", paddingRight: '10px' }} >
                        <Button
                            type="primary"
                            icon="poweroff"
                            loading={this.state.iconLoading}
                            onClick={this.enterIconLoading}
                        >
                            退出登录
                        </Button>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Admin);