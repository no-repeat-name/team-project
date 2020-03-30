import React, { Component } from 'react'
import { Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
import Api from '../../api/analysis'

class SalesCategoryPercentage extends Component {
    state = {
        option: {
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
        },
        spinning: false
    }

    refreshList = async () => {
        let shopList = (await Api.kindList()).data.data
        let echartsList = []
        let sellOutList = []
        shopList.map((item, index) => {
            let sellOut = parseInt(item.stock * Math.random())
            echartsList.push(item.type)
            sellOutList.push(sellOut)
        })
        let { option } = JSON.parse(JSON.stringify(this.state))
        option.xAxis.data = echartsList
        option.series[0].data = sellOutList
        this.setState({ option, spinning: false })
    }

    componentDidMount() {
        this.setState({ spinning: true })
        this.refreshList()
    }

    render() {
        let { spinning, option } = this.state
        return (
            <Spin spinning={spinning}>
                <ReactEcharts option={option} />
            </Spin>
        )
    }
}

export default SalesCategoryPercentage