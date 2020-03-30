import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class NumberOfSearchUsers extends Component {
    getOption() {
        return {
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
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        }

    }

    render() {
        return (
                <ReactEcharts option={this.getOption()} />
        )
    }
}

export default NumberOfSearchUsers