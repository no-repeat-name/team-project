import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import NumberOfSearchUsers from '../NumberOfSearchUsers'
import SearchesPerCapita from '../SearchesPerCapita'
import Style from './index.module.less'

class PopularSearch extends Component {
    render() {
        return (
            <Card title='线上热门搜索' extra={<Icon type="exclamation-circle" />}>
                <div className={Style.frame}>
                    <div style={{ width: '45%' }}><NumberOfSearchUsers></NumberOfSearchUsers></div>
                    <div style={{ width: '45%' }}><SearchesPerCapita></SearchesPerCapita></div>
                </div>
            </Card>
        )
    }
}

export default PopularSearch