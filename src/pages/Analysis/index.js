import React, { Component } from 'react'
import { Card, Icon, Divider, Spin } from 'antd'
import PassengerFlowOverview from '../../compontents/PassengerFlowOverview'
import PopularSearch from '../../compontents/PopularSearch'
import Statistics from '../../compontents/Statistics'
import Api from '../../api/analysis'
import Style from './index.module.less'

class Analysis extends Component {
    state = {
        totalSell: 0,
        dailySell: 0,
        totalVisit: 0,
        dailyVisit: 0,
        paymentNumber: 0,
        conversionRate: 0,
        effectOfActivities: 0,
        weekRate: 0,
        dailyRate: 0,
        spinning: false
    }

    getData = async () => {
        let dailySell = (await Api.random()).data.number
        let totalSell = parseInt(dailySell * ((await Api.random()).data.number))
        let dailyVisit = (await Api.random()).data.number
        let totalVisit = parseInt(dailyVisit * ((await Api.random()).data.number))
        let paymentNumber = parseInt(totalVisit * Math.random())
        let conversionRate = parseInt(Math.random() * 100)
        let effectOfActivities = parseInt(Math.random() * 100)
        let weekRate = parseInt(Math.random() * 20)
        let dailyRate = parseInt(Math.random() * 20)
        this.setState({ totalSell, dailySell, totalVisit, dailyVisit, paymentNumber, conversionRate, effectOfActivities, weekRate, dailyRate, spinning: false })
    }

    componentDidMount() {
        this.setState({ spinning: true })
        this.getData()
    }

    render() {
        let { totalSell, dailySell, totalVisit, dailyVisit, paymentNumber, conversionRate, effectOfActivities, weekRate, dailyRate, spinning } = this.state
        return (
            <Card title='数据分析' style={{ marginTop: 20 }}>
                <div className={Style.head}>
                    <Card size="small" title="总销售额" extra={<Icon type="exclamation-circle" />} style={{ width: '23%', textAlign: 'center' }}>
                        <Spin spinning={spinning}>
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>￥ {totalSell}</p>
                            <Divider />
                            <p>日销售额 ￥ {dailySell}</p>
                        </Spin>
                    </Card>
                    <Card size="small" title="访问量" extra={<Icon type="exclamation-circle" />} style={{ width: '23%', textAlign: 'center' }}>
                        <Spin spinning={spinning}>
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{totalVisit}</p>
                            <Divider />
                            <p>日访问量 {dailyVisit}</p>
                        </Spin>
                    </Card>
                    <Card size="small" title="支付笔数" extra={<Icon type="exclamation-circle" />} style={{ width: '23%', textAlign: 'center' }}>
                        <Spin spinning={spinning}>
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{paymentNumber}</p>
                            <Divider />
                            <p>转化率 {conversionRate}%</p>
                        </Spin>
                    </Card>
                    <Card size="small" title="运营活动效果" extra={<Icon type="exclamation-circle" />} style={{ width: '23%', textAlign: 'center' }}>
                        <Spin spinning={spinning}>
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{effectOfActivities}%</p>
                            <Divider />
                            <p>周同比 {weekRate}% 日同比{dailyRate}%</p>
                        </Spin>
                    </Card>
                </div>
                <div className={Style.middle}>
                    <Card title='月访问量概况' extra={<Icon type="exclamation-circle" />}>
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