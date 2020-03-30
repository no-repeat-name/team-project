import React, { Component } from 'react'
import { Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
import Api from '../../api/analysis'

class NumberOfSearchUsers extends Component {
    state = {
        option: {
            title: {
                text: '搜索用户数',
                subtext: '',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line',
                smooth: true
            }]
        },
        spinning: false
    }

    refreshList = async () => {
        let dataList = []
        let length = this.state.option.xAxis.data.length
        for (let index = 0; index < length; index++) {
            let visit = (await Api.random()).data.number
            dataList.push(visit)
        }
        let { option } = JSON.parse(JSON.stringify(this.state))
        option.series[0].data = dataList
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

export default NumberOfSearchUsers