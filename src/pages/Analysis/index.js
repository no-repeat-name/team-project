import React, { Component } from 'react'
import { Card, Icon, Popover } from 'antd'
import PassengerFlowOverview from '../../compontents/PassengerFlowOverview'
import PopularSearch from '../../compontents/PopularSearch'
import Statistics from '../../compontents/Statistics'
import Style from './index.module.less'

class Analysis extends Component {


    render() {
        return (
            <Card title='数据分析' style={{ marginTop: 20 }}>
                <div className={Style.head}>
                    <Card size="small" title="总销售额" extra={<a href="#">More</a>} style={{ width: '23%', textAlign: 'center' }}>
                        <p>￥ 126560</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card size="small" title="访问量" extra={<a href="#">More</a>} style={{ width: '23%', textAlign: 'center' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card size="small" title="支付笔数" extra={<a href="#">More</a>} style={{ width: '23%', textAlign: 'center' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card size="small" title="运营活动效果" extra={<a href="#">More</a>} style={{ width: '23%', textAlign: 'center' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className={Style.middle}>
                    <Card title='年内访问量概况'>
                        <PassengerFlowOverview></PassengerFlowOverview>
                    </Card>
                </div>
                <div className={Style.bottom}>
                    <div className={Style.left}><PopularSearch></PopularSearch></div>
                    <div className={Style.right}><Statistics></Statistics></div>
                </div>
            </Card>
        )
    }
}

export default Analysis