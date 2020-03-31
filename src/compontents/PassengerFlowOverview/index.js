import React, { Component } from 'react'
import { Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
import Api from '../../api/analysis'

class PassengerFlowOverview extends Component {
    state = {
        option: {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line',
                areaStyle: {}
            }]
        },
        spinning: false
    }

    refreshList = async () => {
        this.setState({ spinning: true })
        let dataList = []
        let length = this.state.option.xAxis.data.length
        for (let index = 0; index < length; index++) {
            let visit = (await Api.random()).data.number * 10
            dataList.push(visit)
        }
        let { option } = JSON.parse(JSON.stringify(this.state))
        option.series[0].data = dataList
        this.setState({ option, spinning: false })
    }

    componentDidMount() {
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

export default PassengerFlowOverview